import { Filters, Source } from "../model";

export const NEWS_SOURCE_THE_GUARDIAN: Source= {
    name: 'theGuardian',
    apiEndpoint: (filters: Filters) => `https://api.theguardian.com/news?`
        + `&q=${filters.query || ''}`
        + (filters.dates.from ? `&from-date=${filters.dates.from}` : '')
        + (filters.dates.to ? `&to-date=${filters.dates.to}` : '')
        + (filters.categories && filters.categories.length > 0
            ? `&section=${filters.categories.map((c) => `"${c}"`).join(' ')}`
            : '')
        + (filters.authors && filters.authors.length > 0
            ? `&byline=${filters.authors.map((a) => `"${a}"`).join(' ')}`
            : '')
        + `&api-key=${process.env.GUARDIAN_API_KEY}`,
};