import { ref } from 'vue';
import axios from 'axios';

export async function getFileObject (imgUrl: string): Promise<File | null>{
    const fileData = ref<File>();

    return new Promise((resolve, reject) => {
        axios.get(imgUrl, {
            responseType: 'blob',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                const blob = response.data;
                const filename = 'example.jpg';
                const file = new File([blob], filename, { type: blob.type });
                fileData.value = file;
                resolve(fileData.value);
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                reject(error);
            });
    });
};