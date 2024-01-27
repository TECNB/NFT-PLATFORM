<template>
    <div class="FilterSection">
        <div class="FilterSectionType" style="flex: 2;">
            <!-- 应用selectType方法 -->
            <div class="NotSelected"  :class="{ 'Selected0': TypeIndex.index === 0 }">
                
            </div>
            <p @click="selectType(0)" style="position: absolute;left: 72px;z-index: 9999;">热门</p>
            <div class="NotSelected" :class="{ 'Selected1': TypeIndex.index === 1 }">
                
            </div>
            <p  @click="selectType(1)" style="position: absolute;left: 145px;;z-index: 9999;">最佳</p>


        </div>
        <div style="flex: 13;">

        </div>


        <div class="FilterSectionTime" style="flex: 6;">
            <!-- 应用selectTime方法，未选中则class为NotSelected -->
            <div class="NotSelected" :class="{ 'Selected0': TimeIndex.index === 0 }">
                
            </div>
            <p @click="selectTime(0)" style="position: absolute;right: 475px;;z-index: 9999;">1小时</p>
            <div class="NotSelected" :class="{ 'Selected1': TimeIndex.index === 1 }">
                
            </div>
            <p @click="selectTime(1)" style="position: absolute;right: 380px;;z-index: 9999;">6小时</p>
            <div class="NotSelected"  :class="{ 'Selected2': TimeIndex.index === 2 }">
                
            </div>
            <p @click="selectTime(2)" style="position: absolute;right: 285px;;z-index: 9999;">24小时</p>
            <div class="NotSelected" :class="{ 'Selected3': TimeIndex.index === 3 }">
                
            </div>
            <p @click="selectTime(3)" style="position: absolute;right: 210px;;z-index: 9999;">7天</p>

        </div>



        <!-- 如何props.from为IndexView，则显示查看全部，否则不显示 -->
        <div class="FilterSectionToAll" style="flex: 2;" v-if="props.from == 'IndexView'" @click="toStatisticsView">
            <p>查看全部</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { FilterSectionTypeIndexStore } from '../stores/SelectedIndexStore'
import { FilterSectionTimeIndexStore } from '../stores/SelectedIndexStore'

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


        min-width: 150px;
        height: 40px;

        border-radius: 10px;


        background-color: var(--accent-100);

        // 定义一个变量--selectedIndex-position，用于记录js中点击的selectedIndex
        --selectedIndex-position: v-bind(selectedIndex);
        
        

        // 使用transform向点击位置移动

        @keyframes slideLeft {
            0% {
                transform: translateX(-100%);
            }

            100% {
                // 使用v-bind使用js中的selectedIndex
                transform: translateX(0);
            }
        }
        @keyframes slideRight {
            0% {
                transform: translateX(100%);
            }

            100% {
                // 使用v-bind使用js中的selectedIndex
                transform: translateX(0);
            }
        }

        .NotSelected {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 47%;
            height: 80%;

            border-radius: 10px;



        }

        .Selected0 {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 47%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            animation: slideRight 0.5s;

        }
        .Selected1 {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 47%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            animation: slideLeft 0.5s;

        }
    }

    .FilterSectionTime {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 20px;

        min-width: 350px;
        height: 40px;

        border-radius: 10px;


        background-color: var(--accent-100);
        @keyframes slide0 {
            0% {
                transform: translateX(-100%);
            }

            100% {
                // 使用v-bind使用js中的selectedIndex
                transform: translateX(0);
            }
        }
        @keyframes slide1 {
            0% {
                transform: translateX(100%);
            }

            100% {
                // 使用v-bind使用js中的selectedIndex
                transform: translateX(0);
            }
        }
        @keyframes slide2 {
            0% {
                transform: translateX(100%);
            }

            100% {
                // 使用v-bind使用js中的selectedIndex
                transform: translateX(0);
            }
        }
        @keyframes slide3 {
            0% {
                transform: translateX(100%);
            }

            100% {
                // 使用v-bind使用js中的selectedIndex
                transform: translateX(0);
            }
        }

        .Selected0 {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            animation: slide0 0.5s;
        }
        .Selected1 {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            animation: slide0 0.5s;
        }
        .Selected2 {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            animation: slide0 0.5s;
        }
        .Selected3 {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            // 使用transform向点击位置移动
            animation: slide0 0.5s;
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
