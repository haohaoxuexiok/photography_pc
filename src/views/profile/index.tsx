import React, { memo, useEffect, useState, ReactNode, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { ProfileWrapper } from "./style";

// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import {
  getUserDetailMessage,
  getUserWorks,
  cancelAttentionRequest,
  attentionRequest,
  changeUsernameRequest,
  getWorksCommentRequest,
  addPageView,
  addWorkLiked,
  deleteComment,
  deleteWorkRequest,
} from "../../services/profile";
import {
  userDetailMessageType,
  userWorksType,
  commentsType,
} from "../../services/profile/type";

import LocalCache from "../../utils/localStorage";

import Profile_header from "../../components/profile_header/index";
import Work_item from "../../components/work_item";
import User_item from "../../components/user_item";
import WorkItemDetail from "../../components/work_item_detail";
import { eventBus } from "../../utils/eventBus";

import { message, Upload, Input } from "antd";

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

interface elementType {
  leftElement?: ReactNode;
  centerElement?: ReactNode;
  rightElement?: ReactNode;
}
type itemElementType = elementType[];

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const Profile = memo(() => {
  //设置用户的详情信息
  const [userDetailMessage, setGetUserDetailMessage] =
    useState<userDetailMessageType>();
  //设置用户界作品头部的元素
  const [itemElement, setItemElement] = useState<itemElementType>([]);
  //设置用户的作品信息
  const [userWorks, setUserWorks] = useState<userWorksType[]>([]);
  //设置用户的点击的时候粉丝，关注还是显示全部作品
  let profile_type = LocalCache.getCache("profile_type");

  //用户头像
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [inputValue, setInputValue] = useState("");
  const [usernameState, setUsernameState] = useState(true);
  const [otherUserId, setOtherUserId] = useState<number | null>(null);
  const modelRef = useRef<any>(null);
  const [currentWork, setCurrentWork] = useState<userWorksType>(
    {} as userWorksType
  );
  const [currentWorkComment, setCurrentWorkComment] =
    useState<commentsType[]>();

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  ); //加shallowEqual是为了一个浅层的比较。防止重复的渲染

  const userMessage = async (id: number) => {
    setOtherUserId(id);

    const userDetailMessage = await getUserDetailMessage(id);
    setGetUserDetailMessage(
      userDetailMessage as unknown as userDetailMessageType
    );

    setImageUrl(userDetailMessage.avatar);
    setInputValue(userDetailMessage.name);
  };

  const params = useParams();

  //拿到用户的详情信息
  useEffect(() => {
    userMessage(
      params
        ? parseInt(params.id!)
        : userWorks && userWorks.length > 0
        ? userWorks[0].user_id
        : userInfo.id
    );

    userWorksMessage(
      params
        ? parseInt(params.id!)
        : userWorks && userWorks.length > 0
        ? userWorks[0].user_id
        : userInfo.id
    );
    // }
  }, [userInfo, params.id]);

 
  //拿到用户的作品信息
  const userWorksMessage = async (id: number) => {
    const userWorks = await getUserWorks(id);
    // userWorks.map((work) => {
    //   if (work.videoUrl) {
        
    //   }
    // });

    setUserWorks(userWorks as unknown as userWorksType[]);
    return userWorks;
  };

  // useEffect(() => {
  //   userWorksMessage(
  //     params
  //       ? parseInt(params.id!)
  //       : userWorks && userWorks.length > 0
  //       ? userWorks[0].user_id
  //       : userInfo.id
  //   );
  // }, [userInfo, params.id]);
  // getUserDetailMessage(userInfo.id).then((res) => {
  //   console.log(res);
  //   setGetUserDetailMessage(res);
  // });

  //初始化个人页面作品的头部
  useEffect(() => {
    handleItemElement(LocalCache.getCache("profile_type"));
  }, [userWorks]);

  //用户关注和不关注
  const isAttention = async (id: number, type: number) => {
    if (type === 0) {
      await attentionRequest(id);
    } else {
      await cancelAttentionRequest(id);
    }
    userMessage(userInfo.id);
  };

  //个人页面的作品头部逻辑
  const handleItemElement = (type: string = "all") => {
    LocalCache.setCache("profile_type", type);
    const itemType = LocalCache.getCache("profile_type");
    if (itemType === "fans") {
      setItemElement([
        {
          leftElement: (
            <div className="header">
              <img src={require("../../assets/images/small.png")} />
              <span className="look" onClick={() => handleItemElement("all")}>
                查看作品
              </span>
            </div>
          ),
        },
        {
          centerElement: (
            <div className="header">
              <span>粉丝数</span>
              <div className="works_num">
                {userDetailMessage ? userDetailMessage.fans_total : 0}
              </div>
            </div>
          ),
        },
      ]);
    } else if (itemType === "attention") {
      setItemElement([
        {
          leftElement: (
            <div className="header">
              <img src={require("../../assets/images/small.png")} />
              <span className="look" onClick={() => handleItemElement("all")}>
                查看作品
              </span>
            </div>
          ),
        },
        {
          centerElement: (
            <div className="header">
              <span>关注数</span>
              <div className="works_num">
                {userDetailMessage
                  ? userDetailMessage.attention_users_total
                  : 0}
              </div>
            </div>
          ),
        },
      ]);
    } else {
      setItemElement([
        {
          leftElement: (
            <div className="header">
              <span>全部作品</span>
              <div className="works_num">
                {userWorks && userWorks.length > 0 ? userWorks.length : 0}
              </div>
            </div>
          ),
        },
      ]);
    }
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  //改变用户名的当前的状态
  const changeUsernameState = () => {
    if (otherUserId === userInfo.id) setUsernameState(!usernameState);
  };

  //改变用户名
  const handlePressEnter = async () => {
    await changeUsernameRequest(inputValue);
    setUsernameState(!usernameState);
  };

  const getWorksComment = async (work: userWorksType = currentWork) => {
    const workComment = await getWorksCommentRequest(work.id);
    setCurrentWorkComment(workComment);
  };

  useEffect(() => {
    eventBus.on("handlePublicEvent", handleClick);
    eventBus.on("jumpUserDetail", jumpUserDetail);
  }, []);

  const jumpUserDetail = (user_id: number) => {
    userMessage(user_id);
    userWorksMessage(user_id);
  };

  //点击作品的item
  const checkModelRef = () => {
    modelRef.current.showModal();
  };

  const handleClick = async (work: userWorksType = currentWork) => {
    if (userInfo.id) await addPageView(work.id, work.user_id);

    userWorksMessage(work.user_id);

    console.log(work,currentWork);
    

    getWorksComment(work);
    userMessage(work.user_id);
    setCurrentWork(work);
    if (modelRef.current) {
      // 如果modelRef存在则执行相关逻辑
      checkModelRef();
    }
  };
  //用户点赞作品
  const handleWorkLike = async (work: userWorksType) => {
    await addWorkLiked(work.id);

    const userWork = await userWorksMessage(userWorks[0].user_id);

    const getCurrentWork: any = userWork.find((obj) => obj.id === work.id);
    setCurrentWork(getCurrentWork);
    userMessage(userWorks[0].user_id);
  };

  const handleDeleteComment = async (comment_id: number) => {
    await deleteComment(comment_id);
    await getWorksComment();
  };
  //删除用户的作品
  const deleteWork = async (content_id: number) => {
    await deleteWorkRequest(content_id);
    userMessage(
      userWorks && userWorks.length > 0 ? userWorks[0].user_id : userInfo.id
    );
    userWorksMessage(
      userWorks && userWorks.length > 0 ? userWorks[0].user_id : userInfo.id
    );
    modelRef.current.handleCancel();
  };
  return (
    <ProfileWrapper>
      <div className="bac">
        <img src={require("../../assets/images/profile_default.jpg")} alt="" />
      </div>
      <div className="main">
        <div className="body">
          <div className="content">
            <div className="avatar">
              <Upload
                headers={{
                  authorization: `Bearer ${LocalCache.getCache("token")}`,
                }}
                name="avatar"
                // disabled={otherUserId != userInfo.id}
                listType="picture-circle"
                // className="avatar-uploader"
                showUploadList={false}
                action={`http://localhost:8000/avatar`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {/* {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : null} */}

                {userDetailMessage?.avatar ? (
                  <img src={userDetailMessage.avatar} alt="" />
                ) : (
                  <img
                    src={require("../../assets/images/user_default.png")}
                    alt=""
                  />
                )}
              </Upload>
            </div>
            <div className="userMessage">
              <div
                className="username"
                onDoubleClick={() => changeUsernameState()}
              >
                {/* input的defaultValue没有生效的可能原因是因为defaultValue是在组件挂载
              后才会被设置的，而不是在getUserDetailMessage请求完成后立即设置的 */}
                {/* 要解决这个问题，你可以使用受控组件的方式来设置input的值 */}
                {/* <h1>{userDetailMessage?.name}</h1> */}
                {usernameState ? (
                  <h1>{inputValue}</h1>
                ) : (
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={() => handlePressEnter()}
                    onBlur={() => handlePressEnter()}
                    autoFocus
                  />
                )}
              </div>
              <div className="detailMessage">
                <div className="fans">
                  <div
                    className="fans_num"
                    onClick={(e) => handleItemElement("fans")}
                  >
                    {userDetailMessage?.fans_total
                      ? userDetailMessage?.fans_total
                      : 0}
                  </div>
                  <span>粉丝</span>
                </div>
                <div className="attention">
                  <div
                    className="attention_num"
                    onClick={(e) => handleItemElement("attention")}
                  >
                    {userDetailMessage?.attention_users_total
                      ? userDetailMessage?.attention_users_total
                      : 0}
                  </div>
                  <span>关注</span>
                </div>
                <div className="like">
                  <div className="like_num">
                    {userDetailMessage?.liked_total
                      ? userDetailMessage?.liked_total
                      : 0}
                  </div>
                  <span>点赞</span>
                </div>
              </div>
            </div>
          </div>
          <div className="works_header">
            <Profile_header itemElement={itemElement} />
          </div>
          <div className="work">
            {profile_type === "all" ? (
              <div>
                <Work_item
                  works={userWorks}
                  handleClick={(i) => handleClick(i)}
                />
              </div>
            ) : (
              <User_item
                userItem={
                  profile_type === "fans"
                    ? userDetailMessage?.fans
                    : userDetailMessage?.attention_users
                }
                isAttention={isAttention}
                userMessage={userMessage}
                userWorksMessage={userWorksMessage}
              />
            )}
          </div>
        </div>
      </div>
      <WorkItemDetail
        ref={modelRef}
        currentUserMessage={userDetailMessage}
        work={currentWork}
        comment={currentWorkComment}
        updateComment={() => getWorksComment()}
        handleWorkLike={(work) => handleWorkLike(work)}
        handleDeleteComment={(comment_id) => handleDeleteComment(comment_id)}
        isCurrentUser={otherUserId === userInfo.id}
        deleteWork={(content_id) => deleteWork(content_id)}
      />
    </ProfileWrapper>
  );
});
// leftElement={() => (
//   <div className="header">
//     <span>全部作品</span>
//     <div className="works_num">0</div>
//   </div>
// )}
{
  /* <div className="header">
            <span>全部作品</span>
            <div className="works_num">0</div>
          </div> */
}
export default Profile;
