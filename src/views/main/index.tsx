import React, { memo, useState, useEffect } from "react";
import { MainWrapper } from "./style";
import { useNavigate } from "react-router-dom";

const Main = memo(() => {
  let images = [
    require("../../assets/images/main/1.jpg"),
    require("../../assets/images/main/2.jpg"),
    require("../../assets/images/main/3.jpg"),
    require("../../assets/images/main/4.jpg"),
    require("../../assets/images/main/5.jpg"),
    require("../../assets/images/main/6.jpg"),
    require("../../assets/images/main/7.jpg"),
    require("../../assets/images/main/8.jpg"),
    require("../../assets/images/main/9.jpg"),
    require("../../assets/images/main/10.jpg"),
    require("../../assets/images/main/11.jpg"),
    require("../../assets/images/main/12.jpg"),
    require("../../assets/images/main/13.jpg"),
    require("../../assets/images/main/14.jpg"),
  ];
  let navigate = useNavigate();

  const handleJump = (url: string) => {
    navigate(url);
  };
  return (
    <MainWrapper>
      <div className="message">
        <div className="logo">
          <img src={require("../../assets/images/logo_1.png")} alt="" />
        </div>
        <div className="btn">
          <span onClick={() => handleJump("/login")}>登录</span>
          <span onClick={() => handleJump("/register")}>注册</span>
        </div>
      </div>
      {images.map((image, index) => {
        return (
          <div className="item" key={image}>
            <img src={image} key={index} alt="" />
          </div>
        );
      })}
    </MainWrapper>
  );
});

export default Main;
