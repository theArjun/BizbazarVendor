import React, { useEffect, useRef, useState } from "react";
import styles from "./Tweak.module.css";

import { Button, Form, Input, Result } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useGetTweakData, useUpdateTweak } from "../../../apis/OrdersApi";
import Spinner from "../../../component/Spinner/Spinner";
function Tweak() {
  const param = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState(
    "Accounting vendor: Invoice for order #" + param?.id
  );
  const [email, setEmail] = useState("test@test.com");
  const {
    data: tweakData,
    isLoading: tweakLoading,
    error,
    isError,
  } = useGetTweakData(param.id);
  const { mutate: updateMutate, isLoading: sendLoading } = useUpdateTweak();
  const config = {
    readonly: false,
  };
  useEffect(() => {
    setContent(tweakData?.data?.invoice || "");
  }, [tweakData]);
  const onFinish = async (values) => {
    if (subject.length < 2) {
      return;
    }
    if (email.length < 6 || !validateEmail(email)) {
      return;
    }
    let data = {
      order_id: `${param.id}`,
      invoice: {
        subject: subject,
        email: email,
        body: `${content}`,
        attach: "N",
      },
    };
    updateMutate(data, {
      onSuccess: (res) => {
        navigate("/Orders/orders details/" + param.id);
      },
    });
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  if (tweakLoading) return <Spinner />;
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
    <>
      <div className={styles.savebuttoncontainer}>
        <Button onClick={onFinish} loading={sendLoading}>
          Send invoice
        </Button>
      </div>
      <div className={styles.container}>
        <div>
          <div>Subject:</div>
          <div>
            <Input
              defaultValue={subject}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <br />
            {subject.length < 2 && (
              <div style={{ color: "red", fontSize: "10px" }}>
                * Subject is required
              </div>
            )}
          </div>
          <div>Email:</div>
          <div>
            <Input
              defaultValue={email}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            {email.length < 6 || !validateEmail(email) ? (
              <div style={{ color: "red", fontSize: "10px" }}>
                * Email is required
              </div>
            ) : null}
          </div>{" "}
          <div>Invoice:</div>
          <div>
            <JoditEditor
              style={{ width: "100%" }}
              value={content}
              config={config}
              tabIndex={1}
              onChange={(e) => setContent(e)}
              onBlur={(e) => setContent(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tweak;
