import axiosInstance from "../index";
import {
  userDetailMessageType,
  userWorksType,
  commentsType,

} from "./type";

export function getUserDetailMessage(user_id: number) {
  return axiosInstance.get<userDetailMessageType>({
    url: `/userDetailMessage/${user_id}`,
  });
}

export function getUserWorks(user_id: number) {
  return axiosInstance.get<userWorksType[]>({
    url: `/userWorks/${user_id}`,
  });
}

export function cancelAttentionRequest(id: number) {
  return axiosInstance.post({
    url: "/cancelAttention",
    data: {
      id: id,
    },
  });
}

export function attentionRequest(id: number) {
  return axiosInstance.post({
    url: "/attention",
    data: {
      id: id,
    },
  });
}

export function changeUsernameRequest(username: string) {
  return axiosInstance.post({
    url: "/username",
    data: {
      name: username,
    },
  });
}

//获取作品的评论接口
export function getWorksCommentRequest(commentId: number) {
  return axiosInstance.get<commentsType[]>({
    url: `/getComment/${commentId}`,
  });
}
export function createCommentRequest(
  comment: string,
  content_id: number,
  commentId: number
) {
  return axiosInstance.post({
    url: `/comment`,
    data: {
      comment: comment,
      content_id: content_id,
      comment_id: commentId,
    },
  });
}

//增加浏览量/pageView
export function addPageView(content_id: number,user_id:number) {
  return axiosInstance.post({
    url: `/pageView`,
    data: {
      content_id,
      user_id
    },
  });
}

//用户点赞
export function addWorkLiked(content_id: number) {
  return axiosInstance.post({
    url: `/like`,
    data: {
      content_id: content_id,
    },
  });
}

//用户删除评论的接口
// /deleteComment
export function deleteComment(comment_id: number) {
  return axiosInstance.post({
    url: `/deleteComment`,
    data: {
      comment_id: comment_id,
    },
  });
}

//deleteWork删除用户的作品
export function deleteWorkRequest(content_id: number) {
  return axiosInstance.post({
    url: `/deleteWork`,
    data: {
      content_id,
    },
  });
}


