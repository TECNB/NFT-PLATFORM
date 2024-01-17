import { defineStore } from 'pinia';

export const SelectedIndexStore = defineStore('SelectedIndexStore', {
    state: () => ({
        index: 0,
    }),
});