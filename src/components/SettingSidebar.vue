<template>
    <div class="Sidebar">
        <div class="sidebar-logo-container">
            <p class="text-left">设置</p>
        </div>
        <el-scrollbar height="90%" >

            <ul>
                <!-- 遍历菜单项 -->
                <li v-for="(menu, index) in menus" :key="index">
                    <div class="menu-item" @click="selectMenu(index, menu.children, menu.path!)"
                        :class="{ 'active-menu': selectedMenu === index }">
                        <el-icon color="var(--text-100)" v-if="selectedMenu === index">
                            <component :is="menu.icon"></component>
                        </el-icon>
                        <el-icon v-else color="var(--text-200)">
                            <component :is="menu.icon"></component>
                        </el-icon>
                        <p>{{ menu.label }}</p>
                        <!-- 如果有子菜单，显示箭头 -->
                        <el-icon v-if="menu.children" class="ml-7">
                            <ArrowDownBold v-if="!ifShowSubMenu" />
                            <ArrowUpBold v-else />
                        </el-icon>

                    </div>
                    <!-- 如果有子菜单，渲染子菜单 -->
                    <ul v-if="menu.children && ifShowSubMenu">
                        <li v-for="(child, childIndex) in menu.children" :key="childIndex">
                            <div class="menu-item child-menu"
                                @click="selectSubMenu(index, childIndex, menu.children[childIndex].path!)"
                                :class="{ 'active-menu': selectedSubMenu === childIndex }">
                                <p class="ml-6">{{ child.label }}</p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>


        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
// const handleOpen = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }

import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 实例化router
const router = useRouter();

const selectedMenu = ref<number | null>(null);
const selectedSubMenu = ref<number | null>(null);
// ifShowSubMenu
const ifShowSubMenu = ref<boolean>(false);

const menus = [
    { label: '个人资料', icon: 'User', path: '/' },
    { label: '精选项目', icon: 'MessageBox', path: '/goods' },
    {
        label: '通知管理',
        icon: 'Bell',
        path: '/account',
    },
    {
        label: '优惠',
        icon: 'Discount',
        path: '/order',
    },

    { label: '净利', icon: 'Money', path: '/data' },
    { label: '帮助', icon: 'Help', path: '/setting' },
];
// 保证第一个选择的是首页
selectedMenu.value = 0;


const toggleSubMenu = () => {
    // 翻转子菜单的显示状态
    ifShowSubMenu.value = !ifShowSubMenu.value;
    if (ifShowSubMenu.value) {
        selectedSubMenu.value = 0; // 清除子菜单的选中状态
    }
};


const selectMenu = (index: number, ifChildren: any, path: string) => {
    if (!ifChildren) {
        selectedMenu.value = index;
        selectedSubMenu.value = null; // 清除子菜单的选中状态
        router.push(`/setting${path}`); // 使用子路由的路径

    } else {
        selectedMenu.value = null;
        selectedSubMenu.value = 0; // 清除子菜单的选中状态
        router.push(menus[index].children![0].path!);
        toggleSubMenu();

    }

};

const selectSubMenu = (parentIndex: number, childIndex: number, path: string) => {
    router.push(path)

    selectedMenu.value = null;
    selectedSubMenu.value = childIndex;
};



</script>

<style lang="scss" scoped>
.Sidebar {
    height: 100%;
    width: 100%;
    border-radius: 24px;


    .sidebar-logo-container {


        padding: 20px 20px;

        p {
            font-weight: 800;
            color: var(--text-100);
            font-size: 18px;

        }
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;

        width: 90%;


        padding: 15px 25px;
        margin: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        /* 添加过渡效果 */

        &:hover {
            border-radius: 20px;
            background: var(--bg-200);
        }


        p {
            font-size: 16px;
            color: var(--text-200);
            &:hover {

                color: var(--text-100);
        }
        }

        &.active-menu {
            border-radius: 20px;
            background: var(--bg-200);

            p {
                font-size: 16px;
                color: var(--text-100);
            }

        }

        &.child-menu {

            // 定义子菜单的样式
            &.active-menu {
                background: var(--primary-100);

            }
        }
    }
}
</style>