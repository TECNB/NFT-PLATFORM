<template>
    <div class="UserInfo">
        <div class="UserInfoBackground">
            <div style="" class="UserInfoAvatar">
                <img src="https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=2&h=500&fr=1 2x"
                    alt="" style="height: 90%; width: 90%; border-radius: 50%; object-fit: cover; aspect-ratio: 1/1;">
            </div>
        </div>

        <div class="UserInfoDetail">
            <div class="UserInfoDetailLine1">
                <h1 style="text-align: start;">TEC</h1>
                <div>
                    <el-icon size="24" style="margin-right: 30px;"><Share /></el-icon>
                    <el-icon size="24"><Setting /></el-icon>
                </div>
                

            </div>

            <div class="UserInfoDetailLine2">
                <el-icon size="20"><User /></el-icon>
                <p>3489044730</p>
                <p style="margin-left: 10px;color: var(--text-200);">加入时间 January 2024</p>
            </div>

        </div>
        <UserNavbar/>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import UserNavbar from '../components/UserNavbar.vue'

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
            justify-content: start;
            align-items: center;
            gap: 10px;

            text-align: start;

            margin-top: 10px;
        }
    }
}
</style>
