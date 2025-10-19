import React, { useEffect, useState } from 'react';
import { AVAILABLE_CATEGORIES, Source } from '../../../services/news/model';
import { AVAILABLE_NEWS_SOURCES } from '../../../services/news/available-news-sources';
import { clearPreferredAuthors, loadPreferredAuthors, storePreferredAuthors } from '../../../services/news/authors/service';
import { clearPreferredSources, loadPreferredSources, storePreferredSources } from '../../../services/news/sources/service';
import { clearPreferredCategories, loadPreferredCategories, storePreferredCategories } from '../../../services/news/category/service';

type Props = {
  show: boolean;
  onClose: () => void;
  allAuthors?: string[];
};

const PreferencesBar: React.FC<Props> = ({ show, onClose, allAuthors }) => {
  const [visible, setVisible] = useState(show);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    return loadPreferredCategories();
  });
  const [selectedSources, setSelectedSources] = useState<Source[]>(() => {
    return loadPreferredSources();
  });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(() => {
    return loadPreferredAuthors();
  });

  useEffect(() => {
    if (show) setVisible(true);
    else {
      // delay unmount to allow exit animation
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [show]);

  const handleClear = () => {
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setSelectedSources(AVAILABLE_NEWS_SOURCES);
    clearPreferredAuthors();
    clearPreferredSources();
    clearPreferredCategories();
  };

  const handleDone = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    // Backdrop + aside
    <div className="fixed inset-0 z-40">
      {/* Backdrop: fade in/out */}
      <button
        className={`absolute inset-0 w-full h-full bg-black ${show ? 'bg-opacity-30' : 'bg-opacity-0'} transition-opacity duration-500 linear`}
        onClick={onClose}
        aria-label="Close settings backdrop"
      />

      {/* Aside: slide in from right */}
      <aside
        className={`absolute inset-y-0 right-0 w-80 bg-white border-l shadow-lg z-50 p-4 transform ${show ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 linear`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Preferences</h2>
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
              const sources = AVAILABLE_NEWS_SOURCES.filter(s => options.includes(s.name));
              setSelectedSources(sources);
              storePreferredSources(sources);
            }}
            className="w-full border rounded p-2"
          >
            {AVAILABLE_NEWS_SOURCES.map((s) => (
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
              storePreferredCategories(options);
            }}
            className="w-full border rounded p-2 h-40 overflow-auto"
          >
            {AVAILABLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Author filter */}
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Authors
          </label>
          <select
            id="author"
            multiple
            value={selectedAuthors}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions).map((o) => o.value);
              setSelectedAuthors(options);
              storePreferredAuthors(options);
            }}
            className="w-full border rounded p-2 h-40 overflow-auto"
          >
            {(allAuthors || []).map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Actions: Clear and Done */}
        <div className="flex items-center justify-end space-x-2 mt-2">
          <button
            type="button"
            className="px-3 py-2 rounded border hover:bg-gray-100"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </aside>
    </div>
  );
};

export default PreferencesBar;
