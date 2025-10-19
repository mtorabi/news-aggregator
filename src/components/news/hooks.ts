import { useMemo } from "react";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Article, Filters, Source } from "../../services/news/model";
import { AVAILABLE_NEWS_SOURCES } from "../../services/news/available-news-sources";
import { fetchNewsForSource } from "../../services/news/service";
import { loadPreferredAuthors } from "../../services/news/authors/service";

/**
 * Hook contract:
 * - inputs: Filters
 * - outputs: { articles: Article[], isLoading: boolean, isError: boolean, refetch: () => Promise<void>, perSource: UseQueryResult[] }
 */
export const useNewsQueries = (filters: Filters) => {
    // Determine the selected sources from filters
    const selectedSources: Source[] = useMemo(() => {
        return filters.sources.filter(source => source.canSupportFilters(filters));
    }, [filters]);

    // Build queries for each selected source
    const queries = useQueries({
        queries: selectedSources.map((source) => ({
            queryKey: ["news", source.name, filters],
            queryFn: () => fetchNewsForSource(source, filters),
            staleTime: 1000 * 60 * 2, // 2 minutes
            retry: 1,
            enabled: true,
        }))
    }) as UseQueryResult<Article[], unknown>[];

    // Aggregate articles and global state; also collect unique authors
    const { articles, authors } = useMemo(() => {
        const preferredAuthors = loadPreferredAuthors();
        const articles = queries
            .filter(q => q.data && Array.isArray(q.data))
            .flatMap(q => q.data as Article[])
            .filter((art) => {
                if( preferredAuthors.length === 0) return true;
                if (!art.author || typeof art.author !== 'string') return false;
                return preferredAuthors.includes(art.author);
            })
            .sort((a, b) => {
                const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
                const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
                return dateB - dateA;
            });

        // Collect unique authors
        const authors: string[] = [];
        for (const art of articles) {
            if (art.author && typeof art.author === 'string') {
                if (!authors.includes(art.author)) {
                    authors.push(art.author);
                }
            }
        }

        // Sort authors alphabetically
        authors.sort((a, b) => a.localeCompare(b));

        return { articles: articles, authors: authors };
    }, [queries]);

    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);

    const refetch = async () => {
        await Promise.all(queries.map(q => q.refetch()));
    };

    return {
        articles,
        authors,
        isLoading,
        isError,
        refetch,
        perSource: queries,
        selectedSources,
    };
};
