import styled from "styled-components";

type ExploreItem_Wrapper_Type = {
  $isScroll: boolean;
};

export const ExploreItem_wrapper = styled.div<ExploreItem_Wrapper_Type>`
  height: 650px;
  // width:  100%;
  .scroll_container {
    padding: 0 150px;
    height: 95%;
    overflow-y: ${(props) => (props.$isScroll ? "scroll" : "hidden")};
    overflow-x: hidden;
  }
  .list {
    position: relative;
    width: 100%;
  }
  .workItem {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 10px;
      animation: identifier 0.25s;
    }
  }
  @keyframes identifier {
    from {
      opacity: 0;
      transform: translateY(200px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  h4 {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100px;
    transform: translateX(50%);
  }
  .infinite-scroll-component {
    overflow: unset !important;
  }

  .workItem {
    position: absolute;
    .videoTime {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #555353;
      border-radius: 5px;
      padding: 5px 8px;
      color: #fff;
      font-size: 12px;
    }
  }

  .workItem img {
    width: 100%;
    transform: translateZ(0);
    will-change: transform, opacity;
  }
  .workItem:hover .cover {
    display: block;
  }

  .cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    display: none;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 20px;
      .top {
        .title {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .b-left {
          display: flex;
          justify-content: center;
          align-items: center;
          .username {
            font: normal 15px BlinkMacSystemFont;
          }
          img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .b-right {
          display: flex;
          align-items: center;
          .likeNum {
            display: flex;
            .like_icon {
              margin-right: 5px;
            }
          }
          .pageView {
            display: flex;
            align-items: center;
            margin-left: 20px;
            .pageView_icon {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .loading {
    position: absolute;
    bottom: 30px;

    width: 100%;
  }
  // ::-webkit-scrollbar {
  //   width: 15px;
  //   height: 20px;
  // }

  // ::-webkit-scrollbar-thumb {
  //   border-radius: 12px;
  //   border: 1px solid rgba(0, 0, 0, 0);
  //   box-shadow: 50px 0 0 #a5adb7 inset;
  // }

  // ::-webkit-scrollbar-thumb:hover {
  //   box-shadow: 8px 0 0 #4a4a4a inset;
  // }
`;
