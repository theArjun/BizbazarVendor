import { Result } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminPromotion, VendorPromotion } from "..";
import Spinner from "../../component/Spinner/Spinner";
import { apicall } from "../../utils/apicall/apicall";
const ExplorePromotion = () => {
  const user= JSON.parse(localStorage.getItem('userinfo'))
  const param = useParams("id");
  const [promotion, setPromotion] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageStatus, setPageStatus] = useState("");
  useEffect(() => {
    getPromotion(param.id);
  }, []);
  const getPromotion = async (id) => {
    setLoading(true);
    let result = await apicall({
      url: `Promotions?promotion_id=${id}&extend[]=get_images&expand=1`,
    });
    if (result?.data?.promotions.length==0) {
      setPageStatus(result);
    }
    if (result?.data) {
      setLoading(false);
      setPromotion(result.data?.promotions[0])
    }
    setLoading(false);
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
  if(promotion?.company_id==user.id){
    return(
      <VendorPromotion data={promotion}/>
    )
  }
  return(
    <AdminPromotion data={promotion}/>
  );
};

export default ExplorePromotion;
