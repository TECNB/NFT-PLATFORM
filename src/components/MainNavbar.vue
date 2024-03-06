<template>
    <div class="MainNavbar">
        <div class="MainNavbarItems">
            <div class="MainNavbarItem" style="display: flex;justify-content: flex-start;align-items: center;">
                <img width="40px" src="https://opensea.io/static/images/logos/opensea-logo.svg" />
                <p style="padding-left: 10px;" @click="toIndex">NFT Platform</p>
            </div>

            <p class="MainNavbarItem">中心</p>
            <p class="MainNavbarItem">广场</p>
            <p class="MainNavbarItem" @click="toStatistics">统计信息</p>

        </div>
        <div class="MainNavbarInput">
            <!-- 下面为藏品名称搜索框 -->
            <el-input v-model="name" placeholder="搜索" class="mt-4" @change="search">
                <template #prefix>
                    <el-icon color="var(--text-100)" class="el-input__icon">
                        <Search />
                    </el-icon>
                </template>
            </el-input>

            <div v-if="hasSearchInput" class="absolute top-20 left-0 w-full bg-bg-300 rounded-2xl p-2 z-10">
                <p class="text-left text-xs font-medium px-4 py-2">系列</p>
                <div v-for="(collection, index) in searchCollectionsArray" :key="index"
                    class="flex justify-start items-center hover:bg-zinc-100 rounded-xl cursor-pointer mt-2">
                    <img class="w-9 h-9 rounded-xl object-cover aspect-square mx-3 my-2 z" :src="collection.cover"
                        alt="Collection Image">
                    <div>
                        <p class="text-left font-semibold text-lg">{{ collection.name }}</p>
                        <p class="w-64 text-left font-normal text-xs text-ellipsis whitespace-nowrap overflow-hidden">
                            {{ collection.shortIntro }}
                        </p>
                    </div>
                </div>


            </div>

        </div>

        <div class="MainNavbarUser">
            <!-- 通过localStorage中的token判断 -->
            <div class="MainNavbarUserLogin" @click="showLogin" v-if="!hasToken">
                <el-icon :size="20">
                    <Message />
                </el-icon>
                <p style="padding-left: 10px;">登录</p>
            </div>
            <div class="MainNavbarUserLogin" @click="showLogin" v-else>
                <el-icon :size="20">
                    <Money />
                </el-icon>
                <p style="padding-left: 10px;">钱包</p>
            </div>
            <div class="MainNavbarUserLogin" @click="showLogin" v-else>
                <el-icon :size="20">
                    <Money />
                </el-icon>
                <p style="padding-left: 10px;">钱包</p>
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
                    <div class="MainNavbarUserMenuItem" style="border-bottom: 1px solid var(--accent-100);"
                        @click="toStatisticsFollow">
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
                    <div class="MainNavbarUserMenuItem" style="border-bottom: 1px solid var(--accent-100);"
                        @click="toCreate">
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

                    <div class="MainNavbarUserMenuItem" style="padding-bottom: 0px;" @click="logout">
                        <el-icon>
                            <SwitchButton />
                        </el-icon>
                        <p>退出</p>
                    </div>


                </div>
            </transition>

            <div class="MainNavbarUserCart" @click="showCartList">
                <el-icon :size="20">
                    <ShoppingCart />
                </el-icon>
            </div>
        </div>

        <MaskLayer :ifShow="isLoginBoxVisible" />
        <LoginBox :ifShow="isLoginBoxVisible" @updateIfShow="updateIsLoginBoxVisible" />
        <CartList :ifShow="isCartListVisible" @updateIfShow="updateIsCartListVisible" />
        <MaskLayer :ifShow="isCartListVisible" />
    </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted,Ref } from "vue"
import { useRouter, useRoute } from 'vue-router'
// 引入Collection接口
import { Collection } from '../interfaces/Collection';

// 引入MaskLayer
import MaskLayer from '../components/MaskLayer.vue'
// 引入LoginBox
import LoginBox from '../components/LoginBox.vue'
// 引入CartList
import CartList from '../components/CartList.vue'
import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

//实例化userInfoStore
const userInfo = userInfoStore();

// 引入check
import { check } from '../api/user.ts'
import { AxiosError } from "axios"

// 引入ErrorResult接口
import { ErrorResult } from '../interfaces/ErrorResult';
// 引入searchCollections
import { searchCollections } from '../api/collections'

// 定义hasSearchInput
const hasSearchInput = ref(false)
// 定义name
let name = ref('')



const router = useRouter()
const route = useRoute()

const TypeIndex = StatisticsTypeIndexStore()
// hasToken设置默认为false
const hasToken = ref(false);

// 定义search方法返回的数组
let searchCollectionsArray: Ref<Collection[]> = ref([]);

//定义loading
// const loading = ref(true)

// search方法
const search = async () => {
    // 清空search表单
    const searchForm = new FormData();
    searchForm.append('name', name.value);

    searchCollections(searchForm).then(res => {
        hasSearchInput.value = true
        searchCollectionsArray.value = res
        console.log(searchCollectionsArray);
    }).catch(err => {
        console.log(err);
    })
    // loading.value = false
}


// 使用watch监听localStorage中token的变化
watch(() => userInfo.token, (newToken) => {
    hasToken.value = newToken !== "";

});

onMounted(() => {
    // 在组件挂载后检查 localStorage 中是否存在 token
    hasToken.value = localStorage.getItem('token') !== "";
    if (!hasToken.value && route.path === '/user') {
        // 跳转到首页
        router.replace({
            path: '/'
        });
    }


});

const value1 = ref(false)
const toCreate = () => {
    router.push({
        name: 'CreateView',
    })
}
const toUser = async () => {
    console.log("check");

    // 通过登录等逻辑确保 token 已经存在于本地存储中
    const token = localStorage.getItem('token') || '';
    console.log("token:" + token)

    // 调用 check 方法
    const data = await check().then(response => {
        console.log("返回:" + response);
        router.push({
            name: 'UserView',
        })
        return response;
    }).catch((error: AxiosError) => {
        // 获取到 AxiosError 中的 error
        // 处理错误的情况
        console.log("错误:" + error);

        // 这里可以根据你的需要，从 error 对象中获取更多信息
        if (error.response) {
            console.log("响应状态码:" + error.response.status);
            console.log("响应数据:" + (error.response.data as ErrorResult).status);
        } else if (error.request) {
            console.log("请求未收到响应");
        } else {
            console.log("发生了错误：" + error.message);
        }
    });

    console.log("checkdata:" + data);

}
// logout方法
const logout = () => {
    localStorage.removeItem('token')
    userInfo.setToken("")
    ElMessage({
        message: '退出成功',
        type: 'success',
    })
    // 跳转到首页
    router.replace({
        path: '/'
    });
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
const toStatisticsFollow = () => {
    router.push({
        name: 'StatisticsView',
    })
    TypeIndex.index = 2
}

const isUserMenuVisible = ref(false);

const showUserMenu = () => {
    isUserMenuVisible.value = true;
};

const hideUserMenu = () => {
    isUserMenuVisible.value = false;
};

// isLoginBoxVisible设置默认为false
const isLoginBoxVisible = ref(false);


// updateIsLoginBoxVisible方法控制更新isLoginBoxVisible
const updateIsLoginBoxVisible = (value: boolean) => {
    isLoginBoxVisible.value = value;
};


const showLogin = () => {
    updateIsLoginBoxVisible(true);
}


const isCartListVisible = ref(false)
// updateIsCartListVisible方法控制更新isCartListVisible
const updateIsCartListVisible = (value: boolean) => {
    isCartListVisible.value = value;
};
const showCartList = () => {
    updateIsCartListVisible(true);
}


</script>

<style lang="scss" scoped>
/* 整个导航栏容器 */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s ease;
}

.fade-enter-to,
.fade-leave-from {
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
        justify-content: flex-start;
        align-items: center;
        flex: 0.3;

        position: relative;


        max-width: 500px;


        border-radius: 12px;


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
            z-index: 99999;
            top: 70px;
            right: 210px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
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
                justify-content: flex-start;
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

.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: var(--bg-200);

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}
</style>../api/user.ts
