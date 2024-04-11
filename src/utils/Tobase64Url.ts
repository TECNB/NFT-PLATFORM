import { ref } from 'vue';

export function tobase64Url(url: string): string {
    // 1. 使用 BASE64 进行加密
    const base64 = btoa(url);

    // 2. 编码规则：去除尾部的"="，把"+"替换成"-"，把"/"替换成"_"
    const base64Url = base64.replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    return base64Url;
}
