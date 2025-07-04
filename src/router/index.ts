import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "IndexView",
        component: () => import("../views/IndexView.vue"),
    },
    {
        path: "/create",
        name: "CreateView",
        component: () => import("../views/CreateView.vue"),
    },
    {
        path: "/createNftView",
        name: "CreateNftView",
        component: () => import("../views/CreateNftView.vue"),
        props: true  // 确保路由可以接收参数
    },
    {
        path: "/createSeriesView",
        name: "CreateSeriesView",
        component: () => import("../views/CreateSeriesView.vue"),
    },
    {
        path: "/createIssueDateView",
        name: "CreateIssueDateView",
        component: () => import("../views/CreateIssueDateView.vue"),
    },
    {
        path: "/user",
        name: "UserView",
        component: () => import("../views/UserView.vue"),
    },
    {
        path: "/statistics",
        name: "StatisticsView",
        component: () => import("../views/StatisticsView.vue"),
    },
    {
        path: '/nft/:id', // 使用动态路由参数 :id
        name: "NftView",
        component: () => import("../views/NftView.vue"),
    },
    {
        path: "/series",
        name: "SeriesView",
        component: () => import("../views/SeriesView.vue"),
    },
    {
        path: "/activity",
        name: "ActivityView",
        component: () => import("../views/ActivityView.vue"),
    },
    {
        path: "/help",
        name: "HelpView",
        component: () => import("../views/HelpView.vue"),
        children: [
            {
                path: "start",
                name: "start",
                component: () => import("../components/help/Start.vue"),
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("../components/help/Profile.vue"),
            },
            {
                path: "ranking",
                name: "ranking",
                component: () => import("../components/help/Ranking.vue"),
            },
            {
                path: "specialEvents",
                name: "specialEvents",
                component: () => import("../components/help/SpecialEvents.vue"),
            },
            {
                path: "createNft",
                name: "createNft",
                component: () => import("../components/help/CreateNft.vue"),
            },
            {
                path: "benefits",
                name: "benefits",
                component: () => import("../components/help/Benefits.vue"),
            },

        ],
    },
    
    {
        path: "/setting",
        name: "SettingView",
        component: () => import("../views/SettingView.vue"),
        children: [
            {
                path: "/setting",
                component: () => import("../components/SettingUserInfo.vue"),
            },
        ],
    },
    {
        path: "/text2Img",
        name: "Text2ImgView",
        component: () => import("../views/Text2ImgView.vue"),
    },
    {
        path: '/:catchAll(.*)', // 匹配所有路径
        name: "NotFoundView",
        component: () => import("../views/NotFoundView.vue"),
    }

];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router