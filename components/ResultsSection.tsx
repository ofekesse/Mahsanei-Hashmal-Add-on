import React from 'react';
import { LoadingState, SearchResult } from '../types';
import ProductCard from './ProductCard';

interface ResultsSectionProps {
  loadingState: LoadingState;
  data: SearchResult | null;
  error: string | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ loadingState, data, error }) => {
  if (loadingState === LoadingState.ERROR) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-xl text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="font-bold text-lg mb-2">אופס, אירעה שגיאה</p>
        <p>{error || "לא הצלחנו לבצע את החיפוש כרגע. אנא נסו שוב מאוחר יותר."}</p>
      </div>
    );
  }

  if (loadingState === LoadingState.SUCCESS && data) {
    if (data.products.length === 0) {
       return (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-8 rounded-xl text-center">
             <p className="font-bold text-lg">לא נמצאו מוצרים</p>
             <p>נסה לשנות את מונחי החיפוש או את המיקום.</p>
        </div>
       )
    }

    return (
      <div className="animate-fade-in">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-brand-blue mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                תובנות הסוכן
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
            <p>* המלאי בפועל עשוי להשתנות. יש לוודא זמינות סופית באתר מחסני חשמל או טלפונית מול הסניף.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultsSection;