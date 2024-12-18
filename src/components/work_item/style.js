import styled from "styled-components";

export const Work_item_wrapper = styled.div`
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
  .workItem {
    position: relative;
    box-sizing: border-box;
    border-radius: 3px;
    width: 31.33%;
    height: 250px;
    margin: 10px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 10px;
      background-color: #fff;
      border: 1px solid #f6f2f2;
      flex-shrink: 0;
      // transform: scale(0.9);
      object-fit: cover;
      image-rendering: auto;
    }
    span {
      position: absolute;
      top: 18px;
      right: 18px;
      background-color: #555353;
      border-radius: 5px;
      padding: 5px 8px;
      color: #fff;
      font-size: 12px;
    }
  }
`;
