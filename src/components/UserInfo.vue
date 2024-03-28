<template>
    <div class="UserInfo">
        <div class="UserInfoBackground">
            <div style="" class="UserInfoAvatar" @mousemove="ifShowEdit = true" @mouseleave="ifShowEdit = false">
                <img :src="userInfo.user?.avatar" alt=""
                    class="w-[95%] h-[95%] rounded-full object-cover aspect-square cursor-pointer" @click="triggerFileInput">
                <transition name="fade">
                    <div class="absolute cursor-pointer" v-if="ifShowEdit">
                        <el-icon color="#FFFFFF" size="24">
                            <Edit />
                        </el-icon>
                    </div>
                </transition>
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
            </div>
        </div>

        <div class="UserInfoDetail">
            <div class="UserInfoDetailLine1">
                <h1 class="text-left">{{ userInfo.user?.username }}</h1>
                <div>
                    <el-icon size="24" class="mr-7">
                        <Share />
                    </el-icon>
                    <el-icon class="cursor-pointer" size="24" @click="toSetting">
                        <Setting />
                    </el-icon>
                </div>


            </div>

            <div class="UserInfoDetailLine2">
                <el-icon size="20">
                    <User />
                </el-icon>
                <p>{{ userInfo.user?.objectId }}</p>
                <p class="ml-2 text-text-200">加入时间 {{ userInfo.user?.createdAt }}</p>
            </div>

        </div>
        <UserNavbar class="border-b-[0.5px] border-solid boder-text-200 pb-6" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// 引入useRouter
import { useRouter } from 'vue-router'

import UserNavbar from '../components/UserNavbar.vue'

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

import { changeAvatar } from '../api/user';

// 实例化useRouter
const router = useRouter();

//实例化userInfoStore
const userInfo = userInfoStore();

const ifShowEdit = ref(false);
const fileInput = ref(null);


const toSetting = () => {
    router.push('/setting')
}

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileChange = async(event) => {
    const file = event.target.files[0];
    // 规定上传的文件类型以及质量
    if (!checkFileTypeAndSize(file)) {
        return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    await changeAvatar(formData).then((res) => {
        console.log(res);
        userInfo.setUser(res);
    });
};


// 辅助函数：检查文件类型和大小
const checkFileTypeAndSize = (file: File): boolean => {
    console.log(file);
    if (!file.type.includes("image") || file.type.includes("svg")) {
        ElMessage.error("请上传非svg格式的图片文件");
        return false;
    }
    if (file.size < 100 * 1024) {
        ElMessage.error("上传文件大小不能小于100Kb");
        return false;
    }
    if (file.size > 50 * 1024 * 1024) {
        ElMessage.error("上传文件大小不能大于50Mb");
        return false;
    }
    return true;
};


</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.UserInfo {
    width: 100%;


    /* 设置相对定位，以便绝对定位的子元素相对于它定位 */
    .UserInfoBackground {
        margin-left: -50px;
        margin-right: -50px;
        height: 30vh;
        background-color: var(--bg-200);
        margin-top: 20px;
        position: relative;

        .UserInfoAvatar {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;

            /* 设置绝对定位，相对于包含它的 .UserInfo 定位 */
            left: 5%;
            bottom: -10%;
            width: 20vh;
            height: 20vh;

            border-radius: 50%;
            background-color: white;

            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        }
    }

    .UserInfoDetail {
        margin-top: 40px;



        .UserInfoDetailLine1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .UserInfoDetailLine2 {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;

            text-align: start;

            margin-top: 10px;

        }
    }
}
</style>
