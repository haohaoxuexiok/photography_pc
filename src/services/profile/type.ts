export type attentionType = {
  attention_user: string;
  fans: number;
  attention_total: number;
  avatar: String;
  createAt: string;
  liked_total: string;
  name: string;
  type:number
};

export type FansType = {
  id: number;
  fans: number;
  attention_total: number;
  avatar: string;
  createAt: string;
  liked_total: string;
  name: string;
  type:number
};

export interface userDetailMessageType {
  id: number;
  name: string;
  account: string;
  avatar: string;
  liked_total: string;
  fans: FansType[];
  fans_total:number;
  attention_users: attentionType[];
  attention_users_total: number;
  createAt: string;
  updateAt: string;
}

export interface userWorksType {
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

type replyType = {
  id:number;
  comment:string;
  comment_id:number;
  content_id:number;
  createAt: string;
  updateAt: string;
  user_id:number;
  avatar:string;
  name:string;
}

export interface commentsType{
  id:number;
  comment:string;
  comment_id:number;
  content_id:number;
  createAt: string;
  updateAt: string;
  user_id:number;
  avatar:string;
  name:string;
  reply:replyType[]
}

export interface editWorkType {
  content: string;
  title: string;
  tag: string[];
  user_id:number;
  id:number;
  imageUrl:string[];
}