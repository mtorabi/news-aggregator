const PREFERRED_AUTHORS_KEY = 'preferredAuthors';

/**
 * Stores the preferred authors in localStorage.
 * @param authors Array of author names to store
 */
export const storePreferredAuthors = (authors: string[]) => {
    try {
        localStorage.setItem(PREFERRED_AUTHORS_KEY, JSON.stringify(authors));
    } catch {
        // ignore localStorage write errors
    }
};

/**
 * Loads the preferred authors from localStorage.
 * @returns Array of author names
 */
export const loadPreferredAuthors = (): string[] => {
    try {
        const data = localStorage.getItem(PREFERRED_AUTHORS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

/**
 * Clears the stored preferred authors from localStorage.
 */
export const clearPreferredAuthors = () => {
    try {
        localStorage.removeItem(PREFERRED_AUTHORS_KEY);
    } catch {
        // ignore localStorage write errors
    }
};
