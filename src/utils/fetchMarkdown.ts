import axios from 'axios';
import MarkdownIt from 'markdown-it';
import start from '../assets/article/开始使用.md?raw';
import profile from '../assets/article/探索个人资料.md?raw';
import ranking from '../assets/article/全站排行.md?raw';
import specialEvents from '../assets/article/特色活动.md?raw';
import createNft from '../assets/article/创建数字藏品.md?raw';
import benefits from '../assets/article/福利功能.md?raw';


const md = new MarkdownIt({
    html: true, // 允许在Markdown中使用HTML标签
    breaks: true, // 将换行符转换为<br>标签
    linkify: true, // 自动将URL转换为链接
});

// export async function fetchMarkdown(url: string): Promise<string> {
//     try {
//         const response = await axios.get(url);
//         return md.render(response.data);
//     } catch (error) {
//         console.error('Error fetching Markdown:', error);
//         return '';
//     }
// }
export async function fetchMarkdown(title: string) {
    switch (title) {
        case 'start':
            return md.render(start);
        case 'profile':
            return md.render(profile);
        case 'ranking':
            return md.render(ranking);
        case 'specialEvents':
            return md.render(specialEvents);
        case 'createNft':
            return md.render(createNft);
        case 'benefits':
            return md.render(benefits);
        default:
            return '';
    }

}
