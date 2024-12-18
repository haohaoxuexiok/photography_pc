import React, { memo, useEffect, useState, useContext, useRef } from "react";
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
} from "antd";
import { PublicWork_Wrapper } from "./style";
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


type FieldType = {
  title?: string;
  description?: string;
};

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };
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


const { TextArea } = Input;
const PublicWork = memo(() => {
  const { userInfo } = useSelector(
    (state: stateType) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual
  );

  // const onPreview = async (file: UploadFile) => {
  //   let src = file.url as string;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj as RcFile);
  //       reader.onload = () => resolve(reader.result as string);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  // const onFinish = (values: any) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

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

  // const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [form] = Form.useForm<FieldType>();
  const [currentTag, setCurrentTag] = useState<string[]>([]);
  const navigate = useNavigate();
  //用户发布自己的作品
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handlePublic = async () => {
    const imageUrl = fileList.map((file) => file.response);
    // await setPicture();
    if (currentWork === null) {
      const title = form.getFieldsValue().title;
      const description = form.getFieldsValue().description;
      const workMessage = await publicWorkRequest(
        title!,
        description!,
        currentTag,
        imageUrl
      );
      //await setTagsRequest(currentTag, workMessage.id);
      navigate(`/mainContent/profile/${userInfo.id}`);

      console.log(workMessage);
      
      setTimeout(() => {
        eventBus.emit("handlePublicEvent", workMessage);
      }, 100);
    } else {
      const title = form.getFieldsValue().title;
      const description = form.getFieldsValue().description;
      const tag = currentTag;
      const imageUrl = fileList.map((file) => file.response || file.url);

      const result = await editWorkRequest({
        id: currentWork.id,
        title: title!,
        content: description!,
        tag: tag,
        user_id: currentWork.user_id,
        imageUrl: imageUrl,
      });



      navigate(`/mainContent/profile/${userInfo.id}`);
      setTimeout(() => {
        eventBus.emit("handlePublicEvent", result[0]);
      }, 100);
    }
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

  useEffect(() => {
    if (currentWork !== null) {
      form.setFieldsValue({
        title: currentWork.title,
        description: currentWork.content,
      });

      setCurrentTag(currentWork.tag);

      const pictureFile = currentWork.image.map((item: any, index: any) => {
      
        return {
          uid: index,
          name: item.url.split("/")[item.url.split("/").length - 1],
          status: "done",
          url: item.url,
        };
      });
      setFileList(pictureFile);
    }
  }, []);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };


  return (
    <PublicWork_Wrapper height={currentTag.length > 0 ? "auto" : "50px"}>
      <div className="title">发布作品</div>
      <div className="body">
        <div className="left">
          <div className="picture">
            {/* <ImgCrop rotationSlider> */}
              <Upload
                headers={{
                  authorization: `Bearer ${LocalCache.getCache("token")}`,
                }}
                name="picture"
                action="http://localhost:8000/uploadPicture"
                listType="picture-card"
                fileList={fileList}
                multiple={true}
                onChange={onChange}
                // onPreview={onPreview}
                // beforeUpload={beforeUpload}
              >
                {fileList.length < 5 && (
                  <div className="upload_icon">
                    <img
                      src={require("../../assets/images/upload.png")}
                      alt=""
                    />
                    <span>选择图片或者将图片拖至于此</span>
                  </div>
                )}
              </Upload>
            {/* </ImgCrop> */}
            {/* <Upload
              headers={{
                authorization: `Bearer ${LocalCache.getCache("token")}`,
              }}
              name="picture"
              listType="picture-card"
              // className="avatar-uploader"
              // showUploadList={false}
              action={`http://localhost:8000/uploadPicture`}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload> */}
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
    </PublicWork_Wrapper>
  );
});

export default PublicWork;
