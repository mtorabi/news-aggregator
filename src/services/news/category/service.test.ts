import { storePreferredCategories, loadPreferredCategories, clearPreferredCategories } from './service';
import { AVAILABLE_CATEGORIES } from '../model';

describe('category service', () => {
  const KEY = 'preferredCategories';

  beforeEach(() => {
    // reset jsdom localStorage
    if ((global as any).localStorage && typeof (global as any).localStorage.clear === 'function') {
      (global as any).localStorage.clear();
    }
    jest.restoreAllMocks();
  });

  it('stores preferred categories in localStorage', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    storePreferredCategories(['sports', 'technology']);
    expect(spy).toHaveBeenCalledWith(KEY, JSON.stringify(['sports', 'technology']));
  });

  it('loads preferred categories when set', () => {
    const data = ['business', 'health'];
    localStorage.setItem(KEY, JSON.stringify(data));
    const loaded = loadPreferredCategories();
    expect(loaded).toEqual(data);
  });

  it('returns AVAILABLE_CATEGORIES when nothing stored', () => {
    // ensure key not present
    localStorage.removeItem(KEY);
    const loaded = loadPreferredCategories();
    expect(loaded).toEqual(AVAILABLE_CATEGORIES);
  });

  it('clears preferred categories from localStorage', () => {
    localStorage.setItem(KEY, JSON.stringify(['a']));
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    clearPreferredCategories();
    expect(spy).toHaveBeenCalledWith(KEY);
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('storePreferredCategories should swallow localStorage.setItem errors', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    expect(() => storePreferredCategories(['x'])).not.toThrow();
  });

  it('loadPreferredCategories should return empty array on parse/error', () => {
    // make getItem throw
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('fail'); });
    const loaded = loadPreferredCategories();
    expect(loaded).toEqual([]);
  });

  it('clearPreferredCategories should swallow localStorage.removeItem errors', () => {
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('nope'); });
    expect(() => clearPreferredCategories()).not.toThrow();
  });
});
