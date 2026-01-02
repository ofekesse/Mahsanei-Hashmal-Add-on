import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsSection from './components/ResultsSection';
import { LoadingState, SearchParams, SearchResult } from './types';
import { searchProducts } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setSearchResult(null);

    try {
      const data = await searchProducts(params.query, params.location);
      setSearchResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err: any) {
      setLoadingState(LoadingState.ERROR);
      setError("החיפוש נכשל. אנא בדוק את חיבור האינטרנט שלך ונסה שוב.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            איתור מוצרים ומלאי <span className="text-brand-red">במחסני חשמל</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            הסוכן החכם שלנו יסרוק עבורך את אתר מחסני חשמל וימצא את המוצרים הזמינים בסניף הקרוב אליך.
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={loadingState === LoadingState.LOADING} />
        
        <ResultsSection 
            loadingState={loadingState} 
            data={searchResult} 
            error={error} 
        />
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} סוכן AI מחסני חשמל. אפליקציה זו היא הדגמה טכנולוגית ואינה קשורה רשמית לרשת מחסני חשמל.</p>
      </footer>
    </div>
  );
};

export default App;