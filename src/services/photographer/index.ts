import axiosInstance from "../index";

import {photographerMessageType} from './type'

export function getPhotographerMessage(user_id?:number) {
  return axiosInstance.get<photographerMessageType>({
    url: "/photographer",
    params:{
      user_id
    }
  });
}
