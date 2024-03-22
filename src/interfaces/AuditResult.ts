import { RecognitionResult } from './RecognitionResult';
export interface AuditResult {
    RecognitionResult: RecognitionResult;
    statusCode: number;
    headers: {
        "content-length": string;
        "content-type": string;
        "x-cos-request-id": string;
    };
    RequestId: string;
}
