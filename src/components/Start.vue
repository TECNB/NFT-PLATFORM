<template>
    <div v-html="markdownContent" class="text-left"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { fetchMarkdown } from '../utils/fetchMarkdown'; // 假设工具类在这个路径下

const markdownContent = ref<string>('');

onMounted(async () => {
    markdownContent.value = await fetchMarkdown('../article/如何创建 HyperStar 账户？.md');
    console.log(markdownContent.value);
});
</script>