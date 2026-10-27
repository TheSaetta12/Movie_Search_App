import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Evita ricerche vuote
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca un film (es. Batman, Inception...)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Cerca
        </button>
      </div>
    </form>
  );
}

export default SearchBar;