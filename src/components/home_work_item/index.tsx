import React, { memo } from "react";
import { LikeOutlined, EyeOutlined } from "@ant-design/icons";

import { HomeWorkItem_wrapper } from "./style";
import { hotTagWorksType } from "../../services/home/type";
import { getTime } from "../../utils/time";
import { useSelector, shallowEqual } from "react-redux";

interface homeWorkItemProps {
  hotTagWorks?: { works: hotTagWorksType[]; tag?: string }[];
  attentionWorks?: hotTagWorksType[];
  currentSlide: string;
  handleClick: (currentWork: hotTagWorksType) => void;
}

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

const HomeWorkItem = memo((props: homeWorkItemProps) => {
  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const { hotTagWorks, attentionWorks, currentSlide, handleClick } = props;

  // const work = (currentSlide === "1" ? hotTagWorks : attentionWorks);
  let work;
  if (currentSlide === "1") {
    work = hotTagWorks;
  } else {
    work = attentionWorks;
  }
  

  const jumpWorkItemDetail = async (work: hotTagWorksType) => {
    handleClick && handleClick(work);
  };

  const workHtml = (item: hotTagWorksType) => {
    return (
      <div
        className="workItem"
        key={item.createAt}
        onClick={() => jumpWorkItemDetail(item)}
      >
        <div className="top">
          <img src={item.image[0].url} alt="" />
        </div>
        <div className="content">
          <div className="title">{item.title}</div>
          <div className="workHotMessage">
            <div className="pageView">
              <div className="pageView_icon">
                <EyeOutlined />
              </div>
              <span>{item.pageView}</span>
            </div>
            <div className="likeNum">
              <div className="like_icon">
                <LikeOutlined />
              </div>
              <span>{item.likeNum}</span>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="avatar">
            <img src={item.avatar} alt="" />
          </div>
          <div className="time">{getTime(item.createAt)}</div>
        </div>
      </div>
    );
  }; 

  return (
    <HomeWorkItem_wrapper
      $height={currentSlide === "1" ? "250px" : "400px"}
      $padding={currentSlide === "1" ? "80px" : "40px"}
    >
      {work && work.length>0&&
        work.map((item: any, index) => {
          return (
            <div className="tagItem" key={index}>
              <div className="tag">
                <h1>{currentSlide === "1" && item.tag}</h1>
              </div>
              {currentSlide === "1"
                ? item.works &&
                  item.works.map((item: any) => {
                    return workHtml(item);
                  })
                : workHtml(item)}
            </div>
          );
        })}
    </HomeWorkItem_wrapper>
  );
});

export default HomeWorkItem;
