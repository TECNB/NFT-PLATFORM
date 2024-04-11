// src/stores/index.ts
import { defineStore } from 'pinia';


// 
export const Text2ImgStore = defineStore('Text2ImgStore', {
    state: () => ({
        // 定义authorization数据
        authorization:'',  // 授权
        timestamp:'',  // 时间戳

    }),
    //数据持久化配置 这里是当前所有变量都持久化
    // persist:true
});
