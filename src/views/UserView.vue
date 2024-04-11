<template>
    <div class="UserView">
        <MainNavbar />
        <UserInfo/>
        <UserContent/>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import MainNavbar from '../components/MainNavbar.vue'
import UserInfo from '../components/UserInfo.vue'
import UserContent from '../components/UserContent.vue'
</script>

<style lang="scss" scoped>
.UserView{
    width: 100%;
    
}
</style>
