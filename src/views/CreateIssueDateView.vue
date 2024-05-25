<template>
    <div class="CreateIssueDateView">
        <div class="CreateSeriesViewHead">
            <div class="CreateSeriesViewHeadBack" @click="toCreate()">
                <el-icon :size="20">
                    <Back />
                </el-icon>
            </div>
            <div class="flex justify-start items-center gap-2 bg-accent-100 text-black border rounded-2xl cursor-pointer p-2"
                @click="handleAddCollection">
                <el-icon>
                    <Plus />
                </el-icon>
                <p class="font-medium">保存</p>
            </div>
        </div>
        <div class="CreateSeriesViewBody">
            <div class="CreateSeriesViewBodyLeft">
                <p style="font-size: 36px;font-weight: bold;">创建发行计划</p>
                <p style="font-size: 20px;margin-top: 10px;"> 铸造发行计划后，您将无法更改其任何信息。</p>
                <div v-if="!uploadedImage" @click="openFileInput" v-loading="loading" element-loading-text="上传图片中..."
                    class="flex flex-col justify-center items-center gap-5 min-h-96 w-full border border-dashed border-text-200 rounded-2xl mt-30 bg-bg-200 cursor-pointer transition-bg-20 mt-12 hover:border-solid hover:border-text-200 hover:bg-rgba-18-18-18-0.04">
                    <div v-if="!loading" class=" flex flex-col justify-center items-center gap-5">
                        <el-icon size="40">
                            <Upload />
                        </el-icon>
                        <p class="text-16 text-accent-100 font-bold">
                            拖拽媒体或点击选择文件
                        </p>
                        <p> 最大尺寸:50MB</p>
                        <div class="flex justify-start items-center gap-2 bg-accent-100 text-black border rounded-2xl cursor-pointer p-2"
                            @click.native.stop.prevent="updateIsAIBoxVisible(true)">
                            <el-icon>
                                <Promotion />
                            </el-icon>
                            <p class="font-medium">AI辅助生图</p>
                        </div>
                        <input id="fileInput" type="file" ref="fileInput" style="display: none;" @change="uploadFile">
                    </div>
                    <div v-else class="">

                    </div>
                </div>
                <img class="w-full min-h-96 rounded-xl object-cover" v-else :src="uploadedImage" alt="上传的图片" />
            </div>
            <div class="CreateSeriesViewBodyRight">
                <p class="text-xl font-medium py-3">名字</p>
                <!-- 下面为藏品名称搜索框 -->
                <el-input v-model="name" placeholder="命名您的发行计划" class=""></el-input>

                <p class="text-xl font-medium py-3">简要介绍</p>
                <el-input v-model="shortDescription" placeholder="请输入发行计划介绍" class=""></el-input>


                <p class="text-xl font-medium py-3">截止时间</p>
                <el-date-picker v-model="issueTime" type="datetime" value-format="x" placeholder="点击选择截止时间" />

            </div>
        </div>

        <MaskLayer :ifShow="isAIBoxVisible" />
        <AIBox :ifShow="isAIBoxVisible" @updateIfShow="updateIsAIBoxVisible" @saveSuccess="handleSaveSuccess" />
        <!-- 下面的部分为点击保存后的loading -->
        <MaskLayer v-loading="loadingCreate" element-loading-text="藏品上传中..." backgroundColor="rgba(255, 255, 255, 0.01)"
            :ifShow="loadingCreate" />


        <MaskLayer v-if="typeCondition == '盲盒'" :ifShow="isCollectionBoxBlindBoxVisible" />
        <CollectionBoxBlindBox v-if="typeCondition == '盲盒'" :ifShow="isCollectionBoxBlindBoxVisible"
            :Selected="selectedBlindBox" @updateIfShow="updateIsisCollectionBoxBlindBoxVisible" />

        <MaskLayer v-if="typeCondition == '合成'" :ifShow="isCollectionBoxSynthesisVisible" />
        <CollectionBoxSynthesis v-if="typeCondition == '合成'" :ifShow="isCollectionBoxSynthesisVisible"
            @updateIfShow="updateisCollectionBoxSynthesisVisible" />

        <MaskLayer v-if="typeCondition == '正常发行发行计划'" :ifShow="isCollectionBoxisVisible" />
        <CollectionBox v-if="typeCondition == '正常发行发行计划'" :ifShow="isCollectionBoxisVisible"
            @updateIfShow="updateisCollectionBoxisVisible" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import router from "../router";

import MaskLayer from '../components/MaskLayer.vue'
import CollectionBoxBlindBox from '../components/CollectionBoxBlindBox.vue'
import CollectionBoxSynthesis from '../components/CollectionBoxSynthesis.vue'
import CollectionBox from '../components/CollectionBox.vue'


import { getImageAuditing } from "../utils/ImageAuditing"
import { getFileObject } from "../utils/GetFileObject";
import { addWatermark } from "../utils/AddWatermark"
import { getObjectUrl } from "../utils/GetObjectUrl"
import { tobase64Url } from "../utils/ToBase64Url"


import { Type } from "../interfaces/Type"
import { RecognitionResult } from "../interfaces/RecognitionResult"
import { AuditResult } from "../interfaces/AuditResult"
import { PicOperation } from "../interfaces/PicOperation"
import { WatermarkResult } from "../interfaces/WatermarkResult"
import { AIData } from "../interfaces/AIData"



// 引入Text2ImgStore
// import { Text2ImgStore } from '../stores/ConfigStore';


import { getAllTypes } from "../api/type"
import { uploadImage, addCollection, addAICollection } from "../api/collections"
import { addBlindBox } from "../api/blindBox"
import { addDrop } from "../api/drop";
import { addIssueDates } from "../api/issueDate";

import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore';


// const text2ImgStore = Text2ImgStore();

// 定义数组selectedBlindBox，包含数目itemsCount以及藏品ID items
let selectedBlindBox = ref([])


let aiCreator: boolean = false;
let aiDescription = "";
let aiNegDescription = "";
let aistyle = "";

let allType = ref<Type[]>([]);
let issueNumber = ref("");
let name = ref("");
let category = ref("");
let price = ref("");
let shortIntro = ref("");
let intro = ref("");
let isAIBoxVisible = ref(false);
let loading = ref(false);
let loadingCreate = ref(false);
// 定义上传后的图片URL
const uploadedImage = ref<string | null>(null);
const picOperationsJSON = ref<PicOperation | null>(null);
const picOperations = ref<string>(null);

// 定义是否显示类型选择框
const isShowType = ref(false);
// 定义类型选择条件
const typeCondition = ref<string>("盲盒");

const isCollectionBoxBlindBoxVisible = ref(false);

// 是否展示合成
const isCollectionBoxSynthesisVisible = ref(false);

// 是否展示正常发行发行计划
const isCollectionBoxisVisible = ref(true);

let shortDescription = ref("");

let issueTime = ref("");





onMounted(async () => {
    await getAllTypes().then((res) => {
        allType.value = res;
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
})

const updateIsisCollectionBoxBlindBoxVisible = (ifShow: boolean) => {
    isCollectionBoxBlindBoxVisible.value = ifShow;
}
const updateisCollectionBoxSynthesisVisible = (ifShow: boolean) => {
    isCollectionBoxSynthesisVisible.value = ifShow;
}
const updateisCollectionBoxisVisible = (ifShow: boolean) => {
    console.log("你好")
    isCollectionBoxisVisible.value = ifShow;
    console.log(isCollectionBoxisVisible.value)
}


// 切换是否显示类型选择框
const toggleIsShowType = () => {
    isShowType.value = !isShowType.value;
}
// 改变类型选择条件
const changeTypeCondition = (type: string) => {
    typeCondition.value = type;
    isShowType.value = false;
}


const toCreate = () => {
    router.push({
        name: 'CreateView',
    })
}

const updateIsAIBoxVisible = (ifShow: boolean) => {
    isAIBoxVisible.value = ifShow;
}

const handleSaveSuccess = (data: AIData) => {
    uploadedImage.value = data.aiImage;
    aiCreator = data.aiCreator;
    aiDescription = data.aiDescription;
    aiNegDescription = data.aiNegDescription;
    aistyle = data.aistyle;

    console.log("uploadedImage.value", data);
};



// 通过div点击input的方法
const openFileInput = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
        fileInput.click();
    }
};

// 上传图片
const uploadFile = async () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;


    // 暂时保存审核前的图片
    const tempImage = ref<string | null>(null);
    const path = ref<string | null>(null);
    const base64Image = ref<string | null>(null);
    const watermarkUrl = ref<string | null>(null);

    const LocationUrl = ref<string | null>(null);
    const tempFile = ref<File | null>(null);

    let result: AuditResult = null;


    const file = fileInput.files[0];
    // 设置储存路径
    path.value = fileInput.files![0].name
    // 获取水印图片的预签名URL
    watermarkUrl.value = await getObjectUrl("watermark.png") as string;
    // 将水印图片的预签名URL转化为base64URL的形式
    base64Image.value = tobase64Url(watermarkUrl.value as string);


    // 确保存在文件
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        return;
    }

    // 检测上传文件的质量，如果超过100Kb则提示，限制上传的文件类型为图片
    if (!checkFileTypeAndSize(file)) {
        return;
    }

    loading.value = true;
    // 检测是否已经存在水印
    if (!await checkWatermark(file, base64Image.value)) {
        return
    } else {
        console.log("不存在水印")
    }

    console.log("开始添加水印")
    // 设置水印规则
    picOperations.value = setWatermarkRule(path.value, base64Image.value, false)
    // 添加水印
    await addWatermark(path.value, file, picOperations.value).then((res) => {
        console.log("addWatermark:" + res)
    }).catch((err) => {
        console.log(err)
    })


    // 获取打上水印图片的预签名URL
    LocationUrl.value = await getObjectUrl(path.value) as string;

    // 通过预签名URL获取到文件对象
    tempFile.value = await getFileObject(LocationUrl.value as string)

    // 下面是上传图片的内容
    const formData = new FormData();
    formData.append('file', tempFile.value);
    formData.append('type', 'collection')
    console.log("file:", tempFile.value)

    // 上传图片，返回图片URL
    await uploadImage(formData).then((res) => {
        tempImage.value = res as string;
    }).catch((err) => {
        console.log(err);
    });

    // 获取图片审核结果
    await getImageAuditing(LocationUrl.value!).then((res) => {
        result = res as AuditResult;
        loading.value = false;
    }).catch((err) => {
        console.log(err)
    })

    // 审核结果处理
    handleGetImageAuditing(result, tempImage.value);

};

const handleAddCollection = async () => {
    let formdata = new FormData();
    // 将时间戳格式化为2024-05-12T00:00:00.000Z的格式
    issueTime.value = new Date(issueTime.value).toISOString();

    formdata.append('name', name.value);
    formdata.append('cover', uploadedImage.value as string);
    formdata.append('shortDescription', shortDescription.value);
    formdata.append('issueTime', issueTime.value);


    loadingCreate.value = true;
    console.log("issueTime", issueTime.value)
    await addIssueDates(formdata).then((res) => {
        console.log(res)
        ElMessage.success("创建发行计划成功")
        router.push({
            name: 'IndexView',
        })
    }).catch((err) => {
        console.log(err)
    })
}

// 封装一个设置水印规则的方法
const setWatermarkRule = (path: string, base64Image: string, ifCheck?: boolean): string => {
    let picOperationsJSON = null;
    if (ifCheck) {
        picOperationsJSON = {
            "is_pic_info": 1,
            "rules": [
                {
                    "fileid": "/p3/test2.jpg",
                    "rule": `watermark/4/type/2/image/${base64Image}`
                }
            ]
        }
    } else {
        picOperationsJSON = {
            "is_pic_info": 1,
            "rules": [
                {
                    "fileid": "/p3/test2.jpg",
                    "rule": `watermark/3/type/2/image/${base64Image}/level/3`
                }
            ]
        }
    }
    let picOperations = JSON.stringify(picOperationsJSON);
    return picOperations;
};
// 辅助函数：检查文件类型和大小
const checkFileTypeAndSize = (file: File): boolean => {
    if (!file.type.includes("image") || file.type.includes("svg")) {
        loading.value = false;
        ElMessage.error("请上传非svg格式的图片文件");
        return false;
    }
    if (file.size < 100 * 1024) {
        loading.value = false;
        ElMessage.error("上传文件大小不能小于100Kb");

        return false;
    }
    if (file.size > 50 * 1024 * 1024) {
        loading.value = false;
        ElMessage.error("上传文件大小不能大于50Mb");
        return false;
    }
    return true;
};
// 辅助函数：检查是否含有水印
const checkWatermark = async (file: File, watermarkBase64: string): Promise<boolean | null> => {
    const path = file.name;
    const picOperations = setWatermarkRule(path, watermarkBase64, true);
    let watermarkStatus = 0;

    await addWatermark(path, file, picOperations).then((res: WatermarkResult) => {
        watermarkStatus = res.UploadResult.ProcessResults.Object.WatermarkStatus;
    }).catch((err) => {
        console.log(err)
    })
    if (watermarkStatus >= 75) {
        ElMessage.error("尊重版权，禁止上传已存在的藏品")
        loading.value = false;
        return false;
    } else {
        return true
    }
};

// 辅助函数：图片审核结果
const handleGetImageAuditing = (result: AuditResult, imageUrl: string) => {
    // 审核结果
    const resultData = (result as AuditResult).RecognitionResult.Result
    // 审核内容
    const resultLabel = (result as AuditResult).RecognitionResult.Label

    // 如果审核不通过，弹出提示
    if (resultData == 1) {
        uploadedImage.value! = ""
        switch (resultLabel) {
            case "Porn":
                ElMessage.error("图片审核不通过，图片中包含色情内容")
                break;
            case "Terrorism":
                ElMessage.error("图片审核不通过，图片中包含暴力内容")
                break;
        }
    } else if (resultData == 2) {
        uploadedImage.value = imageUrl
        ElMessage.info("图片等待人工审核")
    } else if (resultData == 0) {
        uploadedImage.value = imageUrl
        ElMessage.success("图片审核通过")
    }
}




</script>

<style lang="scss" scoped>
.CreateIssueDateView {
    height: 100%;
    width: 100%;
}

.CreateSeriesViewBody {
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    height: 80%;

    text-align: left;
    margin-top: 3%;
    gap: 2%;



    .CreateSeriesViewBodyLeft {
        width: 40%;


        .CreateSeriesViewBodyLeftUpdate {
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

        .CreateSeriesViewBodyLeftUpdate:hover {

            border: 1px solid var(--text-200);
            background-color: rgba(18, 18, 18, 0.04)
        }
    }

    .CreateSeriesViewBodyRight {
        width: 40%;
        height: 100%;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;


        .CreateSeriesViewBodyRightSeries {
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

            .CreateSeriesViewBodyRightSeriesCreate {
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

        .CreateSeriesViewBodyRightSeries:hover {
            color: var(--text-100);
            /* 悬停时的文本颜色 */
            background-color: var(--accent-100);
        }

        /* 输入框样式 */
        .CreateSeriesViewBodyRightInput {

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

.CreateSeriesViewHead {
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

    .CreateSeriesViewHeadBack {
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

    .CreateSeriesViewHeadBack:hover {
        color: var(--text-200);
        /* 悬停时的文本颜色 */
        background-color: rgba(214, 198, 225, 0.7);
    }

    .CreateSeriesViewHeadUser {
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

    .CreateSeriesViewHeadUser:hover {
        color: var(--text-200);
        /* 悬停时的文本颜色 */
        background-color: rgba(214, 198, 225, 0.7);
    }

}

.el-input {
    width: 100%;
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
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper){
    width: 100%;
    height: 50px;
    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);
    font-size: 18px;
    font-weight: bold;

}
:deep(.el-input__wrapper){
    border-radius: 12px;
}
</style>
