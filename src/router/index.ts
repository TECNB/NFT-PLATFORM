import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name:"IndexView",
        component: () => import("../views/IndexView.vue"),
    },
    {
        path: "/create",
        name:"CreateView",
        component: () => import("../views/CreateView.vue"),
    },
    {
        path: "/user",
        name:"UserView",
        component: () => import("../views/UserView.vue"),
    },
    {
        path: "/statistics",
        name:"StatisticsView",
        component: () => import("../views/StatisticsView.vue"),
    },
    {
        path: "/nft",
        name:"NftView",
        component: () => import("../views/NftView.vue"),
    },
    {
        path: "/series",
        name:"SeriesView",
        component: () => import("../views/SeriesView.vue"),
    },
    
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router