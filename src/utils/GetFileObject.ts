import { ref } from 'vue';
import axios from 'axios';

/**
 * 从给定的图片URL获取文件对象
 * @param imgUrl 图片的URL
 * @returns 返回一个Promise，该Promise在成功时解析为文件对象，失败时解析为null
 */
export async function getFileObject(imgUrl: string): Promise<File | null> {
    // 创建一个响应式的文件对象引用
    const fileData = ref<File>();

    return new Promise((resolve, reject) => {
        // 发起GET请求获取图片数据
        axios
            .get(imgUrl, {
                responseType: 'blob',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(response => {
                // 从响应中获取Blob数据
                const blob = response.data;
                // 设置文件名为example.jpg
                const filename = 'example.jpg';
                // 创建一个新的文件对象
                const file = new File([blob], filename, { type: blob.type });
                // 将文件对象赋值给fileData
                fileData.value = file;
                // 解析Promise并返回文件对象
                resolve(fileData.value);
            })
            .catch(error => {
                // 打印错误信息并拒绝Promise
                console.error('获取文件时出错:', error);
                reject(error);
            });
    });
};