import React,{useState, useEffect} from "react";
import { apicall } from "../../utils/apicall/apicall";
import { PlusOutlined } from "@ant-design/icons";
import {
    Upload,
    Modal,
  } from "antd";
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImageUploader = ({
  message,
  uploadedImage,
  setUploadedImage,
  imageCount,
  Form,
  setImageCount,
  imageList
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [upload, setUpload] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(imageList?[...imageList]:[]);
  let insertImage = async (e) => {
    let image_type = e.target.files[0].name.split(".").pop();
    if (image_type === "jpeg" || image_type === "png" || image_type === "jpg") {
      let formData = new FormData();
      await formData.append("file[]", e.target.files[0]);
      let result = await apicall({
        method: "post",
        url: "ImageUploads",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": true,
        },
      });
      if (result?.status == 201) {
        if (imageCount <= 0) {
            setImageCount((current)=>current+1)
          setUploadedImage({
            ...uploadedImage,
            product_main_image_data: {
              0: {
                detailed_alt: "",
                type: "M",
                object_id: "1",
                position: "0",
                is_new: "Y",
              },
            },
            type_product_main_image_detailed: { 0: "uploaded" },
            file_product_main_image_detailed: {
              0: result?.data?.path,
            },
          });
        } else {
          let temp = { ...uploadedImage };
          setImageCount((current)=>current+1)
          temp.product_add_additional_image_data[imageCount] = {
            detailed_alt: "",
            type: "A",
            object_id: "1",
            position: String(imageCount),
            is_new: "Y",
          };
          temp.type_product_add_additional_image_detailed[imageCount] =
            "uploaded";
          temp.file_product_add_additional_image_detailed[imageCount] =
            result?.data?.path;
          setUploadedImage({ ...temp });
        }
      }
    }
  };
  useEffect(()=>{
console.log(fileList)
  },[fileList])
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    if (upload) {
      setFileList(newFileList);
    }
  };
  const beforeUpload = (file) => {
    let file_type = file.name.split(".").pop();
    const isJpgOrPng =
      file_type === "jpeg" || file_type === "png" || file_type === "jpg";
    if (!isJpgOrPng) {
      setUpload(false);
      message.error("You can only upload JPG/PNG file!");
    } else {
      setUpload(true);
    }
    return false;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <Form.Item
        label="Images"
        name="image"
        style={{ width: "100%" }}
        onChange={insertImage}
      >
        <Upload
          action="#"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Form.Item>
    </React.Fragment>
  );
};

export default ImageUploader;
