<template>
    <div class="HelpView" v-if="isRootPath">
        <MainNavbar />

        <div class="px-64">
            <!-- 搜索框 -->
            <el-input v-model="name" placeholder="搜索帮助" class="mt-4" @change="search">
                <template #prefix>
                    <el-icon color="var(--text-100)" class="el-input__icon">
                        <Search />
                    </el-icon>
                </template>
            </el-input>

            <div class="grid auto-rows-auto gap-x-4 grid-cols-3 gap-5 -mx-3 mt-10 pb-10">
                <div v-for="helpItem in helpList" :key="helpItem.title"
                    class="flex justify-start items-center flex-col border border-bg-100 border-solid hover:border-accent-200 transition-all duration-300 rounded-xl cursor-pointer"
                    @click="navigateTo(helpItem.path)">
                    <img class="w-full h-32 object-cover rounded-xl" :src="helpItem.cover" alt="">
                    <div class="p-5">
                        <p class="text-center text-lg font-medium">{{ helpItem.title }}</p>
                        <p class="text-center">{{ helpItem.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed right-10 bottom-10">
            <div class="flex justify-center items-center w-16 h-16 rounded-full bg-[#1868b7] cursor-pointer"
                @click="toggleDialogVisible">
                <transition mode="out-in" name="fade">
                    <img v-if="!dialogVisible" class="w-8 h-8"
                        src="https://downloads.intercomcdn.com/i/o/471778/a60fd017eb1fb0c35f832f1b/8327ccd8ee41ec101d8855bb90fa2931.png"
                        alt="">
                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z"
                            fill="white"></path>
                    </svg>
                </transition>
            </div>
        </div>

        <HelpBox v-if="dialogVisible" />
    </div>
    <router-view v-else />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MainNavbar from '../components/MainNavbar.vue';
import startCover from '../assets/images/start.png';
import buyCover from '../assets/images/buy.png';
import sellCover from '../assets/images/sell.png';
import createNftCover from '../assets/images/createNft.png';
import createSeriesCover from '../assets/images/createSeries.png';
import userContentCover from '../assets/images/userContent.png';
import userSecurityCover from '../assets/images/userSecurity.png';
import developerCover from '../assets/images/developer.png';
import problemCover from '../assets/images/problem.png';


const route = useRoute();
const router = useRouter();

let helpList = ref([
    {
        title: '开始使用',
        description: '了解如何创建账户,设置钱包以及在 HyperStar 上可以做什么',
        cover: startCover,
        path: '/help/start' // 修改后的路径
    },
    {
        title: '全站排行',
        description: '探索全站用户和作品的排名，发现最受欢迎和最有潜力的创作者和收藏品。',
        cover: buyCover,
        path: '/help/ranking' // 修改后的路径
    },
    {
        title: '探索个人资料',
        description: '深入了解个人资料页面的功能，包括编辑个人信息、查看收藏以及管理你的数字藏品。',
        cover: sellCover,
        path: '/help/profile' // 修改后的路径
    },
    {
        title: '福利功能',
        description: '了解HyperStar所提供的福利功能,获取专属福利和奖励。',
        cover: createNftCover,
        path: '/help/benefits' // 修改后的路径
    },
    {
        title: '创建数字藏品',
        description: '了解如何直接在 HyperStar 上设置投放，发布你的数字作品，并吸引全球收藏家的关注。',
        cover: createSeriesCover,
        path: '/help/createNft' // 修改后的路径
    },
    {
        title: '特色活动',
        description: '探索 HyperStar 的特色活动，赢取独家奖励，提升你的知名度和影响力。',
        cover: userContentCover,
        path: '/help/specialEvents' // 修改后的路径
    },
]);

let name = ref('');

// 控制是否展示对话框
let dialogVisible = ref(false);

const isRootPath = computed(() => route.path === '/help');

// 切换是否展示对话框
const toggleDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value;
};

// 跳转到指定路径
const navigateTo = (path: string) => {
    router.push(path);
};

// search方法
const search = async () => {
    // 搜索逻辑
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.HelpView {
    width: 100%;
    height: 100%;
}

.el-input {
    height: 60px;

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