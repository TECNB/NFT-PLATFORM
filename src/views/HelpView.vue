<template>
    <div class="HelpView">
        <MainNavbar />
        <div class="px-64">
            <el-input v-model="name" placeholder="搜索" class="mt-4" @change="search">
                <template #prefix>
                    <el-icon color="var(--text-100)" class="el-input__icon">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <div class="grid auto-rows-auto gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-3 -mx-3 mt-10">
                <div v-for="helpItem in helpList" :key="helpItem.title" class="flex justify-center items-center flex-col border border-bg-100 border-solid hover:border-accent-200 transition-all duration-300 rounded-xl">
                        <img class="w-full h-32 object-cover rounded-xl" :src="helpItem.cover" alt="">
                        <div class="p-5">
                            <p class="text-center text-lg font-medium">{{ helpItem.title }}</p>
                            <p class="text-center">{{ helpItem.description }}</p>
                        </div>
                    </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from "../router";


import MainNavbar from '../components/MainNavbar.vue'

// 建立一个数组用于存放标题，描述，封面
let helpList = ref([
    {
        title: '开始使用',
        description: '了解如何创建账户，设置钱包以及在 Opensea 上可以做什么',
        cover: '/src/assets/images/start.png'
    },
    {
        title: '购买',
        description: '了解如何购买首个 NFT，了解gas 费，并查看 0pensea 上什么免gas费',
        cover: '/src/assets/images/buy.png'
    },
    {
        title: '出售',
        description: '学习如何发布要出售的 NFT，并了解发布待售 NFT 的不同方法',
        cover: '/src/assets/images/sell.png'
    },
    {
        title: '创建NFT',
        description: '了解如何创建首个 NFT 以及如何创建 NFT 系列',
        cover: '/src/assets/images/createNft.png'
    },
    {
        title: '投放系列',
        description: '了解如何直接在OpenSea上设置投放',
        cover: '/src/assets/images/createSeries.png'
    },
    {
        title: '用户内容',
        description: '我们的服务条款请查阅https：//opensea。io/tos，其中概述了我们的用户行为和内容政策。您可…',
        cover: '/src/assets/images/userContent.png'
    },
    {
        title: '用户安全',
        description: '了解 OpenSea 反欺诈和用户安全流程的更多信息',
        cover: '/src/assets/images/userSecurity.png'
    },
    {
        title: '开发人员',
        description: '了解如何通过 Opensea 进行开发',
        cover: '/src/assets/images/developer.png'
    },
    {
        title: '常见问题',
        description: '查阅 OpenSea 常见问题的答案',
        cover: '/src/assets/images/problem.png'
    },
])

let name = ref('');

const toIndex = () => {
    router.push({
        name: 'IndexView',
    })
}

// search方法
const search = async () => {

}
</script>

<style lang="scss" scoped>
.HelpView {
    width: 100%;
    height: 100%;
}

.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: var(--bg-200);

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}
</style>
