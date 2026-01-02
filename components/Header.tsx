import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-red text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-yellow p-2 rounded-full text-brand-red shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">סוכן מלאי - מחסני חשמל</h1>
            <p className="text-xs text-red-100 opacity-90">איתור מוצרים וזמינות בסניפים</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;