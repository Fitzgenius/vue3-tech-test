<script setup>
const props = defineProps({
  currentPage: Number,
  perPage: Number,
  totalPages: Number,
  changePage: Function,
})
</script>

<template>
  <div v-if="totalPages > 0" id="pagination">
    <nav class="pagination-container">
      <div id="pagination-numbers">
        <button 
          v-for="index in totalPages" 
          v-bind:key="index" 
          @click="$emit('changePage', index)"
          :class="{ active: index === currentPage }"
        >
          {{ index }}
        </button>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
#pagination {
  .pagination-container {
    width: calc(100% - 2rem);
    display: flex;
    align-items: center;
    bottom: 0;
    margin-top: 30px;
    justify-content: center;
    button {
      border-radius: 50%;
      margin-right: 10px;
      padding: 10px 18px;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        background: #2f0963;
        color: #fff;
      }
    }
  }
}
</style>
