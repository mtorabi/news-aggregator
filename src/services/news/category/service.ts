import { AVAILABLE_CATEGORIES } from "../model";

const PREFERRED_CATEGORY_KEY = 'preferredCategories';

/**
 * Stores the preferred categories in localStorage.
 * @param categories Array of category names to store
 */
export const storePreferredCategories = (categories: string[]) => {
    try {
        localStorage.setItem(PREFERRED_CATEGORY_KEY, JSON.stringify(categories));
    } catch {
        // ignore localStorage write errors
    }
};

/**
 * Loads the preferred categories from localStorage.
 * @returns Array of category names
 */
export const loadPreferredCategories = (): string[] => {
    try {
        const data = localStorage.getItem(PREFERRED_CATEGORY_KEY);
        // If no data, return all available categories as default
        return data ? JSON.parse(data) : AVAILABLE_CATEGORIES;
    } catch {
        return [];
    }
};

/**
 * Clears the stored preferred categories from localStorage.
 */
export const clearPreferredCategories = () => {
    try {
        localStorage.removeItem(PREFERRED_CATEGORY_KEY);
    } catch {
        // ignore localStorage write errors
    }
};
