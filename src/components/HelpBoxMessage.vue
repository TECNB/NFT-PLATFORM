<template>
    <div class="w-full h-full">
        <div class="flex justify-start items-center bg-accent-100 rounded-t-2xl p-5">
            <el-icon color="#FFF">
                <ArrowLeftBold />
            </el-icon>
            <p class="text-white text-lg font-bold flex-1">HyperStar</p>
        </div>
        <el-scrollbar>
            <div class="flex justify-start items-center flex-col h-[550px] p-5">

                <!-- 初始问话：你好!👋 我们能帮上什么忙？ -->
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

                <!-- 提问的大标题数组 -->
                <div v-if="currentQuestion === ''"
                    class="flex-1 flex justify-start items-end flex-col gap-2 w-full mt-32">
                    <div v-for="(question, index) in questions" :key="index" @click="selectQuestion(index)"
                        class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                        <p class="text-accent-200">{{ question.title }}</p>
                    </div>
                </div>
                <!-- 选择的提问的大标题 -->
                <div v-if="currentQuestion !== ''" class="w-full my-5">
                    <div class="flex justify-end items-center w-full">
                        <div class="bg-accent-100 rounded-lg p-5">
                            <p class="text-white">{{ currentQuestion.title }}</p>
                        </div>
                    </div>
                </div>
                <!-- 选择的提问的大标题后的生成中的样式 -->
                <div v-if="currentQuestion !== '' && loading" class="w-full">
                    <div class="flex justify-start items-center gap-5">
                        <img class="w-10 h-10"
                            src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                            alt="">
                        <div class="w-full bg-gray-100 rounded-lg p-5" v-loading="loading"
                            element-loading-text="生成中...">
                        </div>
                    </div>
                    <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 刚刚</p>
                </div>
                <!-- 选择的提问的大标题后的回复 -->
                <div v-if="currentQuestion !== '' && !loading" class="w-full">
                    <div class="flex justify-start items-center gap-5">
                        <img class="w-10 h-10"
                            src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                            alt="">
                        <div class="bg-gray-100 rounded-lg p-5">
                            <p class="text-left">谢谢你的回复。听起来你需要一些{{ currentQuestion.title }}方面的帮助。以下哪个主题最能描述您的问题？</p>
                        </div>
                    </div>
                    <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 刚刚</p>
                </div>
                <!-- 提问的副标题数组 -->
                <div v-if="currentQuestion !== '' && !loading && selectedSubQuestion === ''"
                    class="flex-1 flex justify-start items-end flex-col gap-2 w-full mt-10">
                    <div v-for="(subQuestion, index) in currentQuestion.subQuestions" :key="index"
                        @click="selectSubQuestion(subQuestion)"
                        class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                        <p class="text-accent-200">{{ subQuestion }}</p>
                    </div>
                </div>
                <!-- 选择的提问的副标题 -->
                <div v-if="selectedSubQuestion !== ''" class="w-full my-5">
                    <div class="flex justify-end items-center w-full">
                        <div class="bg-accent-100 rounded-lg p-5">
                            <p class="text-white">{{ selectedSubQuestion }}</p>
                        </div>
                    </div>
                </div>
                <!-- 选择的提问的副标题后的生成中的样式 -->
                <div v-if="selectedSubQuestion !== '' && loadingSubQuestion" class="w-full">
                    <div class="flex justify-start items-center gap-5">
                        <img class="w-10 h-10"
                            src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                            alt="">
                        <div class="w-full bg-gray-100 rounded-lg p-5" v-loading="loadingSubQuestion"
                            element-loading-text="生成中...">
                        </div>
                    </div>
                    <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 刚刚</p>
                </div>
                <!-- 选择的提问的副标题后的回复 -->
                <div v-if="selectedSubQuestion !== '' && !loadingSubQuestion" class="w-full">
                    <div class="flex justify-start items-center gap-5">
                        <img class="w-10 h-10"
                            src="https://static.intercomassets.com/avatars/6926984/square_128/custom_avatar-1708977529.png"
                            alt="">
                        <div class="bg-gray-100 rounded-lg p-5">
                            <p class="text-left" v-html="answer" ref="answerContent" @click="onImageClick"></p>
                        </div>
                    </div>
                    <p class="text-left text-sm text-gray-400 ml-16 mt-2">机器人 刚刚</p>
                </div>

                <!-- 重新开始按钮 -->
                <div v-if="selectedSubQuestion !== '' && !loadingSubQuestion"
                    class="flex justify-center items-center w-full mt-10">
                    <div @click="resetChat"
                        class="bg-accent-100 w-full flex justify-center items-center gap-5 rounded-lg p-3 text-white hover:bg-accent-200 cursor-pointer">
                        <el-icon size="20">
                            <Refresh />
                        </el-icon>
                        <p>重新开始</p>
                    </div>
                </div>
            </div>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

// 引入AIChat
import { AIChat } from '../utils/AIChat';
import { fetchMarkdown } from '../utils/fetchMarkdown';

const markdownContent = ref<string>('');
let systemContent = ref('');
let userContent = ref('');
let relatedArticle = ref('');
let answer = ref('');
const questions = ref([
    { title: "账户", subQuestions: ["创建一个帐户", "登录或退出", "编辑我的帐户信息", "如何收藏物品"], relatedArticlePath: "../article/开始使用.md" },
    { title: "全站排行", subQuestions: ["作用", "如何查看", "类型介绍","如何切换类型"] },
    { title: "了解个人信息", subQuestions: ["自己创建的藏品在哪", "怎么修改已创建藏品的价格","交易情况"] },
    { title: "独特功能", subQuestions: ["API文档", "开发者支持"] },
    { title: "开始创建数字藏品", subQuestions: ["帐户安全", "数据保护"] },
    { title: "特色活动", subQuestions: ["作用", "如何查看", "类型介绍","如何切换类型"] }
]);

const currentQuestion = ref<any>('');
const selectedSubQuestion = ref('');
const loading = ref(false);
const loadingSubQuestion = ref(false);
const answerContent = ref<HTMLElement | null>(null);
let viewer: Viewer | null = null;

const selectQuestion = async (index: number) => {
    markdownContent.value = await fetchMarkdown(questions.value[index].relatedArticlePath as string);
    currentQuestion.value = questions.value[index];
    
    loading.value = true;
    systemContent.value = currentQuestion.value.title;
    relatedArticle.value = markdownContent.value;
    console.log("relatedArticle:"+relatedArticle.value);
    setTimeout(() => {
        loading.value = false;
    }, 1000);
}

const selectSubQuestion = async (subQuestion: string) => {
    selectedSubQuestion.value = subQuestion;
    loadingSubQuestion.value = true;
    userContent.value = "怎么实现" + selectedSubQuestion.value;
    await AIChat(systemContent.value, userContent.value, relatedArticle.value).then((res) => {
        answer.value = res.replace(/\n/g, '<br>');
        loadingSubQuestion.value = false;
        nextTick(() => {
            if (answerContent.value) {
                viewer = new Viewer(answerContent.value, {
                    filter(image) {
                        return image.tagName === 'IMG';
                    }
                });
            }
        });
    });
}

const resetChat = () => {
    currentQuestion.value = '';
    selectedSubQuestion.value = '';
    if (viewer) {
        viewer.destroy();
        viewer = null;
    }
}

onMounted(() => {
    // Optional: Any other initialization logic
});

const onImageClick = () => {
    if (viewer) {
        viewer.show();
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
    border-radius: 12px;
}

:deep(.el-loading-spinner .path) {
    stroke: var(--accent-200);
}

:deep(.el-loading-spinner .el-loading-text) {
    color: var(--accent-200);
}
</style>