import React, { useState } from "react";
import { Button, Modal, Select, Input, Image, Dropdown } from "antd";
import styles from "./Variations.module.css";
import { useEffect } from "react";
import VariationTable from "./VariationTable";
import "./index.css";
import { apicall } from "../../../../utils/apicall/apicall";
import { AiFillSetting } from "react-icons/ai";
// creating an object that is used to map status
const status = {
  A: "Active",
  H: "Hidden",
  D: "Disabled",
};
const action_items = [
  {
    label: <a href="#">Edit</a>,
    key: "0",
  },
  {
    label: <a href="#">Remove variation from group</a>,
    key: "1",
  },

  {
    label: <a href="#">Delete product</a>,
    key: "2",
  },
];
const status_items = [
  {
    label: <a href="#">Active</a>,
    value: "A",
    key: "0",
  },
  {
    label: <a href="#">Disabled</a>,
    value: "D",
    key: "1",
  },

  {
    label: <a href="#">Hidden</a>,
    value: "H",
    key: "2",
  },
];
const Variations = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [features, setFeatures] = useState("");
  const [featureList, setFeatureList] = useState([]);
  const [variant, setVariants] = useState("");
  const [variationData, setVariationData] = useState([]);
  const [columns, setColumns] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //   console.log("This is variation data =>", data);

  useEffect(() => {
    Promise.all([
      getAllFeatures(),
      getColumns(),
      getProductVariationGroup(data.variation_group_id),
    ]);
  }, []);
  const getAllFeatures = async () => {
    let res= await apicall({
      url:'products/1218/features'
    })
    console.log(res.data)
    let temp = Object.values(data.product_features).map((item) => ({
      value: item.feature_id,
      label: item.internal_name,
    }));
    setFeatures(temp);
  };
  // on feature select
  const onFeatureSelect = (value) => {
    setFeatureList((current) => [...current, data.product_features[value]]);
    const tempFeature = features.filter((item) => {
      return item.value !== value;
    });
    setFeatures(tempFeature);
  };

  // getFeature Variants
  const getFeatureVariant = async (id) => {
    const data = await apicall({
      url: `features/${id}`,
    });
    let temp = Object.values(data?.data?.variants).map((item) => ({
      label: item.variant,
      value: item.variant_id,
    }));
    setVariants(temp);
  };

  const dropdownClose = (open) => {
    if (open === false) {
      setVariants("");
    }
  };

  // get variation group
  const getProductVariationGroup = async () => {
    setLoading(true);
    let result = await apicall({
      url: `product_variations_groups/${data.variation_group_id}/product_variations`,
    });
    if (result.data) {
      setVariationData(result.data?.products);
      setLoading(false);
    }
    setLoading(false);
  };

  const getColumns = () => {
    let temp = [
      {
        title: "Name/Image",
        dataIndex: "product",
        key: "product",
        render: (item, row) => (
          <div className={styles.image_and_name}>
            <Image
              width={70}
              src={
                !row["main_pair"] ? "" : row["main_pair"].detailed.image_path
              }
              alt={""}
            />
            <p>
              {" "}
              <b>{row.product}</b>
            </p>
          </div>
        ),
      },
      {
        title: "Code",
        dataIndex: "product_code",
        key: "product_code",
      },
    ];
    let sample = Object.values(data.variation_features).map((item) => ({
      title: item.internal_name,
      dataIndex: item.internal_name,
      key: item.internal_name,
      render: (text, row) => (
        <div>{row.variation_features[item.feature_id].variant}</div>
      ),
    }));
    setColumns([
      ...temp,
      ...sample,
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Quantity",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",

        render: (action) => (
          <div className={styles.action_btn}>
            <Dropdown
              menu={{
                items: action_items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <AiFillSetting size={20} className={styles.icons} />
              </a>
            </Dropdown>
          </div>
        ),
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (value) => (
          <div>
            <Dropdown
              menu={{
                items: status_items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>{status[value]}</a>
            </Dropdown>
          </div>
        ),
      },
    ]);
  };
  return (
    <div className={styles.variations}>
      <div className={styles.variations_top}>
        <Input
          style={{ width: "300px" }}
          addonBefore="Variation group"
          defaultValue={data?.variation_group_code}
        />
        <Button
          style={{ float: "right" }}
          type="primary"
          onClick={() => setModalOpen(true)}
        >
          Add variations
        </Button>
        <Modal
          title="Add variation"
          centered
          width={1000}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
        >
          <div>
            {" "}
            <Select
              showSearch
              style={{
                width: 200,
              }}
              onSelect={onFeatureSelect}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={features}
            />
          </div>

          <div className={styles.feature_container}>
            {featureList?.map((item, index) => {
              return (
                <div key={item.feature_id} className={styles.feature_main}>
                  <span>
                    <b>{item.internal_name}</b>
                  </span>
                  <Select
                    mode="multiple"
                    onClick={() => getFeatureVariant(item.feature_id)}
                    onDropdownVisibleChange={dropdownClose}
                    showSearch
                    onSelect={""}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={variant}
                  />
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
      <div className={styles.variations_table}>
        {variationData ? (
          <VariationTable
            loading={loading}
            data={variationData}
            columns={columns}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Variations;
