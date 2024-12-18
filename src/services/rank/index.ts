// rank
import axiosInstance from "../index";

export function getRankData(user_id?:number) { 
  return axiosInstance.get({
    url: "/rank",
    params:{
      user_id
    }
  });
}