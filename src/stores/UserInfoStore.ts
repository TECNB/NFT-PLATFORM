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
