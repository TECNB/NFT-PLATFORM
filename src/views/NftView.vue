<template>
    <div class="NftView" v-if="!loading">
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
                        <el-icon v-if="!isFavorite" @click="handleAddFavoriteCollection">
                            <Star />
                        </el-icon>
                        <el-icon v-else @click="handleAddFavoriteCollection">
                            <StarFilled />
                        </el-icon>
                    </div>

                </div>
                <div class="NftImage">

                    <div class="NftImageImg">
                        <img :src="collectionItem.cover" alt=""
                            style="height: 100%; width: 100%;border-radius: 0 0 20px 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                </div>
                <div class="NftViewBodyRightPrice">
                    <div class="NftViewBodyRightPriceIcon">
                        <el-icon size="20">
                            <Operation />
                        </el-icon>
                        <p style="font-size: 20px;">描述</p>

                    </div>
                    <div class="NftViewBodyRightPriceButton" style="text-align: start;">
                        <p
                            style="color: var(--text-200);font-size: 20px;font-weight: bold;display: inline-block;margin-top: 10px;">
                            创作者</p>
                        <p style="color: var(--accent-200);font-size: 20px;display: inline;margin-left: 10px;">
                            <router-link to="/user">TEC</router-link>
                        <p style="color: #000;font-size: 16px;">{{ collectionItem.intro }}</p>
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
                        <p>{{ collectionItem.visitCount }} 查看</p>
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
import { ref, onMounted,Ref } from "vue"
// 引入useRoute
import { useRoute } from 'vue-router'
import * as echarts from 'echarts';


// 引入Collection
import { Collection } from '../interfaces/Collection';


import MainNavbar from '../components/MainNavbar.vue'
// 引入MaskLayer
import MaskLayer from '../components/MaskLayer.vue'
// 引入PayBox
import PayBox from '../components/PayBox.vue'


// 引入UserInfoStore
import { userInfoStore } from '../stores/UserInfoStore'
// 引入CartListCollectionStore
import { CartListCollectionStore } from '../stores/CollectionStore'


// 引入getCollectionById
import { getCollectionById,addCollectionViews } from '../api/collections'
// 引入addFavoriteCollection以及removeFavoriteCollection
import { addFavoriteCollection, removeFavoriteCollection} from '../api/user'


// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()
// 实例化userInfoStore
const userInfo = userInfoStore();


// 建立一个变量，该变量内有商品的信息，类型为Collection
let collectionItem:Ref<Collection>= ref() as Ref<Collection>

// 定义变量isPayBoxVisible
let isPayBoxVisible = ref(false);
let objectId = ref('');
const loading = ref(true);
// 定义一个变量，用于判断目前的藏品是否被收藏过
let isFavorite = ref(false);


onMounted(async () => {
    
    // 获取路由参数
    const route = useRoute();
    objectId.value = route.params.id as string;
    console.log("objectIdbefore:" + objectId.value);

    //使用getCollectionById方法获取collectionItem
    await getCollectionById(objectId.value).then((res) => {
        addCollectionViews(objectId.value);
        collectionItem.value = res;
        loading.value = false;
    }).catch((err) => {
        console.log(err);
    });
    

    // 根据userInfo中的favoriteCollection数组中的objectId是否包含当前collectionItem的objectId来判断是否被收藏过
    if (userInfo.user?.favoriteCollection.includes(collectionItem.value.objectId)) {
        isFavorite.value = true;
    }
    
    console.log("favoriteCollection:"+userInfo.user?.favoriteCollection);
    console.log("收藏情况:" + isFavorite.value)
});

// 点击ShoppingCart图标后将该商品collectionItem添加进CartListCollection的方法
const addCart = () => {
    CartListCollection.collections.push(collectionItem.value)
    ElMessage.success('添加购物车成功');
}

// 实现updateIsPayBoxVisible方法
const updateIsPayBoxVisible = (newIsPayBoxVisible: boolean) => {
    isPayBoxVisible.value = newIsPayBoxVisible;
};

// 实现handleAddFavoriteCollection方法
const handleAddFavoriteCollection = () => {
    // 定义一个表单用于放收藏collectionId
    let favoriteCollectionForm = new FormData();

    favoriteCollectionForm.append('collectionId', collectionItem.value.objectId);
    console.log("表单内的id:" + collectionItem.value.objectId)


    // 如果collectionItem.isFavorite为true，则执行removeFavoriteCollection方法
    if (isFavorite.value) {
        removeFavoriteCollection(favoriteCollectionForm).then(() => {
            console.log("取消收藏中的favoriteCollectionForm:"+favoriteCollectionForm)
            isFavorite.value = false;
            ElMessage.success('取消收藏成功');
            // 同时修改userInfo中的favoriteCollection数组
            userInfo.user?.favoriteCollection.splice(userInfo.user?.favoriteCollection.indexOf(collectionItem.value.objectId), 1);
        }).catch((err) => {
            console.log("取消收藏中的favoriteCollectionForm:"+favoriteCollectionForm)
            ElMessage.error('取消收藏失败');
            // 同时修改userInfo中的favoriteCollection数组
            userInfo.user?.favoriteCollection.splice(userInfo.user?.favoriteCollection.indexOf(collectionItem.value.objectId), 1);
            console.log(err);
        });
    } else {
        // 如果collectionItem.isFavorite为false，则执行addFavoriteCollection方法
        addFavoriteCollection(favoriteCollectionForm).then(() => {
            console.log("收藏中的favoriteCollectionForm:"+favoriteCollectionForm)
            isFavorite.value = true;
            ElMessage.success('收藏成功');
        }).catch((err) => {
            ElMessage.error('收藏失败');
            console.log(err);
        });
    }
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
