<template>
    <div class="UserFilterSection">
        <div class="Type">
            <p>分类</p>
            <el-icon :size="16">
                <ArrowDownBold />
            </el-icon>
        </div>
        <div class="Search">
            <el-icon :size="16">
                <Search />
            </el-icon>
            <input type="text" placeholder="按名称搜索">
        </div>
        <div class="Condition">
            <p>最近收到</p>
            <el-icon :size="16">
                <ArrowDownBold />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
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



        width: 150px;
        height: 50px;

        background-color: #FFFFFF;
        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;
    }

    .Search {
        display: flex;
        justify-content: start;
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
    .Condition{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;


        width: 250px;
        height: 50px;

        background-color: #FFFFFF;
        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;
    }
}
</style>
