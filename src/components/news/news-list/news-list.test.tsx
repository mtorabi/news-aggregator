import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsList from './news-list';

test('renders news list with items', () => {
  const sampleItems = [
    { id: '1', title: 'Sample News Title 1', description: 'Sample news description 1.' },
    { id: '2', title: 'Sample News Title 2', description: 'Sample news description 2.' },
  ];

  render(<NewsList />);

  sampleItems.forEach(item => {
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
  });
});
