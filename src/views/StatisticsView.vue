<template>
    <div class="StatisticsView">
        <MainNavbar />
        <h1 style="text-align: start;margin:60px 0">系列统计信息</h1>
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
        <FilterSection from="StatisticsView"/>
        <!-- 如果关注列表时去掉前方的序号 -->
        <div class="StatisticsContent">
            <div class="StatisticsContentTitle">
                <p style="flex: 1;" v-if="TypeIndex.index !== 2">#</p>
                <p style="flex: 12;">系列</p>
                <p style="flex: 2;text-align: end;">交易量</p>
                <p style="flex: 2;text-align: end;">变化</p>
                <p style="flex: 2;text-align: end;">地板价</p>
                <p style="flex: 2;text-align: end;">销售</p>
                <!-- 下面的部分是用于放置图标做出的空缺 -->
                <p style="flex: 1;text-align: end;" v-if="TypeIndex.index == 2"></p>
            </div>
            <div class="StatisticsContentDetail" v-for="(item, index) in recommendedCollections" :key="index">
                <div style="flex: 1;text-align: start;" v-if="TypeIndex.index !== 2">{{index+1}}</div>
                <div class="StatisticsContentDetailName" style="flex: 12;">
                    <div style="flex: 1;">
                        <img :src="item.imageUrl"
                            alt=""
                            style="height: 100%; width: 100%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                    <div style="flex: 11;">
                        <p style="text-align: start;padding-left: 25px;">{{ item.title }}</p>
                    </div>

                </div>
                <div style="flex: 2;text-align: end;">{{item.price}}</div>
                <div style="flex: 2;text-align: end;">{{item.price}}</div>
                <div style="flex: 2;text-align: end;">{{item.price}}</div>
                <div style="flex: 2;text-align: end;">{{item.price}}</div>
                <div style="flex: 1;" class="icon" v-if="TypeIndex.index == 2"><el-icon><Delete /></el-icon></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import MainNavbar from '../components/MainNavbar.vue'
import FilterSection from '../components/FilterSection.vue'
import { Collection } from '../interfaces/Collection';


import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'

const TypeIndex = StatisticsTypeIndexStore()


const selectType = (index: number) => {

    TypeIndex.index = index;
};

// TODO: 从后端获取数据
// 如果TypeIndex.index === 0时则显示热门
// recommendedCollections=
// 如果TypeIndex.index === 1时则显示最佳
// recommendedCollections=
// 如果TypeIndex.index === 2时则显示关注列表
// recommendedCollections=

// 初始值
const recommendedCollections: Collection[] = [
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/gcs/files/cd3e28d133070f314c751ccb1291a532.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/cd3e28d133070f314c751ccb1291a532.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/gcs/files/b3f8881dc097cc7de7bc7250622118e5.png?auto=format&dpr=1&h=500&fr=1',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
]

</script>

<style lang="scss" scoped>
.StatisticsView {
    .StatisticsNavbar {
        display: flex;
        justify-content: start;
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
            justify-content: start;
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
            justify-content: start;
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
                justify-content: end;
                align-items: center;
                
            }
        }
    }
}

// .StatisticsNavbarItem {
//     padding: 0px 20px;
// }
</style>
