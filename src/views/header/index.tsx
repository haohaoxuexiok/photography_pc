import React, { memo, useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeaderWrapper } from "./style";
import { Button, Dropdown, Space } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { message } from "antd";
import LocalCache from "../../utils/localStorage";

type userInfo = {
  id: number;
  name: string;
  avatar: string;
  liked_total: number;
  attention_users_total: number;
};

type stateType = {
  user: { userInfo: userInfo };
};

const Header = memo((props) => {
  let navigate = useNavigate();

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const jumpProfile = () => {
    // LocalCache.setCache("currentShowUser",userInfo.id)
    navigate(`/mainContent/profile/${userInfo.id}`);
    LocalCache.deleteCache("currentPage");
  };
  const items: MenuProps["items"] = userInfo.id
    ? [
        {
          key: "1",
          label: (
            <a
              style={{
                display: "flex",
                padding: "5px 20px",
                font: "normal 17px BlinkMacSystemFont",
              }}
              onClick={() => jumpProfile()}
            >
              我的
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              style={{
                display: "flex",
                padding: "5px 20px",
                font: "normal 17px BlinkMacSystemFont",
              }}
              onClick={() => navigate("/main")}
            >
              退出登录
            </a>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <a
              style={{
                display: "flex",
                padding: "5px 20px",
                font: "normal 17px BlinkMacSystemFont",
              }}
              onClick={() => navigate("/login")}
            >
              去登录
            </a>
          ),
        },
      ];

  const uploadItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          style={{
            display: "flex",
            padding: "5px 20px",
            font: "normal 17px BlinkMacSystemFont",
          }}
          onClick={() => {
            navigate("/mainContent/publicWork")
            LocalCache.deleteCache("currentPage");
          }}
        >
          图片
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          style={{
            display: "flex",
            padding: "5px 20px",
            font: "normal 17px BlinkMacSystemFont",
          }}
          onClick={() => {
            navigate("/mainContent/publicVideo")
            LocalCache.deleteCache("currentPage");
          }}
        >
          视频
        </a>
      ),
    },
  ];

  const tabTitle: { title: String; className: string; path: string }[] = [
    {
      title: "首页",
      className: "home",
      path: "/mainContent/home",
    },
    {
      title: "探索",
      className: "explore",
      path: "/mainContent/explore",
    },
    {
      title: "摄影师",
      className: "photographer",
      path: "/mainContent/photographer",
    },
    {
      title: "当月榜单",
      className: "rank",
      path: "/mainContent/rank",
    },
    // {
    //   title: "test",
    //   className: "test",
    //   path: "/mainContent/test",
    // },
  ];

  const [currentPage, setCurrentPage] = useState(
    LocalCache.getCache("mainContent")
  );

  return (
    <HeaderWrapper>
      <div className="logo" onClick={() => navigate("/main")}>
        <img src={require("../../assets/images/logo_1.png")} alt="logo" />
      </div>

      <div className="center">
        {tabTitle.map((item, index) => {
          return (
            <div
              key={index}
              className={item.className}
              style={{
                color:
                  LocalCache.getCache("currentPage") === item.className
                    ? "white"
                    : "#ccc",
              }}
              onClick={() => {
                navigate(item.path);
                setCurrentPage(item.className);
                LocalCache.setCache("currentPage", item.className);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      <div className="right">
        <div className="profile">
          <Dropdown menu={{ items }} placement="bottomLeft">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <img
                  src={require("../../assets/images/user_icon.png")}
                  alt=""
                />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className="btn">
          <Dropdown menu={{ items:uploadItems }} placement="bottomLeft">
            <Button
              type="primary"
              // onClick={() => {
              //   if (userInfo.id) {
              //     LocalCache.deleteCache("currentPage");
              //     navigate("/mainContent/publicWork");
              //   } else {
              //     message.warning("未登录，请先登录");
              //     return;
              //   }
              // }}
            >
              上传
            </Button>
          </Dropdown>
          {/* <Button
            type="primary"
            onClick={() => {
              if (userInfo.id) {
                LocalCache.deleteCache("currentPage")
                navigate("/mainContent/publicWork");
              } else {
                message.warning("未登录，请先登录");
                return;
              }
            }}
          >
            上传
          </Button> */}
        </div>
      </div>
    </HeaderWrapper>
  );
});

export default Header;
