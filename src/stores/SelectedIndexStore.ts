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