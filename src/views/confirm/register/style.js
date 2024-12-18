import styled from "styled-components";

export const RegisterWrapper = styled.div`
  position: fixed;
  top: 60px;
  bottom: 60px;
  width: 100%;
  display: flex;
  .left {
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .right {
    padding: 50px 100px;
    height: 100%;
    width: 100%;
    background-color: #fff;
    > span {
      font-size: 30px;
      font-weight: 600;
    }
    .content {
      margin-top: 4%;
      label {
        font:normal 14px "黑体";
      }
    }
    .btn {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      width: 100%;
      .ant-btn-primary {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
      &::after {
        content: "";
        width: 100%;
        height: 1px;
        background-color: #e2dcdc;
        margin: 10px 0;
      }
    }
    .login{
      display:block;
      font:normal 14px "BlinkMacSystemFont";
      text-align: center;
      a{
        color:#1677ff;
        cursor: pointer;
      }
  }
`;
