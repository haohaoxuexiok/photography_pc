import styled from "styled-components";

export const MainWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%; // 默认宽度
  margin: 0 auto; // 剧中
  columns: 4; // 默认列数
  column-gap: 5px; // 列间距
  .message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 250px;
    width: 400px;
    border-radius: 10px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: end;
      cursor: pointer;
      span {
        display: inline-block;
        padding: 10px 40px;
        margin: 20px;
        font: normal 20px "Times New Roman";
        // opacity: 0.7;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 10px;
      }
    }
  }
  .item {
    width: 100%;
    break-inside: avoid;
    margin-bottom: 5px;
  }

  .item img {
    width: 100%;
  }
  @media screen and (min-width: 1024px) and (max-width: 1439.98px) {
    .masonry {
      width: 96vw;
      columns: 3;
      column-gap: 20px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023.98px) {
    .masonry {
      width: 96vw;
      columns: 2;
      column-gap: 20px;
    }
  }
  @media screen and (max-width: 767.98px) {
    .masonry {
      width: 96vw;
      columns: 1;
    }
  }
`;
