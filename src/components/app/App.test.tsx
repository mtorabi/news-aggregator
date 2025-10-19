import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the NewsList to keep App tests focused and fast.
jest.mock('../news/news-list/news-list', () => {
  return () => <div data-testid="mock-news-list">Mocked NewsList</div>;
});

describe('App component', () => {
  const createClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });

  test('renders app heading', () => {
    const qc = createClient();
    render(
      <QueryClientProvider client={qc}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByRole('heading', { name: /news aggregator/i })).toBeInTheDocument();
  });

  test('renders NewsList (mocked)', () => {
    const qc = createClient();
    render(
      <QueryClientProvider client={qc}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('mock-news-list')).toHaveTextContent('Mocked NewsList');
  });
});
