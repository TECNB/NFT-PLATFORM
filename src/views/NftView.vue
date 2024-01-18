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
                        <img src='https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/s/raw/files/6662e4fbea8ad15eb84990bc68351d57.png?auto=format&dpr=1&h=500&fr=1 2x'
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
                        <p style="color: var(--text-200);font-size: 20px;font-weight: bold;display: inline-block;margin-top: 10px;">创作者</p>
                        <p style="color: var(--accent-200);font-size: 20px;display: inline;margin-left: 10px;"><router-link
                        to="/user">TEC</router-link>
                        <p style="color: #000;font-size: 16px;">A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.</p>
                </p>
                    </div>


                </div>


            </div>
            <div class="NftViewBodyRight">
                <p style="font-size: 36px;font-weight: bold;margin-bottom: 30px;">Mint Genesis NFT #1695</p>
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
                    <p style="font-size: 32px;font-weight: bold;">19.69 ETH</p>
                    <div class="NftViewBodyRightPriceButton">
                        <button>立即购买</button>
                        <button>报价</button>
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


    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import MainNavbar from '../components/MainNavbar.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// const toUser = () => {
//     router.push({
//         name: 'UserView',
//     })
// }

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
                justify-content: start;
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
                    justify-content: start;
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
                }

                .NftViewBodyRightPriceButton button {
                    flex: 1;
                    padding: 10px 15px;
                    font-size: 16px;
                    background-color: var(--accent-200);
                    color: #fff;
                    border: none;
                    border-radius: 12.5px;
                    cursor: pointer;
                    margin-top: 10px;
                }

                .NftViewBodyRightPriceButton button:hover {
                    background-color: var(--accent-100);
                }

                .NftViewBodyRightPriceButton button:nth-child(2) {
                    background-color: white;
                    color: #000;
                }

                .NftViewBodyRightPriceButton button:nth-child(2):hover {
                    background-color: var(--text-200);
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
        justify-content: start;
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
