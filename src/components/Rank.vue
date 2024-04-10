<template>
    <div class="Rank">
        <FilterSection from="IndexView" />
        <div class="RankBelow">
            <div v-for="(collectionGroup, index) in groupedCollections" :key="index" class="RankLeft">
                <div class="RankTitle">
                    <p style="flex: 1;">#</p>
                    <p style="flex: 7;">藏品</p>
                    <p v-if="TypeIndex.index === 0" style="flex: 4;text-align: end;">观看数</p>
                    <p v-else style="flex: 4;text-align: end;">交易量</p>
                </div>
                <div class="RankBody">
                    <div v-for="(collection, innerIndex) in collectionGroup" :key="innerIndex" class="RankBodyItem">
                        <p style="flex: 1;">{{ collection.rank }}</p>
                        <div style="flex: 7;" class="RankBodyItemContent">
                            <div style="flex: 0.3;">
                                <img :src="collection.cover" alt=""
                                    style="height: 100%; width: 100%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                            </div>
                            <div style="padding-left: 20px;">
                                <p>{{ collection.name }}</p>
                                <p style="color: var(--text-200); padding-top: 10px;">价格:¥{{ collection.price }}</p>
                            </div>
                        </div>
                        <p v-if="TypeIndex.index === 0" style="flex: 4; text-align: end;">{{ collection.visitCount }}</p>
                        <p v-else style="flex: 4; text-align: end;">{{ collection.soldNumber }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';


import FilterSection from '../components/FilterSection.vue'

import { CollectionRankingStore } from '../stores/CollectionStore'
import { FilterSectionTypeIndexStore } from '../stores/SelectedIndexStore'


// 引入getPopularCollections
import { getPopularCollections } from '../api/collections';

const CollectionRanking = CollectionRankingStore();
const TypeIndex = FilterSectionTypeIndexStore();

const topTenCollections = ref([]);









let groupedCollections = computed(() => {
    const grouped = [];
    // 将CollectionRanking.collections前十个数据展示
    topTenCollections.value = CollectionRanking.collections.slice(0, 10);


    if(TypeIndex.index === 0){
        topTenCollections.value = CollectionRanking.collections.filter(collection => collection.final === false).sort((a, b) => b.visitCount - a.visitCount).slice(0, 10);
    }else if(TypeIndex.index === 1){
        topTenCollections.value = CollectionRanking.collections.filter(collection => collection.final === false).sort((a, b) => b.soldNumber - a.soldNumber).slice(0, 10);
    }
    
    
    for (let i = 0; i < topTenCollections.value.length; i += 5) {
        grouped.push(topTenCollections.value.slice(i, i + 5).map((collection, index) => ({ ...collection, rank: i + index + 1 })));
    }
    return grouped;
});


// 获取数据
onMounted(async () => {
    getPopularCollections().then((res) => {
        //TODO:目前数据不足，下面的内容暂时注释
        // recommendedCollections.value = res;

    }).catch((err) => {
        console.log(err);
    });
});
</script>


<style lang="scss" scoped>
.Rank {
    width: 100%;
    height: 100%;



    .RankBelow {
        display: flex;
        // 控制两个排行中间的间隔
        gap: 80px;

        .RankLeft {
            width: 50%;
            height: 100%;
            margin-top: 20px;

            .RankTitle {

                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-weight: bold;

                border-bottom: 1px solid var(--text-200);

                padding-bottom: 10px;
                margin-bottom: 20px;

                p {
                    text-align: start;
                    color: var(--accent-200);
                }
            }

            .RankBody {


                .RankBodyItem {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    p {
                        text-align: start;
                        color: var(--text-100);
                        font-weight: bold;
                    }

                    .RankBodyItemContent {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                    }
                }

            }
        }
    }


}
</style>
