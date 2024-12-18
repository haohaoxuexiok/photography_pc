import styled from "styled-components";

export const HomeWrapper = styled.div`
  padding: 40px 200px 80px;
  position: relative;
  min-width: 1500px;
  // .ant-tabs-tab {
  //   padding: 19px 0;
  //   font-size: 17px;
  //   font-weight: 600;
  // }
  .ant-carousel {
    min-width: 1500px;
    
  }

  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-nav-list {
    width: 100%;
    align-items: center;
    justify-content: center;
    min-width: 1500px;
   
  }
  .ant-tabs-nav-wrap {
    min-width: 1500px;
  }
  .slick-slider span {
    position: absolute;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    text-align: center;
    z-index: 999;
  }
  .showPicture {
    .anticon svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
