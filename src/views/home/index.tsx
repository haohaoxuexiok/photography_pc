import React, { memo, useEffect, useRef, useState } from "react";
import { HomeWrapper } from "./style";
import { Button, Modal, Carousel, Image, Tabs, Input } from "antd";

import { useSelector, shallowEqual } from "react-redux";
import type { TabsProps } from "antd";
import {
  CloseOutlined,
  LikeFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

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
import { getHotTags, getAttentionWorks } from "../../services/home";
import { hotTagWorksType } from "../../services/home/type";

import HomeWorkItem from "../../components/home_work_item";
import WorkItemDetail from "../../components/work_item_detail";

interface AntdArrowProps {
  currentSlide?: number;
  slideCount?: number;
}

interface ArrowProps {
  direction: "left" | "right";
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
const Home = memo(() => {
  const arrowSize = 15;
  const arrowOffset = 40;
  const Arrow = ({
    currentSlide,
    direction,
    slideCount,
    ...carouselProps
  }: ArrowProps & AntdArrowProps) =>
    direction === "left" ? (
      <LeftOutlined
        {...carouselProps}
        style={{
          color: "#fff",
          fontSize: arrowSize,
          height: arrowSize,
          width: arrowSize,
          zIndex: 1,
        }}
      />
    ) : (
      <RightOutlined
        {...carouselProps}
        style={{
          color: "#fff",
          fontSize: arrowSize,
          height: arrowSize,
          width: arrowSize,
          zIndex: 1,
        }}
      />
    );
  const carouselRef = useRef<any>();
  const [hotTagWorks, setHotTagWorks] = useState<
    { works: hotTagWorksType[]; tag: string }[]
  >([]);

  const [attentionWorks, setAttentionWorks] = useState<hotTagWorksType[]>([]);
  const [currentSlide, setCurrentSlide] = useState<string>("1");
  const [currentWork, setCurrentWork] = useState<hotTagWorksType>(
    {} as hotTagWorksType
  );

  const [otherUserId, setOtherUserId] = useState<number | null>(null);

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const getHotTagsRequest = async () => {
    const res = userInfo.id
      ? await getHotTags(userInfo.id)
      : await getHotTags();

    setHotTagWorks(res);
    return res;
  };

  const onChange = async (key: string) => {
    setCurrentSlide(key);
    if (key === "1") {
      await getHotTagsRequest();
    } else {
      if (userInfo.id) {
        const res = await getAttentionWorks();
        setAttentionWorks(res);
      } else {
        setAttentionWorks([]);
      }
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "精选",
    },
    {
      key: "2",
      label: "关注",
    },
  ];

  useEffect(() => {
    getHotTagsRequest();
  }, []);

  const [currentWorkComment, setCurrentWorkComment] =
    useState<commentsType[]>();

  const getWorksComment = async (work: hotTagWorksType = currentWork) => {
    const workComment = await getWorksCommentRequest(work.id);
    setCurrentWorkComment(workComment);
  };

  const handleWorkLike = async (work:userWorksType) => {
    await addWorkLiked(work.id);

    if (currentSlide === "1") {
      const work = await getHotTagsRequest();
      let workArr: any = [];
      work.map((item: any) => {
        workArr.push(...item.works);
      });

      const handleClickWork = workArr.find(
        (work: hotTagWorksType) => work.id === currentWork.id
      );
      setCurrentWork(handleClickWork as hotTagWorksType);
    } else {
      const res = await getAttentionWorks();

      const handleClickWork = res.find(
        (work: hotTagWorksType) => work.id === currentWork.id
      );
      setCurrentWork(handleClickWork as hotTagWorksType);

      setAttentionWorks(res);
    }
  };

  const deleteWork = async (content_id: number) => {
    await deleteWorkRequest(content_id);
    await getHotTagsRequest();
    modelRef.current.handleCancel();
  };

  const handleDeleteComment = async (comment_id: number) => {
    await deleteComment(comment_id);
    await getWorksComment();
  };

  const modelRef = useRef<any>(null);

  const handleClick = async (work: hotTagWorksType) => {
   
    console.log(11111);
    

    setOtherUserId(work.user_id);
    setCurrentWork(work);
    if (modelRef.current) {
      // 如果modelRef存在则执行相关逻辑
      modelRef.current.showModal();
      getWorksComment(work);
    }
  };
  return (
    <HomeWrapper>
      <div className="showPicture">
        <Carousel
          ref={carouselRef}
          nextArrow={<Arrow direction="right" />}
          prevArrow={<Arrow direction="left" />}
          arrows
          // afterChange={onChange}
        >
          <div className="picture" key={Math.random() as any}>
            <Image
              src={
                "https://sp-webfront-cn.oss-cn-hangzhou.aliyuncs.com/skypixel/v2/public/website/assets/1699282540862-70be6b623d1d55c2a2779162122bd613.jpg"
              }
              preview={false}
            />
          </div>
          <div className="picture" key={Math.random() as any}>
            <Image
              src={
                "https://sp-webfront-cn.oss-cn-hangzhou.aliyuncs.com/skypixel/v2/public/website/assets/1698991661154-64516f521b6b8030c8514d333e5b16ba.jpg"
              }
              preview={false}
            />
          </div>
          <div className="picture" key={Math.random() as any}>
            <Image
              src={
                "https://sp-webfront-cn.oss-cn-hangzhou.aliyuncs.com/skypixel/v2/public/website/assets/1698832822861-8c172f76e2794bc2f6621ee54e4ff499.jpg"
              }
              preview={false}
            />
          </div>
          <div className="picture" key={Math.random() as any}>
            <Image
              src={
                "https://sp-webfront-cn.oss-cn-hangzhou.aliyuncs.com/skypixel/v2/public/website/assets/1698832802599-212dcb123bc51b2e2ff1715e9cf2d0cb.jpg"
              }
              preview={false}
            />
          </div>
          <div className="picture" key={Math.random() as any}>
            <Image
              src={
                "https://sp-webfront-cn.oss-cn-hangzhou.aliyuncs.com/skypixel/v2/public/website/assets/1695106179592-99a919e612c0bfc9656f922feaa65cec.jpg"
              }
              preview={false}
            />
          </div>
        </Carousel>
      </div>

      <Tabs
        defaultActiveKey="1"
        items={userInfo.id ? items : [items[0]]}
        onChange={onChange}
      />

      <HomeWorkItem
        hotTagWorks={hotTagWorks}
        attentionWorks={attentionWorks}
        currentSlide={currentSlide}
        handleClick={(i) => handleClick(i)}
      ></HomeWorkItem>

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
    </HomeWrapper>
  );
});

export default Home;
