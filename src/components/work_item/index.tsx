import React, { memo } from "react";

import { Work_item_wrapper } from "./style";
import { userWorksType } from "../../services/profile/type";

type WorItemProps = {
  works?: userWorksType[];
  handleClick?: (work: userWorksType) => void;
};

const Work_item = memo((props: WorItemProps) => {
  const { works, handleClick } = props;

  const jumpWorkItemDetail = (item: userWorksType) => {
    handleClick && handleClick(item);
  };

  return (
    <Work_item_wrapper>
      {works && works.length > 0
        ? works?.map((item) => {
            return (
              <div
                className="workItem"
                key={Math.random() as any}
                onClick={() => jumpWorkItemDetail(item)}
              >
                {item.image && item.image[0] && (
                  <img src={item.image[0].url} alt="" />
                )}
                {item.videoUrl && <span className="videoTime">{item.videoTime}</span>}
              </div>
            );
          })
        : null}
    </Work_item_wrapper>
  );
});

export default Work_item;
