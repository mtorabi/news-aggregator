import { Filters, Source } from "../model";

export const NEWS_SOURCE_THE_GUARDIAN: Source = {
    name: 'theGuardian',
    apiEndpoint: (filters: Filters) => `https://content.guardianapis.com/search?show-fields=thumbnail,byline,trailText`
        + `&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`
        + (filters.query !== undefined ? `&q=${filters.query || ''}` : '')
        + (filters.dates.from ? `&from-date=${filters.dates.from}` : '')
        + (filters.dates.to ? `&to-date=${filters.dates.to}` : '')
        + (filters.categories && filters.categories.length > 0
            ? `&section=${filters.categories.map((c) => `"${c}"`).join(' ')}`
            : '')
        + (filters.authors && filters.authors.length > 0
            ? `&byline=${filters.authors.map((a) => `"${a}"`).join(' ')}`
            : ''),
    apiResponseParser: (raw: any) => {
        // The Guardian API typically returns { response: { results: [ { id, webTitle, webUrl, fields, sectionName, webPublicationDate } ] } }
        const results = Array.isArray(raw?.response?.results) ? raw.response.results : [];
        return results.map((r: any) => ({
            id: r.id || r.webUrl,
            title: r.webTitle || '',
            description: r.fields?.trailText || r.fields?.standfirst || undefined,
            image: r.fields?.thumbnail || undefined,
            category: r.sectionName || undefined,
            source: 'The Guardian',
            author: r.fields?.byline || undefined,
            publishedAt: r.webPublicationDate,
        }));
    },
};