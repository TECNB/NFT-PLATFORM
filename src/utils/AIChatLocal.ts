// AIChatLocal.ts
export async function AIChatLocal(systemContent: string, userContent: string, relatedArticle: string): Promise<Response> {
    const data = JSON.stringify({
        model: "AIChat",
        messages: [
            {
                role: "system",
                content: ""
            },
            {
                role: "user",
                content: userContent
            }
        ],
        stream: true,
        max_tokens: 1024,
        temperature: 0.95,
        top_p: 0.7
    });
    
    const response = await fetch('/aichat-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return response;
}
