<template>
    <div class="TypeNavbar">
        <div class="TypeNavbarItem" @click="selectType(0)" :class="{ 'selected': TypeIndex.index === 0 }">
            <p>全部</p>
        </div>
        <div class="TypeNavbarItem" @click="selectType(1)" :class="{ 'selected': TypeIndex.index === 1 }">
            <p>动画</p>
        </div>
        <div class="TypeNavbarItem" @click="selectType(2)" :class="{ 'selected': TypeIndex.index === 2 }">
            <p>现实</p>
        </div>
        <div class="TypeNavbarItem" @click="selectType(3)" :class="{ 'selected': TypeIndex.index === 3 }">
            <p>科技</p>
        </div>
        <div class="TypeNavbarItem" @click="selectType(4)" :class="{ 'selected': TypeIndex.index === 4 }">
            <p>动物</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {  } from "vue";

import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore'

const TypeIndex = SelectedTypeIndexStore()


const selectType = (index: number) => {

    TypeIndex.index = index;
};



</script>

<style lang="scss" scoped>
.TypeNavbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    gap: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    font-size: 16px;
    font-weight: bold;
}

// .TypeNavbarItem {
//     padding: 0px 20px;
// }

.TypeNavbarItem.selected:hover {
    color: var(--text-200);
    /* 悬停时的文本颜色 */
    background-color: rgba(214, 198, 225, 0.7);
}

.TypeNavbarItem.selected {
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
