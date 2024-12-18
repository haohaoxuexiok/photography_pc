import axiosInstance from "../index";

export function getHotTags(id?:number) { 
  return axiosInstance.get({
    url: `/hotTags/${id}`,
  });
}

export function getAttentionWorks() { 
  return axiosInstance.get({
    url: "/attentionWorks",
  });
}