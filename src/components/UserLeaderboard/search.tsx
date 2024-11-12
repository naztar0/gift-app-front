import { useState, useCallback, useRef } from 'react';
import { Trans } from 'react-i18next';
import SearchIcon from '@/assets/icons/search.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';
import './search.css';


const INPUT_THROTTLE = 500;

export const Search = ({ setSearch }: { setSearch: (value: string) => void }) => {
  const [displaySearch, setDisplaySearch] = useState<string>('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [lastSearch, setLastSearch] = useState<number>(0);
  const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout | 0>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearch = useCallback((value: string) => {
    const now = Date.now();
    clearTimeout(lastTimeout);
    if (now - lastSearch < INPUT_THROTTLE) {
      setLastTimeout(setTimeout(() => setSearch(value), INPUT_THROTTLE - (now - lastSearch)));
    } else {
      setSearch(value);
    }
    setDisplaySearch(value);
    setLastSearch(now);
  }, [lastSearch, lastTimeout, setSearch]);

  return (
    <div
      className="leaderboard-search"
      onClick={() => {
        inputRef.current?.focus();
        setShowPlaceholder(false);
      }}
    >
      <div className="container">
        <input
          ref={inputRef}
          onBlur={() => {
            if (!displaySearch) {
              setShowPlaceholder(true)
            }
          }}
          type="text"
          value={displaySearch}
          onChange={(e) => updateSearch(e.target.value)}
        />
        <div className={`placeholder ${!showPlaceholder ? 'hide' : ''}`}>
          <SearchIcon />
          <span><Trans i18nKey="leaderboard.search" /></span>
        </div>
        <button
          className={`clear ${!displaySearch ? 'hide' : ''}`}
          onClick={() => {
            updateSearch('');
            setShowPlaceholder(true);
          }}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
