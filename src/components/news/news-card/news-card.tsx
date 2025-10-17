
import React from 'react';

export type NewsItem = {
	id: string;
	title: string;
	description?: string;
};

type Props = {
	item: NewsItem;
};

const NewsCard: React.FC<Props> = ({ item }) => {
	return (
		<article className="news-card border rounded p-3 shadow-sm">
			<h3 className="text-lg font-semibold">{item.title}</h3>
			{item.description && <p className="text-sm mt-1">{item.description}</p>}
		</article>
	);
};

export default NewsCard;
