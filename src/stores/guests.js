import { defineStore } from 'pinia'
import callAPI from '../api'

export const guestsStore = defineStore({
  id: 'guests',
  state: () => ({
    guests: {},
    loading: false,
    perPage: 10,
    currentPage: 1,
  }),
  getters: {
  }, 
  actions: {
    async fetchGuests(params = []) {
      this.guests = []
      this.loading = true
      await callAPI('exam.guests', params).then(res => {
        this.guests = res.data.items
        this.loading = false
      })
    },
  }
})
