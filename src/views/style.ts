import styled from "styled-components";

export const TestWrapper = styled.div`
  .scroll_container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .list {
    position: relative;
    width: 100%;
  }
  .item {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
  
  }
  img {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    animation: identifier 0.25s;
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
`;
