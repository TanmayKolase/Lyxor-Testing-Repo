<template>
  <div class="product-list-container">
    <div class="list-header">
      <h2>Products</h2>
      <router-link to="/products/new" class="btn btn-primary">
        Add New Product
      </router-link>
    </div>

    <!-- No loading state -->
    <div v-if="products.length === 0" class="empty-state">
      <p>No products found. Create your first product!</p>
    </div>

    <!-- Poor component separation - everything in one component -->
    <!-- XSS risk via v-html -->
    <div v-else class="product-grid">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-actions">
            <router-link
              :to="`/products/${product.id}/edit`"
              class="btn-edit"
            >
              Edit
            </router-link>
            <button
              @click="handleDelete(product.id)"
              class="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
        
        <div class="product-price">
          ${{ product.price.toFixed(2) }}
        </div>
        
        <!-- XSS risk - using v-html with user input -->
        <div
          class="product-description"
          v-html="product.description"
        ></div>
        
        <div class="product-footer">
          <span class="product-id">ID: {{ product.id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productService from '../services/productService'

export default {
  name: 'ProductList',
  data() {
    return {
      products: []
    }
  },
  mounted() {
    console.log('[DEBUG] ProductList mounted')
    // No error handling
    this.loadProducts()
  },
  methods: {
    // No error handling
    // No loading state
    async loadProducts() {
      console.log('[DEBUG] Loading products')
      
      try {
        // No error handling
        // No loading state
        const data = await productService.getAllProducts()
        console.log('[DEBUG] Products loaded:', data)
        this.products = data.products || data || []
      } catch (error) {
        // No error handling - error silently fails
        console.error('[ERROR] Failed to load products:', error)
        // No error message shown to user
        this.products = []
      }
    },
    
    // No error handling
    // No confirmation dialog
    async handleDelete(id) {
      console.log('[DEBUG] Deleting product:', id)
      
      // No confirmation
      // No error handling
      try {
        await productService.deleteProduct(id)
        console.log('[DEBUG] Product deleted')
        // No success message
        this.loadProducts()
      } catch (error) {
        // No error handling
        console.error('[ERROR] Failed to delete product:', error)
        // No error message shown to user
      }
    }
  }
}
</script>

<style scoped>
.product-list-container {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.list-header h2 {
  color: #2c3e50;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.product-name {
  color: #2c3e50;
  font-size: 1.25rem;
  margin: 0;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-edit:hover {
  background-color: #2980b9;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 1rem;
}

.product-description {
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.6;
  /* XSS risk - content from v-html */
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.product-id {
  font-size: 0.875rem;
  color: #7f8c8d;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>

