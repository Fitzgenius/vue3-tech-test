<script setup>
import './assets/reset.css'

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { guestsStore } from './stores/guests'

import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
import GuestList from './components/Guests/GuestList.vue'
import OrderList from './components/Orders/OrderList.vue'
import SearchGuests from './components/Form/SearchGuests.vue'

// This could probably have been put inside GuestList.vue to keep it neatier
// and to error handle/show empty messages/loading a bit cleaner
const { guests, loading } = storeToRefs(guestsStore())
const { fetchGuests } = guestsStore()

let isViewingOrders = ref(false)
let currentGuest = ref({})

const openOrder = (guest) => {
  isViewingOrders.value = true
  currentGuest.value = guest
}

const closeOrder = () => {
  isViewingOrders.value = false
  currentGuest.value = {}
}

const filterGuestList = (from, to) => {
  if (from || to) {
    let formattedTo = new Date(to).toISOString()
    let formattedFrom = new Date(from).toISOString()
    const badStr = '1970-01-01T00:00:00.000Z'
    let dateFilters = {
      limit: 50,
    }
    if (formattedFrom !== badStr) dateFilters.since = formattedFrom
    if (formattedTo !== badStr) dateFilters.until = formattedTo
    fetchGuests(dateFilters)
  } else {
    fetchGuests({
      limit: 50
    })
  }
}

fetchGuests({
  limit: 50
})
</script>

<template>
  <Header />
  <main>
    <SearchGuests v-if="!isViewingOrders" @find="filterGuestList" />
    <GuestList
      v-if="!isViewingOrders && guests.length > 0"
      :guests="guests"
      :loading="loading"
      @openOrder="openOrder"
    />
    <OrderList
      v-else-if="isViewingOrders && currentGuest"
      :guest="currentGuest"
      @closeOrder="closeOrder"
    />
    <div v-if="guests.length === 0 && !loading" class="alert info">No guests were found</div>
  </main>
  <Footer />
</template>

<style lang="scss">
body {
  overflow-x: hidden;
  background: #2f0963;
  color: #fff;
  font-family: 'Nunito', sans-serif;
}

main {
  background: #fff;
  padding: 40px;
  @media only screen and (max-width: 500px) {
    padding: 20px;
  }
}

h1 {
  color: #2f0963;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 30px;
  line-height: 1.2;
  border-bottom: #ccc 1px solid;
  padding-bottom: 15px;
  @media only screen and (max-width: 500px) {
    font-size: 25px;
  }
}

ul {
  list-style: none;
  padding: 0;
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: #ccc 1px solid;
    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
    h2 {
      color: #000;
      font-size: 18px;
      > span {
        font-size: 12px;
        color: #2f0963;
        display: block;
        text-transform: uppercase;
      }
      a {
        color: #666;
        font-weight: normal;
        font-size: 14px;
        text-decoration: none;
        &:hover {
          border-bottom: #14ead8 1px solid;
        }
      }
    }
  }
}

button {
  background: #14ead8;
  border: 0;
  padding: 15px 25px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 20px;
  transition: 0.3s;
  &:hover {
    background: #2f0963;
    color: #fff;
  }
}

#guest-list {
  .guest-list {
    button {
      @media only screen and (max-width: 500px) {
        width: 100%;
        margin-top: 5px;
      }
    }
  }
}

.alert {
  color: #000;
  padding: 15px;
  &.info {
    background: #fff3cd;
  }
}
</style>
