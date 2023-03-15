import React, { useEffect, useRef, useState } from "react";
import styles from "./Tweak.module.css";

import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { apicall } from "../../../utils/apicall/apicall";

function Tweak() {
  const param = useParams();
  const navigate = useNavigate();

  const editor = useRef(null);
  const [content, setContent] = useState();
  const [subject, setSubject] = useState(
    "Accounting vendor: Invoice for order #" + param?.id
  );
  const [email, setEmail] = useState("test@test.com");

  const config = {
    readonly: false,
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await apicall({
      url: "/VendorOrder/" + param.id + "?tweak_send_invoice=1",
    });
    if (result.status == 200) {
      setContent(result?.data?.invoice);
    }
  };

  const sendInvoice = async () => {
    console.log(result);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = async (values) => {
    if (subject.length < 2) {
      return;
    }
    if (email.length < 6 || !validateEmail(email)) {
      return;
    }
    const result = await apicall({
      method: "post",
      url: "VendorOrder/",
      data: {
        order_id: `${param.id}`,
        invoice: {
          subject: subject,
          email: email,
          body: `${content}`,
          attach: "N",
        },
      },
    });
    if (result.status == 200) {
      navigate("/Orders/orders details/" + param.id);
    }
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      <div className={styles.savebuttoncontainer}>
        <Button onClick={onFinish}>Send</Button>
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
          <div  >
            <JoditEditor
           style={{width:"100%"}}
              // ref={editor}
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
