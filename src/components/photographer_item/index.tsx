import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

import { PhotographerItem_wrapper } from "./style";
import {
  photographerMessageType,
  worksMessageType,
} from "../../services/photographer/type";

import { userWorksType } from "../../services/profile/type";
import { eventBus } from "../../utils/eventBus";
import LocalCache from "../../utils/localStorage";
import { message } from "antd";

interface photographerMessagePropType {
  photographerMessage?: photographerMessageType[];
  isAttention: (id: number, type: number) => void;
  handleClick: (work: userWorksType) => void;
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

const Photographer_item = memo((props: photographerMessagePropType) => {
  const { photographerMessage, isAttention, handleClick } = props;
  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const location = useLocation();
  const currentWork = location.state;
  // const a = photographerMessage?.map((item) => {

  //   item.works.splice(0, 3).map((workItem) => {
  //     return (
  //       <div key={workItem.image[0]}>
  //         {workItem.image[0].map((url) => {
  //           <img src={url} alt="" />;
  //         })}
  //       </div>
  //     );
  //   });
  // }
  // return item.works.splice(0, 3).map((item1) => {
  //   console.log(item1.image[0]);
  //   return item1.image[0];
  //   // item1.image.map(item2=>{
  //   //   console.log(item2[0]);

  //   // })
  // });
  // });

  const jumpWorkItemDetail = async (work: userWorksType) => {
    handleClick && handleClick(work);
  };

  const pictureShow = (item: photographerMessageType) => {
    const pictureArr = item.works.slice(0, 3).map((item1: any) => {
      return {
        avatar: item.avatar,
        username: item.name,
        ...item1,
        url: item1.image[0],
      };
    });

   
    return pictureArr.map((item: any) => {
      return (
        <img
          src={item.image[0].url}
          alt=""
          key={item.id}
          onClick={() => jumpWorkItemDetail(item)}
        />
      );
    });
  };

  const cancelAttention = async (id: any, type: number) => {
    if (type === undefined) {
      message.warning("未登录，请先登录");
      return;
    }
    isAttention(id, type);
  };

  const jumpUserDetail = (user_id: number) => {
    LocalCache.setCache("currentShowUser", user_id);
    navigate(`/mainContent/profile/${user_id}`);
    setTimeout(() => {
      eventBus.emit("jumpUserDetail", user_id);
    }, 0);
  };
  return (
    <PhotographerItem_wrapper>
      <div className="persons">
        {photographerMessage &&
          photographerMessage.map((item) => {
            return (
              <div className="person_item" key={item.id}>
                <div className="left">
                  <div
                    className="avatar"
                    onClick={() => jumpUserDetail(item.id)}
                  >
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="personMessage">
                    <div className="username">{item.name}</div>
                    {/* <div className="address">欧洲</div> */}
                    <div className="personDetail">
                      <div className="fan">
                        {item.fans}
                        <span style={{ color: "#999", marginLeft: "5px" }}>
                          粉丝
                        </span>
                      </div>
                      <div className="works" style={{ marginLeft: "20px" }}>
                        {item.works.length}
                        <span style={{ color: "#999", marginLeft: "5px" }}>
                          作品
                        </span>
                      </div>
                    </div>
                    {item.id == userInfo.id ? null : item.isAttention !==
                      null ? (
                      <button
                        onClick={() =>
                          cancelAttention(item.id, item.isAttention as number)
                        }
                        style={{
                          color: item.isAttention === 1 ? "#ccc" : "#fff",
                          backgroundColor:
                            item.isAttention === 1
                              ? "rgb(244 244 244)"
                              : "#1088f2",
                        }}
                      >
                        {item.isAttention === null || item.isAttention === 0
                          ? "关注"
                          : item.isAttention == undefined
                          ? "关注"
                          : "已关注"}
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="right">{pictureShow(item)}</div>
              </div>
            );
          })}
      </div>
    </PhotographerItem_wrapper>
  );
});

export default Photographer_item;
