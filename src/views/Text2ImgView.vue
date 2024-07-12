<template>
    <div class="Text2ImgView">
        <div class="flex justify-between items-center">
            <div class="text-left">
                <p class="text-accent-200 font-bold text-3xl">AI文生图</p>
                <p class="text-accent-100 font-bold text-lg">基于大规模预训练模型的文本到图像生成工具，用户可以通过输入文本描述，生成对应的图像。</p>
            </div>
            <div class="w-20 bg-accent-200 p-3 rounded-xl" @click="handleSave">
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
                    <el-input v-model="prompt" class="w-full mt-5" :rows="3" type="textarea" placeholder="正向提示词" />
                </div>
                <div class="mt-5">
                    <div class="flex justify-start items-center gap-4">
                        <el-icon color="#8B5FBF" size="20">
                            <RemoveFilled />
                        </el-icon>
                        <p class="text-xl font-bold text-gray-500">反向提示词</p>
                    </div>
                    <el-input v-model="prompt" class="w-full mt-5" :rows="3" type="textarea" placeholder="正向提示词" />
                </div>
            </div>
            <div class="w-full flex justify-between items-center gap-5 border border-gray-300 rounded-xl p-5 mt-5">
                <!-- 具体参数部分 -->
                <div class="text-left w-1/2">
                    <div class="flex justify-between items-start w-full gap-5">
                        <div class="w-1/2">
                            <p class="text-base font-bold text-gray-500">采样器</p>
                            <el-select v-model="categoryId" placeholder="请点击选择采样器" size="large" :teleported="false"
                                clearable class="w-1/2 mt-2">
                                <el-option v-for="item in allType" :key="item.objectId" :label="item.name"
                                    :value="item.objectId" />
                            </el-select>
                        </div>
                        <div class="w-1/2">
                            <div class="flex justify-between items-center">

                                <p class="text-base font-bold text-gray-500">采样迭代步数</p>
                                <el-input-number :disabled="ifDisabled" v-model="steps" :min="0" :max="70" size="small"
                                    @change="handleChange(index, $event)" :step="1" />
                            </div>

                            <el-slider v-model="steps" max="70" class="mt-2"/>
                        </div>
                    </div>

                </div>
                <!-- 输出图片部分 -->
                <div class="text-left w-1/2">
                    <div class="">
                        <p class="text-base font-bold text-gray-500">采样器</p>
                        <el-select v-model="categoryId" placeholder="请点击选择采样器" size="large" :teleported="false"
                            clearable class="w-1/2 mt-2">
                            <el-option v-for="item in allType" :key="item.objectId" :label="item.name"
                                :value="item.objectId" />
                        </el-select>
                    </div>


                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { translateText } from "../utils/TranslateText";
import { sampler } from "../constant/sampler";

import { getFileObject } from "../utils/GetFileObject";

import { AIData } from "../interfaces/AIData"

import { uploadImage, text2Img, text2ImgSd } from "../api/collections"
import router from '../router';


const props = defineProps(['ifShow', 'uploadImage']);
const emit = defineEmits();


let allType = sampler;
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
let saveLoading = ref(false);
let categoryId = ref("");
let categoryName = ref("");

let steps = ref(0)
// 定义上传后的图片URL
const uploadedImage = ref<string | null>(null);
// 定义一个 ref 变量来存储转化后的 file 对象
const fileData = ref<File | null>(null);

let num = ref(1);
const handleChange = (value: number) => {
    console.log(value);
};




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
    console.log("触发前" + loading.value);


    // 根据categoryId从allType中找到对应的loraPrompt
    // const loraPrompt = allType.find(item => item.objectId === categoryId.value)?.loraPrompt as string;
    const loraPrompt = categoryId.value;

    // 调用翻译接口将prompt以及negativePrompt翻译为英文
    // TODO: 这块代码写的有点丑陋，后续有机会回来优化一下
    let promptEN = prompt.value;
    let negativePromptEN = negativePrompt.value;

    await translateText(prompt.value).then(res => {
        promptEN = res;
    }).catch(err => {
        console.log(err);
    })
    await translateText(negativePrompt.value).then(res => {
        negativePromptEN = res;
    }).catch(err => {
        console.log(err);
    })


    const requestData = {
        "prompt": loraPrompt + promptEN,
        "negative_prompt": negativePromptEN,
        "steps": 20,
        "cfg_scale": 7.0,
        "height": 1024,
        "width": 1024,
        "sampler_name": "DPM++ 2M SDE",
    };



    await text2ImgSd(requestData).then(res => {
        const base64Data = res?.data?.images[0];

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
            console.log("触发后" + loading.value);
            ElMessage.success("生成图片成功,点击保存后返回");
        } else {
            throw new Error("生成图片失败");
        }
    }).catch((err) => {
        console.log(err);
        loading.value = false;
        ElMessage.error("生成图片失败");
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

const handleSave = async () => {
    saveLoading.value = true;
    const formData = new FormData();
    // 将uploadedImage.value去掉https://aiart-1258344699.cos.ap-guangzhou.myqcloud.com/text_to_img前缀
    // 并在前面加上/tencent-download-api
    // 作为下载图片的URL
    let text2ImgUrl = uploadedImage.value;


    // 发送 GET 请求获取文件内容并转化为 file 对象
    fileData.value = await getFileObject(text2ImgUrl!);

    formData.append('file', fileData.value!);
    formData.append('type', 'collection');

    await uploadImage(formData)
        .then(res => {
            ElMessage.success("保存成功");
            categoryName.value = allType.find(item => item.objectId === categoryId.value)?.name as string;

            aiData.aiImage = res as string;
            aiData.aiCreator = true;
            aiData.aiDescription = prompt.value;
            aiData.aiNegDescription = negativePrompt.value;
            aiData.aistyle = categoryName.value;



            emit('saveSuccess', aiData);  // 保存成功后，将图片URL传递给父组件
            saveLoading.value = false;
            toggleVisibility();  // 关闭AIBox 
        })
        .catch(err => {
            console.log(err);
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
</style>
