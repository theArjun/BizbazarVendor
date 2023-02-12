import React, { useState, useEffect } from "react";
import { apicall } from "../../utils/apicall/apicall";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal } from "antd";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const ImageUploaderForEdit = ({
  message,
  uploadedImage,
  setUploadedImage,
  imageCount,
  Form,
  setImageCount,
  imageList,
  finalImages,
  setFinalImages
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [upload, setUpload] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(imageList ? [...imageList] : []);

  useEffect(()=>{
    setFinalImages(imageList)
    let temp={...uploadedImage}
    setImageCount(imageList?.length+1)
    imageList?.map((el,i)=>{
        temp.removed_image_pair_ids[i]=''
       if(i===0){
        temp.product_main_image_data[el?.pair_id]={
            "detailed_alt": "",
            "type": "M",
            "object_id": el.uid,
            "pair_id": el.pair_id,
            "position": i,
            "is_new": "N"
        }
       }else{
        temp.product_additional_image_data[el?.pair_id]={
            "detailed_alt": "",
            "type": "A",
            "object_id": el.uid,
            "pair_id": el.pair_id,
            "position": i,
            "is_new": "N"
        }
       }
    })
    setUploadedImage(temp);
    
  },[])
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
          setImageCount((current) => current + 1);
          setUploadedImage({
            ...uploadedImage,
            product_main_image_data: {
              0: {
                detailed_alt: "",
                type: "M",
                object_id: e.target.files[0].uid,
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
          setImageCount((current) => current + 1);
          temp.product_add_additional_image_data[imageCount] = {
            detailed_alt: "",
            type: "A",
            object_id: e.target.files[0].uid,
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
    let temp_upload_data = { ...uploadedImage };
    let temp_final_image=[...finalImages]
    // set final image List
    if(temp_final_image.length){
        temp_upload_data.removed_image_pair_ids[a.uid]=a.pair_id
        let remove_images= temp_final_image.filter((el, i)=> el.uid!==a.uid)
        setFinalImages(remove_images)
    }
    if (a.uid === temp_upload_data.product_main_image_data["0"]?.object_id) {
      if (temp_upload_data.product_add_additional_image_data["1"]) {
        Object.values(temp_upload_data.product_add_additional_image_data).map(
          (el, i) => {
            if (i === 0) {
              temp_upload_data.type_product_main_image_detailed["0"] =
                uploadedImage.type_product_add_additional_image_detailed["1"];
              temp_upload_data.file_product_main_image_detailed["0"] =
                uploadedImage.file_product_add_additional_image_detailed["1"];
              temp_upload_data.product_main_image_data["0"] = {
                ...uploadedImage.product_add_additional_image_data["1"],
                type: "M",
              };
              temp_upload_data.type_product_add_additional_image_detailed = {};
              temp_upload_data.product_add_additional_image_data = {};
              temp_upload_data.file_product_add_additional_image_detailed = {};
            } else {
              temp_upload_data.type_product_add_additional_image_detailed[i] =
                uploadedImage.type_product_add_additional_image_detailed[i + 1];
              temp_upload_data.product_add_additional_image_data[i] =
                uploadedImage.product_add_additional_image_data[i + 1];
              temp_upload_data.file_product_add_additional_image_detailed[i] =
                uploadedImage.file_product_add_additional_image_detailed[i + 1];
            }
          }
        );
      } else {
        temp_upload_data.type_product_main_image_detailed = {};
        temp_upload_data.file_product_main_image_detailed = {};
        temp_upload_data.product_main_image_data = {};
        setImageCount(0)
      }
    } else {
      let index = 0;
      Object.values(temp_upload_data.product_add_additional_image_data).map(
        (el, i) => {
          if (a.uid === el.object_id) {
            index = index + i + 1;
            if (
              Object.values(temp_upload_data.product_add_additional_image_data)
                .length == 1
            ) {
              temp_upload_data.type_product_add_additional_image_detailed = {};
              temp_upload_data.product_add_additional_image_data = {};
              temp_upload_data.file_product_add_additional_image_detailed = {};
            } else {
              delete temp_upload_data
                .type_product_add_additional_image_detailed[i + 1];
              delete temp_upload_data.product_add_additional_image_data[i + 1];
              delete temp_upload_data
                .file_product_add_additional_image_detailed[i + 1];
            }
          }
          if (index !== 0 && i + 1 > index) {
            temp_upload_data.type_product_add_additional_image_detailed[i] =
              uploadedImage.type_product_add_additional_image_detailed[i + 1];
            temp_upload_data.product_add_additional_image_data[i] =
              uploadedImage.product_add_additional_image_data[i + 1];
            temp_upload_data.file_product_add_additional_image_detailed[i] =
              uploadedImage.file_product_add_additional_image_detailed[i + 1];
            delete temp_upload_data.type_product_add_additional_image_detailed[
              i + 1
            ];
            delete temp_upload_data.product_add_additional_image_data[i + 1];
            delete temp_upload_data.file_product_add_additional_image_detailed[
              i + 1
            ];
          }
        }
      );
    }

    setUploadedImage(temp_upload_data);
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
        <div>
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
    </React.Fragment>
  );
};

export default ImageUploaderForEdit;
