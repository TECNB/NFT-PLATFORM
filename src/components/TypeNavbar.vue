<template>
    <div class="TypeNavbar">
        <div v-for="(type, index) in typeList" :key="index" class="TypeNavbarItem" @click="selectType(type.objectId)" :class="{ 'selected': TypeIndex.index === type.objectId }">
            <p>{{ type.name }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
// 引入vue各项模块
import { ref, onMounted, Ref } from "vue";

// 引入接口
import { Type } from '../interfaces/Type';

// 引入store
import { TypeStore } from '../stores/TypeStore';
import { SelectedTypeIndexStore } from '../stores/SelectedIndexStore';

// 引入API
import { getAllTypes } from '../api/type';





// 实例化各种 Store
const TypeIndex = SelectedTypeIndexStore();
const typeStore = TypeStore();
const typeList: Ref<Type[]> = ref([]);


// 定义生命周期钩子
onMounted(async () => {
    // 先使用缓存数据展示
    typeList.value = [{ objectId: "0", cover: "", name: '全部' }, ...typeStore.typeInfo];
    
    // 获取所有类型数据
    const res = await getAllTypes();
    
    // 更新 TypeStore 中的数据
    typeStore.typeInfo = res;

    // 更新 typeList
    typeList.value = [{ objectId: "0", cover: "", name: '全部' }, ...res];
});

// 定义选择类型的方法
const selectType = async (index: string) => {
    TypeIndex.index = index;
};
</script>



<style lang="scss" scoped>
.TypeNavbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    gap: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    font-size: 16px;
    font-weight: bold;
}

// .TypeNavbarItem {
//     padding: 0px 20px;
// }

.TypeNavbarItem.selected:hover {
    color: var(--text-200);
    /* 悬停时的文本颜色 */
    background-color: rgba(214, 198, 225, 0.7);
}

.TypeNavbarItem.selected {
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
</style>
