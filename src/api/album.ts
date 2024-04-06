import axios from './';
// 引入Album接口,注意修改
import { Album } from '../interfaces/Album';


// 获取所有盲盒
export const getAllAlbums = () => {
    return axios.get<Album[]>('api/album/all');
};

// 根据objectId获取盲盒
export const getAlbumById = (objectId
    : string) => {
    return axios.get<Album>('api/album/objects/' + objectId);
}
// 添加盲盒
export const addAlbum = (params: any) => {
    return axios.post<Album>('api/album/add', params);
}
