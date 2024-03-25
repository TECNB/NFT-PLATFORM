export interface PicOperation {
    is_pic_info: number;
    rules: {
        fileid: string;
        rule: string;
    }[];
}