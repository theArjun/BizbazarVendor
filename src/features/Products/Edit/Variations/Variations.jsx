import React, { useState } from "react";
import {
  Button,
  Modal,
  Select,
  Input,
  Image,
  Dropdown,
  Alert,
  Tag,
} from "antd";
import styles from "./Variations.module.css";
import { useEffect } from "react";
import VariationTable from "./VariationTable";
import "./index.css";
import { useQueryClient } from "@tanstack/react-query";
import { AiFillSetting } from "react-icons/ai";
import ModalTable from "./ModalContent/ModalTable";
import { useNavigate } from "react-router-dom";
import {
  useCreateVariations,
  useGetProductVariationGroup,
  useRemoveVariationGroup,
  useUpdateVariationStatus,
} from "../../../../apis/ProductApi";
let id = "";
const { confirm } = Modal;

const Variations = ({ data, variations, editID }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [features, setFeatures] = useState("");
  const [featureList, setFeatureList] = useState([]);
  const [selectVariantId, setSelectVariantId] = useState("");
  const [variationData, setVariationData] = useState([]);
  const [tableData, setTableData] = useState({});
  const [variationLength, setVariationLength] = useState(0);
  const [variant, setVariant] = useState([]);
  const [save, setSave] = useState(true);
  const [finalData, setFinalData] = useState({
    product_id: editID,
    feature_ids: {},
    features_variants_ids: {},
    check_all: "Y",
    combinations_data: {},
  });
  const { mutate: variationMutate, isLoading: variationCreateLoading } =
    useCreateVariations();
  const {
    mutate: changeVariationMutate,
    isLoading: changeVariationGroupLoading,
  } = useRemoveVariationGroup();
  const { mutate: updateStatusMutate, isLoading: statusLoading } =
    useUpdateVariationStatus();
  const { data: variationGroupData, isLoading } = useGetProductVariationGroup(
    data?.variation_group_id
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.values(tableData).length > 1) {
      setVariant(cartesianProduct([...Object.values(tableData)]));
    } else {
      if (Object.values(tableData)[0]) setVariant(Object.values(tableData)[0]);
    }
  }, [tableData]);
  function cartesianProduct(arrays) {
    return arrays
      .filter((el) => el.length != 0)
      .reduce(
        function (a, b) {
          return a
            .map(function (x) {
              return b.map(function (y) {
                return x.concat(y);
              });
            })
            .reduce(function (a, b) {
              return a.concat(b);
            }, []);
        },
        [[]]
      );
  }
  // get variation group
  useEffect(() => {
    if (variationGroupData?.data) {
      setVariationData(variationGroupData?.data?.products);
    } else {
      setVariationData([]);
    }
  }, [variationGroupData]);
  useEffect(() => {
    setFeatures(
      variations
        ?.filter((el) => !el?.children)
        ?.map((item) => ({
          value: item?.id,
          label: item?.text,
          variation: Object.values(item?.object?.variants),
        }))
    );
  }, [variations]);
  useEffect(() => {
    id = selectVariantId;
  }, [selectVariantId]);
  const status_items = [
    {
      label: <div onClick={() => updateStatus("A")}>Active</div>,
      value: "A",
      key: "0",
    },
    {
      label: <div onClick={() => updateStatus("D")}>Disabled</div>,
      value: "D",
      key: "1",
    },

    {
      label: <div onClick={() => updateStatus("H")}>Hidden</div>,
      value: "H",
      key: "2",
    },
  ];
  //  set Status of product
  const getProductStatus = (status) => {
    switch (status) {
      case "H":
        return <Tag color="purple">Hidden</Tag>;
      case "A":
        return <Tag color="green">Active</Tag>;
      case "D":
        return <Tag color="orange">Disabled</Tag>;
      case "R":
        return <Tag color="red">Requires Approval</Tag>;
      case "X":
        return <Tag color="magenta">Disapproved</Tag>;
      default:
        return "Attention required";
    }
  };
  // action_items
  const action_items = [
    {
      label: <a onClick={() => onEditPress(id)}>Edit</a>,
      key: "0",
    },
    {
      label: (
        <a
          href="#"
          onClick={() =>
            showConfirm(
              "Do you want to remove variation from group?",
              "",
              `product_variations/${id}/detach_product_variation`,
              "post"
            )
          }
        >
          Remove variation from group
        </a>
      ),
      key: "1",
    },

    {
      label: (
        <a
          href="#"
          onClick={() =>
            showConfirm(
              "Do you want to delete the item?",
              "",
              `products/${id}`,
              "delete"
            )
          }
        >
          Delete product
        </a>
      ),
      key: "2",
    },
  ];

  // show delete or variation detach confirmation
  function showConfirm(title, message, url, method) {
    confirm({
      title: title,
      content: message,
      async onOk() {
        let data = {
          url: url,
          method: method,
        };
        changeVariationMutate(data, {
          onSuccess: (res) => {
            queryClient.invalidateQueries(["variation_group"]);
          },
        });
      },
      onCancel() {},
    });
  }
  // on feature select
  const onFeatureSelect = (a, b) => {
    setFeatureList((current) => [...current, b]);
    setTableData({ ...tableData, [b.value]: [] });
    const tempFeature = features.filter((item) => {
      return item.value !== a;
    });
    setFeatures(tempFeature);
  };

  const dropdownClose = (open) => {
    if (open === false) {
      // do something
    }
  };
  const createVariations = async (id) => {
    let data = {
      id: id,
      data: finalData,
    };
    variationMutate(data, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["single_product", editID]);
        queryClient.invalidateQueries(["variation_group"]);
        setModalOpen(false);
      },
    });
  };
  //for edit option
  // Set id
  const onEditPress = async (v_id) => {
    navigate("../products/" + v_id);
    location.reload();
  };
  // update status of variant
  const updateStatus = async (status) => {
    let data = {
      id: id,
      status: {
        status,
      },
    };
    updateStatusMutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["variation_group"]);
      },
    });
  };
  const handleVariantSelect = (a, b) => {
    setTableData({
      ...tableData,
      [b.feature_id]: [...tableData[b.feature_id], b],
    });
  };
  const handleVariantDeselect = (a, b) => {
    setTableData({
      ...tableData,
      [b.feature_id]: [
        ...tableData[b.feature_id].filter((el) => el.value !== b.value),
      ],
    });
  };
  let sample = Object.values(data.variation_features).map((item, i) => ({
    title: item.internal_name,
    dataIndex: item.internal_name,
    key: item.internal_name,
    width: "15%",
    render: (text, row, index) => (
      <div key={i}>
        <Select
          style={{ width: "100%" }}
          value={row.variation_features[item.feature_id].variant_id}
          onChange={(e, values) => {
            let temp = [...variationData];
            temp[index].variation_features[item.feature_id].variant_id = e;
            temp[index].variation_features[item.feature_id].variant =
              values.label;
            setVariationData(temp);
            setSave(false);
          }}
          options={Object.values(
            variations.filter((el) => el.id == item.feature_id)?.at(0)?.object[
              "variants"
            ] || {}
          ).map((item, i) => ({ label: item.variant, value: item.variant_id }))}
        />
      </div>
    ),
  }));
  let columns = [
    {
      title: "Image/Name",
      dataIndex: "product",
      key: "product",
      width: 250,
      render: (item, row) => (
        <div className={styles.image_and_name}>
          <Image
            width={50}
            src={!row["main_pair"] ? "" : row["main_pair"].detailed.image_path}
            alt={""}
            fallback="/image_not_found.png"
          />
          <div className={styles.productName}>
            {String(row.product).substring(0, 50)}
          </div>
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "product_code",
      key: "product_code",
      render: (code, row, i) => (
        <div>
          <Input
            value={code}
            onChange={(e) => {
              let temp = [...variationData];
              temp[i]["product_code"] = e.target.value;
              setVariationData(temp);
              setSave(false);
            }}
          />
        </div>
      ),
    },
    ...sample,
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, row, i) => (
        <div>
          <Input
            type="number"
            value={parseFloat(price).toFixed(2)}
            onChange={(e) => {
              let temp = [...variationData];
              temp[i].price = e.target.value;
              setVariationData([...temp]);
              setSave(false);
            }}
          />
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "amount",
      key: "amount",
      render: (amount, row, i) => (
        <React.Fragment>
          <Input
            type="number"
            value={amount}
            onChange={(e) => {
              let temp = [...variationData];
              temp[i].amount = e.target.value;
              setVariationData([...temp]);
              setSave(false);
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "8%",
      render: (action, row) => (
        <div className={styles.action_btn}>
          <Dropdown
            menu={{
              items: action_items,
            }}
            trigger={["click"]}
          >
            <a href="#">
              <AiFillSetting
                onClick={() => setSelectVariantId(row.product_id)}
                size={20}
                className={styles.icons}
              />
            </a>
          </Dropdown>
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (value, row) => (
        <div>
          <Dropdown
            menu={{
              items: status_items,
            }}
            trigger={["click"]}
          >
            <div onClick={() => setSelectVariantId(row.product_id)}>
              {getProductStatus(value)}
            </div>
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.variations}>
      <div className={styles.variations_top}>
        <Input
          style={{ width: "300px" }}
          addonBefore="Variation group"
          defaultValue={data?.variation_group_code}
        />
        <div style={{ float: "right" }} className={styles.right_buttons}>
          <Button disabled={save} type="primary">
            Save changes
          </Button>
          <Button
            style={{ float: "right" }}
            type="primary"
            onClick={() => setModalOpen(true)}
          >
            Add variations
          </Button>
        </div>
        <div></div>
        <Modal
          title="Add variation"
          maskClosable={false}
          centered
          width={1000}
          open={modalOpen}
          onOk={() => createVariations(editID)}
          okText={
            variationLength !== 0
              ? `Create ${variationLength} variations`
              : "Create variation"
          }
          onCancel={() => setModalOpen(false)}
          className={styles.variation_modal}
          okButtonProps={{
            loading: variationCreateLoading,
            disabled: variationLength !== 0 ? false : true,
          }}
        >
          <div className={styles.modal_body}>
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
                options={variationData.length ? "" : features}
              />
              {variationData?.length ? (
                <div
                  className={styles.warning}
                  style={{ marginTop: "10px", marginRight: "10px" }}
                >
                  <Alert
                    message="You can add a new variation if you disband the group in the actions menu and create variations again."
                    type="warning"
                  />
                </div>
              ) : (
                ""
              )}
              {featureList.map((item, index) => {
                return (
                  <div key={index} className={styles.feature_main}>
                    <span>
                      <b>{item.label}</b>
                    </span>
                    <Select
                      mode="multiple"
                      onDropdownVisibleChange={dropdownClose}
                      showSearch
                      onDeselect={handleVariantDeselect}
                      onSelect={handleVariantSelect}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      style={{ width: "100%", paddingRight: "40px" }}
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={item.variation.map((variant) => ({
                        label: variant.variant,
                        value: variant.variant_id,
                        feature_id: item.value,
                      }))}
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.modal_variation_table}>
              <ModalTable
                loading={isLoading}
                data={variant}
                product_data={data}
                finalData={finalData}
                setFinalData={setFinalData}
                setVariationLength={setVariationLength}
              />
            </div>
          </div>
        </Modal>
      </div>
      <div className={styles.variations_table}>
        <VariationTable
          loading={statusLoading || changeVariationGroupLoading || isLoading}
          data={variationData}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Variations;
