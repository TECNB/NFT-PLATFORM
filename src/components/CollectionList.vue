<template>
    <div class="CollectionList">
        <p style="text-align: left;margin-bottom: 20px;height: 10%;">{{ props.msg }}</p>
        <div class="CollectionListAll">
            <div class="Page">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
            </div>
            <!-- 使用translateX实现翻页效果 -->
            <div class="CollectionListItems"  style="transform:translateX(280px)">
                <div v-for="(item, index) in collectionItems" :key="index" class="CollectionListItem" @click="toNft">
                    <div class="CollectionListItemImage" style="height: 150px; width: 280px;">
                        <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                            :src="item.imageUrl" alt="" />
                    </div>

                    <p style="text-align: left; padding: 10px 20px;">{{ item.title }}</p>
                    <div class="CollectionListItemDetail">
                        <div>
                            <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                            <p>{{ item.price }}</p>
                        </div>
                        <div>
                            <p style="font-size: 16px; font-weight: normal;">24小时交易量</p>
                            <p>{{ item.tradingVolume }}</p>
                        </div>
                    </div>
                </div>

            </div>
            <!-- TODO:Page应该以fix或者absulute的布局放在外层，目前的布局会与overflow：hidden冲突 -->
            <div class="Page">
                <el-icon>
                    <ArrowRightBold />
                </el-icon>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"

import { RecommendedCollectionStore, CollectionRankingStore, PopularAnimationCollectionStore, PopularRealityCollectionStore, PopularTechnologyCollectionStore, PopularAnimalCollectionStore } from '../stores/CollectionStore'
import { Collection } from '../interfaces/Collection';
import { useRouter } from 'vue-router'

const router = useRouter()

const toNft = () => {
    router.push({
        name: 'NftView',
    })
}



const props = defineProps<{ msg: string }>()


// 像 useRouter 那样定义一个变量拿到实例
const RecommendedCollection = RecommendedCollectionStore()
const CollectionRanking = CollectionRankingStore()
const PopularAnimationCollection = PopularAnimationCollectionStore()
const PopularRealityCollection = PopularRealityCollectionStore()
const PopularTechnologyCollection = PopularTechnologyCollectionStore()
const PopularAnimalCollection = PopularAnimalCollectionStore()

let collectionItems: Collection[];


switch (props.msg) {
    case "推荐数字藏品":
        collectionItems = RecommendedCollection.collections;
        break;
    case "今日数字藏品排行榜":
        collectionItems = CollectionRanking.collections;
        break;
    case "热门动画数字藏品":
        collectionItems = PopularAnimationCollection.collections;
        break;
    case "热门现实数字藏品":
        collectionItems = PopularRealityCollection.collections;
        break;
    case "热门科技数字藏品":
        collectionItems = PopularTechnologyCollection.collections;
        break;
    case "热门动物数字藏品":
        collectionItems = PopularAnimalCollection.collections;
        break;
    default:
        console.log("未知消息");
}





// 直接通过实例来获取数据
console.log(RecommendedCollection)
</script>

<style lang="scss" scoped>
.CollectionList {

    width: 100%;
    height: 100%;

    margin-bottom: 30px;


    font-size: 20px;
    font-weight: bold;
    color: var(--text-100);

    

    .CollectionListAll {
        display: flex;
        justify-content: start;
        align-items: center;


        .CollectionListItems {
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 30px;


            height: 90%;

            
            padding: 20px;


            

            .CollectionListItem {
                height: 100%;
                width: 280px;
                background-color: #FFFFFF;
                border-radius: 20px;
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
                /* 调整阴影效果 */
                transition: box-shadow 0.3s ease, transform 0.3s ease;



                /* 添加过渡效果 */
                .CollectionListItemDetail {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: left;
                    padding: 10px 20px;

                }
            }


            .CollectionListItem:hover {
                box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
                /* 鼠标悬停时的阴影效果 */
                transform: translateY(-5px);
                /* 鼠标悬停时向上移动10px */
            }
        }
        .Page {
            display: flex;
            justify-content: center;
            align-items: center;



            width: 60px;
            height: 280px;
            background-color: #FFFFFF;
            border-radius: 10px;

            
        }
    }




}
</style>
