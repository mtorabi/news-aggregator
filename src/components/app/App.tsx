
import './App.css';
import React from 'react';
import NewsList from '../news/news-list/news-list';

const sampleNews = [
  { id: '1', title: 'Local elections coming up', description: 'Candidates prepare for debates.', image: 'https://picsum.photos/seed/1/600/400' },
  { id: '2', title: 'Tech conference announced', description: 'New tools and libraries will be showcased.', image: 'https://picsum.photos/seed/2/600/400' },
  { id: '3', title: 'Weather advisory', description: 'Expect heavy rain over the weekend.', image: 'https://picsum.photos/seed/3/600/400' },
  { id: '4', title: 'Sports finals this Sunday', description: 'Top teams compete for the championship.', image: 'https://picsum.photos/seed/4/600/400' },
  { id: '5', title: 'New cafe opens downtown', description: 'Locals excited for new coffee spot.', image: 'https://picsum.photos/seed/5/600/400' },
  { id: '6', title: 'City council approves park plan', description: 'Renovations expected to start next spring.', image: 'https://picsum.photos/seed/6/600/400' },
  { id: '7', title: 'Art exhibit features local artists', description: 'Gallery showcases contemporary works.', image: 'https://picsum.photos/seed/7/600/400' },
  { id: '8', title: 'Startup receives funding', description: 'Seed round will support product development.', image: 'https://picsum.photos/seed/8/600/400' },
  { id: '9', title: 'Public transit schedule updated', description: 'Buses will run more frequently on weekdays.', image: 'https://picsum.photos/seed/9/600/400' },
  { id: '10', title: 'Health clinic offers free screenings', description: 'Community urged to take advantage of services.', image: 'https://picsum.photos/seed/10/600/400' },
  { id: '11', title: 'Library extends weekend hours', description: 'More time for study and community events.', image: 'https://picsum.photos/seed/11/600/400' },
  { id: '12', title: 'High school wins science fair', description: 'Students recognized for innovative projects.', image: 'https://picsum.photos/seed/12/600/400' },
  { id: '13', title: 'Farmers market returns', description: 'Fresh produce and local crafts available.', image: 'https://picsum.photos/seed/13/600/400' },
];

function App() {
  return (
    <main className="app container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Aggregator</h1>
      <NewsList items={sampleNews} />
    </main>
  );
}

export default App;
