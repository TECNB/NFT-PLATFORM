<template>
    <div class="UserContent">

        <div class="UserContentCollection" v-if="UserIndex.index == 0">
            <UserFilterSection />
            <div v-if="isCollectionNullVisible">
                <p style="text-align: start;font-weight: bold;margin-bottom: 20px;">0个项目</p>
                <div class="UserContentDetail">
                    <h2>未找到收集的项目</h2>
                    <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
                </div>
            </div>

            <div class="UserContentLiked" v-else>
                <div v-for="(item, index) in collectionItems" :key="index" class="CollectionListItem">
                    <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                        <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                            :src="item.cover" alt="" />
                    </div>

                    <p style="text-align: left; padding: 10px 20px;">{{ item.name }}</p>
                    <div class="CollectionListItemDetail">
                        <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                        <p>{{ item.price }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="UserContentOfferGet" v-if="UserIndex.index == 1">
            <!-- <UserFilterSection /> -->
            <div class="UserContentDetail">
                <h2>没有要显示的报价</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div>
        </div>
        <div class="UserContentDeal" v-if="UserIndex.index == 2">
            <!-- <UserFilterSection />
            <div class="UserContentDetail">
                <h2>没有要显示的交易</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>
        <div class="UserContentCreate" v-if="UserIndex.index == 3">
            <UserFilterSection />
            <div class="UserContentDetail">
                <h2>未找到创建的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div>
        </div>

        <div class="UserContentLiked" v-if="UserIndex.index == 4">
            <div v-for="(item, index) in collectionItems" :key="index" class="CollectionListItem">
                <div class="CollectionListItemImage" style="height: 150px; width: 240px;">
                    <img style="height: 100%; width: 100%; border-radius: 20px 20px 0px 0px; object-fit: cover;"
                        :src="item.cover" alt="" />
                </div>

                <p style="text-align: left; padding: 10px 20px;">{{ item.name }}</p>
                <div class="CollectionListItemDetail">
                    <p style="font-size: 16px; font-weight: normal;">交易价格</p>
                    <p>{{ item.price }}</p>
                </div>
            </div>

        </div>
        <div class="UserContentActivity" v-if="UserIndex.index == 5">
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>
        <div class="UserContentOfferReceive" v-if="UserIndex.index == 6">
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"

import { Collection } from '../interfaces/Collection';


import { RecommendedCollectionStore } from '../stores/CollectionStore'
import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'
import UserFilterSection from '../components/UserFilterSection.vue'



const UserIndex = SelectedUserIndexStore()
const RecommendedCollection = RecommendedCollectionStore()


RecommendedCollection.collections = [
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

let collectionItems: Collection[];
collectionItems = RecommendedCollection.collections

// 定义变量表示collectionItems的长度
let collectionItemsLength = collectionItems.length
// 如果collectionItemsLength=0时，isCollectionNullVisible为true
let isCollectionNullVisible = false;
if (collectionItemsLength === 0) {
    isCollectionNullVisible = true
}





// 直接通过实例来获取数据
console.log(RecommendedCollection.collections)

</script>

<style lang="scss" scoped>
.UserContent {
    width: 100%;

    .UserContentCollection {
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
                height: 100%;
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
            }

            .CollectionListItem:hover {
                /* 鼠标悬停时的阴影效果 */
                box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
            }

        }
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
            height: 100%;
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
        }

        .CollectionListItem:hover {
            /* 鼠标悬停时的阴影效果 */
            box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2);
        }

    }
}

.UserContentDetail {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 30vh;

    border: 0.5px solid var(--text-200);
    border-radius: 20px;
}
</style>
