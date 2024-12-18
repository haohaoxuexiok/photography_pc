import React, { memo, useState, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ExploreWrapper } from "./style";

import { getTagRequest } from "../../services/publicWork";
import { getWorksRequest } from "../../services/explore";
import ExploreItem from "../../components/exploreItem";
import WorkItemDetail from "../../components/work_item_detail";
import {
  userDetailMessageType,
  userWorksType,
  commentsType,
} from "../../services/profile/type";
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

import { message, Tabs } from "antd";

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

const Explore = memo(() => {
  const [activeKey, setActiveKey] = useState<string>();
  const [tabs, setTabs] = useState<{ key: string; label: string }[]>();
  const [activeTab, setActiveTab] = useState<string>("picture");
  const [workMessage, setWorksMessage] = useState<userWorksType[]>();
  const modelRef = useRef<any>(null);
  const exploreItemRef = useRef<any>(null);
  const [otherUserId, setOtherUserId] = useState<number | null>(null);

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const getTags = async () => {
    // const tags = await getTagRequest();

    // const tagsArr = tags.map((tag, index) => {
    //   return {
    //     key: tag,
    //     label: tag,
    //     // children: "Content of Tab Pane 1",
    //   };
    // });
    setTabs([
      { key: "picture", label: "图片" },
      { key: "video", label: "视频" },
    ]);
    // setTabs([{ key: "图片", label: "图片" }, ...tagsArr]);
  };

  const getWorks = async (type?: string, limit?: number, offset?: number) => {
   
    
    const works = userInfo.id
      ? (await getWorksRequest(type, limit, offset, userInfo.id)).works
      : (await getWorksRequest(type, limit, offset)).works;

    setWorksMessage(works);
    return works;
  };

  useEffect(() => {
    getTags();
    getWorks();
  }, []);
  const onChange = (key: string) => {
    setActiveTab(key);

    exploreItemRef.current.getImageList(key);

    getWorks(key);
  };

  const [currentWork, setCurrentWork] = useState<userWorksType>(
    {} as userWorksType
  );
  const [currentWorkComment, setCurrentWorkComment] =
    useState<commentsType[]>();

  const getWorksComment = async (work: userWorksType = currentWork) => {
    const workComment = await getWorksCommentRequest(work.id);
    setCurrentWorkComment(workComment);
  };

  const handleWorkLike = async (work: userWorksType) => {
    if (userInfo.id) {
      const likeNum = await addWorkLiked(work.id);
      let currentWork = work;
      currentWork.is_like = !currentWork.is_like;
      currentWork.likeNum = likeNum;

      setCurrentWork({ ...currentWork } as userWorksType);

      // const works = await getWorks();
      // const handleClickWork = works.find((work) => work.id === currentWork.id);
    } else {
      message.warning("未登录，请先登录");
    }
  };

  const handleDeleteComment = async (comment_id: number) => {
    await deleteComment(comment_id);
    await getWorksComment();
  };

  const deleteWork = async (content_id: number) => {
    await deleteWorkRequest(content_id);
    await getWorks();
    modelRef.current.handleCancel();
  };
  const [pageInfo, setPageInfo] = useState<{ limit: number; offset: number }>({
    limit: 10,
    offset: 0,
  });
  // const getMoreData = async () => {
  //   const pageMessage = { ...pageInfo };
  //   pageMessage.offset += 5;

  //   setPageInfo(pageMessage);
  //   await getWorks("全部", pageMessage.limit, pageMessage.offset);
  // };

  const handleClick = async (work: userWorksType) => {
    setOtherUserId(work.user_id);
    setCurrentWork(work);
    if (modelRef.current) {
      // 如果modelRef存在则执行相关逻辑
      modelRef.current.showModal();
    }
    getWorksComment(work);
  };

  return (
    <ExploreWrapper>
      <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
      <ExploreItem
        ref={exploreItemRef}
        worksMessage={workMessage!}
        activeTab={activeTab!}
        handleClick={(i) => handleClick(i)}
        getWorks={(type?: string, limit?: number, offset?: number) =>
          getWorks(type, limit, offset)
        }
      ></ExploreItem>
      <WorkItemDetail
        ref={modelRef}
        work={currentWork}
        comment={currentWorkComment}
        updateComment={() => getWorksComment()}
        handleWorkLike={(work) => handleWorkLike(work)}
        handleDeleteComment={(comment_id) => handleDeleteComment(comment_id)}
        isCurrentUser={otherUserId === userInfo.id}
        deleteWork={(content_id) => deleteWork(content_id)}
      ></WorkItemDetail>
    </ExploreWrapper>
  );
});

export default Explore;
