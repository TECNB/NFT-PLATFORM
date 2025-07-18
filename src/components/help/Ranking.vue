<template>
    <MainNavbar />
    <div class="px-52">

        <el-input v-model="name" placeholder="搜索帮助" class="mt-4" @change="search">
            <template #prefix>
                <el-icon color="var(--text-100)" class="el-input__icon">
                    <Search />
                </el-icon>
            </template>
        </el-input>
        <!-- 路由导航 -->
        <div class="flex justify-start items-center gap-5 mt-10">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/help' }">帮助</el-breadcrumb-item>
                    <el-breadcrumb-item>全站排行</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        <div class="h-full w-full mt-10 flex ">

            <!-- Markdown 内容 -->
            <div v-html="markdownContent" class="text-left w-[70%]" ref="content"></div>

            <!-- 目录 -->
            <div class="toc text-left sticky top-10 ml-7 self-start">
                <ul>
                    <li class="p-2 border-l-2"
                        :class="{ 'border-accent-200': selectedIndex === index, 'border-bg-200': selectedIndex !== index }"
                        v-for="(item, index) in toc" :key="index" @click="selectItem(index)">
                        <router-link :to="'#' + item.id">{{ item.text }}</router-link>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fetchMarkdown } from '../../utils/fetchMarkdown';

import MainNavbar from '../../components/MainNavbar.vue'

const router = useRouter();
const route = useRoute();

let name = ref('');

const markdownContent = ref<string>('');
const toc = ref<{ id: string, text: string }[]>([]);

const selectedIndex = ref(0);

const selectItem = (index: number) => {
    selectedIndex.value = index;
    const id = toc.value[index].id;
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const generateToc = () => {
    const content = document.createElement('div');
    content.innerHTML = markdownContent.value;

    const headers = content.querySelectorAll('h2');
    toc.value = Array.from(headers).map((header, index) => {
        const id = `header-${index}`;
        header.setAttribute('id', id);
        return {
            id,
            text: header.textContent || `Header ${index + 1}`
        };
    });

    const realContent = document.querySelector('.text-left');
    if (realContent) {
        realContent.innerHTML = content.innerHTML;
    }
};

const observeHeaders = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const index = toc.value.findIndex(item => item.id === id);
                if (index !== -1) {
                    selectedIndex.value = index;
                }
            }
        });
    }, options);

    toc.value.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            observer.observe(element);
        }
    });
};

const scrollToAnchor = (hash: string) => {
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

onMounted(async () => {
    markdownContent.value = await fetchMarkdown('ranking');
    nextTick(() => {
        generateToc();
        observeHeaders();
        scrollToAnchor(route.hash);
    });
});

router.afterEach((to) => {
    if (to.hash) {
        nextTick(() => {
            scrollToAnchor(to.hash);
        });
    }
});

const search = async () => {
    // 搜索功能的实现
}
</script>

<style lang="scss" scoped>
.toc {
    margin-bottom: 20px;
}

.toc ul {
    list-style: none;
    padding: 0;
}

.toc li {
    margin: 0;
}

.toc a {
    color: var(--primary-color);
    text-decoration: none;
}

.toc a:hover {
    text-decoration: none;
}

.el-input {
    height: 60px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: white;

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: white;

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}
</style>
