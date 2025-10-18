import { Article, Filters, Source } from "./model";
import { AVAILABLE_NEWS_SOURCES } from "./available-news-sources";
import { fetcher } from "../../utils/fetcher";

export const getNews = async (filters: Filters): Promise<Article[]> => {
    const sources = AVAILABLE_NEWS_SOURCES.filter((source: Source) => filters
        .sources.map(s => s.name)
        .includes(source.name));
    return Promise.all(sources.map(async (source: Source) => {
        const articles = await fetcher(source.apiEndpoint(filters));
        return articles;
    }));
};
