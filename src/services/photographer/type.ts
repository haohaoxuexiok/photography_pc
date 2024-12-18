export interface worksMessageType {
    id:number;
    title:string;
    content:string;
    image:string[];
    pageView:number;
    likeNum:number; 
    tag:string[];
    createAt: string;
    updateAt: string;
    is_like:boolean;
    user_id:number,
    
}

export interface photographerMessageType {
    id:number,
    fans:number,
    name:string,
    likeNum:number,
    createAt:string,
    updateAt:string,
    avatar:string,
    isAttention:number|null,
    works:worksMessageType[]
}