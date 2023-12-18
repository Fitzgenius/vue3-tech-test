<script setup>
import logo from '../../assets/logo.png'
</script>
<template>
  <header id="header">
    <img :src="logo" />
  </header>
</template>
<style lang="scss" scoped>
#header {
  margin: 20px;
  img {
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    width: 180px;
  }
}
</style>