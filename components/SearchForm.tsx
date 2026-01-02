import React, { useState } from 'react';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && location.trim()) {
      onSearch({ query, location });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-t-4 border-brand-yellow">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">בדיקת מלאי בסניפים</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">איזה מוצר לחפש?</label>
          <input
            type="text"
            id="product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="לדוגמה: מקרר סמסונג, שואב אבק דייסון..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">באיזה סניף/עיר?</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="לדוגמה: אילת, חיפה, סניף בני ברק..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-bold text-white transition-all shadow-md flex items-center justify-center gap-2
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-blue hover:bg-blue-800 active:scale-95'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>בודק זמינות...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>חפש מוצרים</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;