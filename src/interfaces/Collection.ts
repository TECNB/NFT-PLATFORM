// types/collection.ts

export interface Collection {
    objectId: string;
    hash: string;
    name: string;
    shortIntro: string;
    intro: string;
    cover: string;
    file: string;
    authorId: string;
    categoryId: string;
    type: string;
    price: number;
    visitCount: number;
    issueNumber: number;
    soldNumber: number;
    recommend: boolean;
    albumId: string | null;
}

