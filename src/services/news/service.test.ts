import { fetchNewsForSource } from './service';
import { fetcher } from '../../utils/fetcher';
import { Article, Source, Filters } from './model';

jest.mock('../../utils/fetcher');

describe('fetchNewsForSource', () => {
  const mockedFetcher = fetcher as jest.MockedFunction<typeof fetcher>;

  const makeSource = (overrides?: Partial<Source>): Source => ({
    name: 'test-source',
    displayName: 'Test Source',
    apiEndpoint: (filters: Filters) => `https://api.test/news?q=${filters.query || ''}`,
    apiResponseParser: (raw: any) => (raw && raw.articles) || [],
    canSupportFilters: () => true,
    ...overrides,
  });

  const baseFilters: Filters = {
    sources: [],
    categories: [],
    dates: {},
    authors: [],
  };

  beforeEach(() => {
    mockedFetcher.mockReset();
  });

  it('calls fetcher with the source apiEndpoint and returns parsed articles', async () => {
    const source = makeSource();
    const fakeRaw = { articles: [{ id: '1', title: 'A' }] };
    mockedFetcher.mockResolvedValueOnce(fakeRaw as any);

    const result = await fetchNewsForSource(source, { ...baseFilters, query: 'hello' });

    expect(mockedFetcher).toHaveBeenCalledTimes(1);
    expect(mockedFetcher).toHaveBeenCalledWith(source.apiEndpoint({ ...baseFilters, query: 'hello' }));
    expect(result).toEqual([{ id: '1', title: 'A' }]);
  });

  it('returns empty array when parser returns falsy', async () => {
    const source = makeSource({ apiResponseParser: (() => null) as any });
    mockedFetcher.mockResolvedValueOnce({});

    const result = await fetchNewsForSource(source, baseFilters);

    expect(result).toEqual([]);
  });

  it('propagates fetcher errors', async () => {
    const source = makeSource();
    const err = new Error('network');
    mockedFetcher.mockRejectedValueOnce(err);

    await expect(fetchNewsForSource(source, baseFilters)).rejects.toThrow('network');
  });
});
