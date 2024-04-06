<template>
    <!-- 上半部分 -->
    <div class=" w-full h-80 bg-gradient-to-br from-primary-100 to-white rounded-t-2xl p-5">
        <div class="w-full h-full flex justify-between items-start flex-col">
            <img width="30px" src="../assets/images/logo.png" />
            <div class="w-full text-left">
                <p class="text-white text-xl font-bold text-opacity-70 text-shadow-white-30">你好啊👋</p>
                <p class="text-white text-2xl font-bold">有什么能帮到你的吗?</p>
                <div class="w-full flex justify-between items-center bg-white rounded-2xl cursor-pointer mt-5 p-3" @click="handleSelect('信息')">
                    <div class="">
                        <p class="text-left font-bold">发送信息</p>
                        <p class="text-left text-gray-400">我们通常在一天内回复</p>
                    </div>
                    <el-icon>
                        <ArrowRightBold />
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
    <el-scrollbar height="300px">
        <!-- 中间部分 -->
        <div
            class=" flex justify-between items-center flex-col gap-2 drop-shadow-[0_0px_2px_rgba(0,0,0,0.25)] bg-white rounded-2xl m-5 p-3">
            <div
                class="w-full flex justify-between items-center bg-gray-200 rounded-xl hover:bg-accent-100 transition-bg duration-300 px-3 py-3 cursor-pointer">
                <p class="font-bold">通过搜索获取帮助</p>
                <el-icon size="20" color="#9A73B5">
                    <Search />
                </el-icon>
            </div>
            <div
                class="w-full flex justify-between items-center hover:bg-accent-100 transition-bg duration-300 rounded-xl px-3 py-2 cursor-pointer">
                <p class="">我如何联系OpenSea？</p>
                <el-icon size="20" color="#9A73B5">
                    <ArrowRightBold />
                </el-icon>
            </div>
            <div
                class="w-full flex justify-between items-center hover:bg-accent-100 transition-bg duration-300 rounded-xl px-3 py-2 cursor-pointer">
                <p class="">哪些区块链与Opensea兼容？</p>
                <el-icon size="20" color="#9A73B5">
                    <ArrowRightBold />
                </el-icon>
            </div>
            <div
                class="w-full flex justify-between items-center hover:bg-accent-100 transition-bg duration-300 rounded-xl px-3 py-2 cursor-pointer">
                <p class="">How do I create an NFT?</p>
                <el-icon size="20" color="#9A73B5">
                    <ArrowRightBold />
                </el-icon>
            </div>
            <div
                class="w-full flex justify-between items-center hover:bg-accent-100 transition-bg duration-300 rounded-xl px-3 py-2 cursor-pointer">
                <p class="text-left">为什么我看到一个“哎呀，出了点问题”的错误？</p>
                <el-icon size="20" color="#9A73B5">
                    <ArrowRightBold />
                </el-icon>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits();

//  定义select
// const select = ref('主页')

// 实现select的切换
const handleSelect = (value: string) => {
    emit('select', value);
}
</script>

<style lang="scss" scoped></style>
