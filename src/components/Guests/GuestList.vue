<script setup>
const props = defineProps({
  guests: Object,
  loading: Boolean,
  openOrder: Function
})

import { ref } from 'vue'
import Pagination from '../Layout/Pagination.vue'

let currentPage = ref(1)
let totalPages = ref(0)
let nextPage = ref(0)
let prevPage = ref(0)
let filteredItems = ref({})

// This could be turned into a util...
const paginateGuests = (perPage = 10) => {
  const offset = perPage * (currentPage.value - 1)
  const paginatedItems = props.guests.slice(offset, perPage * currentPage.value)
  const total =  Math.ceil(props.guests.length / perPage)

  totalPages.value = total
  nextPage.value =  total > currentPage.value ? currentPage.value + 1 : null
  prevPage.value = currentPage.value - 1 ? currentPage.value - 1 : null
  filteredItems.value = paginatedItems
}

const changePage = page => {
  currentPage.value = page
  paginateGuests()
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

paginateGuests()
</script>
<template>
  <div id="guest-list">
    <p v-if="loading">Loading guests...</p>
    <div v-else class="guest-list-container">
      <h1>Guests</h1>
      <div class="guest-list">
        <ul>
          <li v-for="guest in filteredItems" v-bind:key="guest.id">
            <h2>
              {{ guest.first_name }} {{ guest.last_name }} <span>{{ guest.gender }}</span>
              <a :href="`mailto:${guest.email}`">{{ guest.email }}</a>
            </h2>
            <button @click="$emit('openOrder', guest)">View Orders</button>
          </li>
        </ul>
      </div>
      <Pagination :currentPage="currentPage" :totalPages="totalPages" :perPage="10" @changePage="changePage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#guest-list {
  p {
    font-weight: bold;
    font-size: 18px;
    color: #000;
    text-align: center;
    margin: 50px 0;
  }
  ul {
    > li {
      @media only screen and (max-width: 500px) {
        display: block;
      }
    }
  }
}
</style>
