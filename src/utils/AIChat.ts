// AIChat.ts
export async function AIChat(systemContent: string, userContent: string, relatedArticle: string): Promise<Response> {
    const data = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `你是一个非常有帮助的助手，擅长回答关于如何在 HyperStar 这个数字藏品平台上操作的问题。以下是关于${systemContent}的详细步骤。请完全根据我的文章来回答，不要增加步骤以及不相关的部分。如果原文中有相关图片 (img)，请告诉我。注意：不要使用 Markdown 格式，而是使用 HTML 格式返回。${relatedArticle}`
            },
            {
                role: "user",
                content: `请详细说明 HyperStar 平台中 ${userContent} 相关的部分。不要带上原文的序号，不要增加步骤和不相关的部分。但是，相关的内容你必须用序号的方式归纳。注意：如果原文中有相关图片 (img)，请告诉我并使用 HTML 格式返回。`
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
