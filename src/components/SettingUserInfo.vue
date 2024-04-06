<template>
    <div class="SettingUserInfo">
        <p class="text-left font-semibold text-3xl">个人资料详情</p>
        <div class="flex justify-start items-start gap-20 mt-10">
            <div class="">
                <p class="text-left font-semibold text-xl">用户名</p>
                <!-- 下面为用户名输入框 -->
                <el-input v-model="username" placeholder="输入用户名" class="mt-4">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <user />
                        </el-icon>
                    </template>
                </el-input>
                <p class="text-left font-semibold text-xl mt-6">新密码</p>
                <!-- 下面为新密码输入框 -->
                <el-input v-model="password" placeholder="输入新密码" class="mt-4">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <lock />
                        </el-icon>
                    </template>
                </el-input>
                <p class="text-left font-semibold text-xl mt-6">钱包地址</p>
                <div class="flex justify-start items-center gap-10 mt-6">
                    <p class="w-20 text-left font-normal text-xl text-ellipsis overflow-hidden" >{{userInfo.user?.hash}}</p>
                    <el-icon class="cursor-pointer"><DocumentCopy /></el-icon>
                </div>
                <div @click="handleUpdatePassword" class="bg-primary-100 rounded-2xl w-24 py-3  mt-10">
                    <p class="text-bg-100">保存</p>
                </div>

            </div>
            <div class="">
                <p class="text-center font-semibold text-xl">个人资料图片</p>
                <img src="https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=2&h=500&fr=1 2x"
                    alt="" class="w-44 h-44 rounded-full object-cover aspect-square mt-6" >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userInfoStore } from '../stores/UserInfoStore';
import { updatePassword } from '../api/user';

// 实例化 userInfoStore
const userInfo = userInfoStore();

// 定义响应式数据
let username = ref('');
let phone = ref('');
let password = ref('');

// 实现 handleUpdatePassword 方法
const handleUpdatePassword = async () => {
    const updatePasswordForm = new FormData();
    updatePasswordForm.append('newPwd', password.value);

    try {
        const response = await updatePassword(updatePasswordForm);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};
</script>


<style lang="scss" scoped>
.el-input {
    height: 50px;
    background-color: #FFFFFF;


    border: 0.5px solid var(--text-200);
    border-radius: 12px;

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
</style>
../api/user.ts