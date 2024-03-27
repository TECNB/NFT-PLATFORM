import { defineStore } from 'pinia';

export const SelectedTypeIndexStore = defineStore('SelectedTypeIndexStore', {
    state: () => ({
        index: "0",
    }),
});
export const SelectedUserIndexStore = defineStore('SelectedUserIndexStore', {
    state: () => ({
        index: 0,
    }),
});
export const FilterSectionTypeIndexStore = defineStore('FilterSectionTypeIndexStore', {
    state: () => ({
        index: 0,
    }),
});
export const FilterSectionTimeIndexStore = defineStore('FilterSectionTimeIndexStore', {
    state: () => ({
        index: 0,
    }),
});
export const StatisticsTypeIndexStore = defineStore('StatisticsTypeIndexStore', {
    state: () => ({
        index: 0,
    }),
});
export const FilterListIndexStore = defineStore('FilterListIndexStore', {
    state: () => ({
        // 字符数组，内部包含名称
        index: [],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});