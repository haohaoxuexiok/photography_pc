import styled from "styled-components";

type WorkItemDetailProps = {
  $isShow: boolean;
};

export const DeleteModel_wrapper = styled.div`
  .model_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 50px 10px 50px;
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
      width: 100%;
      button {
        display: flex;
        align-items: center;
        padding: 20px 30px;
      }
    }
    .warn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-items: center;
      .deleteWork_icon{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: red;
        height: 50px;
        width: 50px;
        img {
          padding: 10px;
          height: 50px;
          width: 50px;
        }
      }
      span{
        margin-top: 10px;
      }
    }
  }
  // .ant-modal-footer{
  //   display: flex;
  //   justify-content: space-evenly;
  //   align-items: center;
  // }
`;

export const Work_item_detail_wrapper = styled.div<WorkItemDetailProps>`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .right {
      display: flex;
      .deleteWork_icon,.editorWork_icon{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0px 5px;
        margin-right: 16px;
        border: 1px solid #d0c8c8;
        border-radius: 5px;
        img {
          width: 25px;
          height: 25px;
          color: #fff;
        }
      }
      .liked {
        margin-right: 20px;
        .anticon svg {
          position: absolute;
          top: 50%;
          left: 38%;
          transform: translate(-50%, -50%);
        }
        .ant-btn {
          span {
            margin: 0 10px;
          }
          .ant-btn-icon {
            margin: 0;
          }
        }
      }
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .name {
      margin-left: 10px;
      // font:normal 14px/20px ""BlinkMacSystemFont";
      font-weight: bold;
    }
  }
  .showPicture {
    padding: 20px;
    width: 100%;

    .picture {
      background-color: #f6f6f6;
      text-align: center;
      img {
        height: 650px;
        width: 100%;
      }
    }
  }
  .slick-slider span {
    position: absolute;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    text-align: center;
    z-index: 999;
  }
  .anticon svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .smallShowPicture {
    display: flex;
    justify-content: center;

    .picture {
      margin: 5px;
      width: 100px;
      height: 60px;
    }
    .ant-image {
      width: 100%;
      height: 100%;
    }
  }
  .ant-image {
    height: 100%;
    img {
      height: 100%;
    }
  }
  .description {
    padding: 0 20px 20px 20px;
    border-bottom: 1px solid #ede7e7;
    h1 {
      color: rgba(0, 0, 0, 0.85);
      font-size: 22px;
      font-weight: 600;
    }
    .dateAndViews {
      display: flex;
      width: 100%;
      .views {
        margin-left: 20px;
      }
      .date,
      .views {
        display: flex;
        height: 20px;
        img {
          margin-right: 5px;
          width: 20px;
          height: 100%;
        }
      }
    }
  }
  .workContent {
    padding: 20px;
    border-bottom: 1px solid #ede7e7;
    .content {
      font-size: 18px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      .tag {
        padding: 5px 30px;
        margin: 10px 10px 10px 0;
        font-size: 17px;
        background-color: #f1f1f1;
        color: rgba(0, 0, 0, 0.65);
        border-radius: 20px;
      }
    }
  }
  .center {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    .title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 22px;
      font-weight: 600;
    }
    .left {
      flex: 1;
      padding-right: 10px;
      .comments {
        padding: 20px;
        .allComment {
          .comment_item {
            position: relative;
            display: flex;
            margin: 30px 0 30px 0;
            .delete {
              position: absolute;
              right: 0;
              display: flex;
              justify-content: center;
              font-size: 15px;
              color: rgba(0, 0, 0, 0.45);
              display: none;
              cursor: pointer;
              img {
                width: 20px;
                height: 20px;
              }
            }
            &:hover .delete {
              display: ${(props) => (props.$isShow ? "flex" : "none")};
            }
            .comment_avatar img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            .nameAndComment {
              margin-left: 10px;
              .c_name {
                font: normal 16px "BlinkMacSystemFont";
                span {
                  font-size: 15px;
                  color: rgba(0, 0, 0, 0.45);
                  margin-left: 15px;
                }
              }
              .comment {
                margin: 10px 0;
                word-spacing: pre-wrap;
                color: rgba(0, 0, 0, 0.65);
                font: normal 17px "BlinkMacSystemFont";
              }
              .comment_icon {
                cursor: pointer;
                img {
                  height: 15px;
                  width: 15px;
                }
                span {
                  margin-left: 5px;
                  font-size: 13px;
                  color: rgba(0, 0, 0, 0.45);
                }
              }
            }
          }
        }
        .commentNum {
          font: normal 18px/24px "BlinkMacSystemFont";
          font-weight: 600;
        }
        .commentInput {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          .l_avatar {
            img {
              height: 40px;
              width: 40px;
              border-radius: 50%;
            }
          }
          .c_input {
            flex: 1;
            margin: 0 5px;
            .response {
              position: relative;
              width: 100%;
              padding: 5px;
              background-color: #f2f2f2;
              border-radius: 5px;
            }
            .anticon svg {
              position: absolute;
              top: 50%;
              left: 98%;
            }
          }
        }
      }
    }
    .maybeLike {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        align-items: center;
        margin-top: 20px;
        img {
          width: 250px;
          height: 150px;
        }
        .userMessage {
          margin-left: 10px;
          .u_title {
            font: normal 18px/24px "BlinkMacSystemFont";
            font-weight: 600;
          }
          .u_user {
            margin-top: 5px;
            font: normal 16px/24px "BlinkMacSystemFont";
            color: #8e8d8d;
          }
        }
      }
    }
  }
`;
