<template>
    <div class="UserContent">

        <div class="UserContentCollection" v-if="UserIndex.index == 0">
            <UserFilterSection />
            <p style="text-align: start;font-weight: bold;margin-bottom: 20px;">0个项目</p>
            <div class="UserContentDetail">
                <h2>未找到收集的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
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
            <div v-for="(item, index) in collectionItems" :key="index" class="CollectionListItem">
                <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                    <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                        :src="item.imageUrl" alt="" />
                </div>

                <p style="text-align: left; padding: 10px 20px;">{{ item.title }}</p>
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
import { } from "vue"
import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'
// 引入UserFilterSection
import UserFilterSection from '../components/UserFilterSection.vue'

const UserIndex = SelectedUserIndexStore()
import { } from "vue"

import { RecommendedCollectionStore } from '../stores/CollectionStore'
import { Collection } from '../interfaces/Collection';




// 像 useRouter 那样定义一个变量拿到实例
const RecommendedCollection = RecommendedCollectionStore()


let collectionItems: Collection[];
collectionItems = RecommendedCollection.collections





// 直接通过实例来获取数据
console.log(RecommendedCollection.collections)

</script>

<style lang="scss" scoped>
.UserContent {
    width: 100%;


    .UserContentLiked {
        display: flex;
        justify-content: start;
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
                justify-content: start;
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
