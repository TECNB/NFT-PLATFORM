<template>
    <div class="w-full h-full">
        <div class="flex justify-start items-center  bg-accent-100 rounded-t-2xl p-5">
            <el-icon color="#FFF">
                <ArrowLeftBold />
            </el-icon>
            <p class="text-white text-lg font-bold flex-1">HyperStar</p>
        </div>
        <div class="flex justify-start items-center flex-col h-[550px] p-5">
            <div class="w-full">
                <div class="flex justify-start items-center gap-5">
                    <img class="w-10 h-10"
                        src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                        alt="">
                    <div class="bg-gray-100 rounded-lg p-5">
                        <p>你好!👋 我们能帮上什么忙？</p>
                    </div>
                </div>
                <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 2小时前</p>
            </div>
            <div v-if="message === ''" class="flex-1 flex justify-start items-end flex-col gap-2 w-full mt-32">
                <div @click="sendMessage('我的账户')"
                    class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                    <p class="text-accent-200">我的账户</p>
                </div>
                <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                    <p class="text-accent-200">购买、销售和转让物品</p>
                </div>
                <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                    <p class="text-accent-200">创建项目和集合</p>
                </div>
                <div class="flex justify-end items-center gap-2">
                    <div class="bg-bg-100 rounded-lg w-max p-3 hover:bg-accent-100">
                        <p class="text-accent-200">开发和APl</p>
                    </div>
                    <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                        <p class="text-accent-200">安全问题</p>
                    </div>
                </div>
                <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                    <p class="text-accent-200">其他</p>
                </div>
            </div>

            <div v-if="message !== ''" class="w-full my-5">
                <div class="flex justify-end items-center w-full">
                    <div class="bg-accent-100 rounded-lg p-5">
                        <p class="text-white">我的账户</p>
                    </div>
                </div>
            </div>

            <div v-if="message !== ''&&loading" class="w-full">
                <div class="flex justify-start items-center gap-5">
                    <img class="w-10 h-10"
                        src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                        alt="">
                    <div class="w-full bg-gray-100 rounded-lg p-5" v-loading="loading" element-loading-text="生成中...">
                        
                    </div>
                </div>
                <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 刚刚</p>
            </div>

            <div v-if="message !== ''&&!loading" class="w-full">
                <div class="flex justify-start items-center gap-5">
                    <img class="w-10 h-10"
                        src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                        alt="">
                    <div class="bg-gray-100 rounded-lg p-5">
                        <p class="text-left">谢谢你的回复。听起来你需要一些帐户方面的帮助。以下哪个主题最能描述您的问题？</p>
                    </div>
                </div>
                <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 刚刚</p>
            </div>

            <div v-if="message !== ''&&!loading" class="flex-1 flex justify-start items-end flex-col gap-2 w-full mt-10">
                <div class="flex justify-end items-center gap-2">
                    <div class="bg-bg-100 rounded-lg w-max p-3 hover:bg-accent-100">
                        <p class="text-accent-200">创建一个帐户</p>
                    </div>
                    <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                        <p class="text-accent-200">登录或退出</p>
                    </div>
                </div>
                <div class="flex justify-end items-center gap-2">
                    <div class="bg-bg-100 rounded-lg w-max p-3 hover:bg-accent-100">
                        <p class="text-accent-200">编辑我的帐户</p>
                    </div>
                    <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                        <p class="text-accent-200">管理我的通知</p>
                    </div>
                </div>
                <div @click="sendMessage('我的账户')"
                    class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                    <p class="text-accent-200">管理我的物品或收藏</p>
                </div>
                <div class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                    <p class="text-accent-200">验证我的帐户或标记我的收藏</p>
                </div>
 
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const message = ref('')
const loading = ref(true)
const sendMessage = (value: string) => {
    message.value = value
    console.log(message)
    // 等1秒后loading消失
    setTimeout(() => {
        loading.value = false
    }, 1000)
}
</script>

<style lang="scss" scoped>
// 下面为loading的样式
:deep(.el-loading-mask) {
    border-radius: 12px;
}

// 修改图标的颜色
:deep(.el-loading-spinner .path) {
    stroke: var(--accent-200);
}

// 修改文字的颜色
:deep(.el-loading-spinner .el-loading-text) {
    color: var(--accent-200);
}
</style>
