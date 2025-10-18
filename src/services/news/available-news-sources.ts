import { NEWS_SOURCE_NEWS_API } from "./sources/news-api";
import { NEWS_SOURCE_THE_GUARDIAN } from "./sources/the-guardian";
import { NEWS_SOURCE_NY_TIMES } from "./sources/ny-times";
import { Source } from "./model";

/**
 * List of available news sources
 * NOTE: Add new sources here to make them available in the app
 */
export const AVAILABLE_NEWS_SOURCES: Source[] = [
    NEWS_SOURCE_NEWS_API,
    NEWS_SOURCE_THE_GUARDIAN,
    NEWS_SOURCE_NY_TIMES
];