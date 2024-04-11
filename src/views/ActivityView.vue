<template>
    <div class="ActivityView">
        <MainNavbar />
        <div class="StatisticsNavbar">
            <div class="StatisticsNavbarItem selected" @click="choseFilter()">
                <el-icon>
                    <Operation />
                </el-icon>
                <p class="ml-3">1</p>
            </div>
        </div>
        <div class="flex justify-start items-center gap-4">
            <div class="StatisticsFilter">
                <p class="font-bold">{{ filter }}</p>
                <el-icon class="cursor-pointer">
                    <CloseBold />
                </el-icon>
            </div>
        </div>


        <!-- 如果关注列表时去掉前方的序号 -->
        <div class="StatisticsContent">
            <div class="StatisticsContentTitle">
                <p style="flex: 3;">#</p>
                <p style="flex: 5;">名称</p>
                <p style="flex: 2;" v-if="filter==='盲盒'">价格</p>

                <p style="flex: 5;" v-if="filter==='盲盒'">介绍</p>
                <p style="flex: 5;" v-if="filter==='预发行'">介绍</p>
                <p style="flex: 5;" v-if="filter==='合成'">介绍</p>

                <p style="flex: 2;" v-if="filter==='预发行'">预定发行时间</p>

                <p style="flex: 2;text-align: left" v-if="filter==='空投'">投放数量</p>
                <p style="flex: 3;text-align: left" v-if="filter==='空投'">开始时间</p>
                <p style="flex: 3;text-align: left" v-if="filter==='空投'">结束时间</p>


            </div>
            <div class="StatisticsContentDetail border-t border-solid border-gray-300 p-3" v-for="(item, index) in displayCollections" :key="index">
                <div class="flex-[3_0_0%] flex justify-center items-center gap-10" v-if="filter==='盲盒'">
                    <el-icon class="">
                        <MessageBox />
                    </el-icon>
                    <p class="mr-auto">{{ filter }}</p>
                </div>
                <div class="flex-[3_0_0%] flex justify-center items-center gap-10" v-if="filter==='空投'">
                    <el-icon class="">
                        <Promotion />
                    </el-icon>
                    <p class="mr-auto">{{ filter }}</p>
                </div>
                <div class="flex-[3_0_0%] flex justify-center items-center gap-10" v-if="filter==='预发行'">
                    <el-icon class="">
                        <Bell />
                    </el-icon>
                    <p class="mr-auto">{{ filter }}</p>
                </div>
                <div class="flex-[3_0_0%] flex justify-center items-center gap-10" v-if="filter==='合成'">
                    <el-icon class="">
                        <Menu />
                    </el-icon>
                    <p class="mr-auto">{{ filter }}</p>
                </div>
                <el-skeleton animated="true" :loading="loading">
                    <div class="StatisticsContentDetailName" style="flex: 5;">
                    <div class="flex-[1.4_0_0%]">
                        <img :src="item.cover" alt=""
                            style="height: 80%; width: 80%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                    <div style="flex: 5;">
                        <p style="text-align: start;padding-left: 25px;">{{ item.name }}</p>
                    </div>

                </div>
                <div style="flex: 2;text-align: left;" v-if="filter==='盲盒'">{{ item.price }} ETH</div>
                

                <div style="flex: 5;text-align: left;" v-if="filter==='盲盒'">{{ item.intro }}</div>
                <div style="flex: 5;text-align: left;" v-if="filter==='合成'">{{ item.intro }}</div>
                <div style="flex: 5;text-align: left;" v-if="filter==='预发行'">{{ item.shortDescription }}</div>

                <div style="flex: 2;text-align: left;" v-if="filter==='预发行'">{{ new Date(item.issueTime).toLocaleString() }}</div>

                <div style="flex: 2;text-align: left;" v-if="filter==='空投'">{{ item.dropCount }}</div>
                <div style="flex: 3;text-align: left;" v-if="filter==='空投'">{{ new Date(item.dropTime).toLocaleString() }}</div>
                <div style="flex: 3;text-align: left;" v-if="filter==='空投'">{{ new Date(item.endTime).toLocaleString() }}</div>

                </el-skeleton>
                
            </div>
        </div>
        <MaskLayer :ifShow="isFilterVisible" />
        <FilterList :ifShow="isFilterVisible" :filter="filter" @updateIfShow="updateIsFilterVisible" @updateFilter="setFilter"/>
    </div>
</template>

<script setup lang="ts">
import { ref,Ref,onMounted,watch } from "vue"
import MainNavbar from '../components/MainNavbar.vue'

import { Collection } from '../interfaces/Collection'

import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'
// import { CollectionRankingStore } from '../stores/CollectionStore'
import { FilterListIndexStore } from '../stores/SelectedIndexStore'

import { getAllCollections } from '../api/collections'
import { getAllBlindBoxs } from '../api/blindBox'
import { getAllDrops } from '../api/drop'
import { getIssueDates } from '../api/issueDate'
import { getAllAlbums } from '../api/album'


const filterListIndex = FilterListIndexStore();
// const CollectionRanking = CollectionRankingStore();

// 目前所展示的数字藏品
const displayCollections = ref([]);

// 筛选条件
const filter = ref('盲盒');

let loading = ref(false)

// 通过watch filterListIndex.index中的值来获取对应的数字藏品
watch(filter, async (newFilter) => {
    console.log('filter:',newFilter)
    loading.value = true
    switch(newFilter){
        case '盲盒':
            loading
            displayCollections.value = await getAllBlindBoxs();
            break;
        case '空投':
            displayCollections.value = await getAllDrops();
            break;
        case '合成':
            displayCollections.value = await getAllAlbums();
            break;
        case '预发行':
            displayCollections.value = await getIssueDates();
            break;
        default:
            displayCollections.value = await getAllCollections();
    }
    loading.value = false
})

// 根据filterListIndex.index中的值来获取对应的数字藏品
onMounted(async () => {
    displayCollections.value = await getAllBlindBoxs();
})

const isFilterVisible = ref(false);

const updateIsFilterVisible = (value: boolean) => {
    isFilterVisible.value = value;
}
const setFilter = (value: string) => {
    filter.value = value;
}


const choseFilter = () => {
    isFilterVisible.value = true;
    console.log('choseFilter')
}

// const deleteFilterIndex = (index: number) => {
//     filterListIndex.index.splice(index, 1);
// }

</script>

<style lang="scss" scoped>
.ActivityView {
    .StatisticsNavbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 16px;
        font-weight: bold;

        padding-bottom: 20px;
        border-bottom: 0.5px solid var(--text-200);

        .StatisticsNavbarItem.selected:hover {

            /* 悬停时的文本颜色 */
            background-color: rgba(18, 18, 18, 0.08);
            cursor: pointer;
        }

        .StatisticsNavbarItem.selected {
            display: flex;
            justify-content: space-around;
            align-items: center;

            padding: 0px 20px;
            height: 45px;
            min-width: 40px;
            border: 1px solid transparent;

            color: var(--text-100);
            background-color: rgba(18, 18, 18, 0.04);

            backdrop-filter: blur(20px);
            border-radius: 12px;
            // 指定转化时的效果
            transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
        }
    }

    .StatisticsFilter {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 10px;

        padding: 0px 20px;
        height: 45px;
        
        border: 1px solid transparent;

        color: var(--text-100);
        background-color: rgba(18, 18, 18, 0.04);


        backdrop-filter: blur(20px);
        border-radius: 12px;
        // 指定转化时的效果
        transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
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
