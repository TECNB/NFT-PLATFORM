// 登录成功后返回的数据
export interface LoginResData {
    objectId: string;
    hash: string;
    username: string;
    userType: string;
    phone: string;
    token: string;
    createdAt: string;
    updatedAt: string;
}