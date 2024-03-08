<template>
    <div class="UserContent">

        <div class="UserContentCollection" v-if="UserIndex.index == 0">
            <UserFilterSection />
            <div v-if="isCollectionNullVisible">
                <p style="text-align: start;font-weight: bold;margin-bottom: 20px;">0个项目</p>
                <div class="UserContentDetail">
                    <h2>未找到收集的项目</h2>
                    <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
                </div>
            </div>

            <div class="UserContentLiked" v-else>
                <div v-for="(item, index) in OwnedCollection.collections" :key="index" class="CollectionListItem">
                    <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                        <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                            :src="item.cover" alt="" />
                    </div>

                    <p style="text-align: left; padding: 10px 20px;">{{ item.name }}</p>
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
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
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
            <div class="UserContentDetail">
                <h2>未找到创建的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div>
        </div>

        <div class="UserContentLiked" v-if="UserIndex.index == 4">
            <div v-for="(item, index) in FavoriteCollection.collections" :key="index" class="CollectionListItem">
                <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                    <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                        :src="item.cover" alt="" />
                </div>

                <p style="text-align: left; padding: 10px 20px;">{{ item.name }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>{{ item.price }}</p>
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

import { Collection } from '../interfaces/Collection';


import { FavoriteCollectionStore,OwnedCollectionStore } from '../stores/CollectionStore'
import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'
import UserFilterSection from '../components/UserFilterSection.vue'


import { check } from '../api/user'
import { getCollectionById } from '../api/collections'
import { userInfoStore } from "../stores/UserInfoStore";




const UserIndex = SelectedUserIndexStore()
const FavoriteCollection = FavoriteCollectionStore()
const OwnedCollection = OwnedCollectionStore()
const userInfo = userInfoStore()

let isCollectionNullVisible = ref(false);



onMounted(async () => {
    // 通过check获取到用户收藏的藏品
    await check().then((res) => {
        userInfo.user = res
    })
    
    // 设置通过空数组防止重复存入
    FavoriteCollection.collections = []
    // 使用getCollectionById通过数组userInfo.user.favoriteCollection中的objectId获取收藏的项目
    await Promise.all(userInfo.user!.favoriteCollection.map(async (item) => {
        const res = await getCollectionById(item);
        FavoriteCollection.collections.push(res);
    }));
    //使用getCollectionById通过数组userInfo.user.ownedCollection中的objectId获取收藏的项目
    await Promise.all(userInfo.user!.ownedCollection.map(async (item) => {
        const res = await getCollectionById(item);
        OwnedCollection.collections.push(res);
    }));

    // 定义变量表示collectionItems的长度
    let collectionItemsLength = FavoriteCollection.collections.length
    // 如果collectionItemsLength=0时，isCollectionNullVisible为true

    if (collectionItemsLength === 0) {
        isCollectionNullVisible.value = true
    }
})


</script>

<style lang="scss" scoped>
.UserContent {
    width: 100%;

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

    width: 100%;
    height: 30vh;

    border: 0.5px solid var(--text-200);
    border-radius: 20px;
}
</style>
