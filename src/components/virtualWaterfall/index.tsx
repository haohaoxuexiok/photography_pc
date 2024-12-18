import { memo, useRef, useState, useEffect, useMemo } from "react";

import { TestWrapper } from "./style";

import type {
  IColumnQueue,
  IDataItem,
  IItemRect,
  IRenderItem,
  IVirtualWaterFallProps,
  IImageItem,
  FsVirtualWaterfallReuqest,
} from "./type";

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

const VirtualWaterfall = memo(() => {
  const req = async (tpage: number, size: number) => {
    // 请求，并传入分页参数
    const request = await fetch(
      `https://www.vilipix.com/api/v1/picture/public?limit=${size}&sort=hot&offset=${
        --tpage * size
      }`
    );
 
    // 数据处理
    let {
      data: { rows },
    } = await request.json();

    rows = rows.map((item: any) => ({
      id: item.picture_id,
      width: item.width,
      height: item.height,
      src: item.regular_url + "?x-oss-process=image/resize,w_240/format,jpg",
    }));

    return rows;
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [list, setList] = useState<IImageItem[]>([]);
  const gap = 20;
  const column = 5;
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 30,
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

  useEffect(() => {
    setScrollState({
      ...scrollState,
      viewWidth: scrollRef.current!.clientWidth,
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
    await getImageList();
  };

  useEffect(() => {
    addDataStateList(30);
  }, [list]);

  const getImageList = async () => {
    setLoading(true);

    const data = await req(pageInfo.page++, pageInfo.pageSize);

    setList([...list, ...data] as IImageItem[]);

    setLoading(false);

    return data.length;
  };

  // useEffect(() => {
  //   // 这个 effect 会在 pageInfo 更新后执行
  //   console.log(pageInfo);
  // }, [pageInfo]);

  const addDataStateList = (size: number) => {
    const queue = listState.listMessage;
    let len = listState.len;
    for (let i = 0; i < size; i++) {
      if (list.length == 0) return;

      if (len > list.length - 1) return;

      const minIndex = computedHeight().minIndex;
      const currentColumn = queue[minIndex];
      const before = currentColumn.list[currentColumn.list.length - 1] || null;
      const dataItem = list[len];

      const item = calculateItemPos(before, dataItem, minIndex);

      currentColumn.list.push(item);
      currentColumn.height += item.h;
      len++;
    }
    setListState({ listMessage: [...queue], len });
  };

  const calculateItemPos = (
    before: IRenderItem,
    dataItem: IDataItem,
    minIndex: number
  ) => {
    const renderWidth = Math.floor(
      (scrollState.viewWidth - (column - 1) * gap) / column
    );

    const renderHeight = Math.floor(
      (dataItem.height * renderWidth) / dataItem.width
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

  const handleResize = () => {
    // scrollState.viewWidth = scrollRef.current!.clientWidth;
    // scrollState.viewHeight = scrollRef.current!.clientHeight;
    // scrollState.start = scrollRef.current!.scrollTop;
    setScrollState({
      viewWidth: scrollRef.current!.clientWidth,
      viewHeight: scrollRef.current!.clientHeight,
      start: scrollRef.current!.scrollTop,
    });

    reComputedQueue();
  };

  const reComputedQueue = () => {
    listState.listMessage = listState.listMessage.map(({ list }, index) => {
      let height = 0;
      const columnList = list.reduce((total, { item }, i) => {
        let before = total[i - 1] || null;

        let itemPos = calculateItemPos(before, item, index);

        height += itemPos.h;
        total.push(itemPos);

        return total;
      }, [] as any);

      return {
        list: columnList,
        height,
      };
    });
  };

  const handleScroll = rafThrottle(async () => {
    const { scrollTop, clientHeight } = scrollRef.current!;
    setScrollState({
      ...scrollState,
      start: scrollTop,
    });
    //滚动到当前最小列的高度，而不是最大列的高度

    if (scrollTop + clientHeight > computedHeight().minHeight) {
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

  // const [end, setEnd] = useState<number>();

  const end = useMemo(
    () => scrollState.viewHeight + scrollState.start,
    [scrollState]
  );

  const cardList = useMemo(
    () =>
      listState.listMessage.reduce<IRenderItem[]>(
        (pre, { list }) => pre.concat(list),
        []
      ),
    [listState]
  );

  const renderList = useMemo(
    () => cardList.filter((i) => i.h + i.y > scrollState.start && i.y < end),
    [listState, end]
  );

  return (
    <TestWrapper>
      <div
        className="container"
        style={{ height: "520px", width: "500px", marginTop: "100px" }}
      >
        <div
          className="scroll_container"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          <div className="list" style={listStyle}>
            {renderList.map(({ item, style }, index) => {
              return (
                <div className="item" style={style} key={item.id} >
                  <img src={item.src} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TestWrapper>
  );
});

export default VirtualWaterfall;
