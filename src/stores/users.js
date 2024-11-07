import axios from 'axios';
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    products: [],
    product: {},
    category: {},
    adress: [],
    singleAdress: {}
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    getSingleProduct(state) {
      return state.product;
    },
    getCategory(state) {
      return state.category;
    },
    getAllAdress(state) {
      return state.adress;
    },
    getSingleAdress(state) {
      return state.singleAdress;
    },
    // getUpdateAddress(state) {
    //   return state.adress
    // }
  },
  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getAllProduct`);
        // console.log("PRODUCT DATA in STORE", res.data);
        this.products = res.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchSingleProduct(id) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getSingleProduct/${id}`);
        console.log("SINGLE PRODUCT DATA in STORE", res.data);
        this.product = res.data;
      } catch (error) {
        console.error('Error fetching single product:', error);
      }
    },
    async fetchCategorieById(id) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getsignlecategory/${id}`);
        // console.log("PRODUCTS BY CATEGORY DATA in STORE", res.data);
        this.category = res.data;
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }

    },
    async fetchAdresses() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getalladdress`);
        console.log("ADRESS DATA in STORE", res.data);
        this.adress = res.data;
      } catch (error) {
        console.error('Error fetching adresses:', error);
      }
    },
    async addAdress(addData) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/addadress`, addData);
        console.log("ADD ADRESS DATA in STORE", res.data);
        this.adress.push(res.data);
      } catch (error) {
        console.error('Error fetching adresses:', error);
      }
    },
    async fetchSingleAdress(id) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getsingleadress/${id}`);
        console.log("SINGLE ADRESS DATA in STORE", res.data);
        this.singleAdress = res.data;
      } catch (error) {
        console.error('Error fetching single adress:', error);
      }
    },
    async updateAdress(id, updateData) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/updateadress/${id}`, updateData);
        console.log("UPDATE ADRESS DATA in STORE", res.data);
        const index = this.adress.findIndex(add => add.id === res.data.id);
        this.adress[index] = res.data;
      } catch (error) {
        console.error('Error fetching adresses:', error);
      }
    },
    async deleteAdress(id) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteadress/${id}`);
        console.log("DELETE ADRESS DATA in STORE", res.data);
        const index = this.adress.findIndex(add => add.id === id);
        this.adress.splice(index, 1);
      } catch (error) {
        console.error('Error fetching adresses:', error);
      }
    },
    async addContact(addData) {
      try {
        console.log("addData", addData)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/addcontact`, addData);
        console.log("ADD CONTACT DATA in STORE", res.data);
        // this.contact.push(res.data);
      } catch (error) {
        console.error('Error fetching adresses:', error);
      }
    },
    async signupUser(data) {
      try {
        console.log("signup", data)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, { data });
        console.log("signupUser DATA in STORE", res.data);
        return res.data
      } catch (error) {
        console.error('Error fetching signupUser:', error);
      }
    },
    async loginUser(data) {
      try {
        console.log("Login", data)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { data });
        console.log("loginUser DATA in STORE", res.data);
        return res.data
      } catch (error) {
        console.error('Error fetching loginUser:', error);
      }
    },
  }
})
