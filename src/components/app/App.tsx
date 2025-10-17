
import './App.css';
import React from 'react';
import NewsList from '../news/news-list/news-list';

const sampleNews = [
  { id: '1', title: 'Local elections coming up', description: 'Candidates prepare for debates.' },
  { id: '2', title: 'Tech conference announced', description: 'New tools and libraries will be showcased.' },
  { id: '3', title: 'Weather advisory', description: 'Expect heavy rain over the weekend.' },
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
