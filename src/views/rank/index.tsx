import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Rank_Wrapper } from "./style";
import { getRankData } from "../../services/rank";
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

import ExploreItem from "../../components/exploreItem";
import WorkItemDetail from "../../components/work_item_detail";

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

const Rank = memo(() => {
  const [workMessage, setWorksMessage] = useState<userWorksType[]>();
  const [otherUserId, setOtherUserId] = useState<number | null>(null);

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const rankRequest = async () => {
    const result = userInfo.id
      ? await getRankData(userInfo.id)
      : await getRankData();
    setWorksMessage(result);
    
    return result;
  };
  useEffect(() => {
    rankRequest();
  }, []);
  const modelRef = useRef<any>(null);
  const [currentWork, setCurrentWork] = useState<userWorksType>(
    {} as userWorksType
  );
  const [currentWorkComment, setCurrentWorkComment] =
    useState<commentsType[]>();

  const getWorksComment = async (work: userWorksType = currentWork) => {
    const workComment = await getWorksCommentRequest(work.id);
    setCurrentWorkComment(workComment);
  };

  const handleWorkLike = async (work:userWorksType) => {
    await addWorkLiked(work.id);
    const works = await rankRequest();

    const handleClickWork = works.find(
      (work: any) => work.id === currentWork.id
    );
    setCurrentWork(handleClickWork as userWorksType);
  };

  const handleDeleteComment = async (comment_id: number) => {
    await deleteComment(comment_id);
    await getWorksComment();
  };

  const deleteWork = async (content_id: number) => {
    await deleteWorkRequest(content_id);
    await rankRequest();
    modelRef.current.handleCancel();
  };

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
    <Rank_Wrapper>
      <div className="title">
        <h1>12 月热度图片 Top 10 榜单</h1>
        <span>综合 12 月份作品的【浏览量、点赞及评论】三方数据计算得出</span>
      </div>
      <div className="content">
        <ExploreItem
          // worksMessage={workMessage!}
          handleClick={(i) => handleClick(i)}
          getWorks={rankRequest}
          isScroll={false}
          //getMoreData={() => getMoreData()}
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
      </div>
    </Rank_Wrapper>
  );
});

export default Rank;
