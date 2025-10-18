
import './App.css';
import NewsList from '../news/news-list/news-list';

function App() {
  return (
    <main className="app container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Aggregator</h1>
      <NewsList/>
    </main>
  );
}

export default App;
