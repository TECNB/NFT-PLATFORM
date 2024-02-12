<template>
    <div class="UserNavbar">
        <div class="UserNavbarItem" @click="selectType(0)" :class="{ 'selected': UserIndex.index === 0 }">
            <p>已收集</p>
        </div>
        <div class="UserNavbarItem" @click="selectType(1)" :class="{ 'selected': UserIndex.index === 1 }">
            <p>己作出报价</p>
        </div>
        <div class="UserNavbarItem" @click="selectType(2)" :class="{ 'selected': UserIndex.index === 2 }">
            <p>交易</p>
        </div>
        <div class="UserNavbarItem" @click="selectType(3)" :class="{ 'selected': UserIndex.index === 3 }">
            <p>已创建</p>
        </div>
        <div class="UserNavbarItem" @click="selectType(4)" :class="{ 'selected': UserIndex.index === 4 }">
            <p>己收藏</p>
        </div>
        <div class="UserNavbarItem" @click="selectType(5)" :class="{ 'selected': UserIndex.index === 5 }">
            <p>活动</p>
        </div>
        <div class="UserNavbarItem" @click="selectType(6)" :class="{ 'selected': UserIndex.index === 6 }">
            <p>收到的报价</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {  } from "vue";

import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'

const UserIndex = SelectedUserIndexStore()


const selectType = (index: number) => {

    UserIndex.index = index;
};
</script>


<style lang="scss" scoped>
.UserNavbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    gap: 50px;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: bold;
}

// .UserNavbarItem {
//     padding: 0px 20px;
// }

.UserNavbarItem.selected:hover {
    color: var(--text-200);
    /* 悬停时的文本颜色 */
    background-color: rgba(214, 198, 225, 0.7);
}

.UserNavbarItem.selected {
    display: flex;
    justify-content: space-around;
    align-items: center;

    padding: 0px 20px;
    height: 40px;
    min-width: 40px;
    border: 1px solid transparent;

    background-color: var(--accent-100);

    backdrop-filter: blur(20px);
    border-radius: 16px;
    // 指定转化时的效果
    transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
}
</style>
