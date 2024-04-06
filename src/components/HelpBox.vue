<template>
    <div class="fixed right-10 top-5 w-96 h-[700px] rounded-2xl bg-white">
        <HelpBoxHome v-if="select==='主页'" :select="handleSelect"/>
        <el-scrollbar height="620px">
            <HelpBoxMessage v-if="select==='信息'"/>
        </el-scrollbar>
        
        <HelpBoxMessage v-if="select==='帮助'"/>

        <!-- 下半部分 -->
        <div class="fixed bottom-28 w-96 h-[75px] flex justify-between items-center border-t border-solid px-10">
            <div class="flex justify-center items-center flex-col cursor-pointer" @click="handleSelect('主页')" v-if="select==='主页'">
                <el-icon size="24" color="#9A73B5">
                    <HomeFilled />
                </el-icon>
                <p class="text-accent-100">主页</p>
            </div>
            <div class="flex justify-center items-center flex-col cursor-pointer" @click="handleSelect('主页')" v-else>
                <el-icon size="24">
                    <HomeFilled />
                </el-icon>
                <p>主页</p>
            </div>

            <div class="flex justify-center items-center flex-col cursor-pointer" @click="handleSelect('信息')" v-if="select==='信息'">
                <el-icon size="24" color="#9A73B5">
                    <Comment />
                </el-icon>
                <p class="text-accent-100">信息</p>
            </div>
            <div class="flex justify-center items-center flex-col cursor-pointer" @click="handleSelect('信息')" v-else>
                <el-icon size="24">
                    <Comment />
                </el-icon>
                <p>信息</p>
            </div>

            <div class="flex justify-center items-center flex-col cursor-pointer" @click="handleSelect('帮助')" v-if="select==='帮助'">
                <el-icon size="24" color="#9A73B5">
                    <QuestionFilled />
                </el-icon>
                <p class="text-accent-100">帮助</p>
            </div>
            <div class="flex justify-center items-center flex-col cursor-pointer" @click="handleSelect('帮助')" v-else>
                <el-icon size="24">
                    <QuestionFilled />
                </el-icon>
                <p>帮助</p>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,watch } from "vue"
// 位于菜单的什么位置
const select = ref('主页')
watch(select, (value) => {
    console.log(value)
})
// 用于切换菜单
const handleSelect = (index: string) => {
    select.value = index
}
</script>

<style lang="scss" scoped></style>
