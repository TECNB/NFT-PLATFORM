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
            <span v-if="!ifRegister&&!ifresetPassword">登入</span>
            <span v-if="ifRegister&&!ifresetPassword">注册</span>
            <span v-if="!ifresetPassword&&!ifresetPassword">NFT Platform</span>

            <span v-if="ifresetPassword">重设密码</span>
            

            
        </div>

        <!-- 下面为用户名输入框 -->
        <el-input v-model="username" placeholder="用户名或手机号" class="mt-4">
            <template #prefix>
                <el-icon class="el-input__icon">
                    <user />
                </el-icon>
            </template>
        </el-input>
        <!-- 下面为手机号输入框 -->
        <el-input v-model="phone" placeholder="手机号" class="mt-4" v-if="ifRegister">

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
        <div class="flex justify-between items-center gap-2">
            <p v-if="!ifRegister" @click="ifRegister=true,ifresetPassword=false" class="text-right text-accent-100 mt-3 hover:text-primary-100">没有账号?</p>
            <p v-if="ifRegister" @click="ifRegister=false,ifresetPassword=false" class="text-right text-accent-100 mt-3 hover:text-primary-100">已有账号?</p>
            <p v-if="!ifresetPassword" @click="ifresetPassword=true" class="text-right text-accent-100 mt-3 hover:text-primary-100">忘记密码?</p>
        </div>
        


        <div class="Button">
            <div class="Login" @click="handleLogin" v-if="!ifRegister&& !ifresetPassword">
                <p>登录</p>
            </div>
            <div class="Sign" @click="handleSignup" v-if="ifRegister&& !ifresetPassword">
                <p>注册</p>
            </div>
            <div class="Login" @click="handleLogin" v-if="ifresetPassword">
                <p>确定</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

const props = defineProps(['ifShow']);
const emit = defineEmits();

//实例化userInfoStore
const userInfo = userInfoStore();


const toggleVisibility = () => {
    emit('updateIfShow', false);
};
import { login, check, signup } from '../api/login.ts'
import { AxiosError } from 'axios';
// 定义username
let username = ref('')
// 定义phone
let phone = ref('')

// 定义password
let password = ref('')
//定义ifRegister
let ifRegister = ref(false)
//定义ifresetPassword
let ifresetPassword = ref(false)






let loginForm = new FormData();
let signupForm = new FormData();


// 将输入框的值绑定到loginForm
// watch(() => username.value, (newVal) => {
//     loginForm.append("username", newVal)
// })
// watch(() => password.value, (newVal) => {
//     loginForm.append("password", newVal)
// })



// 实现Login方法
const handleLogin = async () => {
    // 清空loginForm
    loginForm = new FormData();

    if (isValidPhone(username.value)) {
        loginForm.append("phone", username.value);
    } else {
        loginForm.append("username", username.value);
    }
    loginForm.append("password", password.value)


    // const data = await login(loginForm).then(response => {
    await login(loginForm).then(response => {
        console.log("登录返回:" + response);



        // 将data转为JsonData
        const JsonData = JSON.stringify(response)
        console.log("Login成功" + JsonData)
        // JsonData封装为对象
        const obj = JSON.parse(JsonData)

        // 将用户信息存储到userInfoStore
        userInfo.setToken(obj.token)
        userInfo.setUser(obj)
        localStorage.setItem('token', obj.token)
        console.log("newTokeninLogin:" + localStorage.getItem('token'))


        toggleVisibility()
        ElMessage.success('登录成功')
    }).catch((error: AxiosError) => {
        // 获取到 AxiosError 中的 error
        // 处理错误的情况
        console.log("错误:" + error);

        // 这里可以根据你的需要，从 error 对象中获取更多信息
        if (error.response) {
            console.log("响应状态码:" + error.response.status);
            console.log("响应数据:" + error.response.data.status);
        } else if (error.request) {
            console.log("请求未收到响应");
        } else {
            console.log("发生了错误：" + error.message);
        }
    });
}
// 完成检验中国大陆手机号的isValidPhone函数
function isValidPhone(phone: string) {
    return /^1[3-9]\d{9}$/.test(phone);
}




const handleSignup = async () => {
    
    // 清空loginForm
    loginForm = new FormData();

    signupForm.append("username", username.value)
    signupForm.append("password", password.value)
    signupForm.append("phone", phone.value)

    await signup(signupForm).then(response =>{
        console.log("注册返回:" + response);

        // 回到登录状态
        ifRegister.value = false

        ElMessage.success('注册成功,请登录')

    }).catch((error: AxiosError) => {
        // 获取到 AxiosError 中的 error
        // 处理错误的情况
        console.log("错误:" + error);

        // 这里可以根据你的需要，从 error 对象中获取更多信息
        if (error.response) {
            console.log("响应状态码:" + error.response.status);
            console.log("响应数据:" + error.response.data.status);
        } else if (error.request) {
            console.log("请求未收到响应");
        } else {
            console.log("发生了错误：" + error.message);
        }
    });

}





</script>

<style lang="scss" scoped>
.LoginBox {
    width: 30%;



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
