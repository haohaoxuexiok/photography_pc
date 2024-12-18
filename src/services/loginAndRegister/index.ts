
import axiosInstance from "../index";

type userInfo = [
  {
    id: number;
    account: string;
    createAt: string;
    updateAt: string;
    avatar: string;
    name: string;
  }
];

export function userRegister(userInfo: {
  name: string;
  account: string;
  password: string;
}){
  return axiosInstance.post<userInfo>({
    url: "/register",
    data: userInfo,
  });
}

export function userLogin(loginInfo: {
    account: string;
    password: string;
  }){
    return axiosInstance.post({
      url: "/login",
      data: loginInfo,
    });
  }