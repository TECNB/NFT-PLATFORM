<template>
    <div class="FilterSection">
        <div class="FilterSectionType" style="flex: 2;">
            <!-- 应用selectType方法 -->
            <div class="NotSelected" @click="selectType(0)" :class="{ 'Selected': TypeIndex.index === 0 }">
                <p>热门</p>
            </div>
            <div class="NotSelected" @click="selectType(1)" :class="{ 'Selected': TypeIndex.index === 1 }">
                <p>最佳</p>
            </div>


        </div>
        <div style="flex: 13;">

        </div>


        <div class="FilterSectionTime" style="flex: 6;">
            <!-- 应用selectTime方法，未选中则class为NotSelected -->
            <div class="NotSelected"  @click="selectTime(0)" :class="{ 'Selected': TimeIndex.index === 0 }">
                <p>1小时</p>
            </div>
            <div class="NotSelected" @click="selectTime(1)" :class="{ 'Selected': TimeIndex.index === 1 }">
                <p>6小时</p>
            </div>
            <div class="NotSelected" @click="selectTime(2)" :class="{ 'Selected': TimeIndex.index === 2 }">
                <p>24小时</p>
            </div>
            <div class="NotSelected" @click="selectTime(3)" :class="{ 'Selected': TimeIndex.index === 3 }">
                <p>7天</p>
            </div>

        </div>



        <div class="FilterSectionToAll" style="flex: 2;">
            <p>查看全部</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { FilterSectionTypeIndexStore } from '../stores/SelectedIndexStore'
import { FilterSectionTimeIndexStore } from '../stores/SelectedIndexStore'
// 实例化
const TypeIndex = FilterSectionTypeIndexStore()
const TimeIndex = FilterSectionTimeIndexStore()

// 选中类型
const selectType = (index: number) => {
    TypeIndex.index = index;
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


        @keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
        
        .NotSelected {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 47%;
            height: 80%;
 
            border-radius: 10px;
            
            

        }

        .Selected {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 47%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);

            
            transition: all 0.8s;
            // 使用transform向点击位置移动
            animation: slide 0.5s forwards;
            

  

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

        .Selected {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20%;
            height: 80%;

            border-radius: 10px;
            background-color: var(--bg-100);
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
}
</style>
