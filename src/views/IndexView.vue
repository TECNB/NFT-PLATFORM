<script setup lang="ts">

import MainNavbar from '../components/MainNavbar.vue'
import TypeNavbar from '../components/TypeNavbar.vue'
import CollectionList from '../components/CollectionList.vue'
import { } from "vue"
import { RecommendedCollectionStore, CollectionRankingStore, PopularAnimationCollectionStore, PopularRealityCollectionStore, PopularTechnologyCollectionStore, PopularAnimalCollectionStore } from '../stores/CollectionStore'
import { SelectedIndexStore } from '../stores/SelectedIndexStore'
import { Collection } from '../interfaces/Collection';




// 像 useRouter 那样定义一个变量拿到实例
const RecommendedCollection = RecommendedCollectionStore()
const CollectionRanking = CollectionRankingStore()
const PopularAnimationCollection = PopularAnimationCollectionStore()
const PopularRealityCollection = PopularRealityCollectionStore()
const PopularTechnologyCollection = PopularTechnologyCollectionStore()
const PopularAnimalCollection = PopularAnimalCollectionStore()

const TypeIndex = SelectedIndexStore()

console.log("SelectedIndex:" + TypeIndex.index)

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
]

// 使用 setState 方法赋值
RecommendedCollection.collections = recommendedCollections
CollectionRanking.collections = recommendedCollections

PopularAnimationCollection.collections = recommendedCollections
PopularRealityCollection.collections = recommendedCollections
PopularTechnologyCollection.collections = recommendedCollections
PopularAnimalCollection.collections = recommendedCollections


</script>

<template>
    <div class="IndexView" v-if="TypeIndex.index == 0">

        <MainNavbar />
        <TypeNavbar />
        <el-carousel :interval="4000" type="card" height="300px" >
            <el-carousel-item v-for="(item, index) in recommendedCollections" :key="index" style="border-radius: 20px 20px 0px 0px;">
                <img :src="item.imageUrl" alt="NFT Image" style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;">
                <h3 text="2xl" justify="center">{{ item.title }}</h3>
                <p>{{ item.price }}</p>
                <p>{{ item.tradingVolume }}</p>
            </el-carousel-item>
        </el-carousel>
        <CollectionList msg="推荐数字藏品" />
        <CollectionList msg="今日数字藏品排行榜" />
        <CollectionList msg="热门动画数字藏品" />
        <CollectionList msg="热门现实数字藏品" />
        <CollectionList msg="热门科技数字藏品" />
        <CollectionList msg="热门动物数字藏品" />
    </div>
    <div class="IndexView" v-if="TypeIndex.index == 1">
        <MainNavbar />
        <TypeNavbar />
        <el-carousel :interval="4000" type="card" height="300px" >
            <el-carousel-item v-for="(item, index) in recommendedCollections" :key="index" style="border-radius: 20px 20px 0px 0px;">
                <img :src="item.imageUrl" alt="NFT Image" style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;">
                <h3 text="2xl" justify="center">{{ item.title }}</h3>
                <p>{{ item.price }}</p>
                <p>{{ item.tradingVolume }}</p>
            </el-carousel-item>
        </el-carousel>
        
        <CollectionList msg="热门动画数字藏品" />

    </div>
    <div class="IndexView" v-if="TypeIndex.index == 2">
        <MainNavbar />
        <TypeNavbar />
        <CollectionList msg="热门现实数字藏品" />
    </div>
    <div class="IndexView" v-if="TypeIndex.index == 3">
        <MainNavbar />
        <TypeNavbar />

        <CollectionList msg="热门科技数字藏品" />

    </div>
    <div class="IndexView" v-if="TypeIndex.index == 4">
        <MainNavbar />
        <TypeNavbar />

        <CollectionList msg="热门动物数字藏品" />
    </div>
</template>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.IndexView {

    padding-top: 15px;
    overflow-x: hidden;
}
</style>
