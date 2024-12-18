import styled from "styled-components";

export const User_item_wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw; /* 100% viewport width */
    height: 100%; /* full height */
    background-color: #f8f8f8;
    z-index: -1; /* 将伪元素放到底层 */
  }
  .userItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 3px;
    width: 31.33%;
    height: 250px;
    margin: 10px;
    background-color: #fff;
    .userMessage {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      .username span {
        color: #4b4b4b;
        font-weight: 600;
        font-size: 15px;
        font-family: Open Sans, BlinkMacSystemFont, Segoe UI, Roboto,
          Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
          Microsoft YaHei, SimSun, sans-serif;
      }
      .detailMessage {
        display: flex;
        justify-content: space-around;
        color: black;
        font-size: 17px;
        font-family: "BlinkMacSystemFont";
        width: 100%;
        margin-top: 20px;

        span {
          margin-top: 10px;
          color: #838385;
          font-weight: normal;
          font-size: 12px;
          font-family: none;
        }
        .fans,
        .attention,
        .like {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .attention,
        .like {
          margin-left: 20px;
        }
        .attention_num,
        .fans_num,
        .like_num {
          cursor: pointer;
        }
      }
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 10px;
      
    }
    .isAttention .ant-btn{
      margin-top:20px;
      background-color:#f7f7f7;
      border:0;
      padding:5px 20px;
    }
  }
`;
