<template>
    <div class="AIBox" v-loading="saveLoading" element-loading-text="保存中..." v-if="props.ifShow">
        <div class="Background">
            <div class="Close" @click="toggleVisibility">
                <el-icon class="w-[90%] h-[90%] rounded-full object-cover aspect-square">
                    <Close />
                </el-icon>
            </div>
            <div class="Logo">
                <el-icon size="50" color="var(--accent-200)"
                    class="w-[90%] h-[90%] rounded-full object-cover aspect-square">
                    <Promotion />
                </el-icon>
            </div>
        </div>
        <div class="flex justify-center items-end gap-5">
            <div class="flex-1 h-[400px] flex justify-center">
                <div v-if="!uploadedImage" v-loading="loading" element-loading-text="生成中..."
                    class="flex flex-col justify-center items-center gap-5 min-h-96 w-full border border-dashed border-text-200 rounded-2xl mt-30 bg-bg-200 cursor-pointer transition-bg-20 hover:border-solid hover:border-text-200 hover:bg-rgba-18-18-18-0.04">

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
                <div v-else class="flex flex-col justify-center items-center gap-5 min-h-96 w-full rounded-2xl mt-30 bg-bg-200 cursor-pointer" v-loading="loading" element-loading-text="重新生成中..." >
                    <img class="w-auto h-full object-contain rounded-2xl" :src="uploadedImage" alt="上传的图片" />
                </div>
                
            </div>
            <div class="flex-1 flex justify-between flex-col gap-5 h-[420px] pt-10">
                <!-- 下面为文本描述输入框 -->
                <div class="">
                    <p class="font-medium text-2xl text-neutral-500 mb-5">AI生图参数</p>
                    <el-input v-model="prompt" placeholder="文本描述" class="mt-4">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <InfoFilled />
                            </el-icon>
                        </template>
                    </el-input>
                    <!-- 下面为反向文本描述输入框 -->
                    <el-input v-model="negativePrompt" placeholder="反向文本描述" class="mt-4">

                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <WarnTriangleFilled />
                            </el-icon>
                        </template>
                    </el-input>
                    <el-select v-model="categoryId" placeholder="请点击选择图片风格" size="large" :teleported="false" clearable
                        class="w-full mt-5">
                        <el-option v-for="item in allType" :key="item.objectId" :label="item.name"
                            :value="item.objectId" />
                    </el-select>
                    <router-link to="/text2Img" class="block text-accent-200 text-lg font-bold text-right mt-5 hover:text-accent-100">查看更多参数</router-link>
                </div>

                <div class="Button">
                    <div class="Sign" v-if="!uploadedImage" @click="handleText2Img">
                        <p>生成</p>
                    </div>
                    <div class="Sign" v-else @click="handleText2Img">
                        <p>重新生成</p>
                    </div>
                    <div class="Login" @click="handleSave">
                        <p>保存</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


import config from "../constant/config";
import { V3 } from "../utils/V3";
import { translateText } from "../utils/TranslateText";
import { paintingStyle } from "../constant/paintingStyle";
import { getFileObject } from "../utils/GetFileObject";

import { Type } from "../interfaces/Type";
import { AIData } from "../interfaces/AIData"

import { uploadImage, text2Img, text2ImgSd } from "../api/collections"
import router from '../router';


const props = defineProps(['ifShow', 'uploadImage']);
const emit = defineEmits();


let allType = paintingStyle;
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
// 定义上传后的图片URL
const uploadedImage = ref<string | null>(null);
// 定义一个 ref 变量来存储转化后的 file 对象
const fileData = ref<File | null>(null);




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
    console.log("触发前"+loading.value);


    // 根据categoryId从allType中找到对应的loraPrompt
    const loraPrompt = allType.find(item => item.objectId === categoryId.value)?.loraPrompt as string;

    // 调用翻译接口将prompt以及negativePrompt翻译为英文
    // TODO: 这块代码写的有点丑陋，后续有机会回来优化一下
    let promptEN = prompt.value;
    let negativePromptEN = negativePrompt.value;

    await translateText (prompt.value).then(res => {
        promptEN = res;
    }).catch(err => {
        console.log(err);
    })
    await translateText (negativePrompt.value).then(res => {
        negativePromptEN = res;
    }).catch(err => {
        console.log(err);
    })


    const requestData = {
        "prompt": loraPrompt+promptEN,
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
            console.log("触发后"+loading.value);
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
.AIBox {
    width: 60%;



    position: absolute;
    z-index: 99999;

    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #ffffff;
    border-radius: 20px;
    text-align: left;

    padding: 20px;

    .Background {
        height: 20vh;

        position: relative;

        background-color: var(--bg-200);
        border-radius: 20px 20px 0px 0px;
        // 背景图片为https://opensea.io/static/images/wallet/background-wallet.png



        margin-left: -20px;
        margin-right: -20px;
        margin-top: -20px;

        .Close {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;

            /* 设置绝对定位，相对于包含它的 .UserInfo 定位 */
            right: 5%;
            top: 10%;
            width: 5vh;
            height: 5vh;

            border-radius: 50%;
            background-color: white;

            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        }

        .Logo {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;

            /* 设置绝对定位，相对于包含它的 .UserInfo 定位 */
            left: 5%;
            bottom: -10%;
            width: 10vh;
            height: 10vh;

            border-radius: 50%;
            background-color: white;

            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        }
    }

    .Title {
        font-size: 24px;
        color: var(--text-100);
        font-weight: bold;

        margin-top: 50px;
    }

    .el-input {
        height: 50px;
        background-color: #FFFFFF;


        border: 0.5px solid var(--text-200);

        font-size: 18px;

        border: 0px;
        font-weight: bold;

        :deep(.el-input__wrapper) {
            border-radius: 12px;


        }

        :deep(.is-focus) {

            box-shadow: 0 0 0 1px var(--accent-200)
        }


        .Input {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: #FFFFFF;

            border-radius: 12px;
            border: 0.5px solid var(--text-200);

            padding: 12px;
            margin-top: 20px;

            input {
                outline: none;
                padding-left: 10px;
                font-size: 18px;
                width: 200px;
                border: 0px;
                font-weight: bold;
            }
        }


    }

    .Button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        .Login {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-200);
            color: var(--accent-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;
            cursor: pointer;


            padding: 12px;

        }

        .Sign {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-100);
            color: var(--text-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;
            cursor: pointer;


            padding: 12px;
        }
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


// 下面为loading的样式
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