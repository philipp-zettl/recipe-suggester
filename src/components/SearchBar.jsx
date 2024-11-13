import React from 'react';
import { Search } from 'lucide-react';


export function SearchBar({ value, onChange, onSubmit, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter your available ingredients..."
          className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}