import styled from "styled-components";

export const PhotographerItem_wrapper = styled.div`
  .person_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ebebeb;
    min-width: 1200px;
    .avatar {
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 30px;
      }
    }
    .left {
      display: flex;
      align-items: center;
      .fan,
      .works {
        margin-top: 20px;
        font: 15px "Open Sans";
      }
      button {
        // padding: 8px 18px;
        width:80px;
        height:40px;
        margin-top:20px;
        border: none;
        background-color: #1088f2;
        color: #fff;
        font-size: 15px;
        border-radius: 5px;
      }
      .personMessage {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .personDetail {
          display: flex;
         
        }
        .username {
          font: 18px "Open Sans";
        }
      }
    }
    .right {
      display: flex;
      width: 780px;
      img {
        width: 250px;
        height: 150px;
        object-fit: cover;
        margin-left: 10px;
      }
    }
  }
`;
