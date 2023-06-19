import React from "react";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
import { Input, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
const ModalTable = ({ data, loading, product_data, setVariationLength, finalData, setFinalData}) => {
  const windowSize = useWindowSize();
  const [variation, setVariation] = useState([]);
  useEffect(() => {
    if (data[0]?.value) {
      setVariation(getSingleFeature(data));
    } else {
      setVariation(
        getMultipleFeature(data)[0] !== undefined
          ? getMultipleFeature(data)
          : ""
      );
    }
  }, [data]);
  useEffect(() => {
    if(variation.length){
      prepareData(variation)
    setVariationLength(variation.length);
  }}, [variation]);
const prepareData=(finalVariations=[])=>{
      let temp={...finalData}
      let ids={}
      let variant_ids={}
      let combine_data={}
        Object.keys(finalVariations[0].ids).map((id, i)=>{
          ids[i]=id
          let v_ids={}
          finalVariations.map((el, index)=>{
            // to check the duplicate values 
            if(!Object.values(v_ids).includes(el['ids'][id])){
              v_ids[index]=el['ids'][id]
            }
          })
          variant_ids[id]=v_ids
        })
        finalVariations.map((item, index)=>{
          let object_name=''
          Object.values(item['ids']).map((id,i)=>{
            object_name=object_name+"_"+id
          })
          if(index===0){
          combine_data[object_name.slice(1)]={
              active:1,
              product_name:item.name,
              product_code:item.code,
              product_price:item.price,
              product_amount:item.quantity
              }
          }
          else{
            combine_data[object_name.slice(1)]={
              active:1,
              product_name:item.name,
              product_code:item.code,
              product_price:item.price,
              product_amount:item.quantity
              }
          }
        })
        temp.feature_ids={...ids}
        temp.features_variants_ids={...variant_ids}
        temp.combinations_data={...combine_data}
      setFinalData({...temp})
}
  const getSingleFeature = (data) => {
    return data?.map((item, i) => ({
      name: product_data?.product,
      feature: item?.label,
      code: product_data.product_code
        ? product_data.product_code + "_" + randomIntFromInterval(1000, 9999)
        : "product_" + randomIntFromInterval(1000, 9999),
      price: product_data?.price,
      quantity: product_data?.amount,
      key: i,
      feature_id:item.feature_id,
      variant_id:item.value,
      ids: { [item?.feature_id]: item?.value },
    }));
  };
  const getMultipleFeature = (data) => {
    return data?.map((item, i) => {
      if (item.length) {
        let feat = "";
        let ids = {};
        item.map((variant) => {
          ids[variant?.feature_id] = variant?.value;
          feat = feat + ", " + variant?.label;
        });
        return {
          name: product_data?.product,
          feature: feat.substring(1),
          code: product_data.product_code
            ? product_data.product_code +
              "_" +
              randomIntFromInterval(1000, 9999)
            : "product_" + randomIntFromInterval(1000, 9999),
          price: product_data?.price,
          quantity: product_data?.amount,
          key: i,
          ids: ids,
        };
      }
    });
  };
  // random number generator
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const columns = [
    {
      title: "FEATURES",
      dataIndex: "feature",
      key: "feature",
      render: (feature) => (
        <div>
          <b>{feature}</b>
        </div>
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name, row, i) => (
        <div>
          <Input
            value={name}
            onChange={(e) => {
              let temp = [...variation];
              temp[i].name = e.target.value;
              setVariation(temp);
            }}
          />
        </div>
      ),
    },
    {
      title: "CODE",
      dataIndex: "code",
      key: "code",
      render: (code, row, i) => (
        <div>
          <Input
            value={code}
            onChange={(e) => {
              let temp = [...variation];
              temp[i].code = e.target.value;
              setVariation(temp);
            }}
          />
        </div>
      ),
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
      render: (price, row, i) => (
        <div>
          <Input
            style={{ width: "80px" }}
            type="number"
            value={parseFloat(price).toFixed(2)}
            onChange={(e) => {
              let temp = [...variation];
              temp[i].price = e.target.value;
              setVariation(temp);
            }}
          />
        </div>
      ),
    },
    {
      title: "QUANTITY",
      key: "quantity",
      dataIndex: "quantity",
      render: (qty, row, i) => (
        <div>
          <Input
            style={{ width: "80px" }}
            type="number"
            value={qty}
            onChange={(e) => {
              let temp = [...variation];
              temp[i].quantity = e.target.value;
              setVariation(temp);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <p>Modify the variations to be created.</p>
      <Table
        id="product"
        loading={loading}
        columns={columns}
        dataSource={variation}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 450 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default ModalTable;
