import { useEffect, useState } from 'react';

type FetchProps<T> = {
	error: string | null;
	data: T[];
	loading: boolean;
};

const useFetch = <T>(
	method: string = 'get',
	url: string = ''
): FetchProps<T> => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<T[]>([]);

	useEffect(() => {
		const callApi = async () => {
			setLoading(true);
			try {
				setLoading(true);
				const response = await fetch(url, { method });
				console.log(response);
				if (response.status === 404) {
					setError('Not found');
				}

				const jsonResponse = await response.json();
				setData(jsonResponse);
			} catch (e) {
				console.error('There was an error while fetching the API');
				setError((e as Error).message);
			} finally {
				setLoading(false);
			}
		};

		callApi();
	}, [url, method]);

	return { error, loading, data };
};

export default useFetch;
