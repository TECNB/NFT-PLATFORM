<template>
    <div v-if="props.ifShow"
        class="FilterList w-96 min-h-full bg-white absolute left-3 top-3 rounded-t-3xl text-left p-5 z-[9999]">
        <div
            class="flex justify-between items-center h-10 rounded-t-3xl border-solid border-b-[0.5px] border-b-text-200 p-5 -mx-5">
            <div class="">
                <p class="text-black font-bold text-xl">筛选条件</p>
            </div>
            <div class="" @click="toggleVisibility">
                <el-icon :size="22">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div class="flex justify-between items-center mt-10 p-3" @click="toggleType(false)" v-if="ifShowType">
            <p class="text-black font-medium text-lg">活动类型</p>
            <el-icon @click="toggleType(false)">
                <ArrowUpBold />
            </el-icon>

        </div>
        <div class="flex justify-between items-center mt-10 p-3" @click="toggleType(true)" v-else="ifShowType">
            <p class="text-black font-medium text-lg">活动类型</p>
            <el-icon>
                <ArrowDownBold />
            </el-icon>

        </div>
        <div class="" v-if="ifShowType">
            <div class="">
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('全部') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('全部')">全部</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('降价') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('降价')">降价</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('预发行') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('预发行')">预发行</p>
                </div>
            </div>
            <div class="mt-4">
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('系列合成') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('系列合成')">系列合成</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('盲盒') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('盲盒')">盲盒</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('空投') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('空投')">空投</p>
                </div>
            </div>
            <div class="mt-4">
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('求购') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('求购')">求购</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('交换') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('交换')">交换</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filterListIndex.index.includes('收购') }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilterIndex('收购')">收购</p>
                </div>
            </div>
        </div>


        <div class="flex justify-between items-center mt-10 p-3" @click="toggleCollection(false)"
            v-if="ifShowCollection">
            <p class="text-black font-medium text-lg">数字藏品</p>
            <el-icon>
                <ArrowUpBold />
            </el-icon>
        </div>
        <div class="flex justify-between items-center mt-10 p-3" @click="toggleCollection(true)" v-else>
            <p class="text-black font-medium text-lg">数字藏品</p>
            <el-icon>
                <ArrowDownBold />
            </el-icon>
        </div>
        <div class="flex justify-center items-center" v-if="ifShowCollection">
            <el-input v-model="name" placeholder="搜索" class="mt-4" @change="search">
                <template #prefix>
                    <el-icon color="var(--text-100)" class="el-input__icon">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { FilterListIndexStore } from '../stores/SelectedIndexStore'

const props = defineProps(['ifShow']);
const emit = defineEmits();

const filterListIndex = FilterListIndexStore();

const ifShowType = ref(true);
const ifShowCollection = ref(false);
const name = ref('');

filterListIndex.index = ['全部'];



const toggleVisibility = () => {
    emit('updateIfShow', false);
};
const toggleType = (value: boolean) => {
    ifShowType.value = value;
};
const toggleCollection = (value: boolean) => {
    ifShowCollection.value = value;
};
const search = () => {
    console.log(name.value);
};
const setFilterIndex = (value: string) => {
    const index = filterListIndex.index.indexOf(value);
    if (index > -1) {
        // 如果 value 已经存在于数组中，就从数组中删除它
        filterListIndex.index.splice(index, 1);
    } else {
        // 如果 value 不存在于数组中，就添加到数组中
        filterListIndex.index.push(value);
    }
}
</script>

<style lang="scss" scoped>
.FilterList {
    .TypeItem {
        display: inline-block;

        cursor: pointer;
        background-color: rgba(18, 18, 18, 0.04);
        border-radius: 12px;

        padding: 12px;

        margin-right: 20px;
    }

    .Selected {
        background-color: black;

        p {
            color: white;
        }

    }
}

.el-input {
    width: 320px;
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: white;

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: white;

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}
</style>
