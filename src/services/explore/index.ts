import axiosInstance from "../index";

import { userWorksType } from "../profile/type";
export function getWorksRequest(
  type?: string,
  limit?: number,
  offset?: number,
  user_id?: number
) {
  return axiosInstance.get<{ works: userWorksType[]; total: number }>({
    url: `/getWorks`,
    params: {
      user_id,
      type: type,
      limit: limit,
      offset: offset,
    },
  });
}
