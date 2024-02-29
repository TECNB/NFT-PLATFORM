<template>
    <div class="LoginBox" v-if="props.ifShow">
        <div class="Background">
            <div class="Close" @click="toggleVisibility">
                <el-icon style="height: 90%; width: 90%; border-radius: 50%; object-fit: cover; aspect-ratio: 1/1;">
                    <Close />
                </el-icon>
            </div>
            <div class="Logo">
                <img src="https://opensea.io/static/images/logos/opensea-logo.svg" alt=""
                    style="height: 90%; width: 90%; border-radius: 50%; object-fit: cover; aspect-ratio: 1/1;">
            </div>
        </div>
        <div class="Title">
            <p>登入NFT Platform</p>
        </div>

        <!-- 下面为电子邮箱输入框 -->
        <el-input v-model="username" placeholder="用户名" class="mt-4">
            <template #prefix>
                <el-icon class="el-input__icon">
                    <user />
                </el-icon>
            </template>
        </el-input>
        <!-- 下面为密码输入框 -->
        <el-input v-model="password" placeholder="密码" class="mt-4">
            <template #prefix>
                <el-icon class="el-input__icon">
                    <Lock />
                </el-icon>
            </template>
        </el-input>

        <div class="Button">
            <div class="Login" @click="Login">
                <p>登录</p>
            </div>
            <div class="Sign" @click="check1">
                <p>注册</p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 引入requestHttp
import requestHttp from '../api/index.ts'

const props = defineProps(['ifShow']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};
import { login,check } from '../api/login.ts'
// 定义username
let username = ref('')
// 定义password
let password = ref('')




let loginForm = new FormData();

// 将输入框的值绑定到loginForm
// watch(() => username.value, (newVal) => {
//     loginForm.append("username", newVal)
// })
// watch(() => password.value, (newVal) => {
//     loginForm.append("password", newVal)
// })


// 实现Login方法
const Login = async () => {

    loginForm.append("username", username.value)
    loginForm.append("password", password.value)

    
    const data = await login(loginForm)
    const JsonData = JSON.stringify(data)
    // JsonData封装为对象
    const obj = JSON.parse(JsonData)
    localStorage.setItem('token', obj.token)
    console.log("Login成功")

    
}
const check1 = async () => {
    console.log("check");

    // 通过登录等逻辑确保 token 已经存在于本地存储中
    const token = localStorage.getItem('token') || '';
    console.log("token:"+token)

    // 在发送请求前设置 Axios 请求头
    requestHttp.service.defaults.headers.common['Token'] = token;

    try {
        // 调用 check 方法
        const data = await check();

        console.log("checkdata:" + data);
    } catch (error) {
        // 处理错误
        console.error("Error during check:", error);
    } finally {
        // 可选的清理操作
    }

}



</script>

<style lang="scss" scoped>
.LoginBox {
    width: 30%;
    height: 500px;

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
        background-image: url(https://opensea.io/static/images/wallet/background-wallet.png);


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
        :deep(.is-focus){
            box-shadow: 0 0 0 1px var(--accent-200)
        }
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


            padding: 12px;
            margin-top: 20px;

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


            padding: 12px;
            margin-top: 20px;
        }
    }

}
</style>
