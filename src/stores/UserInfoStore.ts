// userInfoStore.ts
import { defineStore } from 'pinia';

export interface UserInfoState {
    token: string;
    user: LoginResData | null;
}

export const userInfoStore = defineStore({
    id: 'auth',
    state: (): UserInfoState => ({
        token: localStorage.getItem('token') || '',
        user: null,
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user: LoginResData) {
            this.user = user;
        },
        clearToken() {
            this.token = '';
            localStorage.removeItem('token');
        },
    },
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});

// LoginResData接口
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
