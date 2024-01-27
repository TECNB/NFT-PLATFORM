<template>
    <div class="MainNavbar">
        <div class="MainNavbarItems">
            <div class="MainNavbarItem" style="display: flex;justify-content: start;align-items: center;">
                <img width="40px" src="https://opensea.io/static/images/logos/opensea-logo.svg" />
                <p style="padding-left: 10px;" @click="toIndex">NFT Platform</p>
            </div>

            <p class="MainNavbarItem">中心</p>
            <p class="MainNavbarItem">广场</p>
            <p class="MainNavbarItem" @click="toStatistics">统计信息</p>

        </div>
        <div class="MainNavbarInput">
            <el-icon :size="16">
                <Search />
            </el-icon>
            <input type="text" placeholder="搜索">
        </div>
        <div class="MainNavbarUser">
            <div class="MainNavbarUserLogin" @click="showLogin">
                <el-icon :size="20">
                    <Message />
                </el-icon>
                <p style="padding-left: 10px;">登录</p>
            </div>
            <div class="MainNavbarUserInfo" @mouseover="showUserMenu" @mouseleave="hideUserMenu">
                <el-icon :size="20">
                    <User />
                </el-icon>

            </div>
            <transition name="fade">
                <div class="MainNavbarUserMenu" v-if="isUserMenuVisible" @mouseover="showUserMenu"
                    @mouseleave="hideUserMenu">
                    <div class="MainNavbarUserMenuItem" @click="toUser">
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <p>个人资料</p>
                    </div>
                    <div class="MainNavbarUserMenuItem" style="border-bottom: 1px solid var(--accent-100);">
                        <el-icon>
                            <View />
                        </el-icon>
                        <p>关注列表</p>
                    </div>


                    <div class="MainNavbarUserMenuItem">
                        <el-icon>
                            <Box />
                        </el-icon>
                        <p>交易</p>
                    </div>
                    <div class="MainNavbarUserMenuItem" style="border-bottom: 1px solid var(--accent-100);" @click="toCreate">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <p>创作</p>
                    </div>

                    <div class="MainNavbarUserMenuItem">
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <p>设置</p>
                    </div>
                    <div class="MainNavbarUserMenuItem">
                        <el-icon>
                            <Guide />
                        </el-icon>
                        <p>语言</p>
                        <div style="display: flex;justify-content: space-between;align-items: center;">
                            <p style="font-weight: normal;font-size: 16px;padding-left: 50px;">中文</p>
                            <el-icon style="padding-left: -10px;">
                                <ArrowRightBold />
                            </el-icon>
                        </div>

                    </div>
                    <div class="MainNavbarUserMenuItem" style="border-bottom: 1px solid var(--accent-100);">
                        <el-icon>
                            <Moon />
                        </el-icon>
                        <p>夜间模式</p>
                        <el-switch v-model="value1" class="ml-2"
                            style="--el-switch-on-color: var(--accent-200); --el-switch-off-color: var(--accent-100);padding-left: 10px;" />
                    </div>

                    <div class="MainNavbarUserMenuItem" style="padding-bottom: 0px;">
                        <el-icon>
                            <SwitchButton />
                        </el-icon>
                        <p>退出</p>
                    </div>


                </div>
            </transition>

            <div class="MainNavbarUserCart" @click="drawer2 = true">
                <el-icon :size="20">
                    <ShoppingCart />
                </el-icon>
            </div>
        </div>
        <el-drawer v-model="drawer2" direction="rtl">

            <template #default>
                <div>
                    <p>
                        还没有物品，快去购物吧
                    </p>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">取消</el-button>
                    <el-button type="primary" @click="confirmClick">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()
const value1 = ref(false)
const toCreate = () => {
    router.push({
        name: 'CreateView',
    })
}
const toUser = () =>{
    router.push({
        name: 'UserView',
    })
}

const toIndex = () => {
    router.push({
        name: 'IndexView',
    })
}
const toStatistics = () => {
    router.push({
        name: 'StatisticsView',
    })
}

const isUserMenuVisible = ref(false);

const showUserMenu = () => {
    isUserMenuVisible.value = true;
};

const hideUserMenu = () => {
    isUserMenuVisible.value = false;
};

const showLogin = () =>{
    router.push({
        name: 'UserView',
    })
}


import { ElMessageBox } from 'element-plus'


const drawer2 = ref(false)

const radio1 = ref('Option 1')

function cancelClick() {
    drawer2.value = false
}
function confirmClick() {
    ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
        .then(() => {
            drawer2.value = false
        })
        .catch(() => {
            // catch error
        })
}
</script>

<style lang="scss" scoped>
/* 整个导航栏容器 */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s ease;
}
.fade-enter-to,
.fade-leave-from{
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.MainNavbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;



    /* 导航栏项目样式 */
    .MainNavbarItems {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--bg-100);

        flex: 1;
        max-width: 400px;
        min-width: 400px;

        .MainNavbarItem {
            font-size: 20px;
            font-weight: bold;
            color: var(--text-100);
            /* 你的文本颜色 */
            cursor: pointer;
            /* 如果需要悬停效果，可以添加以下样式 */
            transition: color 0.3s ease-in-out;

        }

        .MainNavbarItem:nth-child(2) {
            border-left: 1px solid black;
            /* 1px宽度的黑色边框 */
            padding-left: 20px;
        }

        .MainNavbarItem:hover {
            color: var(--text-200);
            /* 悬停时的文本颜色 */
        }
    }

    /* 输入框样式 */
    .MainNavbarInput {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 12px;
        flex: 0.2;
        background-color: var(--bg-200);
        border-radius: 12px;
        max-width: 500px;

        input {
            outline: none;
            padding-left: 10px;
            font-size: 16px;
            width: 200px;
            border: 0px;
            background-color: var(--bg-200);
            /* 调整输入框的宽度 */
        }
    }

    /* 用户栏相关样式 */
    .MainNavbarUser {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: var(--bg-100);

        flex: 1;
        max-width: 300px;
        font-size: 20px;
        font-weight: bold;
        color: var(--text-100);
        /* 你的文本颜色 */
        cursor: pointer;
        /* 如果需要悬停效果，可以添加以下样式 */
        transition: color 0.3s ease-in-out;
        min-width: 300px;

        .MainNavbarUserMenu {
            position: absolute;
            z-index: 9999;
            top: 70px;
            right: 210px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: start;
            gap: 25px;


            min-width: 240px;


            padding-top: 20px;
            padding-bottom: 20px;

            border-radius: 20px;
            margin-top: 30px;
            background-color: var(--bg-200);
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

            transition: 0.2s ease-in;

            .MainNavbarUserMenuItem {
                display: flex;
                justify-content: start;
                align-items: center;
                gap: 15px;

                min-width: 120px;
                width: 100%;
                padding-left: 30px;
                padding-bottom: 10px;
            }
        }

        .MainNavbarUserLogin {

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
            transition: background-color 0.2s ease 0s;

        }

        .MainNavbarUserLogin:hover {
            color: var(--text-200);
            /* 悬停时的文本颜色 */
            background-color: rgba(214, 198, 225, 0.7);
        }

        .MainNavbarUserInfo {
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
            transition: background-color 0.2s ease 0s;
        }

        .MainNavbarUserInfo:hover {
            color: var(--text-200);
            /* 悬停时的文本颜色 */
            background-color: rgba(214, 198, 225, 0.7);
        }

        .MainNavbarUserCart {
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
            transition: background-color 0.2s ease 0s;
        }

        .MainNavbarUserCart:hover {
            color: var(--text-200);
            /* 悬停时的文本颜色 */
            background-color: rgba(214, 198, 225, 0.7);
        }

    }

}
</style>
