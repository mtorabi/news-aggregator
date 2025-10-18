import { Filters, Source } from "../model";

export const NEWS_SOURCE_NY_TIMES: Source = {
        name: 'nyTimes',
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
                + `&q=${filters.query || ''}`
                + (begin ? `&begin_date=${begin}` : '')
                + (end ? `&end_date=${end}` : '')
                + (filters.categories && filters.categories.length > 0
                    ? `&fq=desk:(${filters.categories.map((c) => `"${c}"`).join(' ')})`
                    : '')
                + (filters.authors && filters.authors.length > 0
                    ? `&fq=byline:(${filters.authors.map((a) => `"${a}"`).join(' ')})`
                    : '')
                + `&api-key=${process.env.NY_TIMES_API_KEY}`;
        },
    };