import axios from './';
// 引入Collection接口
import { Type } from '../interfaces/Type';


// 获取所有藏品分类
export const getAllTypes = () => {
    return axios.get<Type[]>('api/categories/all');
};

// 根据objectId获取分类
export const getTypeById = (objectId
    : string) => {
    return axios.get<Type>('api/categories/objects/' + objectId);
}
