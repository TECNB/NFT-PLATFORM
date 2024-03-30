<script setup lang="ts">
// 引入useRoute
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <router-view :key="route.fullPath"></router-view>
</template>

<style scoped>

</style>
