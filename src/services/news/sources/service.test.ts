import { storePreferredSources, loadPreferredSources, clearPreferredSources } from './service';
import { AVAILABLE_NEWS_SOURCES } from '../available-news-sources';

describe('sources service', () => {
  const KEY = 'preferredSources';

  beforeEach(() => {
    if ((global as any).localStorage && typeof (global as any).localStorage.clear === 'function') {
      (global as any).localStorage.clear();
    }
    jest.restoreAllMocks();
  });

  it('stores preferred source names in localStorage', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    const toStore = [AVAILABLE_NEWS_SOURCES[0]];
    storePreferredSources(toStore);
    expect(spy).toHaveBeenCalledWith(KEY, JSON.stringify(toStore.map(s => s.name)));
  });

  it('loads all available sources when nothing stored', () => {
    localStorage.removeItem(KEY);
    const loaded = loadPreferredSources();
    expect(loaded).toEqual(AVAILABLE_NEWS_SOURCES);
  });

  it('loads only stored preferred sources', () => {
    const names = [AVAILABLE_NEWS_SOURCES[1].name];
    localStorage.setItem(KEY, JSON.stringify(names));
    const loaded = loadPreferredSources();
    expect(loaded.map(s => s.name)).toEqual(names);
  });

  it('clears preferred sources from localStorage', () => {
    localStorage.setItem(KEY, JSON.stringify(['x']));
    const spy = jest.spyOn(Storage.prototype, 'removeItem');
    clearPreferredSources();
    expect(spy).toHaveBeenCalledWith(KEY);
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('storePreferredSources should not throw on setItem error', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('fail'); });
    expect(() => storePreferredSources([AVAILABLE_NEWS_SOURCES[0]])).not.toThrow();
  });

  it('loadPreferredSources should return empty array on error', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('fail'); });
    const loaded = loadPreferredSources();
    expect(loaded).toEqual([]);
  });

  it('clearPreferredSources should not throw on removeItem error', () => {
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('fail'); });
    expect(() => clearPreferredSources()).not.toThrow();
  });
});
