<script setup>
const props = defineProps({
  find: Function
})
import { ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'

let from = ref(new Date())
let to = ref(new Date())
</script>

<template>
  <div id="guest-search">
    <strong>Filter Results</strong>
    <div class="form">
      <div class="field">
        <span>From:</span>
        <VueDatePicker v-model="from"></VueDatePicker>
      </div>
      <div class="field">
        <span>To:</span>
        <VueDatePicker v-model="to"></VueDatePicker>
      </div>
      <button @click="$emit('find', from, to)">Filter</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#guest-search {
  background: #eee;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  strong {
    color: #000;
    display: block;
    text-transform: uppercase;
    font-size: 14px;
  }
  .form {
    display: flex;
    justify-content:flex-start;
    @media only screen and (max-width: 500px) {
      display: block;
    }
    .field {
      margin-right: 20px;
      @media only screen and (max-width: 500px) {
        margin-right: 0;
        margin-bottom: 10px;
      }
      span {
        color:#666;
      }
    }
    button {
      @media only screen and (max-width: 500px) {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
