// 通过 npm 安装 sdk npm install cos-nodejs-sdk-v5
// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
// nodejs 端可直接使用 CAM 密钥计算签名，建议用限制最小权限的子用户的 CAM 密钥
// 最小权限原则说明 https://cloud.tencent.com/document/product/436/38618
import config from '../constant/config';
import * as COS from 'cos-js-sdk-v5'; // 使用 import 语法导入 COS 模块
import { RecognitionResult } from '../interfaces/RecognitionResult';

const cos = new COS({
    SecretId: config.SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    SecretKey: config.SECRET_KEY, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});

const bucketConfig = {
    // 需要替换成您自己的存储桶信息
    Bucket: 'tec-1312799453', // 存储桶，必须
    Region: 'ap-shanghai', // 存储桶所在地域，必须字段
};

export async function getImageAuditing(detectUrl: string) {
    // 使用 Promise 封装异步操作
    return new Promise((resolve, reject) => {
        cos.request({
            Bucket: bucketConfig.Bucket,
            Region: bucketConfig.Region,
            Method: 'GET',
            Key: '',  // 存储桶内的图片文件，必须字段
            Query: {
                'ci-process': 'sensitive-content-recognition', // 图片审核的处理接口，必须字段
                'biz-type': 'bd4575d0e81311ee8556525400662d48', // 敏感内容识别的 biztype，必须字段
                'detect-url': detectUrl, // 图片的 URL 地址，必须字段
            },
        }, function (err:any, data:any) {
            if (err) {
                // 处理请求出错
                reject(err);
            } else {
                // 处理请求成功
                resolve(data as RecognitionResult);
            }
        });
    });
}