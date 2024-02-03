<template>
    <div class="SeriesInfo">
        <div class="SeriesInfoBackground">
            <div style="" class="SeriesInfoAvatar">
                <img src="https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x"
                    alt="" style="height: 100%; width: 100%; border-radius: 20%; object-fit: cover; aspect-ratio: 1/1;">
            </div>

            <div class="SeriesInfoDetail">
                <div class="SeriesInfoDetailUp">
                    <p style="font-size: 26px;flex: 6;">Mint Genesis NFT</p>
                    <p style="flex: 2;">01068 ETH</p>
                    <p style="flex: 2;">0.0085 ETH</p>
                    <p style="flex: 2;">0.0090 ETH</p>
                    <p style="flex: 2;">12%</p>
                    <p style="flex: 2;">256 (36%)</p>
                </div>
                <div class="SeriesInfoDetailBelow">
                    <p style="flex: 6;">JYatrofsky</p>
                    <p style="flex: 2;">总交易量</p>
                    <p style="flex: 2;">地板价</p>
                    <p style="flex: 2;">最佳报价</p>
                    <p style="flex: 2;">已刊登</p>
                    <p style="flex: 2;">所有者（独特）</p>
                </div>

            </div>
        </div>
        <div class="SeriesInfoDescription">
            <div class="Left">
                <div class="descriptionDetail" v-if="!isExpanded">
                    <p style="overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width: 75vh;">Mint Genesis NFT
                        is a collection dedicated to early advocates of the Mint blockchain, collectively
                        documenting the origin of a network focused on NFTs. The value of Mint Genesis NFT will continuously
                        appreciate and accumulate with the development of the Mint Blockchain ecosystem.</p>
                    <p @click="toggleExpand" v-if="!isExpanded"><a href="#"
                            style="min-width: 10vh;font-weight: bold;">展开</a></p>

                </div>
                <div class="descriptionDetail" v-else="!isExpanded">
                    <p>Mint Genesis NFT is a collection dedicated to early advocates of the Mint blockchain, collectively
                        documenting the origin of a network focused on NFTs. The value of Mint Genesis NFT will continuously
                        appreciate and accumulate with the development of the Mint Blockchain ecosystem.</p>
                </div>
                <p @click="toggleExpand" v-if="isExpanded"><a href="#" style="min-width: 10vh;font-weight: bold;">收起</a></p>

                <div class="descriptionInfo">
                    <span>项目数37.4K</span>
                    <span>创建日期 Jan 2024</span>
                    <span>创作者收益5%</span>
                </div>

            </div>
            <div class="Right">
                <el-icon size="24">
                    <Star />
                </el-icon>
            </div>

        </div>
        <div class="TypeNavbar">
            <div class="TypeNavbarItem" @click="selectType(0)" :class="{ 'selected': TypeIndex.index === 0 }">
                <p>项目</p>
            </div>
            <div class="TypeNavbarItem" @click="selectType(1)" :class="{ 'selected': TypeIndex.index === 1 }">
                <p>报价</p>
            </div>
            <div class="TypeNavbarItem" @click="selectType(2)" :class="{ 'selected': TypeIndex.index === 2 }">
                <p>分析技术</p>
            </div>
            <div class="TypeNavbarItem" @click="selectType(3)" :class="{ 'selected': TypeIndex.index === 3 }">
                <p>销售详情</p>
            </div>
        </div>
        <UserFilterSection />
        <div class="UserContentLiked">
            <div v-for="(item, index) in collectionItems" :key="index" class="CollectionListItem" @mouseenter="showDelete(index)" @mouseleave="hideDelete">
                <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                    <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                        :src="item.imageUrl" alt="" />
                </div>

                <p style="text-align: left; padding: 10px 20px;">{{ item.title }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>{{ item.price }}</p>
                </div>
                <div class="button" v-if=" isBuyVisible[index].value">
                    <div class="buyWord" @click="updateIsPayBoxVisible(true)">
                        <p>立即购买</p>
                    </div>
                    <div class="cartIcon" @click="addCart">
                        <el-icon>
                            <ShoppingCart />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>
        <MaskLayer :ifShow="isPayBoxVisible" />
        <PayBox :ifShow="isPayBoxVisible" @updateIfShow="updateIsPayBoxVisible" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// 引入UserFilterSection
import UserFilterSection from '../components/UserFilterSection.vue'

import { Collection } from '../interfaces/Collection';
// 引入PayBox
import PayBox from '../components/PayBox.vue'


const isExpanded = ref(false)

function toggleExpand() {
    isExpanded.value = !isExpanded.value
}


import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore'

const TypeIndex = SelectedTypeIndexStore()


const selectType = (index: number) => {

    TypeIndex.index = index;
};




let collectionItems: Collection[] = [
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
    {
        imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
        title: 'Mint Genesis NFT',
        price: '0.01 ETH',
        tradingVolume: '68 ETH',
    },
]

// 引入CartListCollectionStore
import { CartListCollectionStore } from '../stores/CollectionStore'
// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()
// 建立一个变量，该变量内有商品的信息，类型为Collection
let collectionItem: Collection = {
    imageUrl: 'https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x',
    title: 'Mint Genesis NFT',
    price: '0.01 ETH',
    tradingVolume: '68 ETH',
}
const cartList = ref<Collection[]>([
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
])
// cartList赋值给CartListCollection
CartListCollection.collections = cartList.value;
// 点击ShoppingCart图标后将该商品collectionItem添加进CartListCollection的方法
const addCart = () => {
    CartListCollection.collections.push(collectionItem)
    console.log(CartListCollection.collections)
}
// 定义变量isPayBoxVisible
let isPayBoxVisible = ref(false);
// 实现updateIsPayBoxVisible方法
const updateIsPayBoxVisible = (newIsPayBoxVisible: boolean) => {
    isPayBoxVisible.value = newIsPayBoxVisible;
};
// 实现 updateIsBuyVisible


// 定义一个变量isBuyVisible
let isBuyVisible = collectionItems.map(() => ref(false));



// 实现showDelete方法
const showDelete = (index: number) => {
    isBuyVisible.forEach((item, i) => (item.value = i === index));
};
// 实现hideDelete方法
const hideDelete = () => {
    isBuyVisible.forEach((item) => (item.value = false));
};
</script>

<style lang="scss" scoped>
.SeriesInfo {
    .SeriesInfoBackground {
        margin-left: -50px;
        margin-right: -50px;
        height: 40vh;
        background-color: var(--bg-200);
        margin-top: 20px;
        padding: 20px;


        .SeriesInfoAvatar {

            display: flex;
            justify-content: center;
            align-items: center;

            width: 12vh;
            height: 12vh;

            border-radius: 20%;
            background-color: white;

            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
            margin-top: 100px;

        }

        .SeriesInfoDetail {
            /* 设置绝对定位，相对于包含它的 .UserInfo 定位 */
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;



            font-weight: bold;
            text-align: start;

            .SeriesInfoDetailUp {
                width: 100%;

                display: flex;
                justify-content: center;
                align-items: center;

                color: var(--text-100);

                margin-top: 20px;
            }

            .SeriesInfoDetailBelow {
                width: 100%;

                display: flex;
                justify-content: center;
                align-items: center;

                color: var(--text-200);
            }

        }
    }

    .SeriesInfoDescription {
        display: flex;
        justify-content: space-around;
        align-items: start;

        text-align: start;
        font-size: 18px;
        font-weight: 500;

        margin-top: 20px;

        .Left {
            flex: 1;

            .descriptionDetail {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .descriptionInfo {
                display: flex;
                justify-content: start;
                align-items: center;
                gap: 10px;

                color: var(--text-200);
            }
        }

        .Right {
            flex: 1;
            display: flex;
            justify-content: end;
            align-items: center;
        }
    }

    .TypeNavbar {
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;

        gap: 50px;
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 16px;
        font-weight: bold;
    }

    // .TypeNavbarItem {
    //     padding: 0px 20px;
    // }

    .TypeNavbarItem.selected:hover {
        color: var(--text-200);
        /* 悬停时的文本颜色 */
        background-color: rgba(214, 198, 225, 0.7);
    }

    .TypeNavbarItem.selected {
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

    .UserContentLiked {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
        height: 90%;

        font-weight: bold;

        .CollectionListItem {
            height: 280px;
            width: 240px;
            background-color: #FFFFFF;
            border-radius: 20px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
            /* 调整阴影效果 */
            transition: box-shadow 0.3s ease, transform 0.3s ease;



            /* 添加过渡效果 */
            .CollectionListItemDetail {
                display: flex;
                justify-content: start;
                align-items: center;
                gap: 20px;

                text-align: left;
                padding: 10px 20px;

            }

            .button {
                display: flex;
                justify-content: center;
                align-items: center;

                flex: 1;

                height: 5vh;

                font-size: 16px;
                background-color: var(--accent-200);
                color: #fff;
                border: none;
                border-radius: 0 0 12.5px 12.5px;
                // 将光标图标更改为手型指针
                cursor: pointer;

                margin-top: 10px;

                .buyWord {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 8;

                    border-radius: 12.5px 0 0 12.5px;

                    height: 100%;
                }

                .buyWord:hover {
                    border-radius: 0 0 0 12.5px;
                    background-color: var(--accent-100);
                }

                .cartIcon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;

                    border-radius: 0 12.5px 12.5px 0;

                    height: 100%;
                    border-left: 1px solid white;
                }

                .cartIcon:hover {
                    border-radius: 0 0 12.5px 0;
                    background-color: var(--accent-100);
                }
            }


            .button:nth-child(2) {
                background-color: white;
                color: #000;
            }

            .button:nth-child(2):hover {
                background-color: var(--text-200);
            }
        }

        .CollectionListItem:hover {
            /* 鼠标悬停时的阴影效果 */
            box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
        }

    }
}
</style>
