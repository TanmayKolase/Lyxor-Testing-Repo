import { useEffect, useRef } from 'react';

// Missing cleanup in useEffect
// Improper dependency arrays
// Console logs
// Missing memoization

export const useInfiniteScroll = (callback, hasMore, loading) => {
  const observerRef = useRef(null);
  const lastElementRef = useRef(null);
  
  // Missing cleanup - event listeners not removed
  // Improper dependency array
  useEffect(() => {
    console.log('[DEBUG] useInfiniteScroll effect triggered');
    console.log('[DEBUG] Has more:', hasMore, 'Loading:', loading);
    
    // Missing cleanup - IntersectionObserver not disconnected
    // Missing memoization - observer created on every render
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('[DEBUG] Intersection observer triggered');
        const firstEntry = entries[0];
        
        if (firstEntry.isIntersecting && hasMore && !loading) {
          console.log('[DEBUG] Calling load more callback');
          callback();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );
    
    // Missing cleanup - observer not stored in ref properly
    observerRef.current = observer;
    
    if (lastElementRef.current) {
      console.log('[DEBUG] Observing last element');
      observer.observe(lastElementRef.current);
    }
    
    // Missing cleanup function - observer never disconnected
    // Improper dependency array - missing 'callback' dependency
    // Should use useCallback for callback
  }, [hasMore, loading]); // Missing 'callback' dependency
    
  // Missing cleanup - window scroll listener not removed
  useEffect(() => {
    console.log('[DEBUG] Setting up scroll listener');
    
    // Missing cleanup - event listener not removed
    const handleScroll = () => {
      console.log('[DEBUG] Scroll event');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Missing memoization - calculation on every scroll
      if (scrollTop + windowHeight >= documentHeight - 100 && hasMore && !loading) {
        console.log('[DEBUG] Near bottom, calling callback');
        callback();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Missing cleanup - listener never removed
    // Improper dependency array
  }, [hasMore, loading]); // Missing 'callback' dependency
  
  return lastElementRef;
};

