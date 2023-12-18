import { createApp } from 'vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { ordersStore } from '../../../stores/orders'

import { mount } from '@vue/test-utils'
import OrderList from '../OrderList.vue'

const app = createApp({})

describe('OrderList Component', () => {
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })
  it('shows loading text', () => {
    const wrapper = mount(OrderList, { 
      props: { 
        guest: { 
          guest_id: 0,
          first_name: "Test",
          last_name: "User",
          orders: [
            {
              id: 1,
              guest_id: 0,
              name: "Test Item",
              price: 100,
              quantity: 1,
            },
            {
              id: 2,
              guest_id: 0,
              name: "Test Item 2",
              price: 100,
              quantity: 1,
            }
          ]
        } 
      } 
    })
    expect(wrapper.text()).toContain('Loading order...')
  })
  it('renders properly', () => {
    // Need to learn how to test Pinia with vitest ...
    const store = ordersStore()
    store.$patch({ loading: false})
    const wrapper = mount(OrderList, { 
      props: { 
        guest: { 
          guest_id: 0,
          first_name: "Test",
          last_name: "User",
          orders: [
            {
              id: 1,
              guest_id: 0,
              name: "Test Item",
              price: 100,
              quantity: 1,
            },
            {
              id: 2,
              guest_id: 0,
              name: "Test Item 2",
              price: 100,
              quantity: 1,
            }
          ]
        } 
      } 
    })
    expect(wrapper.text()).toContain('Test User')
  })
})
