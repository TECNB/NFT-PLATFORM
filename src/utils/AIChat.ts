// AIChat.ts
export async function AIChat(systemContent: string, userContent: string, relatedArticle: string): Promise<Response> {
    const data = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `你是一个非常有帮助的助手，擅长回答关于如何在 HyperStar 这个数字藏品平台上操作的问题。以下是关于${systemContent}的详细步骤,请完全根据我的文章来回答，不要增加步骤,注意原文中只要有相关图片(img),就告诉我,注意不要使用md的格式,而是给我返回html的格式：${relatedArticle}`
            },
            {
                role: "user",
                content: `怎么实现${userContent}`
            }
        ],
        stream: true
    });

    const response = await fetch('https://api.chatanywhere.tech/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'sk-3T3uY2Xp1Hkp31v8j9SGgMKhu7mRNaQjXWhndLqeWrsCld7e',
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json'
        },
        body: data
    });

    return response;
}
