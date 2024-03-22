<template>
    <div class="CreateView">
        <div class="CreateViewHead">
            <div class="CreateViewHeadBack" @click="toIndex()">
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
        <div class="CreateViewBody">
            <div class="CreateViewBodyLeft">
                <p style="font-size: 36px;font-weight: bold;">创建NFT</p>
                <p style="font-size: 20px;margin-top: 10px;"> 铸造项目后，您将无法更改其任何信息。</p>
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
                <img v-else :src="uploadedImage" alt="上传的图片" />
            </div>
            <div class="CreateViewBodyRight">
                <!-- <p style="font-size: 20px;font-weight: bold;padding:10px 0;">系列</p>
                <div class="CreateViewBodyRightSeries">
                    <div class="CreateViewBodyRightSeriesCreate">
                        <el-icon size="16">
                            <Plus />
                        </el-icon>
                    </div>
                    <p style="margin-left: 20px;">创建新系列</p>
                </div> -->
                <!-- <p style="font-size: 20px;font-weight: bold;padding:10px 0;">限量数</p>
                <el-input v-model="name" placeholder="请限定发售的数量" class="">
                    <template #prefix>
                        <el-icon color="var(--text-100)" class="el-input__icon">
                            <search />
                        </el-icon>
                    </template>
</el-input> -->

                <p class="text-xl font-medium py-3">发行号</p>
                <el-input v-model="issueNumber" placeholder="请输入数字藏品的发行号" class=""></el-input>
                <p class="text-xl font-medium py-3">名字</p>
                <!-- 下面为藏品名称搜索框 -->
                <el-input v-model="name" placeholder="命名您的NFT" class=""></el-input>

                <p class="text-xl font-medium py-3">分类</p>
                <el-select v-model="category" placeholder="请点击选择分类" size="large" :teleported="false" clearable
                    style="width: 360px;">
                    <el-option v-for="item in allType" :key="item.objectId" :label="item.name" :value="item.objectId" />
                </el-select>

                <p class="text-xl font-medium py-3">价格</p>
                <el-input v-model="price" placeholder="请输入数字藏品的价格" class=""></el-input>


                <p class="text-xl font-medium py-3">简短描述</p>
                <el-input v-model="shortIntro" placeholder="请输入相关数字藏品简短描述" class=""></el-input>
                <p class="text-xl font-medium py-3">具体描述</p>
                <el-input v-model="intro" placeholder="请输入相关数字藏品具体描述" class=""></el-input>
            </div>
        </div>

        <MaskLayer :ifShow="isAIBoxVisible" />
        <AIBox :ifShow="isAIBoxVisible" @updateIfShow="updateIsAIBoxVisible" @saveSuccess="handleSaveSuccess" />
        <!-- 下面的部分为点击保存后的loading -->
        <MaskLayer v-loading="loadingCreate" element-loading-text="藏品上传中..." backgroundColor="rgba(255, 255, 255, 0.01)"
            :ifShow="loadingCreate" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import router from "../router";


import { getImageAuditing } from "../utils/ImageAuditing"


import { Type } from "../interfaces/Type"
import { RecognitionResult } from "../interfaces/RecognitionResult"
import { AuditResult } from "../interfaces/AuditResult"



// 引入Text2ImgStore
// import { Text2ImgStore } from '../stores/ConfigStore';


import { getAllTypes } from "../api/type"
import { uploadImage, addCollection } from "../api/collections"


// const text2ImgStore = Text2ImgStore();


let allType: Ref<Type[]> = ref([]);


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


onMounted(async () => {
    await getAllTypes().then((res) => {
        allType.value = res;
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
})

const toIndex = () => {
    router.push({
        name: 'IndexView',
    })
}

const updateIsAIBoxVisible = (ifShow: boolean) => {
    isAIBoxVisible.value = ifShow;
}

const handleSaveSuccess = (data: any) => {
    uploadedImage.value = data;
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
    // 确保存在文件
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        loading.value = true;
        const formData = new FormData();
        // 将文件添加到formData中
        formData.append('file', fileInput.files[0]);
        formData.append('type', 'avatar')
        console.log("fileInput.files[0]:", fileInput.files[0])

        // 上传图片
        await uploadImage(formData).then((res) => {
            uploadedImage.value = res as string;
            loading.value = false;
        }).catch((err) => {
            console.log(err);
        });
        // 图片审核
        const result = await getImageAuditing(uploadedImage.value!)
        // 审核结果
        const resultData = (result as AuditResult).RecognitionResult.Result
        // 审核内容
        const resultLabel = (result as AuditResult).RecognitionResult.Label

        // 如果审核不通过，弹出提示
        if(resultData == 1){
            uploadedImage.value! = ""
            switch (resultLabel) {
                case "Porn":
                    ElMessage.error("图片审核不通过，图片中包含色情内容")
                    break;
                case "Terrorism":
                    ElMessage.error("图片审核不通过，图片中包含暴力内容")
                    break;
            }
        }else if(resultData == 2){
            ElMessage.info("图片等待人工审核")
        }else if(resultData == 0){
            ElMessage.success("图片审核通过")
        }
    }
};

const handleAddCollection = async () => {
    let formdata = new FormData();
    console.log("category:", category.value)

    formdata.append('issueNumber', issueNumber.value);
    formdata.append('name', name.value);
    formdata.append('categoryId', category.value);
    formdata.append('price', price.value);
    formdata.append('shortIntro', shortIntro.value);
    formdata.append('intro', intro.value);
    formdata.append('cover', uploadedImage.value as string);
    formdata.append('file', uploadedImage.value as string);
    formdata.append('type', "图片");

    loadingCreate.value = true;

    await addCollection(formdata)
        .then((res) => {
            console.log(res)
            loadingCreate.value = false;
            ElMessage.success("创建藏品成功")
            router.push({
                name: 'IndexView',
            })
        })
        .catch((err) => {
            console.log(err)
        })
}


</script>

<style lang="scss" scoped>
.CreateView {
    height: 100%;
    width: 100%;
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
