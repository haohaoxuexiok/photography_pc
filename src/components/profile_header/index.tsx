import React, { memo, ReactNode, useEffect } from "react";
import { Profile_header_wrapper } from "./style";

interface elementType {
  leftElement?: ReactNode;
  centerElement?: ReactNode;
  rightElement?: ReactNode;
}
type itemElementType = elementType[];

type ProfileHeaderProps = {
  leftElement?: (i?: any) => ReactNode;
  centerElement?: (i?: any) => ReactNode;
  rightElement?: (i?: any) => ReactNode;
  itemElement: itemElementType;
  type?: string;
};

const Profile_header = memo((props: ProfileHeaderProps) => {
  
  return (
    <Profile_header_wrapper>
      <div className="left">{props.itemElement[0]?.leftElement}</div>
      <div className="center">{props.itemElement[1]?.centerElement}</div>
      <div className="right">{props.itemElement[2]?.rightElement}</div>
    </Profile_header_wrapper>
  );
});

export default Profile_header;
