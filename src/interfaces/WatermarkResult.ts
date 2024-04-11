import { UploadResult } from './UploadResult';
export interface WatermarkResult {
    UploadResult: UploadResult;
    statusCode: number;
    headers: {
        "content-length": string;
        "content-type": string;
        "x-cos-request-id": string;
    };
    RequestId: string;
}
