<template>
    <div class="UserFilterSection">
        <div class="Type">
            <p>分类</p>
            <el-icon :size="16" @click="toggleTypeList" :class="isTypeListVisible ? 'rotate-180' : 'rotate-0'">
                <ArrowDownBold />
            </el-icon>
            <div class="TypeList" v-if="isTypeListVisible">
                <!-- 勾选框 -->
                <div class="TypeListItem" v-for="type in typeList" :key="type.objectId">
                    <label>
                        <input type="checkbox" name="type" :value="type.objectId" checked>
                        <span class="ml-5">{{ type.name }}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="Search">
            <el-icon :size="16">
                <Search />
            </el-icon>
            <input type="text" placeholder="按名称搜索">
        </div>
        <div class="Condition">
            <p>最近收到</p>
            <!-- 根据isConditionListVisible决定class是rotate-0还是rotate-180 -->
            <el-icon :size="16" @click="toggleConditionList" :class="isConditionListVisible ? 'rotate-180' : 'rotate-0'">
                <ArrowDownBold />
            </el-icon>

            <div class="ConditionList" v-if="isConditionListVisible">
                <div class="ConditionListItem">
                    <p>最近收到</p>
                </div>
                <div class="ConditionListItem">
                    <p>价格从高到低</p>
                </div>
                <div class="ConditionListItem">
                    <p>价格从低到高</p>
                </div>
                <div class="ConditionListItem">
                    <p>最近创建的</p>
                </div>
                <div class="ConditionListItem">
                    <p>最高销售价格</p>
                </div>
                <div class="ConditionListItem">
                    <p>最早的</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

import {getAllTypes} from '../api/type'

// 定义变量控制是否展示ConditionList
let isConditionListVisible = ref(false);
// 定义变量控制是否展示TypeList
let isTypeListVisible = ref(false);

let typeList = ref([]);
// 定义一个函数用于控制ConditionList的显示与隐藏
const toggleConditionList = () => {
    isConditionListVisible.value = !isConditionListVisible.value;
};
// 控制是否展示TypeList
const toggleTypeList = () => {
    isTypeListVisible.value = !isTypeListVisible.value;
};

onMounted(() => {
    getAllTypes().then((res) => {
        typeList.value = res;
    })
})
</script>

<style lang="scss" scoped>
.UserFilterSection {
    display: flex;

    justify-content: space-between;
    align-items: center;
    gap: 10px;

    width: 100%;

    text-align: center;
    font-size: 18px;
    font-weight: bold;


    margin-top: 20px;
    margin-bottom: 20px;

    .Type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;



        width: 180px;
        height: 50px;

        background-color: #FFFFFF;
        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;
        .rotate-180 {
            transform: rotate(180deg);
            transition: 0.25s ease-out;
        }

        .rotate-0 {
            transition: 0.25s ease-out;
        }

        .TypeList {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;

            position: absolute;
            top: 60px;
            left: 0px;

            width: 180px;

            background-color: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

            padding: 10px;

            .TypeListItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                width: 100%;
                height: 100%;

                border-radius: 12px;
                padding: 15px;
            }

            .TypeListItem:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.1);
            }

            // 勾选框变大，勾选背景颜色为var(--bg-100)，勾选时颜色为var(--bg-200)
            input[type="checkbox"] {
                transform: scale(1.5);


            }

        }
    }

    .Search {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;


        height: 50px;

        background-color: #FFFFFF;

        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;

        input {
            outline: none;
            padding-left: 10px;
            font-size: 18px;
            width: 200px;
            border: 0px;
            font-weight: bold;
        }
    }

    .Condition {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        position: relative;


        width: 250px;
        height: 50px;

        background-color: #FFFFFF;
        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;

        .rotate-180 {
            transform: rotate(180deg);
            transition: 0.25s ease-out;
        }

        .rotate-0 {
            transition: 0.25s ease-out;
        }

        .ConditionList {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;

            position: absolute;
            top: 60px;
            right: 0px;

            width: 250px;

            background-color: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

            padding: 10px;

            .ConditionListItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                width: 100%;
                height: 100%;

                border-radius: 12px;
                padding: 15px;
            }

            .ConditionListItem:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>
