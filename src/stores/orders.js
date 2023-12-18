import { defineStore } from 'pinia'
import callAPI from '../api'

export const ordersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: {},
    user: {},
    loading: false,
    perPage: 10,
    currentPage: 1,
  }),
  getters: {
  }, 
  actions: {
    async fetchOrders(params = []) {
      this.orders = {}
      this.loading = true
      await callAPI('exam.guests.orders', params).then(res => {
        this.orders = res.data.items
        this.loading = false
      })
    },
  }
})
