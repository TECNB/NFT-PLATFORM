<template>
    <div class="CreateView flex justify-center items-center gap-5">
        <div class="flex justify-start items-start flex-col w-1/2 h-full">
            <div class="flex justify-center items-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer p-2" @click="toIndex">
                <el-icon size="20">
                    <Back />
                </el-icon>
            </div>
            <div class="flex justify-center w-full h-full">
                <div class="flex justify-center self-center w-full flex-col gap-5">
                    <div class="flex justify-start items-center gap-5 w-full">
                        <img class="w-10 h-10" src="https://opensea.io/static/images/logos/opensea-logo.svg" alt="">
                        <p class="text-5xl font-bold">创建</p>
                    </div>
                    <div @click="toCreateSeriesView"
                        class=" flex justify-between items-center w-full cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
                        <div class="flex justify-start items-center flex-col gap-3">
                            <div class="flex justify-start items-center gap-3 w-full">
                                <el-icon>
                                    <Menu />
                                </el-icon>
                                <p class="text-xl font-bold">创建合集</p>
                            </div>
                            <div class="">
                                <p class="font-medium">创建一个集合,用于盲盒以及合成等玩法</p>
                            </div>
                        </div>
                        <div class="">
                            <el-icon size="20">
                                <Right />
                            </el-icon>
                        </div>
                    </div>
                    <div @click="toCreateNftView"
                        class=" flex justify-between items-center w-full cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
                        <div class="flex justify-start items-center flex-col gap-3">
                            <div class="flex justify-start items-center gap-3 w-full">
                                <el-icon>
                                    <Menu />
                                </el-icon>
                                <p class="text-xl font-bold">铸造数字藏品</p>
                            </div>
                            <div class="">
                                <p class="font-medium">创建一个数字藏品至区块链
                                    
                                </p>
                            </div>
                        </div>
                        <div class="">
                            <el-icon size="20">
                                <Right />
                            </el-icon>
                        </div>
                    </div>
                    <div @click="toCreateIssueDateView"
                        class=" flex justify-between items-center w-full cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
                        <div class="flex justify-start items-center flex-col gap-3">
                            <div class="flex justify-start items-center gap-3 w-full">
                                <el-icon>
                                    <Menu />
                                </el-icon>
                                <p class="text-xl font-bold">预定发行计划</p>
                            </div>
                            <div class="">
                                <p class="font-medium">创建一个发行计划,增加正式发行时的热度</p>
                            </div>
                        </div>
                        <div class="">
                            <el-icon size="20">
                                <Right />
                            </el-icon>
                        </div>
                    </div>
                    <div class="flex gap-1">
                        <p class="text-left font-medium cursor-pointer text-accent-100 hover:text-accent-200">详细了解</p>
                        <p class="text-left font-medium">每个选项</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 h-full">
            <el-carousel :interval="4000" height="95vh" motion-blur direction="vertical">
                <el-carousel-item v-for="(item, index) in CollectionRanking.collections" :key="index"
                    style="border-radius: 20px 20px 0px 0px;" @click="toNft(item.objectId)">
                    <img :src="item.cover" alt="NFT Image"
                        style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import router from "../router";

import { CollectionRankingStore } from '../stores/CollectionStore'

const CollectionRanking = CollectionRankingStore()

const toNft = (objectId: string) => {
    router.push({
        name: 'NftView',
        params: { id: objectId }, // 传递动态路由参数
    })
}
const toCreateNftView = () => {
    router.push({
        name: 'CreateNftView',
    })
}
const toCreateSeriesView = () => {
    router.push({
        name: 'CreateSeriesView',
    })
}
const toCreateIssueDateView = () => {
    router.push({
        name: 'CreateIssueDateView',
    })
}
const toIndex = () => {
    router.push({
        name: 'IndexView',
    })
}
</script>

<style lang="scss" scoped>
#app {
    padding-right: -20px;
}

body {
    padding-right: -20px;
}

.CreateView {
    height: 100%;
    width: 100%;

    margin-right: -20px;
}

.CreateViewBody {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    height: 80%;

    text-align: left;
    margin-top: 3%;
    gap: 2%;



    .CreateViewBodyLeft {
        min-width: 40%;


        .CreateViewBodyLeftUpdate {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;


            height: 80%;
            width: 100%;
            min-width: 80%;

            max-height: 600px;
            border: 1px dashed var(--text-200);
            border-radius: 20px;
            margin-top: 30px;
            background-color: var(--bg-200);

            transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
            /* 添加过渡效果 */
        }

        .CreateViewBodyLeftUpdate:hover {

            border: 1px solid var(--text-200);
            background-color: rgba(18, 18, 18, 0.04)
        }
    }

    .CreateViewBodyRight {
        min-width: 40%;


        .CreateViewBodyRightSeries {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            color: var(--text-100);
            font-weight: bold;
            font-size: 20px;

            padding: 24px 10px;
            width: 80%;
            background-color: #FFFFFF;
            border-radius: 12px;
            min-width: 360px;
            border: 1px solid transparent;

            background-color: rgba(214, 198, 225, 0.7);

            backdrop-filter: blur(20px);
            border-radius: 16px;
            // 指定转化时的效果
            transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;

            .CreateViewBodyRightSeriesCreate {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                color: var(--text-100);
                font-weight: bold;
                font-size: 20px;


                padding: 10px;
                border: 1px solid transparent;

                background-color: var(--accent-200);

                backdrop-filter: blur(20px);
                border-radius: 12px;
                // 指定转化时的效果
                transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
                margin-left: 15px;
            }
        }

        .CreateViewBodyRightSeries:hover {
            color: var(--text-100);
            /* 悬停时的文本颜色 */
            background-color: var(--accent-100);
        }

        /* 输入框样式 */
        .CreateViewBodyRightInput {

            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 12px;

            width: 80%;
            background-color: #FFFFFF;
            border-radius: 12px;
            min-width: 360px;


            input {
                outline: none;
                padding-left: 10px;
                font-size: 16px;
                width: 200px;
                border: 0px;
                max-width: 300px;
                /* 调整输入框的宽度 */
            }
        }
    }
}

.CreateViewHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bg-100);

    flex: 1;
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: var(--text-100);
    /* 你的文本颜色 */
    cursor: pointer;
    /* 如果需要悬停效果，可以添加以下样式 */
    transition: color 0.3s ease-in-out;
    min-width: 300px;

    .CreateViewHeadBack {
        display: flex;
        justify-content: space-around;
        align-items: center;

        padding: 0px 12px;
        height: 48px;
        min-width: 48px;
        border: 1px solid transparent;

        background-color: var(--accent-100);

        backdrop-filter: blur(20px);
        border-radius: 50%;
        // 指定转化时的效果
        transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
    }

    .CreateViewHeadBack:hover {
        color: var(--text-200);
        /* 悬停时的文本颜色 */
        background-color: rgba(214, 198, 225, 0.7);
    }

    .CreateViewHeadUser {
        display: flex;
        justify-content: space-around;
        align-items: center;

        padding: 0px 12px;
        height: 48px;
        min-width: 48px;
        border: 1px solid transparent;

        background-color: var(--accent-100);

        backdrop-filter: blur(20px);
        border-radius: 16px;
        // 指定转化时的效果
        transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
    }

    .CreateViewHeadUser:hover {
        color: var(--text-200);
        /* 悬停时的文本颜色 */
        background-color: rgba(214, 198, 225, 0.7);
    }

}

.el-input {
    width: 360px;
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: var(--bg-300);

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}

// 下面为el-select部分
@mixin select_radius {
    border-radius: 12px;
}


// 控制el-select的长度以及圆角
:deep(.el-select__wrapper) {
    width: 100%;
    height: 50px;
    @include select_radius;
}

// 控制el-select中文字的样式
:deep(.el-select__placeholder) {
    color: var(--text-200);
    font-size: 18px;
    font-weight: bold;
}

// 控制点击后的边框颜色
:deep(.el-select__wrapper.is-focused) {
    box-shadow: 0 0 0 1px var(--accent-100);
}

// 下面为下拉框部分
// 下面用于控制整体的下拉框圆角
:deep(.el-select__popper.el-popper) {
    @include select_radius;
}


//下拉框的文本未选中的样式
// .el-select-dropdown__item {

// }
//下拉框的文本颜色选中之后的样式
.el-select-dropdown__item.is-selected {
    color: var(--accent-200);
}

:deep(.el-loading-mask) {
    border-radius: 16px;
}

:deep(.el-loading-spinner .path) {
    stroke: var(--accent-200);
}

:deep(.el-loading-spinner .el-loading-text) {
    color: var(--accent-200);
}



</style>
