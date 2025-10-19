import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PreferencesBar from './preferences-bar';
import { AVAILABLE_NEWS_SOURCES } from '../../../services/news/available-news-sources';
import { AVAILABLE_CATEGORIES } from '../../../services/news/model';

test('renders PreferencesBar when show is true and contains controls', () => {
  render(<PreferencesBar show={true} onClose={() => {}} allAuthors={[]} />);

  expect(screen.getByText('Preferences')).toBeInTheDocument();
  expect(screen.getByLabelText('Source')).toBeInTheDocument();
  expect(screen.getByLabelText('Categories')).toBeInTheDocument();
  expect(screen.getByLabelText('Authors')).toBeInTheDocument();
});

test('selecting sources, categories and authors updates selects and Clear resets them', async () => {
  const onClose = jest.fn();
  const authors = ['Alice', 'Bob', 'Charlie'];

  render(<PreferencesBar show={true} onClose={onClose} allAuthors={authors} />);

  const sourceSelect = screen.getByLabelText('Source') as HTMLSelectElement;
  const categorySelect = screen.getByLabelText('Categories') as HTMLSelectElement;
  const authorSelect = screen.getByLabelText('Authors') as HTMLSelectElement;

  // select first available source
  const sourceToSelect = AVAILABLE_NEWS_SOURCES[0].name;
  await userEvent.selectOptions(sourceSelect, [sourceToSelect]);
  // initial selection may include defaults; ensure our selection is present
  expect(Array.from(sourceSelect.selectedOptions).map(o => o.value)).toContain(sourceToSelect);

  // select two categories
  const firstCat = AVAILABLE_CATEGORIES[0];
  const secondCat = AVAILABLE_CATEGORIES[1];
  await userEvent.selectOptions(categorySelect, [firstCat, secondCat]);
  const selectedCats = Array.from(categorySelect.selectedOptions).map(o => o.value);
  expect(selectedCats).toEqual(expect.arrayContaining([firstCat, secondCat]));

  // select two authors
  await userEvent.selectOptions(authorSelect, [authors[0], authors[1]]);
  expect(Array.from(authorSelect.selectedOptions).map(o => o.value)).toEqual([authors[0], authors[1]]);

  // Click Clear and assert selects reset
  const clearButton = screen.getByRole('button', { name: /Clear/i });
  await userEvent.click(clearButton);

  // After clear: categories empty, authors empty, sources set to all available source names
  expect(Array.from(categorySelect.selectedOptions).map(o => o.value)).toEqual([]);
  expect(Array.from(authorSelect.selectedOptions).map(o => o.value)).toEqual([]);
  expect(Array.from(sourceSelect.selectedOptions).map(o => o.value)).toEqual(AVAILABLE_NEWS_SOURCES.map(s => s.name));
});

test('clicking Done calls onClose and clicking backdrop calls onClose', async () => {
  const onClose = jest.fn();

  render(<PreferencesBar show={true} onClose={onClose} allAuthors={[]} />);

  // Click Done button
  const doneButton = screen.getByRole('button', { name: /Done/i });
  await userEvent.click(doneButton);
  expect(onClose).toHaveBeenCalledTimes(1);

  // Re-render to test backdrop click (use rerender to avoid duplicated DOM nodes)
  const { rerender } = render(<PreferencesBar show={true} onClose={onClose} allAuthors={[]} />);
  rerender(<PreferencesBar show={true} onClose={onClose} allAuthors={[]} />);
  const backdrop = screen.getAllByLabelText('Close settings backdrop')[0];
  await userEvent.click(backdrop);
  // onClose called again
  expect(onClose).toHaveBeenCalledTimes(2);
});