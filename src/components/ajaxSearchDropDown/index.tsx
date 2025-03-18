import React, { useState, useEffect } from 'react';

interface DropdownProps {
  label: string; // Label for the dropdown
  fetchData: (query: string) => Promise<{ id: string | number; name: string }[]>; // Function to fetch data (AJAX call)
  onSelect: (selectedItem: { id: string | number; name: string }) => void; // Callback when an item is selected
  placeholder?: string; // Placeholder for the search input
  className?: string; // Additional custom classes
}

export const AjaxSearchDropdown: React.FC<DropdownProps> = ({
  label,
  fetchData,
  onSelect,
  placeholder = 'Search...',
  className = '',
}) => {
  const [query, setQuery] = useState(''); // Search query
  const [results, setResults] = useState<{ id: string | number; name: string }[]>([]); // Search results
  const [loading, setLoading] = useState(false); // Loading state
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility

  // Fetch data when the query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      fetchData(query)
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchData]);

  const handleSelect = (item: { id: string | number; name: string }) => {
    onSelect(item); // Trigger callback
    setQuery(item.name); // Set the input to the selected item's name
    setShowDropdown(false); // Close the dropdown
  };

  return (
    <div className={`relative w-full ${className}`}>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && (
        <>
        {showDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {loading ? (
                <div className="px-4 py-2 text-gray-500">Loading...</div>
            ) : results.length > 0 ? (
                results.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                    {item.name}
                </div>
                ))
            ) : (
                <div className="px-4 py-2 text-gray-500">No results found.</div>
            )}
            </div>
        )}
        </>
      )}
    </div>
  );
};
