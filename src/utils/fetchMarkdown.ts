import axios from 'axios';
import MarkdownIt from 'markdown-it';
import mdd from '../article/如何创建 HyperStar 账户？.md?raw';

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
export async function fetchMarkdown(url: string) {
    return md.render(mdd);

}
