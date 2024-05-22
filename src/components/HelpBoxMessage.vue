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
                </div>
                <!-- 提问的副标题数组 -->
                <!-- <div v-if="currentQuestion !== '' && !loading && selectedSubQuestion === ''"
                    class="flex-1 flex justify-start items-end flex-col gap-2 w-full mt-10">
                    <div v-for="(subQuestion, index) in currentQuestion.subQuestions" :key="index"
                        @click="selectSubQuestion(subQuestion)"
                        class="bg-bg-100 rounded-lg w-max p-3 cursor-pointer hover:bg-accent-100">
                        <p class="text-accent-200">{{ subQuestion }}</p>
                    </div>
                </div> -->
                
                <!-- 提问的副标题的输入框 -->
                <div class="w-full flex items-center mt-48 gap-2"
                    v-if="currentQuestion !== '' && !loading && selectedSubQuestion === ''">
                    <div class="flex justify-center items-center bg-bg-100 hover:bg-bg-200 h-full aspect-square rounded-full cursor-pointer"  @click="resetChat()">
                        <el-icon color="var(--primary-100)">
                            <Plus />
                        </el-icon>
                    </div>
                    <el-input v-model="inputSubQuestion" placeholder="给“AI客服”发送消息">
                        <!-- <template #prefix>
                            <el-icon color="var(--text-100)" class="el-input__icon">
                                <UserFilled />
                            </el-icon>

                        </template> -->
                    </el-input>
                    <div class="flex justify-center items-center bg-accent-100 hover:bg-accent-200 h-full aspect-square rounded-lg cursor-pointer"  @click="selectSubQuestion(inputSubQuestion)">
                        <el-icon color="#FFF">
                            <Position />
                        </el-icon>
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
                    <div class="flex justify-start items-center ml-16 mt-3" v-if="ifEnd">
                        <p>相关文章:</p>
                        <router-link :to="'/help/' + currentQuestion.relatedArticlePath"
                            class="text-accent-100 hover:text-primary-100">点击查看</router-link>
                    </div>
                </div>

                <!-- 重新开始按钮 -->
                <!-- <div v-if="selectedSubQuestion !== '' && !loadingSubQuestion"
                    class="flex justify-center items-center w-full mt-10">
                    <div @click="resetChat"
                        class="bg-accent-100 w-full flex justify-center items-center gap-5 rounded-lg p-3 text-white hover:bg-accent-200 cursor-pointer">
                        <el-icon size="20">
                            <Refresh />
                        </el-icon>
                        <p>重新开始</p>
                    </div>
                </div> -->
            </div>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { AIChat } from '../utils/AIChat';
import { fetchMarkdown } from '../utils/fetchMarkdown';

const markdownContent = ref<string>('');
let systemContent = ref('');
let userContent = ref('');
let relatedArticle = ref('');
let answer = ref('');
const questions = ref([
    { title: "账户", subQuestions: ["创建一个帐户", "登录或退出", "编辑我的帐户信息", "如何收藏物品"], relatedArticlePath: "start" },
    { title: "全站排行", subQuestions: ["作用", "如何查看", "类型介绍", "如何切换类型"], relatedArticlePath: "ranking" },
    { title: "了解个人信息", subQuestions: ["自己创建的藏品在哪", "怎么修改已创建藏品的价格", "交易情况"], relatedArticlePath: "profile" },
    { title: "独特功能", subQuestions: ["如何使用AI创作功能", "如何获取空投", "如何使用AI客服"], relatedArticlePath: "benefits" },
    { title: "开始创建数字藏品", subQuestions: ["如何创建数字藏品", "上传内容规定"], relatedArticlePath: "createNft" },
    { title: "特色活动", subQuestions: ["作用", "如何查看", "类型介绍", "如何切换类型"], relatedArticlePath: "specialEvents" }
]);

const currentQuestion = ref<any>('');
const selectedSubQuestion = ref('');
const inputSubQuestion = ref('');
const loading = ref(false);
const loadingSubQuestion = ref(false);
const answerContent = ref<HTMLElement | null>(null);
let viewer: Viewer | null = null;
let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

const ifEnd = ref(false);

const selectQuestion = async (index: number) => {
    markdownContent.value = await fetchMarkdown(questions.value[index].relatedArticlePath as string);
    currentQuestion.value = questions.value[index];

    loading.value = true;
    systemContent.value = currentQuestion.value.title;
    relatedArticle.value = markdownContent.value;
    setTimeout(() => {
        loading.value = false;
    }, 1000);
}

const selectSubQuestion = async (subQuestion: string) => {
    selectedSubQuestion.value = subQuestion;
    loadingSubQuestion.value = true;
    userContent.value = `${selectedSubQuestion.value}`;

    console.log('systemContent:', systemContent.value);
    console.log('userContent:', userContent.value);
    console.log('relatedArticle:', relatedArticle.value);

    try {
        const response = await AIChat(systemContent.value, userContent.value, relatedArticle.value);
        answer.value = '';
        reader = response.body?.getReader() || null;  // 获取流读取器
        const decoder = new TextDecoder('utf-8');  // 创建文本解码器

        let typingEffect = '';
        let delay = 20;  // 打字效果的延迟时间
        let firstContentReceived = false;
        let partialData = '';
        let imgTagBuffer = '';  // 用于存储完整的 <img> 标签内容
        let isImgTag = false;  // 标记是否正在处理 <img> 标签

        // 更新显示文本的函数
        const typeText = async (text: string) => {
            for (const char of text) {
                typingEffect += char;
                answer.value = typingEffect.replace(/\n/g, '<br>');
                await new Promise(resolve => setTimeout(resolve, delay));  // 延迟模拟打字效果
            }
        };

        // 处理流数据的异步函数
        const processStream = async () => {
            ifEnd.value = false;
            while (true) {
                if (!reader) break;
                const { value, done } = await reader.read();  // 读取流数据
                if (done) break;

                // 将二进制数据解码为字符串
                const text = decoder.decode(value, { stream: true });
                partialData += text;  // 将新数据追加到 partialData 中
                const lines = partialData.split('\n');  // 按行分割数据

                // 处理每一行数据
                for (let i = 0; i < lines.length - 1; i++) {
                    const line = lines[i];
                    if (line.trim() === 'data: [DONE]') {  // 检查是否为结束标志
                        ifEnd.value = true;
                        return;
                    }
                    if (line.startsWith('data: ')) {  // 检查行是否以 'data: ' 开头
                        const jsonStr = line.substring(6);  // 获取 JSON 字符串
                        if (jsonStr) {
                            try {
                                const jsonObj = JSON.parse(jsonStr);  // 解析 JSON 字符串
                                const content = jsonObj.choices[0]?.delta?.content;  // 获取内容
                                if (content) {
                                    if (!firstContentReceived) {
                                        firstContentReceived = true;
                                        loadingSubQuestion.value = false;  // 第一次收到内容后停止加载指示
                                    }
                                    // console.log('content:', content);  // 打印内容

                                    // 检查是否是 img 标签
                                    if (content.includes('img')) {
                                        console.log('检测到image标签');  // 输出完整的 img 标签内容
                                        console.log('img 标签开始时answer.value:', answer.value);  // 输出完整的 img 标签内容
                                        isImgTag = true;
                                        imgTagBuffer += content;
                                    } else if (isImgTag) {
                                        imgTagBuffer += content;
                                        if (content.includes('>')) {  // 检查 img 标签是否结束
                                            isImgTag = false;
                                            typingEffect += imgTagBuffer;
                                            answer.value = typingEffect.replace(/\n/g, '<br>');
                                            console.log('img 标签结束时answer.value:', answer.value);  // 输出完整的 img 标签内容

                                            imgTagBuffer = '';  // 清空缓冲区
                                        }
                                    } else {
                                        await typeText(content);
                                    }
                                }
                            } catch (e) {
                                console.error('Error parsing JSON:', e);  // 解析 JSON 出错时输出错误信息
                            }
                        }
                    }
                }
                partialData = lines[lines.length - 1];  // 保留最后一个未处理的部分
            }
        };

        processStream();  // 调用处理流的函数
    } catch (error) {
        console.error(error);
        loadingSubQuestion.value = false;  // 出错时停止加载指示
    }
}

// 重置聊天的函数
const resetChat = () => {
    currentQuestion.value = '';
    selectedSubQuestion.value = '';
    answer.value = '';
    if (viewer) {
        viewer.destroy();
        viewer = null;
    }
    if (reader) {
        reader.cancel();
        reader = null;
    }
}

// 在组件挂载时执行的函数
onMounted(() => {

});
const onImageClick = () => {
    // 可选：其他初始化逻辑
    nextTick(() => {
        if (answerContent.value) {
            viewer = new Viewer(answerContent.value, {
                url: 'src',
            });
        }
    });
}
const search = async () => {
    // 搜索逻辑
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

.el-input {
    height: 40px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: white;

    font-size: 18px;
    font-weight: 500;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: white;

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}
</style>