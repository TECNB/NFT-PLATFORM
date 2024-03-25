interface ImageInfo {
    Format: string;
    Width: number;
    Height: number;
    Quality: number;
    Ave: string;
    Orientation: number;
    FrameCount: number;
}

interface OriginalInfo {
    Key: string;
    Location: string;
    ETag: string;
    ImageInfo: ImageInfo;
}

interface ProcessResultObject {
    Key: string;
    Location: string;
    Format: string;
    Width: number;
    Height: number;
    Size: number;
    Quality: number;
    FrameCount: number;
    ETag: string;
    WatermarkStatus: number
}

interface ProcessResults {
    Object: ProcessResultObject;
}

export interface UploadResult {
    OriginalInfo: OriginalInfo;
    ProcessResults: ProcessResults;
}
