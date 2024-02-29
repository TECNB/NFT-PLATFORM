import axios from './';

namespace Login {
    // 用户登录表单
    export interface LoginReqForm {
        username: string;
        password: string;
    }

    // 登录成功后返回的数据
    export interface LoginResData {
        objectId: string;
        blockchainId: string;
        username: string;
        userType: string;
        phone: string;
        token: string;
        createdAt: string;
        updatedAt: string;
    }
}

// 用户登录
export const login = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<Login.LoginResData>('api/user/login', params);
}
// 用户注册
export const signup = (params:any) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<Login.LoginResData>('api/user/signup', params);
}


export const check = () => {
    // 返回的数据格式可以和服务端约定
    return axios.get<Login.LoginResData>('api/user/me');
}

