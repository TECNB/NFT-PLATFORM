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
                <!-- <div class="TypeItem" :class="{ 'Selected': filter==='全部' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('全部')">全部</p>
                </div> -->
                <div class="TypeItem" :class="{ 'Selected': filter==='降价' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('降价')">降价</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filter==='预发行' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('预发行')">预发行</p>
                </div>
            </div>
            <div class="mt-4">
                <div class="TypeItem" :class="{ 'Selected': filter==='合成' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('合成')">合成</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filter==='盲盒' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('盲盒')">盲盒</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filter==='空投' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('空投')">空投</p>
                </div>
            </div>
            <div class="mt-4">
                <div class="TypeItem" :class="{ 'Selected': filter==='求购' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('求购')">求购</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filter==='交换' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('交换')">交换</p>
                </div>
                <div class="TypeItem" :class="{ 'Selected': filter==='收购' }">
                    <p class="text-text-100 font-medium text-lg text-center" @click="setFilter('收购')">收购</p>
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

const props = defineProps(['ifShow','filter']);
const emit = defineEmits();


const ifShowType = ref(true);
const ifShowCollection = ref(false);
const name = ref('');




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
const setFilter = (value: string) => {
    emit('updateFilter', value);
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
