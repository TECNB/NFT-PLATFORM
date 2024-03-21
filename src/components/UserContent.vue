<template>
    <div class="UserContent">

        <div class="UserContentCollection" v-if="UserIndex.index == 0">
            <UserFilterSection />
            <div class="" v-if="isOwnedCollectionNull">
                <p class="text-left font-medium mb-5">0个项目</p>
                <div class="UserContentDetail">
                    <h2>未找到收集的项目</h2>
                    <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
                </div>
            </div>

            <div class="UserContentLiked" v-else>
                <div v-for="(item, index) in OwnedCollection.collections" :key="index" class="CollectionListItem">
                    <div class="CollectionListItemImage h-40 w-60">
                        <img class="w-full h-full rounded-t-2xl object-cover" :src="item.cover" alt="" />
                    </div>

                    <p class="text-left px-3 py-5">{{ item.name }}</p>
                    <div class="CollectionListItemDetail">
                        <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                        <p>{{ item.price }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="UserContentOfferGet" v-if="UserIndex.index == 1">
            <!-- <UserFilterSection /> -->
            <div class="UserContentDetail">
                <h2>没有要显示的报价</h2>
                <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
            </div>
        </div>
        <div class="UserContentDeal" v-if="UserIndex.index == 2">
            <!-- <UserFilterSection />
            <div class="UserContentDetail">
                <h2>没有要显示的交易</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>
        <div class="UserContentCreate" v-if="UserIndex.index == 3">
            <UserFilterSection />
            <div v-if="isSellingCollectionNull" class="UserContentDetail">
                <h2>未找到创建的项目</h2>
                <button class="text-white bg-accent-200 mt-5 p-2">返回所有项目</button>
            </div>
        </div>

        <div class="UserContentLiked" v-if="UserIndex.index == 4">
            <div v-if="!isFavoriteCollectionNull" v-for="(item, index) in FavoriteCollection.collections" :key="index" @click="toNft(item.objectId)"
                class="CollectionListItem">
                <div class="CollectionListItemImage h-40 w-60" style="">
                    <img class="w-full h-full rounded-t-2xl object-cover" :src="item.cover" alt="" />
                </div>

                <p class="text-left px-3 py-5">{{ item.name }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>{{ item.price }}</p>
                </div>
            </div>
            <div v-else class="">
                <p class="text-left font-medium mb-5">0个项目</p>
                <div class="UserContentDetail" v-loading="loading" element-loading-text="加载中...">
                    <h2>未找到收集的项目</h2>
                </div>
            </div>
        </div>
        <div class="UserContentActivity" v-if="UserIndex.index == 5">
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>
        <div class="UserContentOfferReceive" v-if="UserIndex.index == 6">
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRouter } from 'vue-router'


import { FavoriteCollectionStore, OwnedCollectionStore, SellingCollectionStore } from '../stores/CollectionStore'
import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'
import UserFilterSection from '../components/UserFilterSection.vue'


import { check } from '../api/user'
import { getCollectionById } from '../api/collections'
import { userInfoStore } from "../stores/UserInfoStore";

const router = useRouter()


const UserIndex = SelectedUserIndexStore()
const FavoriteCollection = FavoriteCollectionStore()
const OwnedCollection = OwnedCollectionStore()
const SellingCollection = SellingCollectionStore()
const userInfo = userInfoStore()

let isOwnedCollectionNull = ref(true);
let isFavoriteCollectionNull = ref(true);
let isSellingCollectionNull = ref(true);

let loading = ref(false)


onMounted(async () => {
    loading.value = true
    // 通过check获取到用户收藏的藏品
    await check().then((res) => {
        userInfo.user = res
    })
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

    // 定义变量表示collectionItems的长度
    let favoriteCollectionItemsLength = FavoriteCollection.collections.length
    let ownedCollectionItemsLength = OwnedCollection.collections.length
    let sellingCollectionItemsLength = SellingCollection.collections.length
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
})

const toNft = (objectId: string) => {
    router.push({
        name: 'NftView',
        params: { id: objectId }, // 传递动态路由参数
    })
}

</script>

<style lang="scss" scoped>
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
:deep(.el-loading-mask){
    border-radius: 20px;
}
:deep(.el-loading-spinner .path){
    stroke: var(--accent-200);
}
:deep(.el-loading-spinner .el-loading-text){
    color: var(--accent-200);
}
</style>
