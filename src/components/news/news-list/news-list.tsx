
import React from 'react';
import NewsCard, { NewsItem } from '../news-card/news-card';

type Props = {
	items: NewsItem[];
};

const NewsList: React.FC<Props> = ({ items }) => {
	if (!items || items.length === 0) return <div>No news available.</div>;

	return (
		<section className="news-list grid gap-4">
			{items.map((item) => (
				<NewsCard key={item.id} item={item} />
			))}
		</section>
	);
};

export default NewsList;
