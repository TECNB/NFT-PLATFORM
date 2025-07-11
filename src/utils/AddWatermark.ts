// 通过 npm 安装 sdk npm install cos-nodejs-sdk-v5
// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
// nodejs 端可直接使用 CAM 密钥计算签名，建议用限制最小权限的子用户的 CAM 密钥
// 最小权限原则说明 https://cloud.tencent.com/document/product/436/38618
import config from '../constant/config';
import COS from 'cos-js-sdk-v5';
import { PicOperation } from '../interfaces/PicOperation';

const cos = new COS({
    SecretId: config.SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
    SecretKey: config.SECRET_KEY, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});

const bucketConfig = {
    // 需要替换成您自己的存储桶信息
    Bucket: 'tec-1312799453', // 存储桶，必须
    Region: 'ap-shanghai', // 存储桶所在地域，必须字段
};

export async function addWatermark(path: string, fileObject: File, picOperations: string) {
    // 使用 Promise 封装异步操作
    return new Promise((resolve, reject) => {
        cos.putObject({
            Bucket: bucketConfig.Bucket, // 必须
            Region: bucketConfig.Region,     // 存储桶所在地域，必须字段
            Key: path,              // 必须
            StorageClass: 'STANDARD',
            Body: fileObject, // 上传文件对象
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            },
            // 支持自定义headers 非必须
            Headers: {
                'Pic-Operations': picOperations
            },
        }, function (err, data) {
            if (err) {
                // 处理请求出错
                reject(err);
            } else {
                console.log(data);
                // 处理请求成功
                resolve(data);
            }
        });
    });
}