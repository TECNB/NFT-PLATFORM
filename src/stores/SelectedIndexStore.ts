import { defineStore } from 'pinia';

export const SelectedTypeIndexStore = defineStore('SelectedTypeIndexStore', {
    state: () => ({
        index: 0,
    }),
});
export const SelectedUserIndexStore = defineStore('SelectedUserIndexStore', {
    state: () => ({
        index: 0,
    }),
});