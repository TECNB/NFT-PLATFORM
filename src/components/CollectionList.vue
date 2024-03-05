<template>
    <div class="CollectionList">
        <p style="text-align: left;margin-bottom: 20px;height: 10%;">{{ props.msg }}</p>
        <div class="CollectionListAll">
            <div class="PageBefore" @click="goToPreviousPage">
                <el-icon>
                    <ArrowLeftBold />
                </el-icon>
            </div>
            <!-- 使用translateX实现翻页效果 style="transform:translateX(-280px)" -->
            <div class="CollectionListItems ">
                <div v-for="(item, index) in displayedItems" :key="index" class="CollectionListItem" @click="toNft">
                    <div class="CollectionListItemImage" style="height: 150px; width: 100%;">
                        <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                            :src="item.cover" alt="" />
                    </div>

                    <p style="text-align: left; padding: 10px 20px;">{{ item.name }}</p>
                    <div class="CollectionListItemDetail">
                        <div>
                            <p class="text-base font-normal">交易价格</p>
                            <p>{{ item.price }} ETH</p>
                        </div>
                        <div>
                            <p class="text-base font-normal">24小时交易量</p>
                            <p>{{ item.price }}  ETH</p>
                        </div>
                    </div>
                </div>

            </div>
            <!-- TODO:Page应该以fix或者absulute的布局放在外层，目前的布局会与overflow：hidden冲突 -->
            <div class="PageNext" @click="goToNextPage">
                <el-icon>
                    <ArrowRightBold />
                </el-icon>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"

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
const currentPage = ref(0);
const displayedItems = ref<Collection[]>([]);

const updateDisplayedItems = () => {
    const itemsPerPage = calculateItemsPerPage();
    const startIndex = currentPage.value * itemsPerPage;
    displayedItems.value = collectionItems.slice(startIndex, startIndex + itemsPerPage);
};

const calculateItemsPerPage = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 912) {
        return 2;
    } else if (screenWidth < 1235) {
        return 3;
    } else if (screenWidth < 1520) {
        return 4;
    } else if (screenWidth < 1809) {
        return 5;
    } else {
        return 6;
    }
};

const goToPreviousPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
        updateDisplayedItems();
    }
};

const goToNextPage = () => {
    const totalPages = Math.ceil(collectionItems.length / calculateItemsPerPage());
    if (currentPage.value < totalPages - 1) {
        currentPage.value++;
        updateDisplayedItems();
    }
};

onMounted(() => {
    updateDisplayedItems();
    window.addEventListener('resize', updateDisplayedItems);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateDisplayedItems);
});





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



    padding-left: -40px;



    .CollectionListAll {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        width: 100%;


        .CollectionListItems {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;

            overflow-y: hidden;

            gap: 30px;

            width: 100%;

            max-width: 100%;
            min-width: 90%;
            height: 300px;

            margin: 0 auto;



            .CollectionListItem {

                min-width: 255px;
                max-width: 375px;

                flex-grow: 1;
                /* 使用 flex-grow 属性，让项目自动占用剩余空间 */
                flex-shrink: 0;
                flex-basis: 10%;

                height: 90%;

                background-color: #FFFFFF;
                border-radius: 20px;
                box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
                /* 调整阴影效果 */
                transition: box-shadow 0.3s ease, transform 0.3s ease;

                cursor: pointer;
                margin-top: 15px;


                /* 添加过渡效果 */
                .CollectionListItemDetail {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: left;
                    padding: 10px 20px;

                }
            }

            // @media (max-width: 1300px) {
            //     .CollectionListItem {
            //         min-width: 155px;
            //         max-width: 255px;
            //     }
            // }


            .CollectionListItem:hover {
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
                /* 鼠标悬停时的阴影效果 */
                transform: translateY(-5px);
                /* 鼠标悬停时向上移动10px */
            }
        }

        .PageBefore {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0.2vw;
            z-index: 99999;



            width: 3vw;
            min-width: 32px;
            max-width: 40px;
            height: 280px;
            background-color: #FFFFFF;
            border-radius: 10px;
        }

        .PageNext {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 0.2vw;
            z-index: 99999;



            width: 3vw;
            min-width: 32px;
            max-width: 40px;
            height: 280px;
            background-color: #FFFFFF;
            border-radius: 10px;


        }
    }




}
</style>
