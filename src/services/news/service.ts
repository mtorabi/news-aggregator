import { Article, Filters, Source } from "./model";
import { fetcher } from "../../utils/fetcher";


export const fetchNewsForSource = async (source: Source, filters: Filters): Promise<Article[]> => {
    const raw = await fetcher(source.apiEndpoint(filters));
    return source.apiResponseParser(raw) || [];
};