// src/stores/index.ts
import { defineStore } from 'pinia';

export const RecommendedCollectionStore = defineStore('RecommendedCollectionStore', {
    state: () => ({
        collections: [
            {
                imageUrl: '',
                title: '',
                price: '',
                tradingVolume: '',
            }
        ],
    }),
});
export const CollectionRankingStore = defineStore('CollectionRankingStore', {
    state: () => ({
        collections: [
            {
                imageUrl: '',
                title: '',
                price: '',
                tradingVolume: '',
            }
        ],
    }),
});
export const PopularAnimationCollectionStore = defineStore('PopularAnimationCollectionStore', {
    state: () => ({
        collections: [
            {
                imageUrl: '',
                title: '',
                price: '',
                tradingVolume: '',
            }
        ],
    }),
});
export const PopularRealityCollectionStore  = defineStore('PopularRealityCollectionStore', {
    state: () => ({
        collections: [
            {
                imageUrl: '',
                title: '',
                price: '',
                tradingVolume: '',
            }
        ],
    }),
});
export const PopularTechnologyCollectionStore = defineStore('PopularTechnologyCollectionStore', {
    state: () => ({
        collections: [
            {
                imageUrl: '',
                title: '',
                price: '',
                tradingVolume: '',
            }
        ],
    }),
});
export const PopularAnimalCollectionStore = defineStore('PopularAnimalCollectionStore', {
    state: () => ({
        collections: [
            {
                imageUrl: '',
                title: '',
                price: '',
                tradingVolume: '',
            }
        ],
    }),
});
