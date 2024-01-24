<template>
    <div class="UserContent">
        
        <div class="UserContentCollection" v-if="UserIndex.index == 0">
            <UserFilterSection />
            <p style="text-align: start;font-weight: bold;margin-bottom: 20px;">0个项目</p>
            <div class="UserContentDetail">
                <h2>未找到收集的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
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
            <!-- <div class="UserContentDetail">
                <h2>没有要显示的项目</h2>
                <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
            </div> -->
            
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
import { SelectedUserIndexStore } from '../stores/SelectedIndexStore'
// 引入UserFilterSection
import UserFilterSection from '../components/UserFilterSection.vue'

const UserIndex = SelectedUserIndexStore()


</script>

<style lang="scss" scoped>
.UserContent {
    width: 100%;

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
}
</style>
