export interface RecognitionResult {
    DataId: string;
    JobId: string;
    State: string;
    Object: string;
    Url: string;
    CompressionResult: number;
    Result: number;
    Label: string;
    Category: string;
    SubLabel: string;
    Score: number;
    Text: string;
    PornInfo?: {
        Code: number;
        Msg: string;
        HitFlag: number;
        Score: number;
        Label: string;
        Category: string;
        SubLabel: string;
        OcrResults?: {
            // Define OCR results structure if needed
        }[];
        LibResults?: {
            // Define LibResults structure if needed
        }[];
    };
    AdsInfo?: {
        Code: number;
        Msg: string;
        HitFlag: number;
        Score: number;
        Label: string;
        Category: string;
        SubLabel: string;
        OcrResults?: {
            // Define OCR results structure if needed
        }[];
        LibResults?: {
            // Define LibResults structure if needed
        }[];
    };
    QualityInfo?: {
        Code: number;
        Msg: string;
        HitFlag: number;
        Score: number;
        Label: string;
        Category: string;
        SubLabel: string;
        OcrResults?: {
            // Define OCR results structure if needed
        }[];
        LibResults?: {
            // Define LibResults structure if needed
        }[];
    };
}
