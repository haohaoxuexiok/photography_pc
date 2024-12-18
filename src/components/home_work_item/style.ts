import styled from "styled-components";

type HomeWorkItemProps = {
  $height: string;
  $padding:string
};

export const HomeWorkItem_wrapper = styled.div<HomeWorkItemProps>`
  position: relative
  width:100%;
  height:100%;
  .tagItem {
    display: flex;
    position: relative;
    width: 100%;
    padding-top: ${(props) => props.$padding};
    min-width:1500px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100vw; /* 100% viewport width */
      height: 100%; /* full height */
      background-color: #f7f7f7;
      z-index: -1; /* 将伪元素放到底层 */
    }
    .tag {
      position: absolute;
      top: 40px;
      left: 10px;
      width:100%;
      font-size: 14px;
    }
  }
  .workItem {
    flex: 1;
    margin-right: 20px;
    margin-top:20px;
    background-color:#fff;
    &:last-child {
      margin-right:0;
    }
    .top {
      img {
        width: 100%;
        height:  ${(props) => (props.$height)};
        object-fit: cover;
      }
    }
  }
  .content {
    padding:10px;
    border-bottom: 1px solid #e9e9e9;
    // background-color: #f7f7f7;
    .title {
      font: 600 17px "Arial";
      margin-bottom: 5px;
    }
    .workHotMessage {
      display: flex;
      margin: 8px 0;

      .likeNum,
      .pageView {
        display: flex;
        font: normal 16px Helvetica, Arial, sans-serif;
        color: #999;
        margin-top: 10px;
        margin-right: 30px;
        .like_icon,
        .pageView_icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .footer {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    .avatar {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .time {
      font: normal 16px Helvetica, Arial, sans-serif;
      color: #999;
    }
  }

`;
