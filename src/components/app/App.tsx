
import './App.css';
import React from 'react';
import NewsList from '../news/news-list/news-list';

const sampleNews = [
  { id: '1', title: 'Local elections coming up', description: 'Candidates prepare for debates.', image: 'https://picsum.photos/seed/1/600/400', category: 'Politics', source: 'City Herald', author: 'Jane Doe', publishedAt: '2025-10-15T09:30:00Z' },
  { id: '2', title: 'Tech conference announced', description: 'New tools and libraries will be showcased.', image: 'https://picsum.photos/seed/2/600/400', category: 'Technology', source: 'Dev Weekly', author: 'Alex Smith', publishedAt: '2025-10-14T12:00:00Z' },
  { id: '3', title: 'Weather advisory', description: 'Expect heavy rain over the weekend.', image: 'https://picsum.photos/seed/3/600/400', category: 'Weather', source: 'National Weather Service', author: 'NWS', publishedAt: '2025-10-16T06:00:00Z' },
  { id: '4', title: 'Sports finals this Sunday', description: 'Top teams compete for the championship.', image: 'https://picsum.photos/seed/4/600/400', category: 'Sports', source: 'Sportsbeat', author: 'Carlos M.', publishedAt: '2025-10-13T18:45:00Z' },
  { id: '5', title: 'New cafe opens downtown', description: 'Locals excited for new coffee spot.', image: 'https://picsum.photos/seed/5/600/400', category: 'Lifestyle', source: 'Local Eats', author: 'Maya L.', publishedAt: '2025-10-12T08:15:00Z' },
  { id: '6', title: 'City council approves park plan', description: 'Renovations expected to start next spring.', image: 'https://picsum.photos/seed/6/600/400', category: 'Local', source: 'City Times', author: 'R. Thompson', publishedAt: '2025-10-11T14:00:00Z' },
  { id: '7', title: 'Art exhibit features local artists', description: 'Gallery showcases contemporary works.', image: 'https://picsum.photos/seed/7/600/400', category: 'Culture', source: 'Gallery Guide', author: 'Lena P.', publishedAt: '2025-10-10T16:20:00Z' },
  { id: '8', title: 'Startup receives funding', description: 'Seed round will support product development.', image: 'https://picsum.photos/seed/8/600/400', category: 'Business', source: 'Startup News', author: 'D. Kumar', publishedAt: '2025-10-09T11:05:00Z' },
  { id: '9', title: 'Public transit schedule updated', description: 'Buses will run more frequently on weekdays.', image: 'https://picsum.photos/seed/9/600/400', category: 'Transport', source: 'Transit Board', author: 'S. Lee', publishedAt: '2025-10-08T07:30:00Z' },
  { id: '10', title: 'Health clinic offers free screenings', description: 'Community urged to take advantage of services.', image: 'https://picsum.photos/seed/10/600/400', category: 'Health', source: 'Healthline', author: 'Dr. Patel', publishedAt: '2025-10-07T09:00:00Z' },
  { id: '11', title: 'Library extends weekend hours', description: 'More time for study and community events.', image: 'https://picsum.photos/seed/11/600/400', category: 'Education', source: 'Library Journal', author: 'K. Rivera', publishedAt: '2025-10-06T10:00:00Z' },
  { id: '12', title: 'High school wins science fair', description: 'Students recognized for innovative projects.', image: 'https://picsum.photos/seed/12/600/400', category: 'Education', source: 'School News', author: 'T. Nguyen', publishedAt: '2025-10-05T13:30:00Z' },
  { id: '13', title: 'Farmers market returns', description: 'Fresh produce and local crafts available.', image: 'https://picsum.photos/seed/13/600/400', category: 'Community', source: 'Market Gazette', author: 'Olivia R.', publishedAt: '2025-10-04T08:00:00Z' },
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
