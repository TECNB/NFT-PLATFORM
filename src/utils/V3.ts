// 导入 crypto-js 库中的 SHA256, HmacSHA256, enc 方法
import { SHA256, HmacSHA256, enc } from 'crypto-js';

// 定义 V3Options 接口，包含了一些配置项
interface V3Options {
    SECRET_ID: string;  // 密钥 ID
    SECRET_KEY: string; // 密钥
    action: string;     // 操作类型
    host: string;       // 主机地址
    service: string;    // 服务类型
    region: string;     // 区域
    version: string;    // 版本
    ContentType: string;// 内容类型
}

// 定义 V3RequestPayload 接口，用于描述请求的 payload
interface V3RequestPayload {
    [key: string]: any; // key-value 形式的任意数据
}

// 定义 sha256 函数，用于生成 HMAC SHA256 摘要
function sha256(message: string, secret: string = '', hex: boolean = false) {
    const hmac = HmacSHA256(message, secret); // 使用 HmacSHA256 方法生成摘要
    let hexHmac = hmac;
    if (hex) {
        hexHmac = hmac.toString(enc.Hex) as any; // 如果 hex 参数为 true，则将摘要转为十六进制字符串
    }
    return hexHmac;
}

// 定义 getHash 函数，用于生成 SHA256 摘要
function getHash(message: string) {
    const hash = SHA256(message); // 使用 SHA256 方法生成摘要
    const hexHash = hash.toString(enc.Hex); // 将摘要转为十六进制字符串
    return hexHash;
}

// 定义 getDate 函数，用于将时间戳转为日期字符串
function getDate(timestamp: number) {
    const date = new Date(timestamp * 1000); // 将时间戳转为 Date 对象
    const year = date.getUTCFullYear(); // 获取年份
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // 获取月份，并转为两位数的字符串
    const day = ('0' + date.getUTCDate()).slice(-2); // 获取日期，并转为两位数的字符串
    return `${year}-${month}-${day}`; // 返回 yyyy-mm-dd 格式的日期字符串
}

// 定义 V3 函数，用于生成 V3 签名
export function V3(config: V3Options, body: V3RequestPayload) {
    // 从配置中解构出各个参数
    const SECRET_ID = config.SECRET_ID;
    const SECRET_KEY = config.SECRET_KEY;
    const host = config.host;
    const service = config.service;
    const region = config.region;
    const action = config.action;
    const version = config.version;
    const ContentType = config.ContentType;

    const timestamp = Math.floor(Date.now() / 1000); // 获取当前时间的时间戳（秒）
    const date = getDate(timestamp); // 将时间戳转为日期字符串
    const payload = JSON.stringify(body); // 将请求体转为 JSON 字符串
    const hashedRequestPayload = getHash(payload); // 对请求体生成 SHA256 摘要
    const httpRequestMethod = "POST"; // HTTP 请求方法
    const canonicalUri = "/"; // 规范 URI
    const canonicalQueryString = ""; // 规范查询字符串
    // 规范头部字符串
    const canonicalHeaders =
        `content-type:${ContentType}\n` +
        `host:${host}\n` +
        `x-tc-action:${action.toLowerCase()}\n`;
    const signedHeaders = "content-type;host;x-tc-action"; // 签名头部字符串

    // 构造规范请求字符串
    const canonicalRequest =
        `${httpRequestMethod}\n` +
        `${canonicalUri}\n` +
        `${canonicalQueryString}\n` +
        `${canonicalHeaders}\n` +
        `${signedHeaders}\n` +
        `${hashedRequestPayload}`;

    const algorithm = "TC3-HMAC-SHA256"; // 算法
    const hashedCanonicalRequest = getHash(canonicalRequest); // 对规范请求字符串生成 SHA256 摘要
    const credentialScope = `${date}/${service}/tc3_request`; // 凭证范围
    // 构造待签名字符串
    const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

    // 生成签名密钥
    const kDate = sha256(date, 'TC3' + SECRET_KEY);
    const kService = sha256(service, kDate as any);
    const kSigning = sha256('tc3_request', kService as any);
    const signature = sha256(stringToSign, kSigning as any, true); // 生成签名

    // 构造授权字符串
    const authorization =
        `${algorithm} Credential=${SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    // 构造 curl 命令
    const curlcmd =
        `curl -X POST https://${host}` +
        ` -H "Authorization: ${authorization}"` +
        ` -H "Content-Type: ${ContentType}"` +
        ` -H "Host: ${host}"` +
        ` -H "X-TC-Action: ${action}"` +
        ` -H "X-TC-Timestamp: ${timestamp}"` +
        ` -H "X-TC-Version: ${version}"` +
        ` -H "X-TC-Region: ${region}"` +
        ` -d '${payload}'`;

    // 返回相关信息
    return {
        SECRET_ID,
        SECRET_KEY,
        authorization,
        ContentType,
        timestamp,
        region,
        action,
        version,
        host,
        curlcmd
    };
}