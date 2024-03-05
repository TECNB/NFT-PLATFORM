import axios from './';
// 引入LoginResData接口
import { LoginResData } from '../interfaces/LoginResData';


// 用户登录
export const login = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<LoginResData>('api/user/login', params);
}
// 用户注册
export const signup = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<LoginResData>('api/user/signup', params);
}

// 
export const updatePassword = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.put<LoginResData>('api/user/me/updatePassword', params);
}


export const check = () => {
    // 返回的数据格式可以和服务端约定
    return axios.get<LoginResData>('api/user/me');
}

