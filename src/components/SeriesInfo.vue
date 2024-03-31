<template>
    <div class="SeriesInfo">
        <div class="SeriesInfoBackground">
            <div class="video-container">
                <video autoplay muted loop>
                    <source src="https://stream.mux.com/5Bv4IUkYCENew01gNjZkgTK6oyiNltwCPlBu4iyVHoO00/high.mp4"
                        type="video/mp4">
                </video>
            </div>

            <div style="" class="SeriesInfoAvatar">
                <img src="https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif" alt=""
                    style="height: 100%; width: 100%; border-radius: 20%; object-fit: cover; aspect-ratio: 1/1;">
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
                    <p style="overflow: hidden; text-overflow: ellipsis;white-space: nowrap;width: 75vh;">Mint Genesis
                        NFT
                        is a collection dedicated to early advocates of the Mint blockchain, collectively
                        documenting the origin of a network focused on NFTs. The value of Mint Genesis NFT will
                        continuously
                        appreciate and accumulate with the development of the Mint Blockchain ecosystem.</p>
                    <p @click="toggleExpand" v-if="!isExpanded"><a href="#"
                            style="min-width: 10vh;font-weight: bold;">展开</a></p>
                </div>
                <div class="descriptionDetail" v-else="!isExpanded">
                    <p>Mint Genesis NFT is a collection dedicated to early advocates of the Mint blockchain,
                        collectively
                        documenting the origin of a network focused on NFTs. The value of Mint Genesis NFT will
                        continuously
                        appreciate and accumulate with the development of the Mint Blockchain ecosystem.</p>
                </div>
                <p @click="toggleExpand" v-if="isExpanded"><a href="#" style="min-width: 10vh;font-weight: bold;">收起</a>
                </p>

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
            <div class="TypeNavbarItem" @click="selectType('0')" :class="{ 'selected': TypeIndex.index === '0' }">
                <p>项目</p>
            </div>
            <div class="TypeNavbarItem" @click="selectType('1')" :class="{ 'selected': TypeIndex.index === '1' }">
                <p>报价</p>
            </div>
            <div class="TypeNavbarItem" @click="selectType('2')" :class="{ 'selected': TypeIndex.index === '2' }">
                <p>分析技术</p>
            </div>
            <div class="TypeNavbarItem" @click="selectType('3')" :class="{ 'selected': TypeIndex.index === '3' }">
                <p>销售详情</p>
            </div>
        </div>
        <UserFilterSection />
        <div class="UserContentLiked">
            <div v-for="(item, index) in collectionItems" :key="index" class="CollectionListItem"
                @mouseenter="showDelete(index)" @mouseleave="hideDelete">
                <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                    <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                        :src="item.cover" alt="" />
                </div>

                <p style="text-align: left; padding: 10px 20px;">{{ item.name }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>{{ item.price }}</p>
                </div>
                <div class="button" v-if="isBuyVisible[index].value">
                    <div class="buyWord" @click="updateIsPayBoxVisible(true)">
                        <p>立即购买</p>
                    </div>
                    <div class="cartIcon" @click="addCart(index)">
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


// 引入PayBox
import PayBox from '../components/PayBox.vue'


import { Collection } from '../interfaces/Collection';


import UserFilterSection from '../components/UserFilterSection.vue'
import { CartListCollectionStore } from '../stores/CollectionStore'
import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore'
// TODO:下面暂时使用CollectionRankingStore代替系列里面的内容
import { CollectionRankingStore } from '../stores/CollectionStore'






// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()
const TypeIndex = SelectedTypeIndexStore()
let CollectionRanking = CollectionRankingStore()


// 定义一个collectionItems，并填上符合Collection类型的数据
// let tempcollectionItems=[
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
//     {
//         name: "Mint Genesis NFT",
//         price: 0.0085,
//         cover: "https://i.seadn.io/gcs/files/5bb08cd484a9740f41cb70e18f87b455.gif"
//     },
// ]
let tempcollectionItems=[
    {
        name: "Mint Genesis NFT #123",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/b03c94dbf648c4fc35279128925ce06a.gif?auto=format&dpr=1&w=256"
    },
    {
        name: "Mint Genesis NFT #143",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/8ea128a43332547081499eec41943746.gif?auto=format&dpr=1&w=384"
    },
    {
        name: "Mint Genesis NFT #153",
        price: 0.0085,
        cover: "https://i.seadn.io/s/raw/files/26d7834001524aa7d5dbd2c8266ec3e0.gif?auto=format&dpr=1&w=384"
    },
    {
        name: "Mint Genesis NFT #154",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/a4fdf768a977393ac6594111b7fad8ac.gif?auto=format&dpr=1&w=384"
    },
    {
        name: "Mint Genesis NFT #142",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/8dccf1f82eac93af93c008433ae0a98c.gif?auto=format&dpr=1&w=256"
    },
    {
        name: "Mint Genesis NFT #523",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/171f03f9a2fea5c53a200a63cdce8fb2.gif?auto=format&dpr=1&w=256"
    },
    {
        name: "Mint Genesis NFT #432",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/38cabbd54b185b87e22797e74a8c6c38.gif?auto=format&dpr=1&w=256"
    },
    {
        name: "Mint Genesis NFT #534",
        price: 0.0085,
        cover: "https://i.seadn.io/gcs/files/83f4ef1cd5d98663e74674457353309a.gif?auto=format&dpr=1&w=256"
    },
]

let collectionItems: Collection[] = tempcollectionItems as Collection[]
    


// let collectionItems: Collection[] = CollectionRanking.collections


const isExpanded = ref(false)
// 定义变量isPayBoxVisible
let isPayBoxVisible = ref(false);
let isBuyVisible = collectionItems.map(() => ref(false));




const toggleExpand = () => {
    isExpanded.value = !isExpanded.value
}

const selectType = (index: string) => {
    TypeIndex.index = index;
};

// 点击ShoppingCart图标后将该商品collectionItem添加进CartListCollection的方法
const addCart = (index: number) => {
    console.log("选中第" + index + "个商品")
    CartListCollection.collections.push(collectionItems[index])

    ElMessage.success('已成功添加至购物车');
    console.log(CartListCollection.collections)
}

// 实现updateIsPayBoxVisible方法
const updateIsPayBoxVisible = (newIsPayBoxVisible: boolean) => {
    isPayBoxVisible.value = newIsPayBoxVisible;
};

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
        position: relative;
        overflow: hidden;
        margin-left: -50px;
        margin-right: -50px;
        height: 40vh;
        background-color: var(--bg-200);
        margin-top: 20px;
        padding: 20px;

        .video-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            /* 将视频容器置于底部 */
            overflow: hidden;
        }

        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }


        .SeriesInfoAvatar {

            display: flex;
            justify-content: center;
            align-items: center;

            position: relative;
            z-index: 1;

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
            position: relative;
            z-index: 1;



            font-weight: bold;
            text-align: start;
            
            /* 确保其他内容在视频之上 */

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
        align-items: flex-start;

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
                justify-content: flex-start;
                align-items: center;
                gap: 10px;

                color: var(--text-200);
            }
        }

        .Right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }

    .TypeNavbar {
        display: flex;
        justify-content: flex-start;
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
        justify-content: flex-start;
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
                justify-content: flex-start;
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
