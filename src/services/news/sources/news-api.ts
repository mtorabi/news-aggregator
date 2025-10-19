import { Filters, Source } from "../model";

const NEWS_API_DEFAULT_SOURCE = 'bloomberg';

export const NEWS_SOURCE_NEWS_API: Source = {
    name: 'newsAPI',
    displayName: 'NewsAPI.org',
    apiEndpoint: (filters: Filters) => 'https://newsapi.org/v2/everything?'
        + `apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        //since NewsAPI requires a source or q parameter, we provide a default source if neither is specified
        + (filters.query != undefined ? `&q=${filters.query}` : `&sources=${NEWS_API_DEFAULT_SOURCE}`)
        + (filters.dates.from ? `&from=${filters.dates.from}` : '')
        + (filters.dates.to ? `&to=${filters.dates.to}` : '')
        + (filters.authors && filters.authors.length > 0
            ? `&author=${filters.authors.map((a) => `${a}`).join(' ')}`
            : ''),
    apiResponseParser: (raw: any) => {
        // newsApi.org returns { articles: [ { source, author, title, description, url, urlToImage, publishedAt, content } ] }
        const items = Array.isArray(raw?.articles) ? raw.articles : [];
        return items.map((a: any, idx: number) => ({
            id: a.url || `${a.title || 'news'}-${idx}`,
            title: a.title || '',
            description: a.description || a.content,
            image: a.urlToImage,
            category: undefined,
            source: "News API",
            author: a.author,
            publishedAt: a.publishedAt,
        }));
    },
    canSupportFilters: (filters: Filters) => {
        // NewsAPI does not support category filtering in the "everything" endpoint
        if(filters.categories && filters.categories.length > 0) {
            return false;
        }
        return filters.sources.some(s => s.name === 'newsAPI');
    }
};