// DebouncedSearchCustom.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from '../../utils/debounce';
import { Input } from '../../atoms/Input';

const SUGGESTIONS = [
  'cat', 'car', 'card', 'cart', 'care',
  'camera', 'cake', 'candle', 'call', 'cab', 'cap', 'cape',
];

const fetchSuggestions = (query: string, maxSuggestions: number) =>
  new Promise<string[]>((resolve) => {
    const delay = Math.random() * 800 + 300;
    setTimeout(() => {
      const result = SUGGESTIONS.filter((word) =>
        word.startsWith(query.toLowerCase())
      ).slice(0, maxSuggestions);
      resolve(result);
    }, delay);
  });

export const Search = ({ maxSuggestions = 5}: any) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const requestIdRef = useRef(0);

  const debouncedFetch = useRef(
    debounce(async (input: string, currentId: number) => {
      setLoading(true);
      const result = await fetchSuggestions(input, maxSuggestions);
      if (currentId === requestIdRef.current) {
        setSuggestions(result);
      }
      setLoading(false);
    }, 300)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length < 1) {
      setSuggestions([]);
      return;
    }

    const currentId = ++requestIdRef.current;
    debouncedFetch(input, currentId);
  };

  const handleSelect = (word: string) => {
    setQuery(word);
    setSuggestions([]);
  };

  return (
    <section style={{ width: 300, margin: '40px auto', position: 'relative' }}>
	  <Input name="search-suggestion" handleOnChange={handleChange} label="Search" />
      {loading && <p style={{ fontSize: '12px' }}>Searching...</p>}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            zIndex: 10,
          }}
        >
          {suggestions.map((word) => (
            <li
              key={word}
              onClick={() => handleSelect(word)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {word}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
