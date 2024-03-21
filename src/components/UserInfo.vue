<template>
    <div class="UserInfo">
        <div class="UserInfoBackground">
            <div style="" class="UserInfoAvatar">
                <img :src="userInfo.user?.avatar"
                    alt="" class="w-[90%] h-[90%] rounded-full object-cover aspect-square">
            </div>
        </div>

        <div class="UserInfoDetail">
            <div class="UserInfoDetailLine1">
                <h1 class="text-left">{{ userInfo.user?.username }}</h1>
                <div>
                    <el-icon size="24" class="mr-7"><Share /></el-icon>
                    <el-icon class="cursor-pointer" size="24" @click="toSetting"><Setting /></el-icon>
                </div>
                

            </div>

            <div class="UserInfoDetailLine2">
                <el-icon size="20"><User /></el-icon>
                <p>{{ userInfo.user?.objectId }}</p>
                <p class="ml-2 text-text-200">加入时间 {{ userInfo.user?.createdAt }}</p>
            </div>

        </div>
        <UserNavbar class="border-b-[0.5px] border-solid boder-text-200 pb-6"/>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
// 引入useRouter
import { useRouter } from 'vue-router'

import UserNavbar from '../components/UserNavbar.vue'

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

// 实例化useRouter
const router = useRouter();

//实例化userInfoStore
const userInfo = userInfoStore();

const toSetting = () => {
    router.push('/setting')
}
</script>

<style lang="scss" scoped>
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
        .UserInfoDetailLine2{
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
