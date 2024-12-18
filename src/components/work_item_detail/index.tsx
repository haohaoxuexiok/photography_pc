import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Carousel, Image, Input, message } from "antd";
import {
  CloseOutlined,
  LikeFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useSelector, shallowEqual } from "react-redux";
import { Work_item_detail_wrapper, DeleteModel_wrapper } from "./style";
import { userWorksType, commentsType } from "../../services/profile/type";
import { createCommentRequest } from "../../services/profile";

import { formatDateTime, dateTime } from "../../utils/time";

import { userDetailMessageType } from "../../services/profile/type";
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

interface AntdArrowProps {
  currentSlide?: number;
  slideCount?: number;
}

interface ArrowProps {
  direction: "left" | "right";
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
type modelPropsType = {
  work?: userWorksType;
  comment?: commentsType[];
  updateComment?: () => void;
  handleWorkLike?: (work: userWorksType) => void;
  handleDeleteComment?: (comment_id: number) => void;
  currentUserMessage?: userDetailMessageType;
  isCurrentUser?: boolean;
  deleteWork?: (content_id: number) => void;
};
const WorkItemDetail = forwardRef((props: modelPropsType, ref): any => {
  const {
    work,
    comment,
    updateComment,
    handleWorkLike,
    handleDeleteComment,
    currentUserMessage,
    isCurrentUser,
    deleteWork,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const [currentComment, setCurrentComment] = useState<commentsType | any>({
    id: 0,
    content_id: work?.id,
  });
  const carouselRef = useRef<any>();
  const inputRef = useRef<any>();

  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  useImperativeHandle(ref, () => ({
    showModal: showModal,
    handleCancel: handleCancel,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (currentSlide: number) => {
    setCurrentSlide(currentSlide);
  };

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
  const handleJump = (index: number) => {
    carouselRef.current.goTo(index, false);
  };

  const keepCurrentComment = async (currentComment: commentsType) => {
    if (userInfo.id) {
      inputRef.current.focus();
      setCurrentComment(currentComment);
    } else {
      message.warning("未登录，请先登录");
    }
  };

  //点击回复评论
  const [inputValue, setInputValue] = useState("");
  const handleResponse = async () => {
    let { content_id = work?.id, id } = currentComment;
    await createCommentRequest(inputValue, content_id, id);
    setInputValue("");
    setCurrentComment({
      id: 0,
      content_id: work?.id,
    });
    updateComment && updateComment();
  };

  const handleLike = async () => {
    if (userInfo.id) {
      // handleWorkLike && handleWorkLike(work!.id);
      handleWorkLike && handleWorkLike(work!);
    } else {
      message.warning("未登录，请先登录");
    }
  };

  const deleteComment = async (id: number) => {
    handleDeleteComment && handleDeleteComment(id);
  };

  const [isModalOpen_delete, setIsModalOpenDelete] = useState(false);

  const showModal_delete = () => {
    setIsModalOpenDelete(true);
  };

  //删除用户的作品
  const handleOk_delete = () => {
    deleteWork && deleteWork(work!.id);
    setIsModalOpenDelete(false);
  };

  const handleCancel_delete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteWork = () => {
    showModal_delete();
  };
  //编辑作品
  const handleEditor = () => {
    navigate("/mainContent/publicWork", { state: { ...work, type: "editor" } });
  };

  return (
    <>
      <Modal
        onCancel={handleCancel}
        footer={null}
        open={isModalOpen}
        width={1500}
      >
        <Work_item_detail_wrapper $isShow={isCurrentUser!}>
          <div className="header">
            <div className="avatar">
              <img
                src={
                  currentUserMessage?.avatar
                    ? currentUserMessage?.avatar
                    : work?.avatar
                }
                alt=""
              />
              <div className="name">
                {currentUserMessage?.name
                  ? currentUserMessage?.name
                  : work?.username}
              </div>
            </div>
            <div className="right">
              <div className="liked" onClick={() => handleLike()}>
                <Button
                  type={work?.is_like ? "primary" : "default"}
                  size="large"
                  icon={<LikeFilled />}
                >
                  {work?.likeNum ? work.likeNum : 0}
                </Button>
              </div>
              {userInfo.id === work?.user_id ? (
                <>
                  <div
                    className="deleteWork_icon"
                    onClick={() => handleDeleteWork()}
                  >
                    <img
                      src={require("../../assets/images/deleteWork_icon.png")}
                      alt=""
                    />
                  </div>
                  <div
                    className="editorWork_icon"
                    onClick={() => handleEditor()}
                  >
                    <img
                      src={require("../../assets/images/editor.png")}
                      alt=""
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="showPicture">
            <Carousel
              ref={carouselRef}
              nextArrow={<Arrow direction="right" />}
              prevArrow={<Arrow direction="left" />}
              arrows
              afterChange={onChange}
            >
              {work && Object.keys(work).length > 0 && work.videoTime ? (
                <video preload="auto" controls src={work.videoUrl} />
              ) : (
                work &&
                Object.keys(work).length > 0 &&
                work.image.map((item) => {
                  return (
                    <div className="picture" key={Math.random() as any}>
                      <Image src={item.url} preview={false} />
                    </div>
                  );
                })
              )}
            </Carousel>
          </div>
          {work && work?.image?.length >= 2 ? (
            <div className="smallShowPicture">
              {work?.image.map((item, index) => {
                return (
                  <div
                    className="picture"
                    key={Math.random() as any}
                    onClick={() => handleJump(index)}
                  >
                    <Image
                      style={{
                        border:
                          currentSlide === index ? "2px solid #1890ff" : "none",
                      }}
                      src={item.url}
                      preview={false}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="center">
            <div className="left">
              <div className="description">
                <div className="title">
                  <h1>{work?.title}</h1>
                </div>
                <div className="dateAndViews">
                  <div className="date">
                    <img src={require("../../assets/images/date.png")} alt="" />
                    <span>{work && formatDateTime(work?.createAt)}</span>
                  </div>
                  <div className="views">
                    <img
                      src={require("../../assets/images/views.png")}
                      alt=""
                    />
                    <span>{work?.pageView ? work?.pageView : 0}</span>
                  </div>
                </div>
              </div>
              <div className="workContent">
                <div className="content">{work?.content}</div>
                <div className="tags">
                  {work &&
                    work?.tag &&
                    work?.tag.map((item) => {
                      return (
                        <div key={Math.random() as any} className="tag">
                          {item}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="comments">
                <div className="commentNum">
                  {comment && comment.length}条评论
                </div>
                <div className="commentInput">
                  <div className="l_avatar">
                    <img
                      src={
                        currentUserMessage?.avatar
                          ? currentUserMessage?.avatar
                          : work?.avatar
                      }
                      alt=""
                    />
                  </div>
                  <div className="c_input">
                    {currentComment && currentComment.name !== undefined ? (
                      <div className="response">
                        {`回复@${currentComment.name} : ${currentComment.comment}`}
                        <CloseOutlined onClick={() => setCurrentComment({})} />
                      </div>
                    ) : null}

                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="点击输入您的评论..."
                      showCount
                      maxLength={500}
                    />
                  </div>
                  <div className="r_btn">
                    <Button
                      type="primary"
                      disabled={userInfo.id ? false : true}
                      onClick={() => handleResponse()}
                    >
                      评论
                    </Button>
                  </div>
                </div>
                <div className="allComment">
                  {comment?.map((item) => {
                    return (
                      <div className="comment_item" key={item.id}>
                        <div
                          className="delete"
                          onClick={() => deleteComment(item.id)}
                        >
                          <img
                            src={require("../../assets/images/delete_icon.png")}
                            alt=""
                          />
                          <span>删除</span>
                        </div>
                        <div className="comment_avatar">
                          <img src={item?.avatar} alt="" />
                        </div>
                        <div className="nameAndComment">
                          <div className="c_name">
                            {item?.name}
                            <span>{dateTime(item.updateAt)}</span>
                          </div>
                          <div className="comment">
                            {item.reply && item.reply.length > 0 ? (
                              <>
                                <span
                                  style={{ color: "#1890ff" }}
                                >{`@${item.reply[0].name}`}</span>
                                {`${item.comment}`}
                              </>
                            ) : (
                              <>{item.comment}</>
                            )}
                          </div>
                          <div
                            className="comment_icon"
                            onClick={() => keepCurrentComment(item)}
                          >
                            <img
                              src={require("../../assets/images/response.png")}
                              alt=""
                            />
                            <span>回复</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="title">你可能喜欢的</div>
              <div className="maybeLike">
                <div className="item">
                  <img
                    src={require("../../assets/images/main/11.jpg")}
                    alt=""
                  />
                  <div className="userMessage">
                    <div className="u_title">盐池韵律</div>
                    <div className="u_user">Tenpercent_</div>
                  </div>
                </div>
                <div className="item">
                  <img src={require("../../assets/images/main/2.jpg")} alt="" />
                  <div className="userMessage">
                    <div className="u_title">Hello, 阳光</div>
                    <div className="u_user">Daniele Massaro</div>
                  </div>
                </div>
                <div className="item">
                  <img src={require("../../assets/images/main/3.jpg")} alt="" />
                  <div className="userMessage">
                    <div className="u_title">山不见我,我自去见山</div>
                    <div className="u_user">Tim</div>
                  </div>
                </div>
                <div className="item">
                  <img src={require("../../assets/images/main/4.jpg")} alt="" />
                  <div className="userMessage">
                    <div className="u_title">奔向新时代</div>
                    <div className="u_user">Jin10Apr</div>
                  </div>
                </div>
                <div className="item">
                  <img src={require("../../assets/images/main/5.jpg")} alt="" />
                  <div className="userMessage">
                    <div className="u_title">The Great Migration</div>
                    <div className="u_user">Prithvi B</div>
                  </div>
                </div>
                <div className="item">
                  <img src={require("../../assets/images/main/6.jpg")} alt="" />
                  <div className="userMessage">
                    <div className="u_title">Blue Crush</div>
                    <div className="u_user">Daniele Ceravolo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Work_item_detail_wrapper>
      </Modal>

      <Modal
        open={isModalOpen_delete}
        onOk={handleOk_delete}
        onCancel={handleCancel_delete}
        footer={null}
      >
        <DeleteModel_wrapper>
          <div className="model_content">
            <div className="warn">
              <div className="deleteWork_icon">
                <img
                  src={require("../../assets/images/deleteWork_icon_white.png")}
                  alt=""
                />
              </div>
              <span>确定要删除这个作品吗？</span>
            </div>
            <div className="btn">
              <div className="cancel">
                <Button onClick={() => handleCancel_delete()}>取消</Button>
              </div>
              <div className="sure">
                <Button type="primary" onClick={() => handleOk_delete()}>
                  确定
                </Button>
              </div>
            </div>
          </div>
        </DeleteModel_wrapper>
      </Modal>
    </>
  );
});

export default WorkItemDetail;
