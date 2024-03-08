<template>
    <div class="Rank">
        <FilterSection from="IndexView"/>
        <div class="RankBelow">
            <div v-for="(collectionGroup, index) in groupedCollections" :key="index" class="RankLeft">
                <div class="RankTitle">
                    <p style="flex: 1;">#</p>
                    <p style="flex: 7;">系列</p>
                    <p style="flex: 4;text-align: end;">交易量</p>
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
                                <p style="color: var(--text-200); padding-top: 10px;">地板价:{{ collection.price }} ETH</p>
                            </div>
                        </div>
                        <p style="flex: 4; text-align: end;">{{ collection.tradingVolume }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';


import FilterSection from '../components/FilterSection.vue'


// 引入getPopularCollections
import { getPopularCollections } from '../api/collections';

const recommendedCollections = ref([
    // Your collection data here
    {
        cover: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gcs/files/cd3e28d133070f314c751ccb1291a532.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/cd3e28d133070f314c751ccb1291a532.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gcs/files/b3f8881dc097cc7de7bc7250622118e5.png?auto=format&dpr=1&h=500&fr=1',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gcs/files/cd3e28d133070f314c751ccb1291a532.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/cd3e28d133070f314c751ccb1291a532.jpg?auto=format&dpr=1&h=500&fr=1 2x',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        cover: 'https://i.seadn.io/gcs/files/b3f8881dc097cc7de7bc7250622118e5.png?auto=format&dpr=1&h=500&fr=1',
        name: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
]);

const groupedCollections = computed(() => {
    const grouped = [];
    for (let i = 0; i < recommendedCollections.value.length; i += 5) {
        grouped.push(recommendedCollections.value.slice(i, i + 5).map((collection, index) => ({ ...collection, rank: i + index + 1 })));
    }
    return grouped;
});


// 获取数据
onMounted(async() => {
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
