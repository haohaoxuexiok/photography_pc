import styled from "styled-components";

type PublicWork_Wrapper_Type = {
  height?: string;
};

export const PublicWork_Wrapper = styled.div<PublicWork_Wrapper_Type>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 0 100px;
  input{
    padding:0 4px;
  }
  textarea{
    padding: 2px 4px;
  } 
  .title {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    padding: 0 100px;
  }
  .body {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    padding-top: 70px;
    .left {
      width: 1350px;
      background-color: #fff;
      padding: 20px;
      .picture {
        .upload_icon{
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font:normal 15px "BlinkMacSystemFont";
          color:#717171;
          img{
            width:200px;
            height:200px;
          }
        }
        .ant-upload{
          display: flex;
        }
        background-color: #fff;
        .ant-upload-wrapper {
          height: 100%;
        }
        .ant-upload-list {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
        }
        .ant-upload-list-item-container {
          height: 300px;
          width: 300px;
        }
        .ant-upload {
          height: 300px;
          width: 300px;
        }
      }
    }
    .right {
      height: 500px;
      padding: 20px;
      margin-left: 10px;
      width: 550px;
      height: 100%;
      background-color: #fff;
      .public_btn {
        margin-top: 10px;
        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 20px 50px;
        }
      }
      label {
        font: normal 15px "BlinkMacSystemFont";
      }
      input {
        height: 40px;
      }
      .ant-form-item-label {
        padding: 0;
      }
      .ant-form-item {
        margin-bottom: 10px;
      }
      .selectedTag{
        padding 50px;
        // height: ${(props) => props.height};
        border-right:1px solid #d9d9d9;
        border-top:1px solid #d9d9d9;
        border-left:1px solid #d9d9d9;
        span{
          padding:0 2px;
          margin:10px;
        }
        .ant-tag{
          padding:0 5px;
        }
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        border: 1px solid #d9d9d9;
        .tag {
          cursor: pointer;
          margin: 8px;
          span {
            padding: 5px;
            color: #717171;
            font-size: 14px;
          }
          .ant-tag {
            border: 0;
            background-color: #f3f3f3;
          }
        }
      }
      .createTag{
        display:flex;
        justify-content: center;
        padding:15px;
        border-right:1px solid #d9d9d9;
        border-bottom:1px solid #d9d9d9;
        border-left:1px solid #d9d9d9;
        cursor: pointer;
        span{
        display:flex;
        color: #717171;
        }
      
      }
    }
  }
`;
