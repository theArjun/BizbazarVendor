import React from "react";
import styles from "./Profile.module.css";
import Spinner from "../../component/Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Result, Form } from "antd";
import { useGetProfileInformation } from "../../apis/ProfileApi";
import { useMemo } from "react";
import { useGetSellerInformation } from "../../apis/SellerApis";
import { ProfileContent } from "..";
const userInfo = JSON.parse(sessionStorage.getItem("userinfo"));
function Profile() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {
    data: profileData,
    isLoading: profileLoading,
    isError,
    error,
  } = useGetProfileInformation(userInfo.user_id);
  const { data: sellerData, isLoading: sellerLoading } =
    useGetSellerInformation();
  const countries = useMemo(() => {
    let temp = Object.entries(sellerData?.data?.countries || {}).map(
      ([value, label]) => ({
        label,
        value,
      })
    );
    return temp;
  }, [sellerData?.data]);
  // get states
  const getStates = useMemo(() => {
    return sellerData?.data?.states || {};
  }, [sellerData?.data]);
  // Lets get profile information using useMemo hook
  const vendorData = useMemo(() => {
    if (profileData?.data) {
      return profileData?.data?.data;
    }
    return {};
  }, [profileData]);

  if (profileLoading || sellerLoading) {
    return <Spinner />;
  }
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
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb_create_btn}>
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/"}> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Account setting</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={styles.profile_content}>
        <ProfileContent
          vendorData={vendorData}
          countries={countries}
          getStates={getStates}
          userInfo={userInfo}
          form={form}
        />
      </div>
    </div>
  );
}

export default Profile;
