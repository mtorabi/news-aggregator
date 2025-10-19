import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the hook used by NewsList so tests are deterministic
import * as hooks from '../hooks';
jest.mock('../hooks', () => ({
  useNewsQueries: jest.fn(),
}));

// Mock side bar components to keep test focused on list rendering
jest.mock('../side-bar/preferences-bar', () => ({ __esModule: true, default: () => null }));
jest.mock('../side-bar/filter-bar', () => ({ __esModule: true, default: () => null }));

// Mock NewsCard to render a simple element with the title (and description)
jest.mock('../news-card/news-card', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ item }: any) => React.createElement('div', { 'data-testid': `news-${item.id}` }, `${item.title}${item.description ? ` - ${item.description}` : ''}`),
  };
});

import NewsList from './news-list';

describe('NewsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders news list with items and shows count', () => {
    (hooks.useNewsQueries as jest.Mock).mockReturnValue({
      articles: [
        { id: '1', title: 'Sample News Title 1', description: 'Sample news description 1.' },
        { id: '2', title: 'Sample News Title 2', description: 'Sample news description 2.' },
      ],
      authors: [],
      isLoading: false,
      isError: false,
    });

    render(<NewsList />);

    expect(screen.getByText('2 articles found')).toBeInTheDocument();
    expect(screen.getByTestId('news-1')).toHaveTextContent('Sample News Title 1');
    expect(screen.getByTestId('news-2')).toHaveTextContent('Sample News Title 2');
  });

  test('shows loading state when isLoading is true', () => {
    (hooks.useNewsQueries as jest.Mock).mockReturnValue({
      articles: [],
      authors: [],
      isLoading: true,
      isError: false,
    });

    render(<NewsList />);
    expect(screen.getByText(/Loading news.../i)).toBeInTheDocument();
  });

  test('shows error state when isError is true', () => {
    (hooks.useNewsQueries as jest.Mock).mockReturnValue({
      articles: [],
      authors: [],
      isLoading: false,
      isError: true,
    });

    render(<NewsList />);
    expect(screen.getByText(/Error loading news./i)).toBeInTheDocument();
  });
});
