<script setup lang="ts">
// 引入useRoute
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <router-view ></router-view>
</template>

<style lang="scss">
.el-loading-spinner .path {
  stroke: var(--accent-200) !important;
}
.el-loading-spinner .el-loading-text {
  color: var(--accent-200) !important;
}
</style>
