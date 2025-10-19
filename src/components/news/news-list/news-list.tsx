import React, { useMemo, useState, useEffect } from 'react';
import NewsCard, { NewsItem } from '../news-card/news-card';
import PreferencesBar from '../side-bar/preferences-bar';
import { useNewsQueries } from '../hooks';
import { Filters } from '../../../services/news/model';
import FilterBar from '../side-bar/filter-bar';
import { AVAILABLE_NEWS_SOURCES } from '../../../services/news/available-news-sources';

/**
 * NewsList component displays a list of news articles.
 * It includes a search input and a sidebar for filtering options.
 */
const NewsList: React.FC = () => {
	const SEARCH_DEBOUNCE_MS = 500;

	//preferences drawer state
	const [showPreferences, setShowPreferences] = useState(false);

	//filter drawer state
	const [showFilter, setShowFilter] = useState(false);

	//search state
	const [query, setQuery] = useState('');
	// Local debounced value to delay applying filters until user stops typing
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	// API filters state
	const [filters, setFilters] = useState<Filters>(() => ({
		sources: AVAILABLE_NEWS_SOURCES,
		categories: [],
		dates: {},
		query: undefined,
		authors: [],
	}));

	// Use hook to fetch articles according to current filters (server-side filtering)
	const { articles, isLoading, isError } = useNewsQueries(filters);
	const results = (articles as NewsItem[]) || [];

	// Apply debounce: when debouncedQuery changes, wait 500ms of inactivity then update filters
	useEffect(() => {
		const handler = setTimeout(() => {
			const trimmed = debouncedQuery.trim();
			if (trimmed.length >= 3) {
				setFilters((prev) => ({ ...prev, query: trimmed }));
			} else {
				setFilters((prev) => ({ ...prev, query: undefined }));
			}
		}, SEARCH_DEBOUNCE_MS);

		return () => clearTimeout(handler);
	}, [debouncedQuery]);

	return (
		<section className="news-list">
			<div className="flex items-center gap-3 mb-4 flex-nowrap">
				<label htmlFor="news-search" className="sr-only">Search news</label>
				<input
					id="news-search"
					type="search"
					value={query}
					onChange={(e) => {
						const v = e.target.value;
						setQuery(v);
						// update debouncedQuery; actual filters updated in effect after 500ms
						setDebouncedQuery(v);
					}}
					placeholder="Search news..."
					className="flex-1 min-w-0 border rounded px-3 py-2 focus:outline-none focus:ring"
				/>

				<div className="flex items-center space-x-2">
					<button
						type="button"
						aria-label="Settings"
						title="Settings"
						className="p-2 rounded border hover:bg-gray-100 flex items-center justify-center md:p-2 sm:p-1"
						onClick={() => setShowFilter(true)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
						</svg>


					</button>
					<button
						type="button"
						aria-label="Settings"
						title="Settings"
						className="p-2 rounded border hover:bg-gray-100 flex items-center justify-center md:p-2 sm:p-1"
						onClick={() => setShowPreferences(true)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
						</svg>

					</button>
				</div>


				{/* Preferences drawer */}
				<PreferencesBar show={showPreferences && !showFilter} onClose={() => setShowPreferences(false)} />

				{/* Filter drawer */}
				<FilterBar
					show={!showPreferences && showFilter}
					onClose={() => setShowFilter(false)}
					onApply={(f) => setFilters((prev) => ({
						...prev,
						categories: f.categories !== undefined ? f.categories : prev.categories,
						sources: f.sources !== undefined ? f.sources : prev.sources,
						dates: {
							from: f.from !== undefined ? f.from ?? undefined : prev.dates?.from,
							to: f.to !== undefined ? f.to ?? undefined : prev.dates?.to,
						},
					}))}
				/>
			</div>

			<div>{results.length} articles found</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{isLoading && <div>Loading news...</div>}
				{isError && <div>Error loading news.</div>}
				{!isLoading && !isError && results.map((item) => (
					<NewsCard key={item.id} item={item} />
				))}
			</div>
		</section>
	);
};

export default NewsList;
