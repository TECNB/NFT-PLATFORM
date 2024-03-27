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
            <div class="StatisticsFilter" v-for="(filter, index) in filterListIndex.index" :key="index">
                <p class="font-bold">{{ filter }}</p>
                <el-icon class="cursor-pointer" @click="deleteFilterIndex(index)">
                    <CloseBold />
                </el-icon>
            </div>
        </div>


        <!-- 如果关注列表时去掉前方的序号 -->
        <div class="StatisticsContent">
            <div class="StatisticsContentTitle">
                <p style="flex: 3;" v-if="TypeIndex.index !== 2">#</p>
                <p style="flex: 5;">名称</p>
                <p style="flex: 2;text-align: end;">价格</p>
                <p style="flex: 2;text-align: end;">交易来源</p>
                <p style="flex: 2;text-align: end;">交易对象</p>
                <p style="flex: 2;text-align: end;">时间</p>
                <!-- 下面的部分是用于放置图标做出的空缺 -->
                <p style="flex: 1;text-align: end;" v-if="TypeIndex.index == 2"></p>
            </div>
            <div class="StatisticsContentDetail" v-for="(item, index) in CollectionRanking.collections" :key="index">
                <div class="flex-[3_0_0%] flex justify-center items-center gap-10" v-if="TypeIndex.index !== 2">
                    <el-icon class="">
                        <Discount />
                    </el-icon>
                    <p class="mr-auto">Sale</p>
                </div>
                <div class="StatisticsContentDetailName" style="flex: 5;">
                    <div class="flex-[1.4_0_0%]">
                        <img :src="item.cover" alt=""
                            style="height: 100%; width: 100%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                    <div style="flex: 5;">
                        <p style="text-align: start;padding-left: 25px;">{{ item.name }}</p>
                    </div>

                </div>
                <div style="flex: 2;text-align: end;">{{ item.price }} ETH</div>
                <div style="flex: 2;text-align: end;">C8DE09</div>
                <div style="flex: 2;text-align: end;">YD204D</div>
                <div style="flex: 2;text-align: end;">10 秒前</div>
                <div style="flex: 1;" class="icon" v-if="TypeIndex.index == 2"><el-icon>
                        <Delete />
                    </el-icon></div>
            </div>
        </div>
        <MaskLayer :ifShow="isFilterVisible" />
        <FilterList :ifShow="isFilterVisible" @updateIfShow="updateIsFilterVisible" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MainNavbar from '../components/MainNavbar.vue'



import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'
import { CollectionRankingStore } from '../stores/CollectionStore'
import { FilterListIndexStore } from '../stores/SelectedIndexStore'


const TypeIndex = StatisticsTypeIndexStore()
const filterListIndex = FilterListIndexStore();
const CollectionRanking = CollectionRankingStore();


const isFilterVisible = ref(false);

const updateIsFilterVisible = (value: boolean) => {
    isFilterVisible.value = value;
}


const choseFilter = () => {
    isFilterVisible.value = true;
    console.log('choseFilter')
}

const deleteFilterIndex = (index: number) => {
    filterListIndex.index.splice(index, 1);
}

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
