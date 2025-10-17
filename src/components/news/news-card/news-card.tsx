
import React from 'react';

export type NewsItem = {
	id: string;
	title: string;
	description?: string;
	image?: string;
	category?: string;
	source?: string;
	author?: string;
	publishedAt?: string;
};

type Props = {
	item: NewsItem;
};

const NewsCard: React.FC<Props> = ({ item }) => {
	const formatDate = (iso?: string) => {
		if (!iso) return undefined;
		try {
			const d = new Date(iso);
			if (Number.isNaN(d.getTime())) return iso;
			return d.toLocaleDateString();
		} catch (e) {
			return iso;
		}
	};

	const published = formatDate(item.publishedAt);
	return (
		<article className="news-card border rounded p-3 shadow-sm">
			{item.image && (
				<div className="w-full aspect-square overflow-hidden rounded mb-3 relative flex items-center justify-center bg-gray-100">
					<img src={item.image} alt={item.title} className="w-full h-full object-cover" />
					{item.category && (
						<span className="absolute left-2 top-2 bg-blue-600 bg-opacity-90 text-white text-xs px-2 py-1 rounded">{item.category}</span>
					)}
					{published && (
						<span className="absolute right-2 top-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">{published}</span>
					)}
				</div>
			)}

			<h3 className="text-lg font-semibold">{item.title}</h3>
			{/* meta row: source, author, date and category badge */}
			<div className="flex items-center justify-between">
				<div className="text-xs text-gray-500">
					{item.source && <span className="mr-1">{item.source}</span>}
					{item.author && <span className="mx-1">{item.author}</span>}
					{/* if there's no image, show the date in the meta row */}
					{!item.image && published && <span className="mx-1">{published}</span>}
				</div>
				{/* if there's no image, show the category badge */}
				{!item.image && item.category && (
					<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{item.category}</span>
				)}
			</div>

			{item.description && <p className="text-sm mt-1">{item.description}</p>}
		</article>
	);
};

export default NewsCard;
