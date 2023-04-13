import React, { useEffect, useState } from "react";
import { ReviewSearch, ReviewTable } from "../..";
import styles from "./Reviews.module.css";
import { Breadcrumb } from "antd";
import { apicall } from "../../../utils/apicall/apicall";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  name: "",
  rating: "",
  message: "",
  has_images: "",
};
const Reviews = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [sValue, setSearchValue] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const a = Object.values(sValue).join("");
  useEffect(() => {
    getReviews();
  }, []);
  // getReviews
  const getReviews = async (values) => {
    setLoading(true);
    let result = await apicall({
      url: getUrl(values),
    });
    if (result?.data) {
      setLoading(false);
      setReviews(
        Object.values(result.data.reviews).map((el, i) => ({ ...el, key: i }))
      );
    } else {
      setLoading(false);
    }
  };
  const getUrl = (values) => {
    let newUrl = "ProductReview?";
    if (values?.customer) {
      newUrl = newUrl + "name=" + values.customer;
    }
    if (values?.rating) {
      newUrl = newUrl + "&rating=" + values.rating;
    }
    if (values?.message) {
      newUrl = newUrl + "&message=" + values.message;
    }
    if (values?.photo) {
      newUrl = newUrl + "&has_images=" + values.photo;
    }
    return newUrl;
  };
  // debounce  search
  useDebounce(
    () => {
      getReviews(sValue);
    },
    500,
    [a]
  );
  return (
    <div className={styles.container}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Products</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Reviews</Breadcrumb.Item>
      </Breadcrumb>
      <ReviewSearch
        setSearchValue={setSearchValue}
        params={params}
        setParams={setParams}
      />
      <ReviewTable loading={loading} reviews={reviews} />
    </div>
  );
};

export default Reviews;
