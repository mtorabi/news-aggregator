import { Filters, Source } from "../model";

export const NEWS_SOURCE_NEWS_API: Source = {
    name: 'newsAPI',
    apiEndpoint: (filters: Filters) => 'https://newsapi.org/v2/everything?'
        + `&q=${filters.query || ''}`
        + (filters.dates.from ? `&from=${filters.dates.from}` : '')
        + (filters.dates.to ? `&to=${filters.dates.to}` : '')
        + (filters.categories && filters.categories.length > 0
            ? `&category=${filters.categories.map((c) => `"${c}"`).join(' ')}`
            : '')
        + (filters.authors && filters.authors.length > 0
            ? `&author=${filters.authors.map((a) => `"${a}"`).join(' ')}`
            : '')
        + `&apiKey=${process.env.NEWS_API_KEY}`,
}