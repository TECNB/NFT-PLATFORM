<template>
    <div class="FilterSection">
        <div class="FilterSectionType" style="flex: 2;">
            <!-- 应用selectType方法 -->
            <div :class="{ 'Selected0': TypeIndex.index === 0 ,'Selected1': TypeIndex.index === 1}">

            </div>
            <p @click="selectType(0)" style="position: absolute;left: 15%;z-index: 9999;">热门</p>

            <p @click="selectType(1)" style="position: absolute;right: 15%;;z-index: 9999;">最佳</p>


        </div>
        <div style="flex: 13;">

        </div>


        <div class="FilterSectionTime" style="flex: 6;">
            <!-- 应用selectTime方法，未选中则class为NotSelected -->
            <!-- 下面的四个relative定位的p标签平分FilterSectionTime区域 -->
            
            <p @click="selectTime(0)" style="flex: 1;z-index: 9999;">1小时</p>

            <p @click="selectTime(1)" style="flex: 1;z-index: 9999;">6小时</p>

            <p @click="selectTime(2)" style="flex: 1;z-index: 9999;">24小时</p>

            <p @click="selectTime(3)" style="flex: 1;z-index: 9999;">7天</p>

            <!-- 根据点击的p标签决定Selected -->
            <div
                :class="{ 'Selected0': TimeIndex.index === 0, 'Selected1': TimeIndex.index === 1, 'Selected2': TimeIndex.index === 2, 'Selected3': TimeIndex.index === 3 }">
                <!-- Content of the div -->
            </div>

        </div>



        <!-- 如果props.from为IndexView，则显示查看全部，否则不显示 -->
        <div class="FilterSectionToAll" style="flex: 2;" v-if="props.from == 'IndexView'" @click="toStatisticsView">
            <p>查看全部</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { FilterSectionTypeIndexStore } from '../stores/SelectedIndexStore'
import { FilterSectionTimeIndexStore } from '../stores/SelectedIndexStore'
import { StatisticsTypeIndexStore } from '../stores/SelectedIndexStore'

const StatisticsTypeIndex = StatisticsTypeIndexStore()

const props = defineProps<{ from: string }>()


// 实例化
const TypeIndex = FilterSectionTypeIndexStore()
const TimeIndex = FilterSectionTimeIndexStore()
// 引入router
import { useRouter } from 'vue-router'
const router = useRouter()
// 跳转到StatisticsView
const toStatisticsView = () => {
    router.push({
        name: 'StatisticsView',
    })
    StatisticsTypeIndex.index=0
};

let selectedIndex = 0
// 选中类型
const selectType = (index: number) => {
    TypeIndex.index = index;
    selectedIndex = index;
    // 打印selectedIndex
    console.log(selectedIndex);
};

// 选中时间
const selectTime = (index: number) => {
    TimeIndex.index = index;
    // 打印TimeIndex.index
    console.log(TimeIndex.index);
};


</script>

<style lang="scss" scoped>
.FilterSection {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;

    text-align: start;
    font-size: 18px;
    font-weight: bold;


    margin-top: 20px;
    text-align: center;


    .FilterSectionType {
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;


        min-width: 150px;
        height: 40px;

        border-radius: 10px;


        background-color: var(--accent-100);

        // 使用transform向点击位置移动

        // @keyframes slideLeft {
        //     0% {
        //         transform: translateX(-100%);
        //     }

        //     100% {
        //         // 使用v-bind使用js中的selectedIndex
        //         transform: translateX(0);
        //     }
        // }

        // @keyframes slideRight {
        //     0% {
        //         transform: translateX(100%);
        //     }

        //     100% {
        //         // 使用v-bind使用js中的selectedIndex
        //         transform: translateX(0);
        //     }
        // }

        .Selected0 {
            position: absolute;

            width: 50%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            transform: translateX(-45%);
            transition: 0.25s ease-out;

        }

        .Selected1 {
            position: absolute;

            width: 50%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            transform: translateX(45%);
            transition: 0.25s ease-out;

        }
    }

    .FilterSectionTime {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 20px;

        position: relative;

        min-width: 350px;
        height: 40px;

        border-radius: 10px;


        background-color: var(--accent-100);


        .Selected0 {
            position: absolute;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            transform: translateX(-395%);
            transition: 0.25s ease-out;

        }

        .Selected1 {
            position: absolute;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            transform: translateX(-265%);
            transition: 0.25s ease-out;
        }

        .Selected2 {
            position: absolute;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            transform: translateX(-135%);
            transition: 0.25s ease-out;
        }

        .Selected3 {
            position: absolute;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            transform: translateX(-5%);
            transition: 0.25s ease-out;
        }

        .NotSelected {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20%;
            height: 80%;
            margin-right: 2px;


        }
    }

    .FilterSectionToAll {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        min-width: 100px;
        height: 40px;

        border-radius: 10px;


        background-color: var(--accent-100);
    }
}</style>
