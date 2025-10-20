import React, { useEffect, useState } from 'react';
import { AVAILABLE_CATEGORIES, Source } from '../../../services/news/model';
import { AVAILABLE_NEWS_SOURCES } from '../../../services/news/available-news-sources';
import { loadPreferredSources } from '../../../services/news/sources/service';
import { loadPreferredCategories } from '../../../services/news/category/service';

type Props = {
  show: boolean;
  onClose: () => void;
  onApply?: (filters: { categories: string[]; sources?: Source[]; from?: string | null; to?: string | null }) => void;
};

const FilterBar: React.FC<Props> = ({ show, onClose, onApply }) => {
  const [visible, setVisible] = useState(show);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<Source[]>(() => {
    return loadPreferredSources();
  });
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  const allSources = loadPreferredSources();
  const allCategories = loadPreferredCategories();

  useEffect(() => {
    if (show) setVisible(true);
    else {
      // delay unmount to allow exit animation
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  return (
    // Backdrop + aside
    <div className="fixed inset-0 z-40">
      {/* Backdrop: fade in/out */}
      <button
        className={`absolute inset-0 w-full h-full bg-black ${show ? 'bg-opacity-30' : 'bg-opacity-0'} transition-opacity duration-500 linear`}
        onClick={onClose}
        aria-label="Close filters backdrop"
      />

      {/* Aside: slide in from right */}
      <aside
        id="filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className={`absolute inset-y-0 right-0 w-80 bg-white border-l shadow-lg z-50 p-4 transform ${show ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 linear`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="filter-title" className="text-lg font-semibold">Filters</h2>
          <button
            aria-label="Close settings"
            type="button"
            className="p-2 rounded border hover:bg-gray-100"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {/* Source filter */}
        <div className="mb-4">
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            id="source"
            multiple
            value={selectedSources.map(s => s.name)}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions).map((o) => o.value);
              setSelectedSources(allSources.filter(s => options.includes(s.name)));
            }}
            className="w-full border rounded p-2"
          >
            {allSources.map((s) => (
              <option key={s.name} value={s.name}>
                {s.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </label>
          <select
            id="category"
            multiple
            value={selectedCategories}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions).map((o) => o.value);
              setSelectedCategories(options);
            }}
            className="w-full border rounded p-2 h-40 overflow-auto"
          >
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Date range filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date range</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="fromDate" className="block text-xs text-gray-600">From</label>
              <input
                id="fromDate"
                type="date"
                value={fromDate ?? ''}
                onChange={(e) => setFromDate(e.target.value ? e.target.value : null)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="toDate" className="block text-xs text-gray-600">To</label>
              <input
                id="toDate"
                type="date"
                value={toDate ?? ''}
                onChange={(e) => setToDate(e.target.value ? e.target.value : null)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                // clear local selection and apply empty categories and reset source
                setSelectedCategories([]);
                setSelectedSources(AVAILABLE_NEWS_SOURCES);
                setFromDate(null);
                setToDate(null);
                if (onApply) onApply({ categories: [], sources: AVAILABLE_NEWS_SOURCES, from: null, to: null });
                // keep the drawer open so the user can continue adjusting if desired
              }}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 mr-2"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => {
                if (onApply) onApply({ categories: selectedCategories, sources: selectedSources, from: fromDate, to: toDate });
                onClose();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Filter
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FilterBar;
