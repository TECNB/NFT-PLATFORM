import { defineStore } from 'pinia';
// 引入Type接口
import { Type } from '../interfaces/Type';

export const TypeStore = defineStore('TypeStore', {
    state: () => ({
        typeInfo: [] as Type[], // Add an array to store the categories
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
