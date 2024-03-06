import axios from './';
// 引入Collection接口
import { Collection } from '../interfaces/Collection';

// 获取推荐藏品
export const getRecommendedCollections = () => {
    return axios.get<Collection[]>('api/collections/recommended');
};
// 获取最受欢迎的10个藏品
export const getPopularCollections = () => {
    return axios.get<Collection[]>('api/collections/popular');
};


// 搜索藏品
export const searchCollections = (params: any) => {
    return axios.post<Collection[]>('api/collections/search', params);
};

// 根据 objectld 获取藏品
export const getCollectionById = (objectId: string) => {
    return axios.get<Collection>('api/collections/objects/' + objectId);
}


// 根据分类获取藏品
export const getCollectionsByCategory = (categoryId: string) => {
    return axios.get<Collection[]>('api/collections/category/' + categoryId);
}

// 增加藏品浏览次数
export const addCollectionViews = (objectId: string) => {
    return axios.post('api/collections/objects/' + objectId + '/visit');
}
