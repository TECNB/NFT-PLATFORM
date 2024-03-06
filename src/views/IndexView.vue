<script setup lang="ts">

import MainNavbar from '../components/MainNavbar.vue'
import TypeNavbar from '../components/TypeNavbar.vue'
import CollectionList from '../components/CollectionList.vue'
import Rank from '../components/Rank.vue'
import { onMounted } from "vue"
import { RecommendedCollectionStore, CollectionRankingStore, PopularAnimationCollectionStore, PopularRealityCollectionStore, PopularTechnologyCollectionStore, PopularAnimalCollectionStore } from '../stores/CollectionStore'
import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore'
import { Collection } from '../interfaces/Collection';
// 引入api中的Collections
import { getRecommendedCollections,getCollectionsByCategory } from '../api/collections'
// 引入api中的check
import { check } from '../api/user'

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';
// 实例化
const userInfo = userInfoStore();	





// 像 useRouter 那样定义一个变量拿到实例
const RecommendedCollection = RecommendedCollectionStore()
const CollectionRanking = CollectionRankingStore()
const PopularAnimationCollection = PopularAnimationCollectionStore()
const PopularRealityCollection = PopularRealityCollectionStore()
const PopularTechnologyCollection = PopularTechnologyCollectionStore()
const PopularAnimalCollection = PopularAnimalCollectionStore()

const TypeIndex = SelectedTypeIndexStore()

console.log("SelectedIndex:" + TypeIndex.index)

// 初始值
const recommendedCollections: Collection[] = [
{
		"objectId": "144995hv7ic8gt8d1e9ita3h",
		"hash": "56334e4f7107dc2fdc0f29060e0eda7d0c1ef2f66808f19d61e30428101346e6",
		"name": "东大寺",
		"shortIntro": "东大寺是日本最著名、最重要的寺庙之一，也是奈良的地标。",
		"intro": "东大寺位于日本奈良市，是一座佛教寺庙建筑群，曾是强大的七大寺之一。虽然东大寺始建于公元 738 年，但直到公元 752 年才正式开放。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/1a844b00167657df0f6a412ac8b523c3.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/1a844b00167657df0f6a412ac8b523c3.png",
		"authorId": "509yww08r272412vzf0bv04n",
		"categoryId": "25jvslre4yobdt7w99kkn3rh",
		"type": "图片",
		"price": 18,
		"visitCount": 0,
		"issueNumber": 120,
		"soldNumber": 0,
		"recommend": true,
		"albumId": null
	},
	{
		"objectId": "8qjjbg4l2a7wi8yhcgyj7luu",
		"hash": "fa23fb8e29eb2176999e49582838f635c8a8bcb39c6b6922cc90fda70f763426",
		"name": "大阪城",
		"shortIntro": "大阪城是一座日本城堡，位于日本大阪市中区。这座城堡是日本最著名的地标之一。",
		"intro": "大阪是一座日本城堡，位于日本大阪市中区。这座城堡是日本最著名的地标之一，在 16 世纪安土桃山时代统一日本的过程中发挥了重要作用。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d716bbcaea6c7c8d877e7c5c12b758bd.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d716bbcaea6c7c8d877e7c5c12b758bd.png",
		"authorId": "pg4pmu0gqq0bgg4btfiz085u",
		"categoryId": "6gaq1nnv52k7ul0o53kfer36",
		"type": "图片",
		"price": 10,
		"visitCount": 0,
		"issueNumber": 100,
		"soldNumber": 0,
		"recommend": true,
		"albumId": null
	},
	{
		"objectId": "euwgw441zsne0ig509fnno1g",
		"hash": "23d4093fda27dfe0a39c78ecc295e70b0db7a928ec95fc73bf484f641fcbf243",
		"name": "严岛神社岛",
		"shortIntro": "严岛神社是日本最受欢迎的旅游景点之一。",
		"intro": "严岛神社是严岛上的一座神社，因其“漂浮”的鸟居而闻名。它位于日本广岛县廿日市市，从大陆可在宫岛口站乘坐渡船前往。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/15e1581b960dc300803153ed7f65b584.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/15e1581b960dc300803153ed7f65b584.png",
		"authorId": "eke2tn4mvo3ty5v4mhuhdwx4",
		"categoryId": "kfgj345ovn6mqhp27sg02ciz",
		"type": "图片",
		"price": 15,
		"visitCount": 0,
		"issueNumber": 100,
		"soldNumber": 0,
		"recommend": false,
		"albumId": null
	},
	{
		"objectId": "v2xb0vz4oq91yhfy84nk5j6v",
		"hash": "43cae887ed052d55f810f6a06e2d95fb75a37e0609800a25172db447a3bec370",
		"name": "巴布萨顶",
		"shortIntro": "巴布萨尔山顶（Babusar Top）是巴基斯坦的一个山口，位于美丽的卡汗山谷 150 公里长的北部。",
		"intro": "巴布萨尔山口或巴布萨尔山顶是巴基斯坦的一个山口，位于 150 公里长的卡汗河谷北部，通过塔克纳拉与喀喇昆仑公路上的奇拉斯连接。它是卡汗河谷的最高点，汽车可以轻松到达。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d1971c4c5ae9c8f4651e9316dc1dc520.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d1971c4c5ae9c8f4651e9316dc1dc520.png",
		"authorId": "2j6izx38pi6hi29j4vo0lu0v",
		"categoryId": "6gaq1nnv52k7ul0o53kfer36",
		"type": "图片",
		"price": 20,
		"visitCount": 0,
		"issueNumber": 100,
		"soldNumber": 0,
		"recommend": false,
		"albumId": null
	},
    {
		"objectId": "euwgw441zsne0ig509fnno1g",
		"hash": "23d4093fda27dfe0a39c78ecc295e70b0db7a928ec95fc73bf484f641fcbf243",
		"name": "严岛神社岛",
		"shortIntro": "严岛神社是日本最受欢迎的旅游景点之一。",
		"intro": "严岛神社是严岛上的一座神社，因其“漂浮”的鸟居而闻名。它位于日本广岛县廿日市市，从大陆可在宫岛口站乘坐渡船前往。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/15e1581b960dc300803153ed7f65b584.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/15e1581b960dc300803153ed7f65b584.png",
		"authorId": "eke2tn4mvo3ty5v4mhuhdwx4",
		"categoryId": "kfgj345ovn6mqhp27sg02ciz",
		"type": "图片",
		"price": 15,
		"visitCount": 0,
		"issueNumber": 100,
		"soldNumber": 0,
		"recommend": false,
		"albumId": null
	},
	{
		"objectId": "v2xb0vz4oq91yhfy84nk5j6v",
		"hash": "43cae887ed052d55f810f6a06e2d95fb75a37e0609800a25172db447a3bec370",
		"name": "巴布萨顶",
		"shortIntro": "巴布萨尔山顶（Babusar Top）是巴基斯坦的一个山口，位于美丽的卡汗山谷 150 公里长的北部。",
		"intro": "巴布萨尔山口或巴布萨尔山顶是巴基斯坦的一个山口，位于 150 公里长的卡汗河谷北部，通过塔克纳拉与喀喇昆仑公路上的奇拉斯连接。它是卡汗河谷的最高点，汽车可以轻松到达。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d1971c4c5ae9c8f4651e9316dc1dc520.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d1971c4c5ae9c8f4651e9316dc1dc520.png",
		"authorId": "2j6izx38pi6hi29j4vo0lu0v",
		"categoryId": "6gaq1nnv52k7ul0o53kfer36",
		"type": "图片",
		"price": 20,
		"visitCount": 0,
		"issueNumber": 100,
		"soldNumber": 0,
		"recommend": false,
		"albumId": null
	},
    {
		"objectId": "144995hv7ic8gt8d1e9ita3h",
		"hash": "56334e4f7107dc2fdc0f29060e0eda7d0c1ef2f66808f19d61e30428101346e6",
		"name": "东大寺",
		"shortIntro": "东大寺是日本最著名、最重要的寺庙之一，也是奈良的地标。",
		"intro": "东大寺位于日本奈良市，是一座佛教寺庙建筑群，曾是强大的七大寺之一。虽然东大寺始建于公元 738 年，但直到公元 752 年才正式开放。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/1a844b00167657df0f6a412ac8b523c3.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/1a844b00167657df0f6a412ac8b523c3.png",
		"authorId": "509yww08r272412vzf0bv04n",
		"categoryId": "25jvslre4yobdt7w99kkn3rh",
		"type": "图片",
		"price": 18,
		"visitCount": 0,
		"issueNumber": 120,
		"soldNumber": 0,
		"recommend": true,
		"albumId": null
	},
	{
		"objectId": "8qjjbg4l2a7wi8yhcgyj7luu",
		"hash": "fa23fb8e29eb2176999e49582838f635c8a8bcb39c6b6922cc90fda70f763426",
		"name": "大阪城",
		"shortIntro": "大阪城是一座日本城堡，位于日本大阪市中区。这座城堡是日本最著名的地标之一。",
		"intro": "大阪是一座日本城堡，位于日本大阪市中区。这座城堡是日本最著名的地标之一，在 16 世纪安土桃山时代统一日本的过程中发挥了重要作用。",
		"cover": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d716bbcaea6c7c8d877e7c5c12b758bd.png",
		"file": "http://files.moefish.net/files/zia4cytq0qlu6h0ki8fluwu5/d716bbcaea6c7c8d877e7c5c12b758bd.png",
		"authorId": "pg4pmu0gqq0bgg4btfiz085u",
		"categoryId": "6gaq1nnv52k7ul0o53kfer36",
		"type": "图片",
		"price": 10,
		"visitCount": 0,
		"issueNumber": 100,
		"soldNumber": 0,
		"recommend": true,
		"albumId": null
	},
	

]

// 使用 setState 方法赋值

CollectionRanking.collections = recommendedCollections

PopularAnimationCollection.collections = recommendedCollections
PopularRealityCollection.collections = recommendedCollections
PopularTechnologyCollection.collections = recommendedCollections
PopularAnimalCollection.collections = recommendedCollections

onMounted(async() => {
    console.log("IndexView onMounted")
    // 获取推荐的藏品
    getRecommendedCollections().then(res => {
        console.log(res)
        RecommendedCollection.collections = res ?? []
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
    // 根据不同分类获取藏品
    getCollectionsByCategory("25jvslre4yobdt7w99kkn3rh").then(res => {
        console.log(res)
        PopularAnimationCollection.collections = res ?? []
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
	// 使用check方法更新userInfo
    await check().then((res) => {
        userInfo.user = res;
    }).catch((err) => {
        console.log(err);
    });
})




</script>

<template>
    <div class="IndexView" v-if="TypeIndex.index == 0">

        <MainNavbar />
        <TypeNavbar />
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item, index) in recommendedCollections" :key="index"
                style="border-radius: 20px 20px 0px 0px;">
                <img :src="item.cover" alt="NFT Image"
                    style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;">
                <h3 text="2xl" justify="center">{{ item.name }}</h3>
            </el-carousel-item>
        </el-carousel>
        <Rank />
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
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item, index) in recommendedCollections" :key="index"
                style="border-radius: 20px 20px 0px 0px;">
                <img :src="item.cover" alt="NFT Image"
                    style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;">
                <h3 text="2xl" justify="center">{{ item.name }}</h3>
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
