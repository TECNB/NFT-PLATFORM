import axios from '.';
// 引入LoginResData接口
import { User } from '../interfaces/User';


// 用户登录
export const login = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<User>('api/user/login', params);
}
// 用户注册
export const signup = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<User>('api/user/signup', params);
}

// 通过token修改密码
export const updatePassword = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.put<User>('api/user/me/updatePassword', params);
}

// 通过token查看个人数据
export const check = () => {
    // 返回的数据格式可以和服务端约定
    return axios.get<User>('api/user/me');
}

// 添加收藏藏品
export const addFavoriteCollection = (params:any) => {
    return axios.put('api/user/me/favoriteCollection',params);
}

// 取消收藏藏品
export const removeFavoriteCollection = (params:any) => {
    return axios.delete('api/user/me/favoriteCollection',params);
}

