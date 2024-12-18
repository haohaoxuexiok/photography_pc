import styled from "styled-components";

type PublicVideo_Wrapper_Type = {
  height: string;
  borderSolid: string;
};

export const PublicVideo_Wrapper = styled.div.withConfig({
  // 使用 shouldForwardProp 过滤掉自定义属性
  shouldForwardProp: (prop) => !['borderSolid', 'height'].includes(prop),
})<PublicVideo_Wrapper_Type>`
.ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select,
.ant-upload-wrapper.ant-upload-picture-circle-wrapper .ant-upload.ant-upload-select {
  border:0;
  height:35px;
  background-color:#5cc3ff
}
// .ant-upload-list-item{
//   position:absolute;
//   left:0;
//   bottom:0;
//   top:0;
//   height:200px;
//   width:200px;
// }
// ant-upload-list-item-image{
//   height:100%;
//   width:100%;
// }

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
    padding-top: 60px;
    .left {
      width: 1350px;
      background-color: #fff;
      padding: 20px;
      .picture {
        display: flex;
        flex-wrap: wrap;
        // align-items: flex-start;
        justify-content: flex-start;
        border-radius: 8px;
        padding: 20px;
        cursor: pointer;
        transition: background-color 0.3s;
        .ant-upload-list-item{
            border:none;
        }
        .ant-upload-list-item-thumbnail{
          padding:10px
        }
        .ant-upload-list-item-container{
          position:absolute;
          left:0;
          top:0;
          width: 100%;
          height: 100%;
          border:none;
          .ant-upload-list-item-image{
            width:100%;
            height:100%;
          }
        }
        .upload_icon{
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 35px;
            width:300px;
            height: 300px;
            border-radius: 8px;
            margin:0 20px 20px 0;
            border:  ${(props) => props.borderSolid};
          >span{
            padding: 10px;
            margin-top: 10px;
            color: #717171
          }
          >img{
            width:160px;
            height:160px;
          }
          .progress{
              position: absolute;
              left:0;
              top:0;
              width:100%;
              height:100%;
              display: flex;
              justify-content: center;
              align-items: center;
              >span{
                color:#fff;
              }
            }
          }
        }
        background-color: #fff;
        .ant-upload-wrapper {
          height: 100%;
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
        height: ${(props) => props.height};
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
