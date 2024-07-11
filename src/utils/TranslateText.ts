import axios from 'axios';
import CryptoJS from 'crypto-js';

const appKey = '477eb90da0b8edd4';
const key = 'AStRcpK3Chh0uv3bmA5cvy7yWEvAVD2A';
const from = 'zh-CHS';
const to = 'en';

function truncate(q: string): string {
    const len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export async function translateText(text: string): Promise<string> {
    const salt = (new Date).getTime().toString();
    const curtime = Math.round(new Date().getTime() / 1000).toString();
    const str1 = appKey + truncate(text) + salt + curtime + key;
    const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

    const response = await axios.post('/translateText', null, {
        params: {
            q: text,
            appKey: appKey,
            salt: salt,
            from: from,
            to: to,
            sign: sign,
            signType: 'v3',
            curtime: curtime,
        }
    });

    return response.data.translation[0];
}