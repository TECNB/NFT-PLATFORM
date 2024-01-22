<template>
    <div class="SeriesInfo">
        <div class="SeriesInfoBackground">
            <div style="" class="SeriesInfoAvatar">
                <img src="https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=1&h=500&fr=1 1x, https://i.seadn.io/gcs/files/25059d629ad50cad3009a1f553a44401.jpg?auto=format&dpr=2&h=500&fr=1 2x"
                    alt="" style="height: 100%; width: 100%; border-radius: 20%; object-fit: cover; aspect-ratio: 1/1;">
            </div>

            <div class="SeriesInfoDetail">
                <div class="SeriesInfoDetailUp">
                    <p style="font-size: 26px;flex: 6;">THE OBJECT CHRONICLES</p>
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


    </div>
</template>

<script setup lang="ts">
import { } from "vue"
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


}</style>
