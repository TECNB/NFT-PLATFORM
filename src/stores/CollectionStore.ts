// src/stores/index.ts
import { defineStore } from 'pinia';
// 引入Collection接口
import { Collection } from '../interfaces/Collection';

export const RecommendedCollectionStore = defineStore('RecommendedCollectionStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
export const CollectionRankingStore = defineStore('CollectionRankingStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
});
export const PopularAnimationCollectionStore = defineStore('PopularAnimationCollectionStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
});
export const PopularRealityCollectionStore  = defineStore('PopularRealityCollectionStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
});
export const PopularTechnologyCollectionStore = defineStore('PopularTechnologyCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
});
export const PopularAnimalCollectionStore = defineStore('PopularAnimalCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
});
export const CartListCollectionStore = defineStore('CartListCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
});
export const TypeCollectionStore = defineStore('TypeCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
