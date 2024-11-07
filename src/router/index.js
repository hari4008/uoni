import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import ContactUs from '@/views/ContactUs.vue'
import TestiMonial from '@/views/TestiMonial.vue'
import Product from '@/views/Product/Product.vue'
import Register from '@/views/Register.vue'
import Cart from '@/components/Cart/Cart.vue'
import SingleProduct from '@/views/Product/SingleProduct.vue'
import Login from '@/views/Login.vue'
// import HomeView from '../views/HomeView.vue'

const Token = sessionStorage.getItem('token')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactUs
    },
    {
      path: '/testimonial',
      name: 'TestiMonial',
      component: TestiMonial
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/singleproduct/:id',
      name: 'SingleProduct',
      component: SingleProduct
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
