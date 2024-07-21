import { renderHook, waitFor } from '@testing-library/react-native';
import useFetch from '@/hooks/useFetch';

global.fetch = jest.fn();

describe('useFetch hook', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return loading initially', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			json: async () => [],
			status: 200
		});

		const { result } = renderHook(() => useFetch('get', 'https://example.com'));

		expect(result.current.loading).toBeTruthy();
		expect(result.current.error).toBeNull();
		expect(result.current.data).toEqual([]);

		await waitFor(() => {
			expect(result.current.loading).toBeFalsy();
		});
	});

	it('should return data on successful fetch', async () => {
		const mockData = [{ id: 1, name: 'Item 1' }];

		(fetch as jest.Mock).mockResolvedValueOnce({
			json: async () => mockData,
			status: 200
		});

		const { result } = renderHook(() =>
			useFetch<{ id: number; name: string }>('get', 'https://example.com')
		);

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBeNull();
			expect(result.current.data).toEqual(mockData);
		});
	});

	it('should return an error on failed fetch', async () => {
		const errorMessage = 'Failed to fetch';

		(fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

		const { result } = renderHook(() => useFetch('get', 'https://example.com'));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe(errorMessage);
			expect(result.current.data).toEqual([]);
		});
	});

	it('should return a "Not found" error for 404 status', async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			json: async () => [],
			status: 404
		});

		const { result } = renderHook(() => useFetch('get', 'https://example.com'));

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe('Not found');
			expect(result.current.data).toEqual([]);
		});
	});
});
