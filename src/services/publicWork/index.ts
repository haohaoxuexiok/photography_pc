import axiosInstance from "../index";

import { editWorkType } from "../profile/type";

export function getTagRequest() {
  return axiosInstance.get<string[]>({
    url: `/getTag`,
  });
}

export function setPicture(imageUrl: string[]) {
  return axiosInstance.post({
    url: `/uploadPicture`,
    data: imageUrl,
  });
}
///publicContent
export function publicWorkRequest(
  title: string,
  content: string,
  currentTag: string[],
  imageUrl: string[],
  type?: string,
  videoUrl?: string
) {
  return axiosInstance.post({
    url: `/publicContent`,
    data: {
      title,
      content,
      currentTag,
      imageUrl,
      type,
      videoUrl
    },
  });
}

//创建tag
export function setTagsRequest(tag: string[], content_id: string) {
  return axiosInstance.post({
    url: `/createTag`,
    data: {
      tag,
      content_id,
    },
  });
}

//用户编辑作品
export function editWorkRequest(work: editWorkType) {
  return axiosInstance.post({
    url: `/editWork`,
    data: {
      ...work,
    },
  });
}
