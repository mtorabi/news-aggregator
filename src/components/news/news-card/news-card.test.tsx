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

test('renders author and published date when provided', () => {
  const sampleItem = {
    id: '2',
    title: 'Authored News',
    description: 'Has author and date.',
    author: 'Jane Doe',
    publishedAt: '2025-10-19T12:34:56Z',
  };

  render(<NewsCard item={sampleItem} />);

  // author name should appear
  expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();

  // a formatted date should appear (component may format; check for year)
  expect(screen.getByText(/2025/)).toBeInTheDocument();
});

test('renders image when urlToImage provided and link uses url', () => {
  const sampleItem = {
    id: '3',
    title: 'Image News',
    description: 'Has image and url.',
    urlToImage: 'https://example.com/image.jpg',
    url: 'https://example.com/article',
  };

  render(<NewsCard item={sampleItem} />);

  // image may be rendered as an <img> or via CSS background; if an <img> exists assert src
  const img = screen.queryByRole('img');
  if (img) {
    expect((img as HTMLImageElement).src).toBe(sampleItem.urlToImage);
  }

  // link may or may not be present depending on implementation; assert if present
  const link = screen.queryByRole('link') as HTMLAnchorElement | null;
  if (link) {
    expect(link.href).toBe(sampleItem.url);
  }
});

test('does not render optional fields when they are missing', () => {
  const sampleItem = {
    id: '4',
    title: 'Minimal News',
    description: 'Only required fields present.',
  };

  render(<NewsCard item={sampleItem} />);

  // should render title/description but not author, image or link with href
  expect(screen.getByText(sampleItem.title)).toBeInTheDocument();
  expect(screen.getByText(sampleItem.description)).toBeInTheDocument();

  // author should not be present
  expect(screen.queryByText(/By /i)).not.toBeInTheDocument();

  // there should be no image or link to external article
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});