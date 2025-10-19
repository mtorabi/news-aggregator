import { Filters, Source } from "../model";

export const NEWS_SOURCE_NY_TIMES: Source = {
    name: 'nyTimes',
    displayName: 'The New York Times',
    apiEndpoint: (filters: Filters) => {
        // NYTimes expects dates in YYYYMMDD (begin_date/end_date). Convert safely.
        const toYYYYMMDD = (d?: string) => {
            if (!d) return '';
            const dt = new Date(d);
            if (Number.isNaN(dt.getTime())) return '';
            const yyyy = dt.getUTCFullYear();
            const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
            const dd = String(dt.getUTCDate()).padStart(2, '0');
            return `${yyyy}${mm}${dd}`;
        };
        const begin = toYYYYMMDD(filters.dates.from);
        const end = toYYYYMMDD(filters.dates.to);
        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?`
            + `api-key=${process.env.REACT_APP_NY_TIMES_API_KEY}`
            + (filters.query !== undefined ? `&q=${filters.query || ''}` : '')
            + (begin ? `&begin_date=${begin}` : '')
            + (end ? `&end_date=${end}` : '')
            + (filters.categories && filters.categories.length > 0
                ? `&fq=desk:(${filters.categories.map((c) => `"${c}"`).join(',')})`
                : '')
            + (filters.authors && filters.authors.length > 0
                ? `&fq=byline:(${filters.authors.map((a) => `${a}`).join(',')})`
                : '');
    },
    apiResponseParser: (raw: any) => {
        // NYT Article Search API returns { response: { docs: [ ... ] } }
        const docs = Array.isArray(raw?.response?.docs) ? raw.response.docs : [];
        return docs.map((d: any, idx: number) => ({
            id: d._id || d.web_url || `${d.headline?.main || 'nyt'}-${idx}`,
            title: d.headline?.main || '',
            description: d.abstract || d.snippet || undefined,
            image: d.multimedia?.default?.url || undefined,
            category: d.section_name || d.news_desk || undefined,
            source: 'The New York Times',
            author: d.byline?.original || undefined,
            publishedAt: d.pub_date,
        }));
    },
    canSupportFilters: (filters: Filters) => {
        // NYTimes API supports all filter types used here
        return filters.sources.some(s => s.name === 'nyTimes');
    }
};