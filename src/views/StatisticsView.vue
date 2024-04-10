<template>
    <div class="StatisticsView">
        <MainNavbar />
        <h1 class="text-left text-3xl font-medium mx-0 my-16">藏品统计信息</h1>
        <div class="StatisticsNavbar">
            <div class="StatisticsNavbarItem" @click="selectType(0)" :class="{ 'selected': TypeIndex.index === 0 }">
                <p>热门</p>
            </div>
            <div class="StatisticsNavbarItem" @click="selectType(1)" :class="{ 'selected': TypeIndex.index === 1 }">
                <p>最佳</p>
            </div>
            <div class="StatisticsNavbarItem" @click="selectType(2)" :class="{ 'selected': TypeIndex.index === 2 }">
                <p>关注列表</p>
            </div>

        </div>
        <!-- <FilterSection from="StatisticsView" /> -->
        <!-- 如果关注列表时去掉前方的序号 -->
        <div class="StatisticsContent">
            <div class="StatisticsContentTitle">
                <p style="flex: 1;" v-if="TypeIndex.index !== 2">#</p>
                <p style="flex: 12;">藏品</p>
                <p style="flex: 2;text-align: end;">价格</p>
                <p style="flex: 2;text-align: end;">交易量</p>
                <p style="flex: 2;text-align: end;">发售数量</p>
                <!-- 下面的部分是用于放置图标做出的空缺 -->
                <p style="flex: 1;text-align: end;" v-if="TypeIndex.index == 2"></p>
            </div>
            <div class="StatisticsContentDetail" v-for="(item, index) in displayedItems.filter(collection => collection.final === false)" :key="index">
                <div style="flex: 1;text-align: start;" v-if="TypeIndex.index !== 2">{{ index + 1 }}</div>
                <div class="StatisticsContentDetailName" style="flex: 12;">
                    <div style="flex: 1;">
                        <img :src="item.cover" alt=""
                            style="height: 100%; width: 100%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                    <div style="flex: 11;">
                        <p style="text-align: start;padding-left: 25px;">{{ item.name }}</p>
                    </div>

                </div>
                <div style="flex: 2;text-align: end;">¥{{ item.price }}</div>
                <div style="flex: 2;text-align: end;">{{ item.soldNumber }}</div>
                
                <div style="flex: 2;text-align: end;">{{ item.issueNumber }}</div>
                <div style="flex: 1;" class="icon" v-if="TypeIndex.index == 2"><el-icon>
                        <Delete />
                    </el-icon></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref,watch } from "vue"


import MainNavbar from '../components/MainNavbar.vue'
import FilterSection from '../components/FilterSection.vue'

import { Collection } from '../interfaces/Collection'


import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'
import {CollectionRankingStore,FavoriteCollectionStore} from '../stores/CollectionStore'


const TypeIndex = StatisticsTypeIndexStore()
const CollectionRanking = CollectionRankingStore();
const FavoriteCollection = FavoriteCollectionStore();

let displayedItems = ref<Collection[]>([]);


// watch TypeIndex.index
watch(() => TypeIndex.index, (index) => {
    if (index === 0) {
        // 根据观看数visitCount排序
        displayedItems.value = CollectionRanking.collections.filter(collection => collection.final === false).sort((a, b) => b.visitCount - a.visitCount);
    } else if (index === 1) {
        // 根据销售额排序soldNumber
        displayedItems.value = CollectionRanking.collections.filter(collection => collection.final === false).sort((a, b) => b.soldNumber - a.soldNumber);
    } else if (index === 2) {
        displayedItems.value = FavoriteCollection.collections;
    }
});
onMounted(() => {
    displayedItems.value = CollectionRanking.collections.filter(collection => collection.final === false).sort((a, b) => b.visitCount - a.visitCount);
});




const selectType = (index: number) => {
    TypeIndex.index = index;
};

</script>

<style lang="scss" scoped>
.StatisticsView {
    .StatisticsNavbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        gap: 50px;
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 16px;
        font-weight: bold;

        padding-bottom: 40px;
        border-bottom: 0.5px solid var(--text-200);

        .StatisticsNavbarItem.selected:hover {
            color: var(--text-200);
            /* 悬停时的文本颜色 */
            background-color: rgba(214, 198, 225, 0.7);
        }

        .StatisticsNavbarItem.selected {
            display: flex;
            justify-content: space-around;
            align-items: center;

            padding: 0px 20px;
            height: 40px;
            min-width: 40px;
            border: 1px solid transparent;

            background-color: var(--accent-100);

            backdrop-filter: blur(20px);
            border-radius: 16px;
            // 指定转化时的效果
            transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
        }
    }

    .StatisticsContent {
        margin-top: 30px;

        .StatisticsContentTitle {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: bold;


            padding-bottom: 10px;
            margin-bottom: 20px;

            p {
                text-align: start;
                color: var(--accent-200);
            }
        }

        .StatisticsContentDetail {
            display: flex;
            justify-content: flex-start;
            align-items: center;


            font-size: 20px;
            font-weight: bold;

            margin-top: 10px;

            .StatisticsContentDetailName {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .icon {
                display: flex;
                justify-content: flex-end;
                align-items: center;

            }
        }
    }
}
</style>
