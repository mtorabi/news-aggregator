import React, { useEffect, useState } from 'react';

type Props = {
  show: boolean;
  onClose: () => void;
};

const SideBar: React.FC<Props> = ({ show, onClose }) => {
  const [visible, setVisible] = useState(show);

  type CheckboxOption = { id: string; label: string; checked: boolean };
  type Group = { id: string; title: string; options: CheckboxOption[] };

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 'group-1',
      title: 'Sources',
      options: [
        { id: 'g1-o1', label: 'BBC News', checked: false },
        { id: 'g1-o2', label: 'CNN', checked: false },
        { id: 'g1-o3', label: 'Reuters', checked: false },
      ],
    },
    {
      id: 'group-2',
      title: 'Categories',
      options: [
        { id: 'g2-o1', label: 'Technology', checked: false },
        { id: 'g2-o2', label: 'Business', checked: false },
        { id: 'g2-o3', label: 'Sports', checked: false },
      ],
    },
  ]);

  const toggleOption = (groupId: string, optionId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id !== groupId
          ? g
          : {
              ...g,
              options: g.options.map((o) => (o.id === optionId ? { ...o, checked: !o.checked } : o)),
            }
      )
    );
  };

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
        aria-label="Close settings backdrop"
      />

      {/* Aside: slide in from right */}
      <aside
        className={`absolute inset-y-0 right-0 w-80 bg-white border-l shadow-lg z-50 p-4 transform ${show ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 linear`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            aria-label="Close settings"
            type="button"
            className="p-2 rounded border hover:bg-gray-100"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-3">Choose filters to narrow the news feed.</p>

          {/* Checkbox groups */}
          <div className="space-y-4">
            {groups.map((group) => (
              <fieldset key={group.id} className="border rounded p-3">
                <legend className="text-sm font-medium">{group.title}</legend>
                <div className="mt-2 space-y-2">
                  {group.options.map((opt) => (
                    <label key={opt.id} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={opt.checked}
                        onChange={() => toggleOption(group.id, opt.id)}
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
