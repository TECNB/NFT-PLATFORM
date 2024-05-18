export interface AIChatResult {
    data:{
        id: string;
        object: string;
        created: number;
        choices: Choice[];
        usage: Usage;
    }
}

interface Choice {
    index: number;
    message: Message;
    finish_reason: string;
}

interface Message {
    role: string;
    content: string;
}

interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}