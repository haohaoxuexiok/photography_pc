import React, { memo } from "react";
import { User_item_wrapper } from "./style";
import { FansType, attentionType } from "../../services/profile/type";
import { Button } from "antd";

type userItemType = {
  userItem?: (
    | (FansType & { attention_user?: number })
    | (attentionType & { id?: number })
  )[];
  isAttention: (id: number, type: number) => void;
  userMessage: (id: number) => void;
  userWorksMessage: (id: number) => void;
};

const UserItem = memo((props: userItemType) => {
  const { userItem, isAttention, userMessage, userWorksMessage } = props;
  //用户取消关注
  const cancelAttention = async (id: any, type: number) => {
    isAttention(id, type);
  };
  //点击查看用户
  const lookUser = async (id: any) => {
    userMessage(id);
    userWorksMessage(id);
  };
 
  return (
    <User_item_wrapper>
      {userItem?.map((item) => {
        return (
          <div
            className="userItem"
            key={item.name}
            onClick={() => lookUser(item.id ? item.id : item.attention_user)}
          >
            <div className="avatar">
              <img
                src={
                  item.avatar
                    ? item.avatar
                    : require("../../assets/images/user_default.png")
                }
                alt=""
              />
            </div>

            <div className="userMessage">
              <div className="username">
                <span>{item.name}</span>
              </div>
              <div className="detailMessage">
                <div className="fans">
                  <div className="fans_num">{item.fans}</div>
                  <span>粉丝</span>
                </div>
                <div className="attention">
                  <div className="attention_num">{item.attention_total}</div>
                  <span>关注</span>
                </div>
                <div className="like">
                  <div className="like_num">
                    {item.liked_total ? item.liked_total : 0}
                  </div>
                  <span>点赞</span>
                </div>
              </div>
              <div
                className="isAttention"
                onClick={() =>
                  cancelAttention(
                    item.id ? item.id : item.attention_user,
                    item.type
                  )
                }
              >
                {item.type === 1 ? (
                  <Button
                    style={{
                      color: item.type === 1 ? "#b0b0b0" : "#fff",
                      backgroundColor:
                        item.type === 1 ? "rgb(244 244 244)" : "#1088f2",
                    }}
                  >
                    已关注
                  </Button>
                ) : (
                  <Button
                    style={{
                      color: item.type === 1 ? "#b0b0b0" : "#fff",
                      backgroundColor:
                        item.type === 1 ? "rgb(244 244 244)" : "#1088f2",
                    }}
                  >
                    未关注
                  </Button>
                )}
              </div>
            </div>
            <div className="btn"></div>
          </div>
        );
      })}
    </User_item_wrapper>
  );
});

export default UserItem;
