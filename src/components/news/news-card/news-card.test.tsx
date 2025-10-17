import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from './news-card';

test('renders news card with title and description', () => {
  const sampleItem = {
    id: '1',
    title: 'Sample News Title',
    description: 'Sample news description.',
  };

  render(<NewsCard item={sampleItem} />);

  expect(screen.getByText(sampleItem.title)).toBeInTheDocument();
  expect(screen.getByText(sampleItem.description)).toBeInTheDocument();
});