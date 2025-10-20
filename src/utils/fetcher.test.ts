import { fetcher } from './fetcher';

describe('fetcher', () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		// restore global.fetch
		// @ts-ignore
		global.fetch = originalFetch;
		jest.resetAllMocks();
	});

	it('returns parsed JSON on successful response', async () => {
		const payload = { ok: true, data: [1, 2, 3] };
		// @ts-ignore
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(payload),
		});

		const res = await fetcher('/test');
		expect(res).toEqual(payload);
		// @ts-ignore
		expect(global.fetch).toHaveBeenCalledWith('/test', { headers: {} });
	});

	it('throws Error with response text when response is not ok', async () => {
		// @ts-ignore
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			statusText: 'Bad Request',
			text: jest.fn().mockResolvedValue('something went wrong'),
		});

		await expect(fetcher('/bad')).rejects.toThrow('something went wrong');
	});

	it('throws Error with statusText when text is empty', async () => {
		// @ts-ignore
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			statusText: 'Not Found',
			text: jest.fn().mockResolvedValue(''),
		});

		await expect(fetcher('/not-found')).rejects.toThrow('Not Found');
	});

	it('propagates network errors (fetch reject)', async () => {
		// @ts-ignore
		global.fetch = jest.fn().mockRejectedValue(new Error('network failure'));

		await expect(fetcher('/net')).rejects.toThrow('network failure');
	});

	it('throws when response.json() rejects (invalid JSON)', async () => {
		// @ts-ignore
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: jest.fn().mockRejectedValue(new Error('invalid json')),
		});

		await expect(fetcher('/json')).rejects.toThrow('invalid json');
	});
});
