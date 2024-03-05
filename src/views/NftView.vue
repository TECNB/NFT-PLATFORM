<template>
    <div class="NftView">
        <MainNavbar />
        <div class="NftViewBody">
            <div class="NftViewBodyLeft">
                <div class="NftImageIcon">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <div class="NftImageIconRight">
                        <el-icon color="var(--accent-200)">
                            <Share />
                        </el-icon>
                        <p>26</p>
                        <el-icon>
                            <Star />
                        </el-icon>
                    </div>

                </div>
                <div class="NftImage">

                    <div class="NftImageImg">
                        <img :src="collectionItem.cover"
                            alt=""
                            style="height: 100%; width: 100%;border-radius: 0 0 20px 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                </div>
                <div class="NftViewBodyRightPrice">
                    <div class="NftViewBodyRightPriceIcon">
                        <el-icon size="20">
                            <Operation />
                        </el-icon>
                        <p style="font-size: 20px;">描述 </p>

                    </div>
                    <div class="NftViewBodyRightPriceButton" style="text-align: start;">
                        <p
                            style="color: var(--text-200);font-size: 20px;font-weight: bold;display: inline-block;margin-top: 10px;">
                            创作者</p>
                        <p style="color: var(--accent-200);font-size: 20px;display: inline;margin-left: 10px;"><router-link
                                to="/user">TEC</router-link>
                        <p style="color: #000;font-size: 16px;">A collection 8888 Cute Chubby Pudgy Penquins sliding around
                            on the freezing ETH blockchain.</p>
                        </p>
                    </div>


                </div>


            </div>
            <div class="NftViewBodyRight">
                <p style="font-size: 36px;font-weight: bold;margin-bottom: 30px;">{{ collectionItem.name }}</p>
                <p style="font-weight: bold;display: inline;">拥有者</p>
                <p style="color: var(--accent-200);display: inline;margin-left: 10px;"><router-link
                        to="/user">TEC</router-link>
                </p>
                <div class="NftViewBodyRightIcon">
                    <div class="NftViewBodyRightIconItem">
                        <el-icon>
                            <View />
                        </el-icon>
                        <p>972 查看</p>
                    </div>
                    <div class="NftViewBodyRightIconItem">
                        <el-icon>
                            <Star />
                        </el-icon>
                        <p>26 收藏</p>
                    </div>
                </div>
                <div class="NftViewBodyRightPrice">
                    <div class="NftViewBodyRightPriceIcon">
                        <el-icon size="20">
                            <Timer />
                        </el-icon>
                        <p style="font-size: 20px;">促销结束 在2024年2月18日,下午5:16 </p>

                    </div>

                    <p style="color: var(--text-200);margin-top: 20px;">当前价格</p>
                    <p style="font-size: 32px;font-weight: bold;">{{ collectionItem.price }} ETH</p>
                    <div class="NftViewBodyRightPriceButton">
                        <div class="button">
                            <div class="buyWord" @click="updateIsPayBoxVisible(true)">
                                <p>立即购买</p>
                            </div>
                            <div class="cartIcon" @click="addCart">
                                <el-icon>
                                    <ShoppingCart />
                                </el-icon>
                            </div>
                        </div>

                        <div class="button">
                            <el-icon>
                                <CollectionTag />
                            </el-icon>
                            <p style="margin-left: 10px;">报价</p>
                        </div>
                    </div>
                </div>
                <div class="NftViewBodyRightPrice">
                    <div class="NftViewBodyRightPriceIcon">
                        <el-icon size="
                        20">
                            <Histogram />
                        </el-icon>
                        <p style="font-size: 20px;">历史价格 </p>

                    </div>


                </div>
                <div class="NftViewBodyRightPrice">
                    <div class="NftViewBodyRightPriceIcon">
                        <el-icon size="
                        20">
                            <ChatSquare />
                        </el-icon>
                        <p style="font-size: 20px;">报价 </p>
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
import MainNavbar from '../components/MainNavbar.vue'
// 引入Collection
import { Collection } from '../interfaces/Collection';
// 引入MaskLayer
import MaskLayer from '../components/MaskLayer.vue'
// 引入PayBox
import PayBox from '../components/PayBox.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// const toUser = () => {
//     router.push({
//         name: 'UserView',
//     })
// }
// 引入CartListCollectionStore
import { CartListCollectionStore } from '../stores/CollectionStore'
// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()
// 建立一个变量，该变量内有商品的信息，类型为Collection
let collectionItem: Collection = {
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
    }
const cartList = ref<Collection[]>([
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
    }

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
</script>

<style lang="scss" scoped>
.NftView {
    width: 100%;


    .NftViewBody {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10vh;

        margin-top: 20px;

        .NftViewBodyLeft {
            flex: 1;

            .NftImageIcon {
                width: 60vh;
                height: 5vh;

                display: flex;
                justify-content: space-between;
                align-items: center;



                background-color: white;
                border-radius: 20px 20px 0 0;

                margin-top: 30px;
                padding: 10px;

                .NftImageIconRight {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
            }

            .NftImage {
                width: 60vh;
                height: 60vh;

                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                background-color: white;
                border-radius: 0 0 20px 20px;


                .NftImageImg {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;

                }

            }
        }

        .NftViewBodyRight {
            flex: 2;
            text-align: start;

            .NftViewBodyRightIcon {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 30px;

                .NftViewBodyRightIconItem {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }
            }

            .NftViewBodyRightPrice {


                border: 0.5px solid var(--text-200);
                border-radius: 22.5px;

                padding: 20px;
                margin-top: 50px;

                .NftViewBodyRightPriceIcon {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 30px;

                    margin-left: -20px;
                    margin-right: -20px;
                    border-bottom: 0.5px solid var(--text-200);
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-top: 10px;
                    padding-bottom: 20px;
                }

                .NftViewBodyRightPriceButton {
                    display: flex;
                    gap: 10px;

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
                        border-radius: 12.5px;
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



            }
        }


    }

}

.NftViewBodyRightPrice {


    border: 0.5px solid var(--text-200);
    border-radius: 22.5px;

    padding: 20px;
    margin-top: 20px;

    .NftViewBodyRightPriceIcon {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 30px;

        margin-left: -20px;
        margin-right: -20px;
        border-bottom: 0.5px solid var(--text-200);
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 20px;
    }



}
</style>
