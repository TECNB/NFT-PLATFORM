<template>
    <div class="UserContent">
        <p style="text-align: start;font-weight: bold;">0个项目</p>
        <div class="UserContentDetail">
            <h2>未找到收集的项目</h2>
            <button style="color: white;background-color: var(--accent-200);margin-top: 20px;">返回所有项目</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"

</script>

<style lang="scss" scoped>
.UserContent{
    width: 100%;
    .UserContentDetail{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction:column;

        width: 100%;
        height: 30vh;

        border: 0.5px solid var(--text-200);
        border-radius: 20px;
    }
}
</style>
