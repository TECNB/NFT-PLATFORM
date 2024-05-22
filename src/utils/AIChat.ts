// AIChat.ts
export async function AIChat(systemContent: string, userContent: string, relatedArticle: string): Promise<Response> {
    const data = JSON.stringify({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `你是一个非常有帮助的助手，擅长回答关于如何在 HyperStar 这个数字藏品平台上操作的问题。以下是关于${systemContent}的详细步骤。请完全根据我的文章来回答，不要增加步骤以及不相关的部分。如果原文中有相关图片 (img)，请告诉我。注意：不要使用 Markdown 格式，而是使用 HTML 格式返回。${relatedArticle}`
            },
            {
                role: "user",
                content: userContent
            }
        ],
        stream: true
    });
    
    const response = await fetch('https://api.gptapi.us/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'sk-BhcZcQ4KbJW8wmgX96F33d91B14c41CaAf23C4F15d1483Ec',
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json'
        },
        body: data
    });

    return response;
}
