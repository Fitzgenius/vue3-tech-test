<script setup>
const props = defineProps({
  guest: Object,
  closeOrder: Function
})

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { formatCurrency } from '../../utils'
import { ordersStore } from '../../stores/orders'

const { orders, loading } = storeToRefs(ordersStore())
const { fetchOrders } = ordersStore()

fetchOrders({
  guest_id: props.guest.id
})

const formatUnits = (qty, price) => {
  const result = Number(price / qty)
  return result.toFixed(2)
}

const orderTotal = computed(() => {
  let total = Number(0)
  Object.keys(orders).map((item, i) => {
    total += Number(orders.value[i].price)
  })
  return total.toFixed(2)
})
</script>

<template>
  <div id="orders">
    <p v-if="loading">Loading order...</p>
    <div v-else>
      <div id="back">
        <button @click="$emit('closeOrder')">Go Back</button>
      </div>
      <h1>
        Order <span class="name">{{ guest.first_name }} {{ guest.last_name }}</span>
      </h1>
      <ul>
        <li v-for="order in orders" v-bind:key="order.id">
          <h2>
            {{ order.name }} x{{ order.quantity }}
            <span>Unit Price: £{{ formatUnits(order.quantity, order.price) }}</span>
          </h2>
          <span class="price">{{ formatCurrency(order.price) }}</span>
        </li>
      </ul>
      <div id="total">
        <strong>Total</strong>
        £{{ orderTotal }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#orders {
  #back {
    margin-bottom: 20px;
  }
  p {
    font-weight: bold;
    font-size: 18px;
    color: #000;
    text-align: center;
    margin: 50px 0;
  }
  h1 {
    .name {
      display: block;
      font-size: 20px;
    }
  }
  .price {
    color: #000;
    @media only screen and (max-width: 500px) {
      margin-left: 5px;
    }
  }
  #total {
    background: #eee;
    padding: 20px;
    color: #000;
    margin-top: 20px;
    border-radius: 20px;
    font-size: 20px;
    strong {
      display: block;
      text-transform: uppercase;
      font-size: 14px;
    }
  }
}
</style>
