// 登录成功后返回的数据
export interface User {
    objectId: string;
    hash: string;
    username: string;
    userType: string;
    phone: string;
    avatar: string;              // 添加头像字段
    favoriteCollection: string[]; // 添加喜欢的集合字段
    ownedCollection: string[];    // 添加拥有的集合字段
    sellingCollection: string[];    // 添加正在出售的集合字段
    token: string;
    lastLogin: string;            // 添加最后登录时间字段
    createdAt: string;
    updatedAt: string;
}
