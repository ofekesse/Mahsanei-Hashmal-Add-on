import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isAvailable = product.availabilityHint && 
    (product.availabilityHint.includes('זמין') || 
     product.availabilityHint.includes('מלאי') || 
     product.availabilityHint.includes('איסוף'));

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div className="h-40 bg-gray-50 relative overflow-hidden flex items-center justify-center group-hover:bg-white transition-colors">
        <div className="text-gray-300 flex flex-col items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
        <div className="absolute top-2 right-2 bg-brand-yellow text-brand-blue text-xs font-bold px-2 py-1 rounded-full shadow-sm">
          מחסני חשמל
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] text-lg leading-tight">{product.name}</h3>
        
        {product.price && (
          <div className="text-2xl font-bold text-brand-red mb-2">
            {product.price}
          </div>
        )}
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-100">
            {product.availabilityHint && (
                <div className={`text-xs px-3 py-2 rounded-md mb-3 flex items-start gap-2 font-medium border
                    ${isAvailable 
                        ? 'bg-green-50 text-green-800 border-green-100' 
                        : 'bg-yellow-50 text-yellow-800 border-yellow-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        {isAvailable ? (
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        ) : (
                           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        )}
                    </svg>
                    <span>{product.availabilityHint}</span>
                </div>
            )}
            
            <a 
                href={product.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-brand-blue hover:bg-brand-red text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
            >
                מעבר למוצר באתר
            </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;