<template>
	<div class="IndexView" v-if="TypeIndex.index == '0'">

		<MainNavbar />
		<TypeNavbar />
		<el-carousel :interval="4000" type="card" height="300px">
			<el-carousel-item v-for="(item, index) in CollectionRanking.collections" :key="index"
				style="border-radius: 20px 20px 0px 0px;">
				<img :src="item.cover" alt="NFT Image"
					style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;">
				<h3 text="2xl" justify="center">{{ item.name }}</h3>
			</el-carousel-item>
		</el-carousel>
		<Rank />
		<CollectionList :source="RecommendedCollection.collections" title="推荐数字藏品" :ifType="false" />
		<CollectionList :source="CollectionRanking.collections" title="今日数字藏品排行榜" :ifType="false"/>

		<div v-for="(type, index) in typeStore.typeInfo" :key="index" class="IndexView">
			<CollectionList :source="type" :title="`热门${type.name}`" :ifType="true"/>
		</div>


	</div>
	<div v-for="(type, index) in typeStore.typeInfo" :key="index" class="IndexView"
		v-show="TypeIndex.index == type.objectId">
		<MainNavbar />
		<TypeNavbar />
		<CollectionList :source="type" :title="`热门${type.name}`" :ifType="true"/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue"


import { Type } from '../interfaces/Type'


import MainNavbar from '../components/MainNavbar.vue'
import TypeNavbar from '../components/TypeNavbar.vue'
import CollectionList from '../components/CollectionList.vue'
import Rank from '../components/Rank.vue'


import { RecommendedCollectionStore, CollectionRankingStore } from '../stores/CollectionStore'
import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore'
import { userInfoStore } from '../stores/UserInfoStore';
import { TypeStore } from '../stores/TypeStore';


// 引入api中的Collections
import { getRecommendedCollections,getPopularCollections } from '../api/collections'
// 引入api中的check
import { check } from '../api/user'


const userInfo = userInfoStore();
const typeStore = TypeStore()
const RecommendedCollection = RecommendedCollectionStore()
const CollectionRanking = CollectionRankingStore()
const TypeIndex = SelectedTypeIndexStore()



const typeList: Ref<Type[]> = ref([])
typeList.value = typeStore.typeInfo



onMounted(async () => {
	console.log("IndexView onMounted")
	// 获取推荐的藏品
	await getRecommendedCollections().then(res => {
		console.log(res)
		RecommendedCollection.collections = res ?? []
		
		console.log(res)
	}).catch(err => {
		console.log(err)
	})
	// getPopularCollections
	await getPopularCollections().then(res => {
		CollectionRanking.collections = res ?? []
		console.log(res)
	}).catch(err => {
		console.log(err)
	})
	// 使用check方法更新userInfo
	await check().then((res) => {
		userInfo.user = res;
	}).catch((err) => {
		userInfo.token = "";
		console.log(err);
	});
})
</script>

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
