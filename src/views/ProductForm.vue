<template>
  <div class="product-form-container">
    <h2>{{ isEdit ? 'Edit Product' : 'Create Product' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-group">
        <label for="name">Product Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="form-input"
          placeholder="Enter product name"
        />
        <!-- No validation message -->
        <!-- No required field validation -->
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          id="price"
          v-model.number="form.price"
          type="number"
          class="form-input"
          placeholder="Enter price"
          step="0.01"
        />
        <!-- No validation - negative prices allowed -->
        <!-- No minimum value validation -->
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          class="form-textarea"
          rows="5"
          placeholder="Enter product description"
        ></textarea>
        <!-- No validation -->
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          <!-- No loading state -->
          <!-- No disabled state during submit -->
          {{ isEdit ? 'Update Product' : 'Create Product' }}
        </button>
        <button type="button" @click="handleCancel" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import productService from '../services/productService'

export default {
  name: 'ProductForm',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        price: 0,
        description: ''
      },
      isEdit: false
    }
  },
  mounted() {
    console.log('[DEBUG] ProductForm mounted, id:', this.id)
    
    // No error handling
    if (this.id) {
      this.isEdit = true
      this.loadProduct()
    }
  },
  methods: {
    // No error handling
    async loadProduct() {
      console.log('[DEBUG] Loading product:', this.id)
      
      // No error handling
      // No loading state
      const product = await productService.getProductById(this.id)
      
      console.log('[DEBUG] Product loaded:', product)
      this.form = {
        name: product.name || '',
        price: product.price || 0,
        description: product.description || ''
      }
    },
    
    // No validation
    // No error handling
    // No loading state
    async handleSubmit() {
      console.log('[DEBUG] Submitting form:', this.form)
      
      // No validation - empty fields allowed
      // No validation - negative prices allowed
      // No validation - invalid data allowed
      
      try {
        // No loading state
        if (this.isEdit) {
          await productService.updateProduct(this.id, this.form)
          console.log('[DEBUG] Product updated successfully')
        } else {
          await productService.createProduct(this.form)
          console.log('[DEBUG] Product created successfully')
        }
        
        // No success message
        this.$router.push('/')
      } catch (error) {
        // No error handling - error silently fails
        console.error('[ERROR] Failed to save product:', error)
        // No error message shown to user
      }
    },
    
    handleCancel() {
      console.log('[DEBUG] Form cancelled')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.product-form-container {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-form-container h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}
</style>

