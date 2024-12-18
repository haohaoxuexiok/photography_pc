import React, { memo, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { LoginWrapper } from "./style";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FormInstance } from "antd/lib/form";

import { fetchUserDataAction } from "../../../store/user/index";

type FieldType = {
  account: string;
  password: string;
};
const Login = memo((props) => {
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  // const [userInfo, setUserInfo] = useState<any>();
  const dispatch = useDispatch<any>();
  const { userInfo } = useSelector(
    (state: any) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  let navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      if (userInfo.stateCode === "401") {
        formRef?.current?.setFields([
          {
            name: "account",
            errors: ["账号或者密码错误"],
          },
          {
            name: "password",
            errors: ["账号或者密码错误"],
          },
        ]);
      } else {
        navigate(`/mainContent/profile/${userInfo.id}`);
      }
    }
  }, [userInfo]);
  const onFinish = async (values: any) => {
    // const info = await userLogin(values);
    // setUserInfo(info[0]);
    dispatch(fetchUserDataAction(values));
  };

  // const validateForm = (rule:any, value:any, callback:any) => {
  //   console.log(value);
  //    console.log(userInfo);

  //   // if (value && value.length >= 6) {
  //   //   callback(); // 通过验证
  //   // } else {
  //   //   callback("密码长度至少为6个字符"); // 验证不通过，返回错误消息
  //   // }
  // };

  return (
    <LoginWrapper>
      <div className="left">
        <img src={require("../../../assets/images/login_bac.jpg")} alt="" />
      </div>
      <div className="right">
        <span>登录</span>
        <div className="content">
          <Form
            form={form}
            ref={formRef}
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical" //label的位置
            size={"large"}
          >
            <Form.Item<FieldType>
              label="请输入你的账号"
              name="account"
              rules={[
                {
                  // itemProps 参数是 Form.Item 的属性
                  validator: (itemProps, value) => {
                    if (!value) {
                      return Promise.reject(new Error("请输入用户名"));
                    }

                    return Promise.resolve();
                  },
                },
                // { validator: validateForm },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="请输入你的密码"
              name="password"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error("请输入密码"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="btn">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  立即登录
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <span className="register">
          未注册账号?<a onClick={() => navigate("/register")}>立即注册</a>
        </span>
      </div>
    </LoginWrapper>
  );
});

export default Login;
