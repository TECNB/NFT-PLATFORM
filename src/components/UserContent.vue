<template>
    <div class="UserContent">

        <!-- 已收集的藏品 -->
        <div class="UserContentItem" v-if="UserIndex.index == 0">
            <UserFilterSection />
            <div class="" v-if="isOwnedCollectionNull">
                <p class="text-left font-medium mb-5">0个项目</p>
                <div class="UserContentDetail">
                    <h2>未找到收集的项目</h2>
                    <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
                </div>
            </div>

            <div class="UserContentItem" v-else>
                <div v-for="(item, index) in OwnedCollection.collections" :key="index" class="CollectionListItem">
                    <div class="CollectionListItemImage h-40 w-60">
                        <img class="w-full h-full rounded-t-2xl object-cover" :src="item.cover" alt="" />
                    </div>

                    <p class="text-left px-3 py-5">{{ item.name }}</p>
                    <div class="CollectionListItemDetail">
                        <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                        <p>¥ {{ item.price }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 已作出的报价 -->
        <div class="UserContentItem" v-if="UserIndex.index == 1">
            <!-- <UserFilterSection /> -->
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的报价</h2>
                <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
            </div> -->
            <div class="UserContentDetail">
                <OfferTable source="user" class="w-full rounded-[20px] -mt-5"/>
            </div>
        </div>

        <!-- 交易中的藏品 -->
        <div class="UserContentItem" v-if="UserIndex.index == 2">
            <UserFilterSection />
            <!-- <div v-if="isSellingCollectionNull" class="UserContentDetail">
                <h2>未找到创建的项目</h2>
                <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
            </div>
            <div v-if="!isSellingCollectionNull" v-for="(item, index) in SellingCollection.collections" :key="index"
                @click="toNft(item.objectId)" class="CollectionListItem">
                <div class="CollectionListItemImage h-40 w-60" style="">
                    <img class="w-full h-full rounded-t-2xl object-cover" :src="item.cover" alt="" />
                </div>

                <p class="text-left px-3 py-5">{{ item.name }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>¥ {{ item.price }}</p>
                </div>
            </div> -->
            <div class="UserContentDetail">
                <OrderTable source="user" class="w-full rounded-[20px]" objectId="4zy42fesbar8yg0hj2jm5218" />
            </div>
        </div>

        <!-- 已创建的藏品 -->
        <div class="UserContentItem" v-if="UserIndex.index == 3">
            <UserFilterSection />
            <div v-if="isCreatedCollectionNull" class="UserContentDetail">
                <h2>未找到创建的项目</h2>
                <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
            </div>
            <div v-if="!isCreatedCollectionNull" v-for="(item, index) in CreatedCollection.collections" :key="index"
                @click="toNft(item.objectId)" class="CollectionListItem" @mouseenter="toggleifShowMore(index)"
                @mouseleave="toggleifShowMore(index)">
                <div class="CollectionListItemImage h-40 w-60 cursor-pointer" style="">
                    <img class="w-full h-full rounded-t-2xl object-cover" :src="item.cover" alt="" />
                </div>

                <p class="text-left px-3 py-5 cursor-pointer">{{ item.name }}</p>
                <div class="CollectionListItemDetail cursor-pointer">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>¥ {{ item.price }}</p>
                </div>
                <transition name="fade">
                    <div v-if="ifShowMore[index]" @click.native.stop.prevent="updateIsActivityBoxVisible(true, item)"
                        class="absolute right-0 bottom-0 w-full h-9 rounded-b-2xl bg-accent-200 cursor-pointer">
                        <div class="flex justify-center items-center gap-5 h-full">
                            <el-icon color="#FFF">
                                <CirclePlusFilled />
                            </el-icon>
                            <p class="text-white">举行活动</p>
                        </div>
                    </div>
                </transition>

            </div>
        </div>

        <!-- 已收藏的藏品 -->
        <div class="UserContentItem" v-if="UserIndex.index == 4">
            <div v-if="!isFavoriteCollectionNull" v-for="(item, index) in FavoriteCollection.collections" :key="index"
                @click="toNft(item.objectId)" class="CollectionListItem">
                <div class="CollectionListItemImage h-40 w-60" style="">
                    <img class="w-full h-full rounded-t-2xl object-cover" :src="item.cover" alt="" />
                </div>

                <p class="text-left px-3 py-5">{{ item.name }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>¥ {{ item.price }}</p>
                </div>
            </div>
            <div v-else class="">
                <p class="text-left font-medium mb-5">0个项目</p>
                <div class="UserContentDetail" v-loading="loading" element-loading-text="加载中...">
                    <h2>未找到收集的项目</h2>
                </div>
            </div>
        </div>

        <!-- 活动 -->
        <div class="UserContentItem" v-if="UserIndex.index == 5">
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>

        <!-- 收到的报价 -->
        <div class="UserContentItem" v-if="UserIndex.index == 6">
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
            <div class="UserContentDetail">
                <OfferTable source="offerUser" class="w-full rounded-[20px] -mt-5"/>
            </div>
        </div>
        <MaskLayer :ifShow="isActivityBoxVisible" />
        <ActivityBox :ifShow="isActivityBoxVisible" :detail="Detail" @updateIfShow="updateIsActivityBoxVisible" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from 'vue-router'


import { FavoriteCollectionStore, OwnedCollectionStore, SellingCollectionStore, CreatedCollectionStore } from '../stores/CollectionStore'
import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'
import UserFilterSection from '../components/UserFilterSection.vue'
import MaskLayer from '../components/MaskLayer.vue'
import ActivityBox from '../components/ActivityBox.vue'


import { check } from '../api/user'
import { getCollectionById, getCreatedCollection } from '../api/collections'
import { userInfoStore } from "../stores/UserInfoStore";

const router = useRouter()


const UserIndex = SelectedUserIndexStore()
const FavoriteCollection = FavoriteCollectionStore()
const OwnedCollection = OwnedCollectionStore()
const SellingCollection = SellingCollectionStore()
const CreatedCollection = CreatedCollectionStore()
const userInfo = userInfoStore()

let isOwnedCollectionNull = ref(true);
let isFavoriteCollectionNull = ref(true);
let isSellingCollectionNull = ref(true);
let isCreatedCollectionNull = ref(true);

let loading = ref(false)

// 控制是否展示更多选项
let ifShowMore = ref([])
// 控制是否展示活动框
let isActivityBoxVisible = ref(false)
// 活动框的详情
let Detail = ref({})


onMounted(async () => {
    loading.value = true
    // 通过check获取到用户收藏的藏品
    await check().then((res) => {
        userInfo.user = res
    })

    //观测UserIndex.index的变化，当index发生变化时，重新获取数据
    if (UserIndex.index === 4) {
        // 设置通过空数组防止重复存入
        FavoriteCollection.collections = []
        // 使用getCollectionById通过数组userInfo.user.favoriteCollection中的objectId获取收藏的项目
        await Promise.all(userInfo.user!.favoriteCollection.map(async (item) => {
            const res = await getCollectionById(item);
            FavoriteCollection.collections.push(res);
            loading.value = false
        }));
    }

    // 设置通过空数组防止重复存入
    OwnedCollection.collections = []
    //使用getCollectionById通过数组userInfo.user.ownedCollection中的objectId获取收藏的项目
    await Promise.all(userInfo.user!.ownedCollection.map(async (item) => {
        const res = await getCollectionById(item);
        OwnedCollection.collections.push(res);
    }));
    // 设置通过空数组防止重复存入
    SellingCollection.collections = []
    await Promise.all(userInfo.user!.sellingCollection.map(async (item) => {
        const res = await getCollectionById(item);
        SellingCollection.collections.push(res);
    }));
    // 设置通过空数组防止重复存入
    CreatedCollection.collections = []
    await getCreatedCollection().then((res) => {
        CreatedCollection.collections = res
    })

    // 定义变量表示collectionItems的长度
    let favoriteCollectionItemsLength = FavoriteCollection.collections.length
    let ownedCollectionItemsLength = OwnedCollection.collections.length
    let sellingCollectionItemsLength = SellingCollection.collections.length
    let createdCollectionItemsLength = CreatedCollection.collections.length

    // 如果collectionItemsLength=0时，isOwnedCollectionNull为true
    if (favoriteCollectionItemsLength !== 0) {
        isFavoriteCollectionNull.value = false
    }
    if (ownedCollectionItemsLength !== 0) {
        isOwnedCollectionNull.value = false
    }
    if (sellingCollectionItemsLength !== 0) {
        isSellingCollectionNull.value = false
    }
    if (createdCollectionItemsLength !== 0) {
        isCreatedCollectionNull.value = false
    }
})

const toNft = (objectId: string) => {
    router.push({
        name: 'NftView',
        params: { id: objectId }, // 传递动态路由参数
    })
}
// 切换更多选项
const toggleifShowMore = (index: number) => {
    ifShowMore.value[index] = !ifShowMore.value[index]
}

// 更新活动框
const updateIsActivityBoxVisible = (value: boolean, detail: any) => {
    isActivityBoxVisible.value = value
    if (detail) {
        Detail.value = detail
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.UserContent {
    width: 100%;
    padding-bottom: 20px;

    .UserContentCollection {
        .UserContentLiked {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            height: 90%;

            font-weight: bold;

            .CollectionListItem {
                height: 100%;
                width: 240px;
                background-color: #FFFFFF;
                border-radius: 20px;
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
                /* 调整阴影效果 */
                transition: box-shadow 0.3s ease, transform 0.3s ease;



                /* 添加过渡效果 */
                .CollectionListItemDetail {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 20px;

                    text-align: left;
                    padding: 10px 20px;

                }
            }

            .CollectionListItem:hover {
                /* 鼠标悬停时的阴影效果 */
                box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
            }

        }
    }

    .UserContentItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
        height: 90%;

        font-weight: bold;

        .CollectionListItem {
            height: 100%;
            width: 240px;

            position: relative;
            background-color: #FFFFFF;
            border-radius: 20px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
            /* 调整阴影效果 */
            transition: box-shadow 0.3s ease, transform 0.3s ease;



            /* 添加过渡效果 */
            .CollectionListItemDetail {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 20px;

                text-align: left;
                padding: 10px 20px;

            }
        }

        .CollectionListItem:hover {
            /* 鼠标悬停时的阴影效果 */
            box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
        }

    }
}

.UserContentDetail {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    min-width: 90vw;
    height: 30vh;

    border: 0.5px solid var(--text-200);
    border-radius: 20px;
}

:deep(.el-loading-mask) {
    border-radius: 20px;
}

:deep(.el-loading-spinner .path) {
    stroke: var(--accent-200);
}

:deep(.el-loading-spinner .el-loading-text) {
    color: var(--accent-200);
}
</style>
