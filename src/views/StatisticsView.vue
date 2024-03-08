<template>
    <div class="StatisticsView">
        <MainNavbar />
        <h1 style="text-align: start;margin:60px 0">系列统计信息</h1>
        <div class="StatisticsNavbar">
            <div class="StatisticsNavbarItem" @click="selectType(0)" :class="{ 'selected': TypeIndex.index === 0 }">
                <p>热门</p>
            </div>
            <div class="StatisticsNavbarItem" @click="selectType(1)" :class="{ 'selected': TypeIndex.index === 1 }">
                <p>最佳</p>
            </div>
            <div class="StatisticsNavbarItem" @click="selectType(2)" :class="{ 'selected': TypeIndex.index === 2 }">
                <p>关注列表</p>
            </div>

        </div>
        <FilterSection from="StatisticsView" />
        <!-- 如果关注列表时去掉前方的序号 -->
        <div class="StatisticsContent">
            <div class="StatisticsContentTitle">
                <p style="flex: 1;" v-if="TypeIndex.index !== 2">#</p>
                <p style="flex: 12;">系列</p>
                <p style="flex: 2;text-align: end;">交易量</p>
                <p style="flex: 2;text-align: end;">变化</p>
                <p style="flex: 2;text-align: end;">地板价</p>
                <p style="flex: 2;text-align: end;">销售</p>
                <!-- 下面的部分是用于放置图标做出的空缺 -->
                <p style="flex: 1;text-align: end;" v-if="TypeIndex.index == 2"></p>
            </div>
            <div class="StatisticsContentDetail" v-for="(item, index) in recommendedCollections" :key="index">
                <div style="flex: 1;text-align: start;" v-if="TypeIndex.index !== 2">{{ index + 1 }}</div>
                <div class="StatisticsContentDetailName" style="flex: 12;">
                    <div style="flex: 1;">
                        <img :src="item.cover" alt=""
                            style="height: 100%; width: 100%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                    </div>
                    <div style="flex: 11;">
                        <p style="text-align: start;padding-left: 25px;">{{ item.name }}</p>
                    </div>

                </div>
                <div style="flex: 2;text-align: end;">{{ item.price }}</div>
                <div style="flex: 2;text-align: end;">{{ item.price }}</div>
                <div style="flex: 2;text-align: end;">{{ item.price }}</div>
                <div style="flex: 2;text-align: end;">{{ item.price }}</div>
                <div style="flex: 1;" class="icon" v-if="TypeIndex.index == 2"><el-icon>
                        <Delete />
                    </el-icon></div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"


import MainNavbar from '../components/MainNavbar.vue'
import FilterSection from '../components/FilterSection.vue'
import { Collection } from '../interfaces/Collection';


import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'


const TypeIndex = StatisticsTypeIndexStore()


// 初始值
const recommendedCollections: Collection[] = [
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


const selectType = (index: number) => {

    TypeIndex.index = index;
};

</script>

<style lang="scss" scoped>
.StatisticsView {
    .StatisticsNavbar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        gap: 50px;
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 16px;
        font-weight: bold;

        padding-bottom: 40px;
        border-bottom: 0.5px solid var(--text-200);

        .StatisticsNavbarItem.selected:hover {
            color: var(--text-200);
            /* 悬停时的文本颜色 */
            background-color: rgba(214, 198, 225, 0.7);
        }

        .StatisticsNavbarItem.selected {
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
    }

    .StatisticsContent {
        margin-top: 30px;

        .StatisticsContentTitle {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: bold;


            padding-bottom: 10px;
            margin-bottom: 20px;

            p {
                text-align: start;
                color: var(--accent-200);
            }
        }

        .StatisticsContentDetail {
            display: flex;
            justify-content: flex-start;
            align-items: center;


            font-size: 20px;
            font-weight: bold;

            margin-top: 10px;

            .StatisticsContentDetailName {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .icon {
                display: flex;
                justify-content: flex-end;
                align-items: center;

            }
        }
    }
}
</style>
