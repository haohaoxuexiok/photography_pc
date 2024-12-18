import React, { memo, useContext } from "react";
import { Outlet } from "react-router-dom";
import { MainContentWrapper } from "./style";

const MainContent = memo(() => {
  return (
    <MainContentWrapper>
      <Outlet />
    </MainContentWrapper>
  );
});

export default MainContent;
