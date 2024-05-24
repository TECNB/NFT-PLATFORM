import Clipboard from 'clipboard';

export const copyLink = () => {
    const currentUrl = window.location.href;

    // 创建一个临时按钮作为复制目标
    const tempButton = document.createElement('button');
    tempButton.style.display = 'none';
    document.body.appendChild(tempButton);

    // 创建 Clipboard 实例并传入临时按钮
    const clipboard = new Clipboard(tempButton, {
        text: () => currentUrl
    });

    // 监听成功和失败事件
    clipboard.on('success', () => {
        ElMessage({
            message: '链接已复制到剪贴板',
            type: 'success',
        });
        clipboard.destroy(); // 复制完成后销毁实例
        document.body.removeChild(tempButton); // 移除临时按钮
    });

    clipboard.on('error', () => {
        ElMessage({
            message: '复制失败，请重试',
            type: 'error',
        });
        clipboard.destroy(); // 复制完成后销毁实例
        document.body.removeChild(tempButton); // 移除临时按钮
    });

    // 模拟点击临时按钮以触发复制操作
    tempButton.click();
};