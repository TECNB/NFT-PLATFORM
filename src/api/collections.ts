import axios from './';
// 引入Collection接口
import { Collection } from '../interfaces/Collection';

// Recommended Collections
export const getRecommendedCollections = () => {
    return axios.get<Collection[]>('api/collections/recommended');
};
