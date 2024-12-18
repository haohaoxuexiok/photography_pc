import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Spin } from "antd";

import { useInfiniteScroll } from "ahooks";
import { LikeOutlined, EyeOutlined } from "@ant-design/icons";

import { ExploreItem_wrapper } from "./style";

import { userWorksType } from "../../services/profile/type";
import WorkItemDetail from "../../components/work_item_detail";

import type { IColumnQueue, IRenderItem } from "./type";
import LazyLoad from "react-lazyload";

type exploreItemPropsType = {
  worksMessage?: any;
  handleClick: (work: userWorksType) => void;
  activeTab?: string;
  getWorks?: (
    type?: string,
    limit?: number,
    offset?: number
  ) => Promise<userWorksType[]>;
  isScroll?: boolean;
};

function rafThrottle(fn: (...args: any[]) => any) {
  let lock = false;
  return function (this: any, ...args: any[]) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      lock = false;
    });
  };
}

function debounce(fn: (...args: any[]) => any, delay: number = 300) {
  let timer: number | null = null;
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay) as any;
  };
}

const ExploreItem = forwardRef((props: exploreItemPropsType, ref) => {
  const {
    worksMessage,
    handleClick,
    getWorks,
    activeTab,
    isScroll = true,
  } = props;

  const jumpWorkItemDetail = async (work: userWorksType) => {
    handleClick && handleClick(work);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [list, setList] = useState<userWorksType[]>([]);
  const gap = 20;
  const column = 3;
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 10,
  });
  const [scrollState, setScrollState] = useState<{
    viewWidth: number;
    viewHeight: number;
    start: number;
  }>({ viewWidth: 0, viewHeight: 0, start: 0 });

  const [listState, setListState] = useState<{
    listMessage: IColumnQueue[];
    len: number;
  }>({
    listMessage: Array(column)
      .fill(0)
      .map(() => ({ list: [], height: 0 })),
    len: 0,
  });

  const [isInitialRender, setIsInitialRender] = useState(true);

  const [requestLength, setRequestLength] = useState<number>(10);

  useEffect(() => {
    setScrollState({
      ...scrollState,
      viewWidth: scrollRef.current!.clientWidth - 400,
      viewHeight: scrollRef.current!.clientHeight,
      start: scrollRef.current!.scrollTop,
    });

    if (isInitialRender) {
      init();
      setIsInitialRender(false);
    }

    // scrollRef.current!.addEventListener("scroll", handleScroll);
    // window.addEventListener("resize", handleResize);
  }, []);

  const init = async () => {
    // window.addEventListener("resize", handleResize);
    await getImageList();
    // // 组件卸载时移除监听器
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  };

  useEffect(() => {
    addDataStateList(requestLength);
  }, [list]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const [isAllLoaded, setIsAllLoaded] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const getImageList = async (key?: string) => {
    setLoading(true);
    if (getWorks) {
      if (key) {
        setIsAllLoaded(true);
        setPageInfo({
          page: 2,
          pageSize: 10,
        });

        const data = await getWorks(key, 10, 1);

        setList([...data] as userWorksType[]);
        setListState({
          listMessage: Array(column)
            .fill(0)
            .map(() => ({ list: [], height: 0 })),
          len: 0,
        });

        setLoading(false);

        setRequestLength(data.length);

        if (data.length === 0) {
          setIsAllLoaded(true);
        }

        return data.length;
      } else {
        if (!isAllLoaded) return;

        const data = await getWorks(
          activeTab,
          pageInfo.pageSize,
          pageInfo.page++
        );

        setTimeout(
          () => {
            if (data.length === 0) {
              setIsAllLoaded(false);
            }

            setList([...list, ...data] as userWorksType[]);

            setLoading(false);

            setRequestLength(data.length);

            return data.length;
          },
          data.length > 0 ? 1000 : 0
        );
      }
    }
  };

  useImperativeHandle(ref, () => ({
    getImageList: getImageList,
  }));

  // useEffect(()=>{
  //     getImageList()
  // },[worksMessage])

  const addDataStateList = (size: number) => {
    const queue = listState.listMessage;
    let len = listState.len;

    // if (list.length == 0 || len > list.length - 1) return;
    if (
      !queue ||
      queue.length === 0 ||
      list.length === 0 ||
      len > list.length - 1
    )
      return;

    for (let i = 0; i < size; i++) {
      const { minIndex } = computedHeight();
      const currentColumn = queue[minIndex];

      const dataItem = list[len];
      const before = currentColumn.list.at(-1) || (null as any);
      const item = calculateItemPos(before, dataItem, minIndex);

      currentColumn.list.push(item);
      currentColumn.height += item.h;
      len++;
    }

    setListState((prev) => ({
      listMessage: [...queue],
      len,
    }));
  };

  const calculateItemPos = (
    before: IRenderItem,
    dataItem: userWorksType,
    minIndex: number
  ) => {
    const renderWidth = Math.floor(
      (scrollRef.current!.clientWidth - 300 - (column - 1) * gap) / column
    );

    const renderHeight = Math.floor(
      (dataItem.image[0].style.height * renderWidth) /
        dataItem.image[0].style.width
    );

    let y = 0;
    if (before) y = before.y + before.h + gap;

    return {
      item: dataItem,
      y: y,
      h: renderHeight,
      style: {
        width: `${renderWidth}px`,
        height: `${renderHeight}px`,
        transform: `translate3d(${
          minIndex === 0 ? 0 : (renderWidth + gap) * minIndex
        }px, ${y}px, 0)`,
      },
    };
  };

  const handleResize = debounce(() => {
    setScrollState({
      viewWidth: scrollRef.current!.clientWidth - 300,
      viewHeight: scrollRef.current!.clientHeight,
      start: scrollRef.current!.scrollTop,
    });

    reComputedQueue();
  }, 500);

  // const reComputedQueue = () => {
  //   setListState((prevState) => {
  //     const updatedQueue = prevState.listMessage.map(({ list }, index) => {
  //       let height = 0;
  //       const columnList = list.reduce((total, { item }, i) => {
  //         const before = total[i - 1] || null;
  //         const itemPos = calculateItemPos(before, item, index);

  //         height += itemPos.h;
  //         total.push(itemPos);

  //         return total;
  //       }, [] as any);

  //       return {
  //         list: columnList,
  //         height,
  //       };
  //     });

  //     return {
  //       ...prevState,
  //       queue: updatedQueue,
  //     };
  //   });
  // };

  const reComputedQueue = () => {
    const updatedListMessage = listState.listMessage.map(({ list }, index) => {
      let height = 0;
      const columnList = list.reduce((total, { item }, i) => {
        const before = total[i - 1] || null;

        const itemPos = calculateItemPos(before, item, index);

        height += itemPos.h;
        total.push(itemPos);

        return total;
      }, [] as any);

      return {
        list: columnList,
        height,
      };
    });

    // 通过 setListState 更新状态
    setListState({
      ...listState, // 保留其他状态
      listMessage: updatedListMessage,
    });
  };

  const handleScroll = rafThrottle(async () => {
    const { scrollTop, clientHeight } = scrollRef.current!;
    setScrollState({
      ...scrollState,
      start: scrollTop,
    });
    //滚动到当前最小列的高度，而不是最大列的高度

    // console.log(scrollTop + clientHeight,computedHeight().minHeight);

    if (
      isAllLoaded &&
      scrollTop + clientHeight > computedHeight().minHeight
    ) {
      !loading && getImageList();
    }
  });

  const [listStyle, setListStyle] = useState<React.CSSProperties>({});

  const computedHeight = () => {
    let minHeight = Infinity;
    let minIndex = -1;
    let maxHeight = -Infinity;

    // console.log(listState.listMessage);

    listState.listMessage.forEach(({ height }, index) => {
      // console.log(height);

      if (height < minHeight) {
        minHeight = height;
        minIndex = index;
      }
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    setListStyle({ height: `${maxHeight}px` });
    return {
      minHeight,
      minIndex,
      maxHeight,
    };
  };

  const end = useMemo(
    () => scrollState.viewHeight + scrollState.start,
    [scrollState]
  );

  const cardList = useMemo(() => {
    return listState.listMessage.reduce<IRenderItem[]>(
      (pre, { list }) => pre.concat(list),
      []
    );
  }, [listState]);

  const renderList = useMemo(
    () => cardList.filter((i) => i.h + i.y > scrollState.start && i.y < end),
    [listState, end]
  );

  return (
    <ExploreItem_wrapper $isScroll={isScroll}>
      <div className="scroll_container" ref={scrollRef} onScroll={handleScroll}>
        <div className="list" style={listStyle}>
          {renderList &&
            renderList.map(({ item, style }) => {
              return (
                <div
                  className="workItem"
                  style={style}
                  key={item.id}
                  onClick={() => jumpWorkItemDetail(item)}
                >
                  {item.videoTime && (
                    <span className="videoTime">{item.videoTime}</span>
                  )}
                  
                    <img src={item.image[0].url} alt="" />
                 
                  <div className="cover">
                    <div className="content">
                      <div className="top">
                        <div className="title">{item.title}</div>
                      </div>
                      <div className="bottom">
                        <div className="b-left">
                          <div className="avatar">
                            <img src={item.avatar} alt="" />
                          </div>
                          <div className="username">{item.username}</div>
                        </div>
                        <div className="b-right">
                          <div className="likeNum">
                            <div className="like_icon">
                              <LikeOutlined />
                            </div>
                            <span>{item.likeNum}</span>
                          </div>
                          <div className="pageView">
                            <div className="pageView_icon">
                              <EyeOutlined />
                            </div>
                            <span>{item.pageView}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <WorkItemDetail />
      {loading && (
        <div className="loading">
          <Spin />
          <span style={{ color: "rgb(111 91 91)", marginLeft: "10px" }}>
            图片加载中
          </span>
        </div>
      )}
    </ExploreItem_wrapper>
  );
});

export default ExploreItem;
