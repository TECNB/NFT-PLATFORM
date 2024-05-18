<template>
    <div class="QRCodeBox" v-if="ifShow">
        <div class="Title">
            <p>二维码</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon class="w-[90%] h-[90%] rounded-full object-cover aspect-square cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
        <p>请使用手机端扫描后进行购买</p>
        <div class="QRCodeContainer">
            <canvas ref="qrcodeCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import QRCode from 'qrcode';
import { Close } from '@element-plus/icons-vue';

const props = defineProps(['ifShow','buyingObjectId']);
const emit = defineEmits(['updateIfShow']);

const qrcodeCanvas = ref(null);

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

const generateQRCode = async () => {
    await nextTick();  // 确保 DOM 更新完成
    console.log(props.buyingObjectId);
    const jsonString = JSON.stringify({ objectId: props.buyingObjectId });
    console.log(jsonString);
    QRCode.toCanvas(qrcodeCanvas.value, jsonString, {
        width: 256 // 设置二维码的宽度，这里设置为256px
    }, (error) => {
        if (error) {
            console.error(error);
        }
    });
};

watch(() => props.ifShow, (newVal) => {
    if (newVal) {
        disableScroll();
        generateQRCode();
    } else {
        enableScroll();
    }
});

const disableScroll = () => {
    document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
    document.body.style.overflow = '';
};
</script>

<style lang="scss" scoped>
.QRCodeBox {
    width: 30%;
    height: 400px;
    position: absolute;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 20px;
    text-align: left;
    padding: 20px;

    .Title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        color: var(--text-100);
        font-weight: bold;
        margin-top: 20px;

        .Close {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5vh;
            height: 5vh;
            border-radius: 50%;
            background-color: white;
        }
    }

    .QRCodeContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
}
</style>