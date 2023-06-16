import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminPromotion, VendorPromotion } from "..";
import Spinner from "../../component/Spinner/Spinner";
import { useGetPromotionById } from "../../apis/PromotionApi";
const ExplorePromotion = () => {
  const user = JSON.parse(sessionStorage.getItem("userinfo"));
  const param = useParams("id");
  const [promotion, setPromotion] = useState("");
  const [pageStatus, setPageStatus] = useState("");
  const { isLoading, isError, error, data } = useGetPromotionById(param.id);
  useEffect(() => {
    getPromotion();
  }, [data]);
  const getPromotion = async () => {
    try {
      if (data?.data?.promotions.length == 0) {
        setPageStatus(data?.status);
      }
      setPromotion(data?.data?.promotions[0]);
    } catch (e) {
      console.log("something went wrong, ", e);
    }
  };
  if (isError) {
    return (
      <Result
        status={error?.response?.status}
        title={error?.response?.status}
        subTitle={error?.message}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    );
  }
  // for page not found
  if (pageStatus) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, Requested promotion does not found !"
        extra={<a href="/">Back Home</a>}
      />
    );
  }
  // for page loading
  if (isLoading) {
    return <Spinner />;
  }
  if (promotion?.company_id == user.id) {
    return <VendorPromotion data={promotion} id={param.id} />;
  } else {
    return (
      <AdminPromotion data={promotion} loading={isLoading} id={param.id} />
    );
  }
};

export default ExplorePromotion;
