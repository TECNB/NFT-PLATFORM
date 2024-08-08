<template>
    <div class="Text2ImgView">
        <div class="flex justify-between items-center">
            <div class="text-left">
                <p class="text-accent-200 font-bold text-3xl">AI文生图</p>
                <p class="text-accent-100 font-bold text-lg">基于大规模预训练模型的文本到图像生成工具，用户可以通过输入文本描述，生成对应的图像。</p>
            </div>
            <div class="w-20 bg-accent-200 p-3 rounded-xl cursor-pointer" @click="handleSave">
                <p class="text-white font-bold">保存</p>
            </div>

        </div>
        <div class="border border-gray-300 rounded-xl p-5 mt-5">
            <div class="flex-col">
                <div class="">
                    <div class="flex justify-start items-center gap-4">
                        <el-icon color="#8B5FBF" size="20">
                            <CirclePlusFilled />
                        </el-icon>
                        <p class="text-xl font-bold text-gray-500">正向提示词</p>
                    </div>
                    <el-input v-model="prompt" class="w-full mt-5" :rows="3" type="textarea" placeholder="请输入正向提示词" />
                </div>
                <div class="mt-5">
                    <div class="flex justify-start items-center gap-4">
                        <el-icon color="#8B5FBF" size="20">
                            <RemoveFilled />
                        </el-icon>
                        <p class="text-xl font-bold text-gray-500">反向提示词</p>
                    </div>
                    <el-input v-model="negativePrompt" class="w-full mt-5" :rows="3" type="textarea"
                        placeholder="请输入反向提示词" />
                </div>
            </div>
            <div class="w-full flex justify-between items-center gap-5 border border-gray-300 rounded-xl p-5 mt-5">
                <!-- 具体参数部分 -->
                <div class="text-left w-1/2 flex flex-col gap-5">
                    <div class="flex justify-between items-start w-full gap-5">
                        <div class="w-1/2">
                            <p class="text-base font-bold text-gray-500">采样器</p>
                            <el-select v-model="samplerId" placeholder="请点击选择采样器" size="large" :teleported="false"
                                clearable class="w-1/2 mt-2">
                                <el-option v-for="item in samplerType" :key="item.objectId" :label="item.name"
                                    :value="item.objectId" />
                            </el-select>
                        </div>
                        <div class="w-1/2">
                            <div class="flex justify-between items-center">

                                <p class="text-base font-bold text-gray-500">采样迭代步数</p>
                                <el-input-number v-model="steps" :min="10" :max="70" size="small" :step="1" />
                            </div>

                            <el-slider v-model="steps" :min="10" max="70" class="mt-2" />
                        </div>
                    </div>

                    <div class="flex justify-between items-start w-full gap-5">
                        <div class="w-1/2">
                            <div class="flex justify-between items-center">
                                <p class="text-base font-bold text-gray-500">宽度</p>
                                <el-input-number v-model="width" :min="64" :max="1024" size="small" :step="1" />
                            </div>

                            <el-slider v-model="width" :min="64" :max="1024" class="mt-2" />
                        </div>
                        <div class="w-1/2">
                            <div class="flex justify-between items-center">
                                <p class="text-base font-bold text-gray-500">高度</p>
                                <el-input-number v-model="height" :min="64" :max="1024" size="small" :step="1" />
                            </div>

                            <el-slider v-model="height" :min="64" :max="1024" class="mt-2" />
                        </div>
                    </div>
                    <div class="">
                        <div class="flex justify-between items-center">
                            <p class="text-base font-bold text-gray-500">提示词相关性</p>
                            <el-input-number v-model="CFGScale" :min="1" :max="30" size="small" :step="1" />
                        </div>

                        <el-slider v-model="CFGScale" :min="1" :max="30" class="mt-2" />
                    </div>

                    <div class="">
                        <p class="text-base font-bold text-gray-500">图片风格</p>
                        <el-select v-model="categoryId" placeholder="请点击选择图片风格" size="large" :teleported="false"
                            clearable class="w-1/2 mt-2">
                            <el-option v-for="item in paintingType" :key="item.objectId" :label="item.name"
                                :value="item.objectId" />
                        </el-select>
                    </div>

                </div>

                <!-- 输出图片部分 -->
                <div class="text-left w-1/2">
                    <!-- 进度条部分 -->
                    <el-progress status="success" :text-inside="true" :stroke-width="18" class="mb-5"
                        v-if="progressLoading" color="#9A73B5" :percentage="progress" />
                    <div class="flex-1 h-[350px] flex justify-center" id="loading">
                        <div v-if="!uploadedImage" v-loading="loading" element-loading-text="生成中..."
                            class="flex flex-col justify-center items-center gap-5 h-full w-full border border-dashed border-text-200 rounded-2xl mt-30 bg-bg-200 cursor-pointer transition-bg-20 hover:border-solid hover:border-text-200 hover:bg-rgba-18-18-18-0.04">

                            <div class="flex justify-start items-center gap-2 bg-accent-100 text-black border rounded-2xl cursor-pointer p-2"
                                v-if="!loading" v-loading="loading" @click="handleText2Img">
                                <el-icon>
                                    <Promotion />
                                </el-icon>
                                <p class="font-medium">点击生图</p>
                            </div>
                            <div class="flex justify-start items-center gap-2 bg-accent-100 text-black border rounded-2xl cursor-pointer p-2"
                                v-else>
                                <p class="font-medium"></p>
                            </div>
                        </div>
                        <div v-else
                            class="flex flex-col justify-center items-center gap-5 h-[350px] w-full rounded-2xl mt-30 bg-bg-200 cursor-pointer"
                            v-loading="loading" element-loading-text="重新生成中...">
                            <img class="w-auto h-full object-contain rounded-2xl" :src="uploadedImage" ref="image"
                                :data-source="uploadedImage" alt="上传的图片" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { ElLoading } from 'element-plus'

import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

import { translateText } from "../utils/TranslateText";
import { paintingStyle } from "../constant/paintingStyle";
import { sampler } from "../constant/sampler";

import { getFileObject } from "../utils/GetFileObject";

import { AIData } from "../interfaces/AIData"

import { uploadImage, text2Img, text2ImgSd, getProgress } from "../api/collections"
import router from '../router';


const props = defineProps(['ifShow', 'uploadImage']);
const emit = defineEmits();


let samplerType = sampler;
let paintingType = paintingStyle;

let aiData: AIData = {
    aiCreator: false,
    aiDescription: "",
    aiNegDescription: "",
    aistyle: "",
    aiImage: ""
};

// 定义prompt
let prompt = ref('')
// 定义negativePrompt
let negativePrompt = ref('')
let loading = ref(false);
let progressLoading = ref(false);
let saveLoading = ref(false);
let categoryId = ref("");
let samplerId = ref("");
let categoryName = ref("");

let steps = ref(20)
let width = ref(512)
let height = ref(512)
let CFGScale = ref(7)

let viewer: Viewer | null = null;

const progress = ref(0);
const progressImage = ref<string | null>(null);

// 定义上传后的图片URL
const uploadedImage = ref<string | null>(null);
// 定义一个 ref 变量来存储转化后的 file 对象
const fileData = ref<File | null>(null);

const image = ref<HTMLImageElement | null>(null);

let hasProgressBeenNonZero = false;  // 新增的布尔变量






// 实现toggleVisibility方法
// 用于关闭AIBox
const toggleVisibility = () => {
    emit('updateIfShow', false);
};

// 实现handleText2Img方法
const handleText2Img = async () => {
    // if (isEmpty()) {
    //     ElMessage.error("prompt以及negativePrompt不能为空")
    //     return;
    // }
    loading.value = true;
    progressLoading.value = true;

    // 启动进度更新定时器
    const progressInterval = setInterval(getProgressUpdates, 1000);

    // 根据categoryId从allType中找到对应的loraPrompt
    const loraPrompt = paintingType.find(item => item.objectId === categoryId.value)?.loraPrompt as string;
    const samplerName = samplerType.find(item => item.objectId === samplerId.value)?.name as string;

    // 调用翻译接口将prompt以及negativePrompt翻译为英文
    // TODO: 这块代码写的有点丑陋，后续有机会回来优化一下
    let promptEN = prompt.value;
    let negativePromptEN = negativePrompt.value;

    await translateText(prompt.value).then(res => {
        promptEN = res;
    }).catch(err => {
        console.log(err);
    });
    await translateText(negativePrompt.value).then(res => {
        negativePromptEN = res;
    }).catch(err => {
        console.log(err);
    });

    const requestData = {
        "prompt": loraPrompt + promptEN,
        "negative_prompt": negativePromptEN,
        "steps": steps.value,
        "cfg_scale": CFGScale.value,
        "width": width.value,
        "height": height.value,
        "sampler_name": samplerName,
    };

    await text2ImgSd(requestData).then(res => {
        const base64Data = res?.data?.images[0];
        progress.value = 0;  // 将进度条设置为 0

        if (base64Data) {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });
            uploadedImage.value = URL.createObjectURL(blob);
            loading.value = false;
            progressLoading.value = false;
            ElMessage.success("生成图片成功,点击保存后返回");


            // 使用 nextTick 确保 DOM 已更新，然后初始化 Viewer.js
            nextTick(() => {
                if (image.value) {
                    viewer = new Viewer(image.value, {
                        inline: false,
                        button: true,
                        navbar: true,
                        title: true,
                        toolbar: true,
                        tooltip: true,
                        movable: true,
                        zoomable: true,
                        rotatable: true,
                        scalable: true,
                        transition: true,
                        fullscreen: true,
                        keyboard: true,
                        url: 'data-source'
                    });
                }
            });
        } else {
            throw new Error("生成图片失败");
        }
    }).catch((err) => {
        console.log(err);
        loading.value = false;
        ElMessage.error("生成图片失败");
    }).finally(() => {

        // 停止进度更新定时器
        clearInterval(progressInterval);
    });

    // 调用V3接口
    // body参数为requestData

    // const { authorization, timestamp } = V3(config, requestData)
    // const headers = {
    //     Authorization: authorization,
    //     "X-TC-Timestamp": timestamp
    // }



    // await text2Img(requestData, headers).then(res => {
    //     uploadedImage.value = res?.data?.Response?.ResultImage;
    //     loading.value = false;
    //     ElMessage.success("生成图片成功,点击保存后返回")
    // }).catch((err) => {
    //     console.log(err);
    // })
}

const getProgressUpdates = async () => {
    if (loading.value) {
        await getProgress().then(res => {
            console.log("获取进度成功", res);
            // 将 progress.value 转换为数字并乘以 100，然后转换回字符串赋值给 res.data.progress
            progress.value = (parseFloat(res.data.progress) * 100);
            // 不保留小数
            progress.value = Math.floor(progress.value);

            // 检查 progress.value 是否曾经不为 0
            if (progress.value !== 0) {
                hasProgressBeenNonZero = true;
            }

            // 如果 progress.value 为 0 并且 hasProgressBeenNonZero 为 true，则将其设置为 100
            if (progress.value === 0 && hasProgressBeenNonZero) {
                progress.value = 100;
            }

            console.log("progress", progress.value);
            if (res.data.current_image) {
                progressImage.value = res.data.current_image;


                const byteCharacters = atob(progressImage.value);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/png' });
                uploadedImage.value = URL.createObjectURL(blob);
                loading.value = false;
            }
            console.log("progressImage", progressImage.value);
        }).catch(err => {
            console.log("获取进度失败", err);
        });
    }
}

const handleSave = async () => {
    saveLoading.value = true;
    const formData = new FormData();
    // 将uploadedImage.value去掉https://aiart-1258344699.cos.ap-guangzhou.myqcloud.com/text_to_img前缀
    // 并在前面加上/tencent-download-api
    // 作为下载图片的URL
    let text2ImgUrl = uploadedImage.value;
    const loading = ElLoading.service({
        lock: true,
        text: '保存中',
        background: 'rgba(255,2555,255, 0.9)',
        customClass: 'saveLoading'
    })



    // 发送 GET 请求获取文件内容并转化为 file 对象
    fileData.value = await getFileObject(text2ImgUrl!);

    formData.append('file', fileData.value!);
    formData.append('type', 'collection');

    await uploadImage(formData)
        .then(res => {
            ElMessage.success("保存成功");
            categoryName.value = paintingType.find(item => item.objectId === categoryId.value)?.name as string;

            aiData.aiImage = res as string;
            aiData.aiCreator = true;
            aiData.aiDescription = prompt.value;
            aiData.aiNegDescription = negativePrompt.value;
            aiData.aistyle = categoryName.value;



            emit('saveSuccess', aiData);  // 保存成功后，将图片URL传递给父组件
            saveLoading.value = false;
            loading.close()



            toggleVisibility();  // 关闭AIBox 

        })
        .catch(err => {
            console.log(err);
        });

    console.log(aiData);
    // 跳转至CreateNftView，并携带参数aiData
    router.push({
        name: 'CreateNftView',
        state: { aiData: JSON.stringify(aiData) }
    });
};

// 判断prompt以及negativePrompt是否为空
const isEmpty = () => {
    return prompt.value === '' || negativePrompt.value === '';
}
</script>

<style lang="scss" scoped>
.Text2ImgView {}

// 下面为textarea部分
:deep(.el-textarea__inner) {
    border-radius: 10px;
}

:deep(.el-textarea__inner:focus) {
    outline: 0;
    box-shadow: 0 0 0 1px var(--accent-200) inset;
}


// 下面为el-select部分
@mixin select_radius {
    border-radius: 10px;
}


// 控制el-select的长度以及圆角
:deep(.el-select__wrapper) {
    width: 100%;
    height: 40px;
    @include select_radius;
}

// 控制el-select中文字的样式
:deep(.el-select__placeholder) {
    color: var(--text-200);
    font-size: 16px;
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

// 下面是滑块部分
:deep(.el-slider__button) {
    border: solid 2px var(--accent-200);
}

:deep(.el-slider__bar) {
    background-color: var(--accent-200)
}

// 下面是数字输入框部分
:deep(.el-input) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
    border-radius: 12px;
}

:deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__increase:hover) {
    color: var(--accent-200);
}

:deep(.el-input-number__decrease:hover) {
    color: var(--accent-200);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset !important;
}


// 下面为loading的样式
:deep(#loading .el-loading-mask) {
    border-radius: 16px;
}

:deep(#loading .el-loading-spinner .path) {
    stroke: var(--accent-200);
}

:deep(#loading .el-loading-spinner .el-loading-text) {
    color: var(--accent-200);
}

:deep(.el-loading-spinner .circular .path) {
    stroke: var(--accent-200);
}

.el-loading-spinner .el-loading-text {
    color: var(--accent-200) !important;
}
</style>
