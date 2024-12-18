import React, { memo } from "react";
import { RegisterWrapper } from "./style";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../../services/loginAndRegister";

type FieldType = {
  name?: string;
  account?: string;
  password?: string;
  confirmPassword?: string;
};
const Register = memo((props) => {
  // const [form] = Form.useForm();
  let navigate = useNavigate();
  const onFinish = async (values: any) => {
    let { name, account, password } = values;

    let result = await userRegister({ name, account, password });
    
    result.length > 0 ? navigate("/login") : console.log("注册失败");
  };
  return (
    <RegisterWrapper>
      <div className="left">
        <img src={require("../../../assets/images/register_bac.png")} alt="" />
      </div>
      <div className="right">
        <span>注册</span>
        <div className="content">
          <Form
            // form={form}
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical" //label的位置
            size={"large"}
          >
            <Form.Item<FieldType>
              label="请输入你的用昵称"
              name="name"
              rules={[
                {
                  // itemProps 参数是 Form.Item 的属性
                  validator: (itemProps, value) => {
                    if (!value) {
                      return Promise.reject(new Error("请输入你的昵称"));
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="请输入你的账号"
              name="account"
              rules={[
                {
                  // itemProps 参数是 Form.Item 的属性
                  validator: (itemProps, value) => {
                    if (!value) {
                      return Promise.reject(new Error("请输入你的账号"));
                    }

                    return Promise.resolve();
                  },
                },
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
                      return Promise.reject(new Error("请输入你的密码"));
                    }
                    if (
                      getFieldValue("confirmPassword") &&
                      getFieldValue("confirmPassword") !== value
                    ) {
                      return Promise.reject(new Error("两次密码不一致"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="请确认你的密码"
              name="confirmPassword"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error("请输入密码"));
                    }
                    if (
                      getFieldValue("password") &&
                      getFieldValue("password") !== value
                    ) {
                      return Promise.reject(new Error("两次密码不一致"));
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
                  立即注册
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <span className="login">
          已有账号?<a onClick={() => navigate("/login")}>立即登录</a>
        </span>
      </div>
    </RegisterWrapper>
  );
});

export default Register;
