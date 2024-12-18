import React, { memo, useEffect, useState, useRef } from "react";
import { PhotographerWrapper } from "./style";
import { getPhotographerMessage } from "../../services/photographer";
import { useSelector, shallowEqual } from "react-redux";
import {
  photographerMessageType,
  worksMessageType,
} from "../../services/photographer/type";

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

import Photographer_item from "../../components/photographer_item";
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

const Photographer = memo(() => {
  const [photographerMessage, setPhotographerMessage] =
    useState<photographerMessageType[]>();

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const photographerMessageRequest = async () => {
    // const res = await getPhotographerMessage() as Promise<PhotographerMessageType[]>;
    const res = userInfo.id
      ? ((await getPhotographerMessage(
          userInfo.id
        )) as unknown as photographerMessageType[])
      : ((await getPhotographerMessage()) as unknown as photographerMessageType[]);
    setPhotographerMessage(res);
    return res;
  };

  //用户关注和不关注
  const isAttention = async (id: number, type: number) => {
    if (type === 0) {
      await attentionRequest(id);
    } else {
      await cancelAttentionRequest(id);
    }
    photographerMessageRequest();
  };

  useEffect(() => {
    photographerMessageRequest();
  }, []);

  const [otherUserId, setOtherUserId] = useState<number | null>(null);
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
    const works = await photographerMessageRequest();

    const allWorks = [].concat(...(works.map((item) => item.works) as any));

    const handleClickWork = allWorks.find(
      (work: userWorksType) => work.id === currentWork.id
    );
    setCurrentWork(handleClickWork as any);
  };

  const handleDeleteComment = async (comment_id: number) => {
    await deleteComment(comment_id);
    await getWorksComment();
  };

  const deleteWork = async (content_id: number) => {
    await deleteWorkRequest(content_id);
    await photographerMessageRequest();
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

  const modelRef = useRef<any>(null);
  return (
    <PhotographerWrapper>
      <Photographer_item
        isAttention={isAttention}
        photographerMessage={photographerMessage}
        handleClick={(i) => handleClick(i)}
      ></Photographer_item>

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
    </PhotographerWrapper>
  );
});

export default Photographer;
