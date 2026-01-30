import { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

// Missing memoization
// Improper dependency arrays
// No error handling
// Console logs
// State updates causing re-renders

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  
  // Missing memoization - function recreated on every render
  // Improper dependency array - missing dependencies
  useEffect(() => {
    console.log('[DEBUG] useProducts effect triggered');
    console.log('[DEBUG] Current page:', page);
    console.log('[DEBUG] Products count:', products.length);
    
    // No error handling
    const loadProducts = async () => {
      setLoading(true);
      
      try {
        // No error handling for API failures
        const data = await fetchProducts(page, 20);
        
        console.log('[DEBUG] Products loaded:', data.items.length);
        
        // State update causing unnecessary re-renders
        // Missing memoization - new array created every time
        setProducts(prevProducts => {
          console.log('[DEBUG] Updating products state');
          return [...prevProducts, ...data.items];
        });
        
        setHasMore(data.hasMore);
      } catch (err) {
        // No error handling - error state set but not used
        console.error('[ERROR] Failed to fetch products:', err);
        setError(err);
        // No error UI shown to user
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
    
    // Improper dependency array - missing 'products' dependency
    // Should include all dependencies or use useCallback
  }, [page]); // Missing dependencies
  
  // Missing memoization - function recreated on every render
  const loadMore = () => {
    console.log('[DEBUG] Load more called');
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };
  
  // Missing memoization - object recreated on every render
  return {
    products,
    loading,
    hasMore,
    error,
    loadMore
  };
};

