import { AVAILABLE_NEWS_SOURCES } from "../available-news-sources";
import { Source } from "../model";

const PREFERRED_SOURCE_KEY = 'preferredSources';

/**
 * Stores an array of Source objects as preferred sources in local storage.
 * @param sources Array of Source objects to store as preferred sources
 */
export const storePreferredSources = (sources: Source[]) => {
    try {
        const sourceNames = sources.map(s => s.name);
        localStorage.setItem(PREFERRED_SOURCE_KEY, JSON.stringify(sourceNames));
    } catch (error) {
        console.error("Error storing preferred sources:", error);
    }
};

/**
 * Loads preferred sources from local storage.
 * @returns Array of Source objects loaded from preferred sources in local storage
 */
export const loadPreferredSources = (): Source[] => {
    try {
        const stored = localStorage.getItem(PREFERRED_SOURCE_KEY);

        //if no preferred sources stored, return all available sources
        if (!stored) {
            return AVAILABLE_NEWS_SOURCES;
        }
        
        return AVAILABLE_NEWS_SOURCES.filter(s => stored.includes(s.name));
    } catch (error) {
        console.error("Error loading preferred sources:", error);
        return [];
    }
};

/**
 * Clears preferred sources from local storage.
 */
export const clearPreferredSources = () => {
    try {
        localStorage.removeItem(PREFERRED_SOURCE_KEY);
    } catch (error) {
        console.error("Error clearing preferred sources:", error);
    }
};
