import { useMemo } from "react";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Article, Filters, Source } from "../../services/news/model";
import { AVAILABLE_NEWS_SOURCES } from "../../services/news/available-news-sources";
import { fetchNewsForSource } from "../../services/news/service";

/**
 * Hook contract:
 * - inputs: Filters
 * - outputs: { articles: Article[], isLoading: boolean, isError: boolean, refetch: () => Promise<void>, perSource: UseQueryResult[] }
 */
export const useNewsQueries = (filters: Filters) => {
    // Determine the selected sources from filters
    const selectedSources: Source[] = useMemo(() => {
        const names = new Set(filters.sources.map(s => s.name));
        return AVAILABLE_NEWS_SOURCES.filter(s => names.has(s.name));
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

    // Aggregate articles and global state
    const articles: Article[] = useMemo(() => {
        return queries
            .filter(q => q.data && Array.isArray(q.data))
            .flatMap(q => q.data as Article[]);
    }, [queries]);

    const isLoading = queries.some(q => q.isLoading);
    const isError = queries.some(q => q.isError);

    const refetch = async () => {
        await Promise.all(queries.map(q => q.refetch()));
    };

    return {
        articles,
        isLoading,
        isError,
        refetch,
        perSource: queries,
        selectedSources,
    };
};
