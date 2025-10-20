import { storePreferredAuthors, loadPreferredAuthors, clearPreferredAuthors } from './service';

describe('authors service localStorage helpers', () => {
  const KEY = 'preferredAuthors';

  beforeEach(() => {
    // reset localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: (function () {
        let store: Record<string, string> = {};
        return {
          getItem: (k: string) => (k in store ? store[k] : null),
          setItem: (k: string, v: string) => {
            store[k] = v;
          },
          removeItem: (k: string) => {
            delete store[k];
          },
          // helper for tests
          __store: store,
        } as unknown as Storage;
      })(),
      configurable: true,
    });
  });

  test('storePreferredAuthors saves JSON under key', () => {
    storePreferredAuthors(['Alice', 'Bob']);
    const raw = window.localStorage.getItem(KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual(['Alice', 'Bob']);
  });

  test('loadPreferredAuthors returns array when present', () => {
    window.localStorage.setItem(KEY, JSON.stringify(['X']));
    const result = loadPreferredAuthors();
    expect(result).toEqual(['X']);
  });

  test('loadPreferredAuthors returns empty array when missing', () => {
    window.localStorage.removeItem(KEY);
    const result = loadPreferredAuthors();
    expect(result).toEqual([]);
  });

  test('loadPreferredAuthors returns empty array when JSON parse fails', () => {
    window.localStorage.setItem(KEY, '{ not valid json');
    const result = loadPreferredAuthors();
    expect(result).toEqual([]);
  });

  test('clearPreferredAuthors removes key', () => {
    window.localStorage.setItem(KEY, JSON.stringify(['A']));
    clearPreferredAuthors();
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });

  test('storePreferredAuthors ignores localStorage.setItem errors', () => {
    // make setItem throw
    const orig = window.localStorage.setItem;
    (window.localStorage as any).setItem = () => {
      throw new Error('quota');
    };
    expect(() => storePreferredAuthors(['Z'])).not.toThrow();
    // restore
    (window.localStorage as any).setItem = orig;
  });

  test('loadPreferredAuthors ignores localStorage.getItem errors and returns []', () => {
    const orig = window.localStorage.getItem;
    (window.localStorage as any).getItem = () => {
      throw new Error('fail');
    };
    const r = loadPreferredAuthors();
    expect(r).toEqual([]);
    (window.localStorage as any).getItem = orig;
  });
});
