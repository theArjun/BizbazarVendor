import { Result } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminPromotion, VendorPromotion } from "..";
import Spinner from "../../component/Spinner/Spinner";
import { apicall } from "../../utils/apicall/apicall";
const ExplorePromotion = () => {
  const user = JSON.parse(localStorage.getItem("userinfo"));
  const param = useParams("id");
  const [promotion, setPromotion] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageStatus, setPageStatus] = useState("");
  const [renderCount, setRenderCount] = useState(1);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getPromotion(param.id);
  };
  const getPromotion = async (id) => {
    try {
      setLoading(true);
      let result = await apicall({
        url: `Promotions?promotion_id=${id}&extend[]=get_images&expand=1`,
      });
      if (result?.data) {
        setPromotion(result?.data?.promotions[0]);
        setLoading(false);
        if (result?.data?.promotions.length == 0) {
          setPageStatus(result);
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      message.error("something went wrong, ", e.message);
    }
  };
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
  if (loading) {
    return <Spinner />;
  }
  if (promotion?.company_id == user.id) {
    return (
      promotion?<VendorPromotion
        data={promotion}
        loading={loading}
        setLoading={setLoading}
        getData={getData}
        renderCount={renderCount}
        setRenderCount={setRenderCount}
      />:<Spinner/>
    );
  }else{

    return <AdminPromotion data={promotion} />;
  }
};

export default ExplorePromotion;
