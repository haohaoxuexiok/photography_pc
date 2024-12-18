export interface hotTagWorksType {
    id:number;
    title:string;
    content:string;
    image:{url:string,style:{width:number,height:number}}[];
    pageView:number;
    likeNum:number;
    tag:string[];
    createAt: string;
    updateAt: string;
    is_like:boolean;
    user_id:number,
    avatar:string,
    username:string,
    videoUrl:string,
    videoTime:string
}
