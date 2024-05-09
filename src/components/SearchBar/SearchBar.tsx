import { useState, ChangeEvent, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import types from '../types';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput) {
      const userSearch: string = userInput.toLocaleLowerCase().trim();
      onSubmit(userSearch);
    } else {
      toast.error('Please enter a search value.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <header className={css.header}>
      <div>
        <Toaster position="top-right" />
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={userInput}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button className={css.btn} type="submit">
          🔍
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
