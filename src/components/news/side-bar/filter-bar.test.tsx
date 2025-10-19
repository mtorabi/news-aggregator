import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './filter-bar';
import { AVAILABLE_NEWS_SOURCES } from '../../../services/news/available-news-sources';
import { AVAILABLE_CATEGORIES } from '../../../services/news/model';

test('renders FilterBar when show is true', () => {
  render(<FilterBar show={true} onClose={() => {}} onApply={() => {}} />);

  expect(screen.getByText('Filters')).toBeInTheDocument();
  // source and category select inputs should be present
  expect(screen.getByLabelText('Source')).toBeInTheDocument();
  expect(screen.getByLabelText('Categories')).toBeInTheDocument();
});

test('selecting categories and sources and applying filter calls callbacks', async () => {
  // userEvent v13 exposes functions directly (no setup) in this project
  const onClose = jest.fn();
  const onApply = jest.fn();

  render(<FilterBar show={true} onClose={onClose} onApply={onApply} />);

  // choose a couple of categories
  const categorySelect = screen.getByLabelText('Categories') as HTMLSelectElement;
  // pick first two categories
  const firstCategory = AVAILABLE_CATEGORIES[0];
  const secondCategory = AVAILABLE_CATEGORIES[1];

  // Simulate changing selectedOptions by using userEvent.selectOptions
  await userEvent.selectOptions(categorySelect, [firstCategory, secondCategory]);
  expect(Array.from(categorySelect.selectedOptions).map(o => o.value)).toEqual([firstCategory, secondCategory]);
  // choose a source
  const sourceSelect = screen.getByLabelText('Source') as HTMLSelectElement;
  const sourceToSelect = AVAILABLE_NEWS_SOURCES[0].name;
  await userEvent.selectOptions(sourceSelect, [sourceToSelect]);
  expect(Array.from(sourceSelect.selectedOptions).map(o => o.value)).toContain(sourceToSelect);

  // set date inputs
  const fromInput = screen.getByLabelText('From') as HTMLInputElement;
  const toInput = screen.getByLabelText('To') as HTMLInputElement;
  await userEvent.type(fromInput, '2020-01-01');
  await userEvent.type(toInput, '2020-12-31');

  // Click Filter
  const filterButton = screen.getByRole('button', { name: /Filter/i });
  await userEvent.click(filterButton);

  // onApply should be called with selected values and onClose should be called
  expect(onApply).toHaveBeenCalledTimes(1);
  const applied = onApply.mock.calls[0][0];
  expect(applied.categories).toEqual([firstCategory, secondCategory]);
  expect(applied.sources.map((s: any) => s.name)).toEqual(expect.arrayContaining([sourceToSelect]));
  expect(applied.from).toBe('2020-01-01');
  expect(applied.to).toBe('2020-12-31');
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('clear button resets selections and calls onApply with defaults', async () => {
  // userEvent v13 exposes functions directly (no setup) in this project
  const onApply = jest.fn();

  render(<FilterBar show={true} onClose={() => {}} onApply={onApply} />);

  // Click Clear
  const clearButton = screen.getByRole('button', { name: /Clear/i });
  await userEvent.click(clearButton);

  // onApply called with empty categories and all available sources
  expect(onApply).toHaveBeenCalledTimes(1);
  const applied = onApply.mock.calls[0][0];
  expect(applied.categories).toEqual([]);
  expect(applied.sources.map((s: any) => s.name)).toEqual(AVAILABLE_NEWS_SOURCES.map(s => s.name));
  expect(applied.from).toBeNull();
  expect(applied.to).toBeNull();
});