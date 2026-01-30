import React, { useState, useEffect, useRef } from 'react';
import './ProductList.css';
import ProductItem from './ProductItem';
import Loading from './Loading';
import { useProducts } from '../hooks/useProducts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

// Missing memoization
// No list virtualization
// State updates causing re-renders
// Console logs
// No error handling

function ProductList() {
  console.log('[DEBUG] ProductList component rendered');
  
  const { products, loading, hasMore, error, loadMore } = useProducts();
  const [filter, setFilter] = useState(''); // State causing unnecessary re-renders
  const [sortBy, setSortBy] = useState('name'); // State causing unnecessary re-renders
  
  // Missing memoization - lastElementRef recreated
  const lastElementRef = useInfiniteScroll(loadMore, hasMore, loading);
  
  // Missing memoization - filteredProducts recalculated on every render
  // No list virtualization - renders all items in DOM
  const filteredProducts = products.filter(product => {
    console.log('[DEBUG] Filtering product:', product.name);
    if (!filter) return true;
    return product.name.toLowerCase().includes(filter.toLowerCase());
  });
  
  // Missing memoization - sortedProducts recalculated on every render
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    console.log('[DEBUG] Sorting products');
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });
  
  // Improper dependency array
  useEffect(() => {
    console.log('[DEBUG] ProductList effect - filter or sort changed');
    console.log('[DEBUG] Filter:', filter, 'Sort:', sortBy);
    // Missing cleanup
  }, [filter, sortBy]); // Missing 'products' dependency if needed
  
  // Missing memoization - handlers recreated on every render
  const handleFilterChange = (e) => {
    console.log('[DEBUG] Filter changed:', e.target.value);
    setFilter(e.target.value); // Causes re-render of entire list
  };
  
  const handleSortChange = (e) => {
    console.log('[DEBUG] Sort changed:', e.target.value);
    setSortBy(e.target.value); // Causes re-render of entire list
  };
  
  // No error handling UI
  if (error) {
    console.error('[ERROR] Product list error:', error);
    // No error UI shown
  }
  
  return (
    <div className="product-list-container">
      <div className="product-list-controls">
        <input
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <select value={sortBy} onChange={handleSortChange} className="sort-select">
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>
      
      {/* No list virtualization - renders all items */}
      {/* Performance issue - hundreds of DOM nodes */}
      <div className="product-list">
        {sortedProducts.map((product, index) => {
          // Missing memoization - ProductItem re-renders unnecessarily
          const isLastElement = index === sortedProducts.length - 1;
          
          return (
            <div
              key={product.id}
              ref={isLastElement ? lastElementRef : null}
            >
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
      
      {/* No proper loading or skeleton UI */}
      {loading && <Loading />}
      
      {!hasMore && sortedProducts.length > 0 && (
        <div className="end-message">No more products to load</div>
      )}
    </div>
  );
}

export default ProductList;

