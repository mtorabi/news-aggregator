export interface Article {
    id: string;
    title: string;
    description?: string;
    image?: string;
    category?: string;
    source?: string;
    author?: string;
    publishedAt?: string;
}

export interface Source {
    name: string;
    displayName: string;
    /**
     * Returns the API endpoint URL for the source based on the provided filters.
     * @param filters 
     * @returns 
     */
    apiEndpoint: (filters: Filters) => string;
    /**
     * Parses the raw API response into a more usable format.
     * @param raw api response
     * @returns 
     */
    apiResponseParser: (raw: any) => Article[];

    /**
     * Determines if the source can support the given filters.
     * @param filters 
     * @returns 
     */
    canSupportFilters: (filters: Filters) => boolean;
}

export interface Filters {
    sources: Source[];
    categories: string[];
    dates: { from?: string; to?: string };
    query?: string;
    authors: string[];
}

export const AVAILABLE_CATEGORIES = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
    'politics',
    'world',
    'culture',
    'lifestyle',
    'travel',
    'opinion',
    'education',
    'weather',
    'local',
    'transport',
    'food',
    'fashion',
    'arts',
    'business-tech',
    'environment',
    'crime',
    'science-tech',
    'media',
    'economy',
    'startup',
];