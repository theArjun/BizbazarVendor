import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Reviews.module.css";
import { AiFillStar, AiFillLike, AiFillDislike } from "react-icons/ai";
import { apicall } from "../../../utils/apicall/apicall";
import { Card, Spin, Typography, Image, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
const ReviewDetail = () => {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const param = useParams("id");
  useEffect(() => {
    getReviewData();
  }, []);
  // getting review data from API
  const getReviewData = async () => {
    setLoading(true);
    let result = await apicall({
      url: `ProductReview?product_review_id=${param.id}`,
    });
    if (result?.data) {
      setLoading(false);
      setReview(result?.data?.reviews[param.id]);
    } else {
      setLoading(false);
      setReview({});
    }
  };

  if (loading) {
    return <Spin />;
  }
  return (
    <div className={styles.review_detail}>
      <Typography.Title
        level={3}
        style={{
          margin: 0,
        }}
      >
        {`Reviews #${param.id}`}
      </Typography.Title>
      <div className={styles.main_container}>
        <Card className={styles.review_section}>
          {review ? <ReviewDescription data={review} /> : ""}

          <div className={styles.reply_section}>
            <div className={styles.reply_body}>
              <div className={styles.reply_text}> Reply:</div>
              <div className={styles.reply_box}>
                <TextArea rows={5} />
              </div>
              <div className={styles.reply_btn}>
                <Button type="primary">Add reply</Button>
              </div>
            </div>
          </div>
        </Card>
        <div className={styles.product_section}>
          {review ? <ProductDetail data={review} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;

const ProductDetail = ({ data }) => {
    const {Text}= Typography;
    console.log(data)
  return (
    <Card>
      <div className={styles.product_wrapper}>
        <div className={styles.review_status}>
          <Typography.Title
            level={4}
            style={{
              margin: 0,
            }}
          >
            {" "}
            Review status
          </Typography.Title>
          <div
            className={styles.review_status}
            style={data?.status === "A" ? { color: "green" } : { color: "red" }}
          >
            {" "}
            {data?.status === "A" ? "Approved" : "Not Approved"}
          </div>
          <div className={styles.product_details}>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
              }}
            >
              {" "}
              Product details
            </Typography.Title>
            <div className={styles.image_container}>
              <Image
               width={200}
               src={data?.product?.main_pair?.detailed?.image_path}
              />
            </div>
              <div className={styles.product_description}>
              <a href="#"><b>{data?.product?.product}</b></a>
            <Text type="secondary"> <b>{data?.product?.product_code}</b></Text>
            <div>रु{parseFloat(data?.product?.price).toFixed(2)}</div>
              </div>
          </div>
          <div className={styles.customer_info}>
          <Typography.Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          {" "}
          Customer info
        </Typography.Title>
            <div className={styles.address_and_name}>{`${data?.user_data?.name}, ${data?.user_data?.city}, ${data?.user_data?.country}`}</div>
            <div className={styles.ip_container}>IP address:  {data?.user_data?.ip_address}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
const ReviewDescription = ({ data }) => {
  // get ratings
  const getRating = (rate) => {
    switch (rate) {
      case "1":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );
      case "2":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );

      case "3":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );

      case "4":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} />
          </div>
        );
      case "5":
        return (
          <div>
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
            <AiFillStar size={18} color="#ffbd3d" />
          </div>
        );
      default:
        return (
          <div>
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
            <AiFillStar size={18} />
          </div>
        );
    }
  };
  // getting time and date
  const getTimeAndDate = (timeStamp) => {
    const date = new Date(parseInt(timeStamp * 1000));
    const monthyear = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "numeric",
    });
    return monthyear + ", " + time;
  };
  return (
    <React.Fragment>
      <Card className={styles.review_detail_container}>
        <div className={styles.ReviewItem}>
          <div>Rating:</div>&nbsp;&nbsp;{" "}
          <span>{getRating(data?.rating_value)}</span>
        </div>
        <div className={styles.ReviewItem}>
          <span>Date:</span>&nbsp;&nbsp;{" "}
          <span>{getTimeAndDate(data?.product_review_timestamp)}</span>
        </div>
        <div className={styles.ReviewItem}>
          <span>Helpfulness:</span>&nbsp;&nbsp;{" "}
          <span>
            {" "}
            <AiFillLike />{" "}
            <span style={{ color: "green" }}>
              {data?.helpfulness?.vote_up}
            </span>{" "}
            <AiFillDislike />
            <span style={{ color: "red" }}>
              {data?.helpfulness?.vote_down}
            </span>{" "}
          </span>
        </div>
        <div className={styles.ReviewItem}>
          <span>Advantages:</span>&nbsp;&nbsp;{" "}
          <span>{data?.message?.advantages}</span>
        </div>
        <div className={styles.ReviewItem}>
          <span>Disadvantages:</span>&nbsp;&nbsp;{" "}
          <span>{data?.message?.disadvantages}</span>
        </div>
        <div className={styles.ReviewItem}>
          <span>Comment:</span>&nbsp;&nbsp;{" "}
          <span>{data?.message?.comment}</span>
        </div>
        <div className={styles.ReviewItem}>
          <span>Customer photos:</span>&nbsp;&nbsp;
          <div>
            {Object.values(data?.images)?.map((el, i) => {
              return (
                <Image key={i} src={el?.detailed?.image_path} width={120} />
              );
            })}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};
