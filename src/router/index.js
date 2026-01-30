import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductForm from '../views/ProductForm.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/products/new',
    name: 'NewProduct',
    component: ProductForm
  },
  {
    path: '/products/:id/edit',
    name: 'EditProduct',
    component: ProductForm,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

