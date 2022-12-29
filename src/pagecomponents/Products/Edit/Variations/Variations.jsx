import React, { useState } from "react";
import { Button, Modal, Select, Input } from "antd";
import styles from "./Variations.module.css";
import { useEffect } from "react";
import VariationTable from "./VariationTable";
import "./index.css";
import { apicall } from "../../../../utils/apicall/apicall";
const Variations = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [features, setFeatures] = useState("");
  const [featureList, setFeatureList] = useState([]);
  const [variant, setVariants] = useState("");
  const [variationGroup, setVariationGroup]=useState('')
  const [columns, setColumns]=useState('')
//   console.log("This is variation data =>", data);

  useEffect(() => {
    Promise.all([ getAllFeatures(), getColumns(), getProductVariationGroup(data.variation_group_id)])
   
  }, []);

  const getAllFeatures = () => {
    let temp = Object.values(data.product_features).map((item) => ({
      label: item.internal_name,
      value: item.feature_id,
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
    // console.log( data.data.variants)
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

  
const getProductVariationGroup= async()=>{
   let variation= await apicall({
        url:'product_variations_groups/136'
    })
    setVariationGroup(variation);
}
const getColumns=()=>{
    let temp=[
        {
            title: "Name/Image",
            dataIndex: 'name',
            key: "product",
          },
    ]
    let sample=Object.values(data.variation_features).map((item)=>({
        title:item.internal_name,
        dataIndex:item.internal_name,
        key:item.internal_name
    })
    )
    setColumns([...temp,...sample,{
        title:'Price',
        dataIndex:'price',
        key:'price'

    },{
        title:'Quantity',
        dataIndex:'amount',
        key:'amount'

    },
    {
        title:'Status',
        dataIndex:'status',
        key:'status'

    }])
}
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
     { variationGroup?<VariationTable variation={variationGroup} columns={columns}/>:''}
      </div>
    </div>
  );
};

export default Variations;
