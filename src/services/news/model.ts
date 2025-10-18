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
    apiEndpoint: (filters: Filters) => string;
    apiResponseParser: (raw: any) => Article[];
}

export interface Filters {
    sources: Source[];
    categories: string[];
    dates: { from?: string; to?: string };
    query?: string;
    authors: string[];
}