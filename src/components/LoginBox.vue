<template>
    <div class="LoginBox" v-if="props.isMaskLayerVisible">
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
        <div class="Input">
            <el-icon>
                <Message />
            </el-icon>
            <input type="text" placeholder="电子邮件">
        </div>
        <!-- 下面为密码输入框 -->
        <div class="Input">
            <el-icon>
                <Lock />
            </el-icon>
            <input type="text" placeholder="密码">
        </div>
        <div class="Button">
            <div class="Login">
                <p>登录</p>
            </div>
            <div class="Sign">
                <p>注册</p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import {  } from 'vue';

const props = defineProps(['isMaskLayerVisible']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIsMaskLayer', true);
};

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

    .Input {
        display: flex;
        justify-content: start;
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
