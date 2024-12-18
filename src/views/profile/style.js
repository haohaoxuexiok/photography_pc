import styled from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  .bac {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 80%;

    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .main {
    position: absolute;
    top: 250px;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .body {
    position: relative;
    z-index: 999;
    width: 1250px;
    margin: 0 auto;
    padding-bottom:80px;
    background-color: #f8f8f8;
    min-width: 800px;
    z-index: 9;
    .content {
      display: flex;
      height: 100px;
      width: 100%;
      background-color: #fff;
      .avatar {
        position: relative;
        top: -50px;
        border: none;
        width:100px;
        height: 100px;
        img {
          display: block;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          background-color: #fff;
          border: 5px solid #fff;
        }
      }
      .userMessage {
        position: relative;
        top: -30px;
        margin-left: 20px;
        font-size: 11px;
        .username {
          color: #fff;
        }
        .detailMessage {
          display: flex;
          color: black;
          font-size: 17px;
          font-family: "BlinkMacSystemFont";
          padding-top: 10px;
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
            margin-left: 40px;
          }
          .attention_num,
          .fans_num,
          .like_num {
            cursor: pointer;
          }
        }
      }
    }
    .works_header {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw; /* 100% viewport width */
        height: 100%; /* full height */
        border: 1px solid #ede7e7;
        z-index: -1; /* 将伪元素放到底层 */
      }

      background-color: #fff;
      .header {
        display: flex;
        align-items: center;
        height: 50px;
        font-family: "BlinkMacSystemFont";
        font-weight: bold;
        font-size: 19px;
        span {
          margin-right: 10px;
        }
        img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        .works_num {
          font-size: 17px;
        }
        .look {
          font: normal 13px "BlinkMacSystemFont";
          color: #838385;
          cursor: pointer;
        }
      }
    }
  }
  .ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload.ant-upload-select {
    border: none;
  }
`;
// position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     background-color: rgba(0,0,0,.4);

// // .header .look::before {
//    content:"";
//    background-image: url('../../assets/images/small.svg');
//    display:block;
//    width:20px;
//    height:20px;
//    background-color:red;
// }
