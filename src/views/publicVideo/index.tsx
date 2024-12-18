import React, {
  memo,
  useEffect,
  useState,
  useContext,
  useRef,
  useMemo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import {
  Upload,
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Tag,
  message,
  Progress,
} from "antd";
import { PublicVideo_Wrapper } from "./style";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useSelector, shallowEqual } from "react-redux";
import type { UploadChangeParam } from "antd/es/upload";
import {
  LoadingOutlined,
  PlusOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import {
  getTagRequest,
  setPicture,
  publicWorkRequest,
  setTagsRequest,
  editWorkRequest,
} from "../../services/publicWork";

import LocalCache from "../../utils/localStorage";
import { eventBus } from "../../utils/eventBus";
import axios from "axios";
import localCache from "../../utils/localStorage";

type FieldType = {
  title?: string;
  description?: string;
};

type userInfo = {
  id: number;
  name: string;
  avatar: string;
  liked_total: number;
  attention_users_total: number;
};

type stateType = {
  user: { userInfo: userInfo };
};

const SIZE = 20 * 1024 * 1024;

const { TextArea } = Input;
const PublicWork = memo(() => {
  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  const [tags, setTags] = useState<string[]>();
  const getTag = async () => {
    const tags = await getTagRequest();
    setTags(tags);
  };
  useEffect(() => {
    getTag();
  }, []);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const location = useLocation();
  const currentWork = location.state;

  const [form] = Form.useForm<FieldType>();
  const [currentTag, setCurrentTag] = useState<string[]>([]);
  const navigate = useNavigate();
  //用户发布自己的作品

  const [fileChunkList, setFileChunkList] = useState<
    {
      name: string;
      chunk: Blob;
      hash: string;
      percentage: number;
    }[]
  >();
  const handlePublic = async () => {
    const imageUrl = fileList[currentImgId!][0].response
    
    const title = form.getFieldsValue().title;
    const description = form.getFieldsValue().description;
    const workMessage = await publicWorkRequest(
      title!,
      description!,
      currentTag,
      imageUrl,
      'video',
      videoUrl
    );
    
    navigate(`/mainContent/profile/${userInfo.id}`);

    setTimeout(() => {
      eventBus.emit("handlePublicEvent", workMessage);
    }, 100);
    // console.log(title,description,currentTag,imageUrl);
    
    // const fileChunkList = await createFileChunk(videoList[0]);
    // const d_fileChunkList = fileChunkList.map((file, index) => {
    //   return {
    //     name: file.name,
    //     chunk: file.file,
    //     hash: file.name + "-" + index,
    //     percentage: 0,
    //   };
    // });
    // setFileChunkList(d_fileChunkList);
    // // checkMergeProgress(fileChunkList[0].name);
    // await uploadChunks(d_fileChunkList);
  };

  const [videoUrl,setVideoUrl]=useState<string>()
  const mergeRequest = async (
    fileChunkList: {
      chunk: Blob;
      hash: string;
      name: string;
    }[]
  ) => {
    const token = localCache.getCache("token");
    const response = await axios({
      method: "post",
      url: "http://localhost:8000/mergeChunk",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        filename: fileChunkList[0].name,
      },
    }).then((res) => {
      setVideoUrl(res.data)
    });
  };

  const uploadChunks = async (
    fileChunkList: {
      chunk: Blob;
      hash: string;
      name: string;
      percentage: number;
    }[]
  ) => {
    const request = fileChunkList.map(
      async ({ chunk, hash, name, percentage }, index) => {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("filename", name);

        const token = localCache.getCache("token");

        // 上传当前切片
        return axios({
          method: "post",
          url: "http://localhost:8000/uploadVideo",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent: any) => {
            // console.log(progressEvent);

            const uploadPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setFileChunkList((prevChunkList) =>
              prevChunkList?.map((item) => {
                if (item.hash === hash) {
                  return { ...item, percentage: uploadPercent };
                }
                return item;
              })
            );
          },
        }).then((res) => {
          // console.log(res.data);
        });
      }
    );

    await Promise.all(request);
    mergeRequest(fileChunkList);
  };

  // const [messageApi, contextHolder] = message.useMessage();
  const progress = useMemo(() => {
    if (!fileChunkList) return 0;
    const sliceProgress = fileChunkList.map((item) => item.percentage);

    if (sliceProgress.length <= 0) return 0;

    const totalProgress = sliceProgress.reduce(
      (acc: number, cur: number) => acc + cur,
      0
    );

    return Math.round(totalProgress / sliceProgress.length);
  }, [fileChunkList]);

  useEffect(() => {
    if (progress == 100) {
      message.info({
        type: "success",
        content: "文件上传完成！",
      });
    }
  }, [progress]);

  // const uploadChunks = async (
  //   fileChunkList: { chunk: Blob; hash: string; name: string,percentage: number }[],
  //   maxConcurrent = 5 // 控制最大并发数
  // ) => {
  //   const totalChunks = fileChunkList.length;
  //   let index = 0; // 当前处理的切片索引
  //   const result:any = [];

  //   // 递归上传每个切片
  //   const uploadOneChunk = async () => {

  //     // 如果还有切片需要上传，继续上传
  //     if (index < totalChunks) {
  //       const { chunk, hash, name } = fileChunkList[index++];
  //       const formData = new FormData();
  //       formData.append("chunk", chunk);
  //       formData.append("hash", hash);
  //       formData.append("filename", name);

  //       const token = localCache.getCache("token");

  //       // 上传当前切片
  //       const uploadPromise = axios({
  //         method: "post",
  //         url: "http://localhost:8000/uploadVideo",
  //         data: formData,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         onUploadProgress:(progressEvent: any) => {
  //           // console.log(progressEvent);

  //           const uploadPercent = Math.round(
  //             (progressEvent.loaded * 100) / progressEvent.total
  //           );

  //           const newFileChunkList = fileChunkList.map((item) => {
  //             if (item.hash === hash) {
  //               return {
  //                 ...item,
  //                 percentage: uploadPercent,
  //               };
  //             }
  //             return item;
  //           })
  //           setFileChunkList(newFileChunkList);

  //         },
  //       }).then((res) => {
  //         console.log(res.data);
  //       });

  //       result.push(uploadPromise);

  //       // 限制并发数，最大同时上传 maxConcurrent 个切片
  //       if (result.length >= maxConcurrent) {
  //         await Promise.race(result); // 等待最先完成的请求
  //       }

  //       // 递归上传下一个切片
  //       await uploadOneChunk();
  //     }
  //   };

  //   // 开始上传
  //   await uploadOneChunk();

  //   // 等待所有上传完成
  //   await Promise.all(result);
  //   console.log("所有文件切片上传完成");

  //   // 上传完成后合并切片
  //   mergeRequest(fileChunkList);
  // };

  // useEffect(() => {
  //   console.log(fileChunkList);
  // }, [fileChunkList]);

  // const [progress, setProgress] = useState(0);
  // const checkMergeProgress = (filename: string) => {
  //   const timer = setInterval(async () => {
  //     const response = await axios.get("http://localhost:8000/mergeProgress", {
  //       params: { filename },
  //     });

  //     if (response.status === 200) {
  //       const { progress } = response.data;
  //       setProgress(progress);

  //       if (progress >= 100) {
  //         clearInterval(timer);
  //         console.log("合并完成");
  //       }
  //     }
  //   }, 1000); // 每500ms查询一次
  // };

  const createFileChunk = async (file: File, size: number = SIZE) => {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({
        file: file.slice(cur, cur + size),
        name: file.name,
      });
      cur += size;
    }

    return fileChunkList;
  };

  const addTag = async (tag?: string) => {
    let tags = [...currentTag!, tag!];
    const uniqueArr = tags.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    setCurrentTag(uniqueArr);
  };
  const handleDeleteTag = (tag: string) => {
    let tags = [...currentTag!];
    let result = tags.filter((item) => item !== tag);
    setCurrentTag(result);
  };

  const [isCreateTag, setIsCreateTag] = useState<boolean>(false);
  const handelCreateTag = () => {
    setIsCreateTag(true);
  };

  const [inputValue, setInputValue] = useState("");
  const handlePressEnter = () => {
    let tags = [...currentTag!];
    tags.push(inputValue);
    setCurrentTag(tags);
    setInputValue("");
    setIsCreateTag(false);
  };

  // useEffect(() => {
  //   if (currentWork !== null) {
  //     form.setFieldsValue({
  //       title: currentWork.title,
  //       description: currentWork.content,
  //     });

  //     setCurrentTag(currentWork.tag);
  //     const pictureFile = currentWork.image.map((item: any, index: any) => {
  //       return {
  //         uid: index,
  //         name: item.url.split("/")[item.url.split("/").length - 1],
  //         status: "done",
  //         url: item.url,
  //       };
  //     });
  //     setFileList(pictureFile);
  //   }
  // }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // 手动触发 input 的点击事件
    }
  };

  const [videoList, setVideoList] = useState<(File & { uid?: string })[]>([]);
  const [isShowUpload, setIsShowUpload] = useState<Record<string, boolean>>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    setIsShowUpload((prev) => ({
      ...prev,
      [files![0].lastModified]: true, // 更新对应视频的封面文件列表
    }));
    if (files && files.length > 0) {
      setVideoList([...videoList, ...Array.from(files)]);

      const fileChunkList = await createFileChunk([...Array.from(files)][0]);
      const d_fileChunkList = fileChunkList.map((file, index) => {
        return {
          name: file.name,
          chunk: file.file,
          hash: file.name + "-" + index,
          percentage: 0,
        };
      });
      setFileChunkList(d_fileChunkList);
      // checkMergeProgress(fileChunkList[0].name);
      const result = await uploadChunks(d_fileChunkList);
    }

    // console.log(files&&[...Array.from(files)][0]);

    // const fileChunkList = await createFileChunk(videoList[0]);
    // const d_fileChunkList = fileChunkList.map((file, index) => {
    //   return {
    //     name: file.name,
    //     chunk: file.file,
    //     hash: file.name + "-" + index,
    //     percentage: 0,
    //   };
    // });
    // setFileChunkList(d_fileChunkList);
    // // checkMergeProgress(fileChunkList[0].name);
    // await uploadChunks(d_fileChunkList);
  };

  const [fileList, setFileList] = useState<Record<number, UploadFile[]>>({});
  const [currentImgId,setCurrentImgId] = useState<number>()

  const onChange = (e: UploadChangeParam<UploadFile<any>>, id: number) => {
    setCurrentImgId(id)
    setFileList((prev) => ({
      ...prev,
      [id]: e.fileList, // 更新对应视频的封面文件列表
    }));
    if (e.file.status !== "removed") {
      setIsShowUpload((prev) => ({
        ...prev,
        [id]: false, // 更新对应视频的封面文件列表
      }));
    }
  };

  return (
    <PublicVideo_Wrapper
      height={currentTag.length > 0 ? "auto" : "50px"}
      borderSolid={!isShowUpload ? "1px dashed #ccc" : "1px solid #ccc"}
    >
      <div className="title">发布作品</div>
      <div className="body">
        <div className="left">
          <div className="picture">
            {videoList.map((video) => {
              return (
                <div key={video.lastModified}>
                  <div className="upload_icon">
                    {progress !== 100 && (
                      <div className="progress">
                        <Progress type="circle" percent={progress} />
                      </div>
                    )}
                    {progress == 100 && (
                      <>
                        {isShowUpload![video.lastModified] && (
                          <img
                            src={require("../../assets/images/no_picture.png")}
                            alt=""
                            onClick={handleClick}
                          />
                        )}
                        <div className="picture">
                          <Upload
                            headers={{
                              authorization: `Bearer ${LocalCache.getCache(
                                "token"
                              )}`,
                            }}
                            name="picture"
                            action="http://localhost:8000/uploadPicture"
                            listType="picture-card"
                            fileList={fileList[video.lastModified]}
                            onChange={(info) =>
                              onChange(info, video.lastModified)
                            }
                            onRemove={() => {
                              setIsShowUpload((prev) => ({
                                ...prev,
                                [video.lastModified]: true,
                              }));
                            }}
                            // fileList&&fileList[video.lastModified].length
                          >
                            {isShowUpload![video.lastModified] && (
                              <div className="selectMainPicture">
                                <span style={{ color: "white" }}>选择封面</span>
                              </div>
                            )}
                          </Upload>
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }} // 隐藏原生按钮
                  />
                </div>
              );
            })}
            {fileList && videoList.length <= 5 && (
              <>
                <div className="upload_icon" onClick={handleClick}>
                  <img src={require("../../assets/images/video.png")} alt="" />
                  <span>选择视频或者将视频拖至于此</span>
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }} // 隐藏原生按钮
                />
              </>
            )}
            {/* {fileList&&fileList.length<=0&& (
              <>
                <div className="upload_icon" onClick={handleClick}>
                  <img src={require("../../assets/images/video.png")} alt="" />
                  <span>选择视频或者将视频拖至于此</span>
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }} // 隐藏原生按钮
                />
              </>
            )} */}
          </div>
        </div>
        <div className="right">
          <Form
            name="basic"
            form={form}
            // labelCol={{ span: 15 }}
            layout="vertical"
            // wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
          >
            <Form.Item<FieldType>
              label="标题"
              name="title"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="描述" name="description">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
          <div className="selectedTag">
            {currentTag &&
              currentTag.map((tag) => {
                return (
                  <Tag key={tag} color="blue">
                    {tag}
                    <CloseOutlined onClick={() => handleDeleteTag(tag)} />
                  </Tag>
                );
              })}
          </div>
          <div className="tags">
            {tags &&
              tags.map((tag) => {
                return (
                  <div className="tag" key={tag} onClick={() => addTag(tag)}>
                    <Space size={[0, 8]} wrap>
                      <Tag>{tag}</Tag>
                    </Space>
                  </div>
                );
              })}
          </div>
          <div className="createTag" onClick={() => handelCreateTag()}>
            {isCreateTag ? (
              <Input
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={() => handlePressEnter()}
              />
            ) : (
              <>
                <span>添加标签</span>
                <PlusOutlined />
              </>
            )}
          </div>
          <div className="public_btn">
            <Button type="primary" onClick={() => handlePublic()}>
              发布
            </Button>
          </div>
        </div>
      </div>
    </PublicVideo_Wrapper>
  );
});

export default PublicWork;
