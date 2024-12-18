import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  line-height: 50px;
  background-color: black;
  padding: 0 40px;
  z-index: 999;
  min-width:1000px;
  .logo img {
    width: 130px;
    height: 40px;
    margin-bottom: 8px;
    color: #fff;
  }
  .right {
    display: flex;
    .btn {
      button {
        padding: 5px 20px;
      }
    }
    .profile {
      position: relative;
      margin-right: 80px;
      .ant-dropdown-trigger {
        position: absolute;
      }
      img {
        height: 25px;
        width: 25px;
      }
    }
  }
  .explore{
    margin-right: 50px;
  }
  .center {
    display:flex;
    font: 600 18px BlinkMacSystemFont;
    color: #fff;
    cursor: pointer;
    .home{
      margin-right: 50px;
    }
    .rank{
      margin-left: 50px;
    }
  }
`;
