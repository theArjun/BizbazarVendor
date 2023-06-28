import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./upload.module.css";
import { Upload, Modal, Form } from "antd";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImageUploaderForPromotion = ({
  message,
  setImage,
  imageList = [],
  deleteImage,
  setDeleteImage,
  logoData,
  setLogoData,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [upload, setUpload] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFileList(imageList);
  }, [imageList]);
  let insertImage = (e) => {
    let image_type = e.target.files[0].name.split(".").pop();
    if (image_type === "jpeg" || image_type === "png" || image_type === "jpg") {
      setImage(e.target.files[0]);
    }
  };
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
  const onRemove = (a) => {
    if (logoData) {
      let logo_temp = { ...logoData };
      if (logo_temp.removed_image_pair_ids[0]) {
        logo_temp.removed_image_pair_ids[1] = a.image_id;
      } else {
        logo_temp.removed_image_pair_ids[0] = a.image_id;
      }
      setLogoData(logo_temp);
    }
    if (deleteImage) {
      let delete_image = { ...deleteImage };
      delete_image.image_id = a?.image_id;
      delete_image.pair_id = a?.pair_id;
      setDeleteImage(delete_image);
    }
    setImage("");
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
    <React.Fragment key={"image"}>
      <Form>
        <Form.Item name="image" onChange={insertImage}>
          <div
            className={
              fileList?.length ? styles.close_upload : styles.open_upload
            }
          >
            <Upload
              action="#"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
              onRemove={onRemove}
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
          </div>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default ImageUploaderForPromotion;
