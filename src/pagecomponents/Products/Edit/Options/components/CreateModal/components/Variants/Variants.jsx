import React from "react";
import styles from "./Variants.module.css";
import { Button, Form, Image, Input, InputNumber, Select, message } from "antd";
import { useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretRight,
  AiTwotoneDelete,
} from "react-icons/ai";
const Variants = ({ variants, setVariants }) => {
  const amount_types = [
    { label: "रु", value: "रु" },
    { label: "%", value: "%" },
  ];
  const [type, setType] = useState("रु");
  const onFinish = (values) => {
    const isNew = variants.filter((el) => el.name === values.name);
    if (isNew.length) {
      message.warning(`${values.name} variant already exists!`);
    } else {
      let temp = [...variants, { ...values, type: type }];
      setVariants(temp);
    }
  };
  // handle delete 
  const handleDelete=(index)=>{
    let temp= [...variants]
    temp.filter((item, i)=>{
      return index!==i
    })
    setVariants(temp)
  }
  return (
    <div className={styles.option_variants}>
      <div className={styles.variant_adder_field}>
        <Form layout="vertical" onFinish={onFinish}>
          <div className={styles.section}>
            <Form.Item name="position" label="Position">
              <InputNumber style={{ width: "70px" }} min={0} />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              style={{ minWidth: "150px" }}
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item name="modifier" label="Modifier/type">
              <InputNumber
                type="number"
                min={0}
                style={{ minWidth: "150px" }}
                addonAfter={
                  <Select
                    value={type}
                    options={amount_types}
                    onChange={(e) => setType(e)}
                  />
                }
              />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select
                value={"A"}
                options={[
                  { label: "Active", value: "A" },
                  { label: "Disabled", value: "D" },
                ]}
                style={{ minWidth: "100px" }}
              />
            </Form.Item>

            <Button htmlType="submit">Add</Button>
          </div>
        </Form>
      </div>
      <div className={styles.variant_data_holder}>
        {variants?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className={styles.section_content_holder}>
                <div className={styles.section_content}>
                  <div className={styles.section}>
                    <div className={styles.section_item}>
                      <InputNumber
                        value={item?.position}
                        style={{ width: "70px" }}
                        min={0}
                      />
                    </div>
                    <div className={styles.section_item}>
                      <Input
                        value={item?.name}
                        type="text"
                        style={{ minWidth: "150px" }}
                      />
                    </div>
                    <div className={styles.section_item}>
                      <InputNumber
                        value={item?.modifier}
                        type="number"
                        min={0}
                        style={{ minWidth: "150px" }}
                        addonAfter={
                          <Select
                            value={item?.type}
                            options={amount_types}
                            onChange={(e) => setType(e)}
                          />
                        }
                      />
                    </div>
                    <div className={styles.section_item}>
                      <Select
                        value={item?.status}
                        options={[
                          { label: "Active", value: "A" },
                          { label: "Disabled", value: "D" },
                        ]}
                        style={{ minWidth: "100px" }}
                      />
                    </div>
                  </div>
                  <div className={styles.section_action_btn}>
                    <div className={styles.section_item}>
                      <div
                        onClick={() => {
                          let temp = [...variants];
                          temp[i].more = !temp[i].more;
                          setVariants(temp);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {!item.more ? (
                          <AiOutlineCaretRight size={15} />
                        ) : (
                          <AiOutlineCaretDown size={15} />
                        )}
                      </div>
                    </div>
                    <div
                      className={styles.section_item}
                      onClick={() => handleDelete(i)}
                    >
                      <AiTwotoneDelete
                        style={{ cursor: "pointer" }}
                        color="red"
                        size={18}
                      />
                    </div>
                  </div>
                </div>
                {item?.more && (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Image height={150} width={150} />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Variants;
