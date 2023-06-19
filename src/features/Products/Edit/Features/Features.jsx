import React, { useState } from "react";
import styles from "./Features.module.css";
import { Form, Button, Card, Input, Select } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProduct } from "../../../../apis/ProductApi";
import Spinner from "../../../../component/Spinner/Spinner";
const Features = ({ features, selected_features, editID }) => {
  const [insertFeature, setInsertFeature] = useState({
    product_features: selected_features,
  });
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useUpdateProduct();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let final_features = { product_id: editID, ...insertFeature };
    mutateAsync(final_features, {
      onSuccess: () =>
        queryClient.invalidateQueries(["single_product", String(editID)]),
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange = (a, b) => {
    let key = Object.keys(a);
  };
  // handle select change
  const handleSelectChange = (a, b) => {
    if (b) {
      setInsertFeature({
        product_features: {
          ...insertFeature["product_features"],
          [b.feature]: {
            feature_type: b.type,
            value: "Feature updated",
            variant_id: b.value,
          },
        },
      });
    }
  };
  // function  for getting extra features
  const getExtraFeatures = () => {
    let extra_features = features.filter((item) => item.feature_type == "G");
    return (
      <div key={"this is features"} className={styles.extra_features}>
        {extra_features.map((extra, i) => {
          return (
            <div key={i}>
              <h3>{extra.description}</h3>
              {Object.values(extra.subfeatures).map((subfeature, index) => {
                return (
                  <div key={index}>
                    <Form.Item
                      name={subfeature?.description}
                      label={subfeature?.description}
                    >
                      <Select
                        showSearch
                        defaultValue={
                          selected_features[subfeature?.feature_id]?.variant_id
                        }
                        onChange={handleSelectChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={
                          subfeature.variants
                            ? Object.values(subfeature.variants).map(
                                (variant) => ({
                                  label: variant.variant,
                                  value: variant.variant_id,
                                  feature: subfeature.feature_id,
                                  type: variant.feature_type,
                                })
                              )
                            : []
                        }
                      />
                    </Form.Item>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  //  Function for getting main features
  const getMainFeatures = () => {
    let m_features = features.filter((item, i) => item.feature_type == "S");
    return (
      <div>
        {m_features.map((item, index) => {
          return (
            <div key={index}>
              <Form.Item name={item?.internal_name} label={item?.internal_name}>
                <Select
                  onChange={handleSelectChange}
                  showSearch
                  optionFilterProp="children"
                  defaultValue={selected_features[item?.feature_id]?.variant_id}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={Object.values(item.variants).map((variant) => ({
                    label: variant.variant,
                    value: variant.variant_id,
                    feature: item.feature_id,
                    type: variant.feature_type,
                  }))}
                />
              </Form.Item>
            </div>
          );
        })}
      </div>
    );
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.feature_container}>
      <Form
        form={form}
        name="features"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={onValueChange}
      >
        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Save changes
          </Button>
        </Form.Item>
        <br />
        <br />
        <div className={styles.features_wrapper}>
          <div className={styles.main_features}>{getMainFeatures()}</div>
          {getExtraFeatures()}
        </div>
      </Form>
    </div>
  );
};

export default Features;
