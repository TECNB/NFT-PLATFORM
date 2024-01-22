<template>
    <div class="CreateView">
        <div class="CreateViewHead">
            <div class="CreateViewHeadBack" @click="toIndex()">
                <el-icon :size="20">
                    <Back />
                </el-icon>
            </div>
            <div class="CreateViewHeadUser">
                <el-icon :size="20">
                    <User />
                </el-icon>
            </div>
        </div>
        <div class="CreateViewBody">
            <div class="CreateViewBodyLeft">
                <p style="font-size: 36px;font-weight: bold;">创建NFT</p>
                <p style="font-size: 20px;margin-top: 10px;"> 铸造项目后，您将无法更改其任何信息。</p>
                <div class="CreateViewBodyLeftUpdate">
                    <el-icon size="40">
                        <Upload />
                    </el-icon>
                    <p style="font-size: 20px;font-weight: bold;margin-top: 20px;"> 拖拽媒体</p>
                    <p style="font-size: 16px;color: var(--primary-100);font-weight: bold;"> 浏览文件</p>
                    <p style="font-size: 16px;"> 最大尺寸:50MB</p>
                    <p style="font-size: 16px;"> JPG、 PNG、 GIF、SVG、MP4</p>
                </div>
            </div>
            <div class="CreateViewBodyRight">
                <p style="font-size: 20px;font-weight: bold;padding:10px 0;">系列</p>
                <div class="CreateViewBodyRightSeries">
                    <div class="CreateViewBodyRightSeriesCreate">
                        <el-icon size="16">
                            <Plus />
                        </el-icon>
                    </div>
                    <p style="margin-left: 20px;">创建新系列</p>
                </div>
                <p style="font-size: 20px;font-weight: bold;padding:10px 0;">名字</p>
                <div class="CreateViewBodyRightInput">

                    <input type="text" placeholder="命名您的NFT">
                </div>
                <p style="font-size: 20px;font-weight: bold;padding:10px 0;">限量数</p>
                <div class="CreateViewBodyRightInput">

                    <input type="text" placeholder="请限定发售的数量">
                </div>
                <p style="font-size: 20px;font-weight: bold;padding:10px 0;">描述</p>
                <div class="CreateViewBodyRightInput" style="padding-bottom: 150px;">

                    <input type="text" placeholder="请限定发售的数量">
                </div>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const toIndex = () => {
    router.push({
        name: 'IndexView',
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
        padding-top: 8%;

        .CreateViewBodyRightSeries {
            display: flex;
            justify-content: start;
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
            justify-content: start;
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
</style>
