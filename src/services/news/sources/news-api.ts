import { Filters, Source } from "../model";

export const NEWS_SOURCE_NEWS_API: Source = {
    name: 'newsAPI',
    apiEndpoint: (filters: Filters) => 'https://newsapi.org/v2/everything?'
        + `apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        + (filters.query != undefined ? `&q=${filters.query}` : '&q=technology')
        + (filters.dates.from ? `&from=${filters.dates.from}` : '')
        + (filters.dates.to ? `&to=${filters.dates.to}` : '')
        + (filters.categories && filters.categories.length > 0
            ? `&category=${filters.categories.map((c) => `"${c}"`).join(' ')}`
            : '')
        + (filters.authors && filters.authors.length > 0
            ? `&author=${filters.authors.map((a) => `"${a}"`).join(' ')}`
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
};