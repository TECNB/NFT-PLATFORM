<template>
    <div class="NotFoundView dis">
        <MainNavbar/>
        <img class="w-[600px] m-auto py-10 rounded-sm" src="../assets/images/Page_not_found.png" alt="">
        <p class="text-4xl font-bold">此页面已丢失</p>
        <p class="text-2xl font-medium text-text-200">我们已进行深入和广泛的探索</p>
        <p class="text-2xl font-medium text-text-200">但我们无法找到您要找的页面</p>
        <div class="w-40 bg-accent-200 rounded-2xl cursor-pointer px-2 py-5 mx-auto my-10" @click="toIndex">
            <p class="text-white font-bold text-lg">导航返回主页</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import router from "../router";


import MainNavbar from '../components/MainNavbar.vue'

const toIndex = () => {
    router.push({
        name: 'IndexView',
    })
}
</script>

<style lang="scss" scoped></style>
