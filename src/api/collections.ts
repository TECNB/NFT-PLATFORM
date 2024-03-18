import axios from './';
import Axios from 'axios'

import { V3 } from "../utils/V3";

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

// 上传图片文件
export const uploadImage = (params: any) => {
    return axios.post('api/collections/upload', params);
}

// 添加藏品
export const addCollection = (params: any) => {
    return axios.post('api/collections/objects', params);
}

// AI文字生成藏品

const { authorization, timestamp, curlcmd } = V3(
    {
        SECRET_ID: "AKIDi1GauWPMKLVgnqot8QpCUkuz2DYvGlIm",
        SECRET_KEY: "aJ6t6Z9mYJC0vcSWfrAXu27NUwZCsU4d",
        action: "TextToImage",
        host: "aiart.tencentcloudapi.com",
        service: "aiart",
        region: "ap-shanghai",
        version: "2022-12-29",
        ContentType: "application/json"
    },
    {"Prompt":"女孩","RspImgType":"url"}
)
console.log("传递配置参数，签名自动生成：", authorization, timestamp, curlcmd)


export const text2Img = (params: any, headers?: Record<string, string>) => {
    return Axios.post('tencent-api', params, {
        headers: {
            ...headers, // 将传入的自定义头部信息与默认头部信息合并
            // 在这里添加你需要的自定义头部信息
            Authorization: authorization,
            Host: 'aiart.tencentcloudapi.com',
            'X-TC-Action': 'TextToImage',
            'X-TC-Timestamp': timestamp,
            'X-TC-Version': '2022-12-29',
            'X-TC-Region': 'ap-shanghai',

        },
    }).catch(error => {
        // 错误处理
        ElMessage.error('请求失败，请稍后重试');
        return Promise.reject(error);
    });
}