import { useEffect, useState } from "react";
import { mockData } from "../../data/example/pagination";

export const useInfiniteScroll = () => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const fetchMockData = (page = 1, limit = 10) =>
		new Promise((resolve) => {
			setTimeout(() => {
			
			const start = (page - 1) * limit;
			const end = start + limit;
			const data = mockData.slice(start, end);
			const hasMore = end < mockData.length;
		
			resolve({ data, hasMore });
		}, 500);
	});

	const loadMore = async () => {
		setLoading(true);
		const { data, hasMore } = await fetchMockData(page, 10);
		setItems((prev) => {
			return [...prev, ...data]});
		setPage((prev) => prev + 1);
		setHasMore(hasMore);
		setLoading(false);
	};

	useEffect(() => {
		loadMore(); // load first page
	}, []);

	return {
		items,
		hasMore,
		loading,
		loadMore
	}
}