import React, { useState } from "react";
import styles from "./Features.module.css";
import { Form, Button, Card, Input, Select } from "antd";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { apicall } from "../../../../utils/apicall/apicall";
import { useEffect } from "react";
const Features = ({ features }) => {
  const [brands, setBrands] = useState("");
  const [colors, setColors] = useState("");
  const [size, setSize] = useState("");
  const [electro, setElectro] = useState(false);
  const [electronics, setElectronics] = useState();
  const [electItems, setElectItems] = useState();
  const [gExport, setGexport] = useState(false);
  const [items, setItems]=useState()
  const onFinish = (values) => {
    // console.log("Success:", values);
    //  console.log(features);
    getExportItems();

  };
  useEffect(() => {
    getElectronics();
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onValueChange = (a, b) => {
    console.log(b);
  };
  //  run code while selecting categories
  const onSelect = (value) => {};
  //  run code while Deselecting categories
  const onDeselect = (value) => {};
  // Getting colors
  const getColors = async () => {
    var c_colors = [];
    //call api to retrieve all colors
    const result = await apicall({
      url: "vendors/62/features/549/",
    });
    if (result?.data) {
      const data = { ...result.data.variants };
      const keys = [...Object.keys(data)];
      keys.map((item) => {
        c_colors.push({
          label: data[item]?.variant,
          value: data[item]?.variant_id,
        });
      });
      setColors(c_colors);
    } else {
      setColors("");
    }
  };
  // Lets get brands from API
  const getBrands = async () => {
    var c_brands = [];
    //call api to retrieve all brands
    const result = await apicall({
      url: "vendors/62/features/18/",
    });
    if (result?.data) {
      const data = { ...result.data.variants };
      const keys = [...Object.keys(data)];
      keys.map((item) => {
        c_brands.push({
          label: data[item]?.variant,
          value: data[item]?.variant_id,
        });
      });
      setBrands(c_brands);
    } else {
      setBrands("");
    }
  };
  // Lets get brands from API
  const getSize = async () => {
    var c_size = [];
    //call api to retrieve all brands
    const result = await apicall({
      url: "vendors/62/features/563/",
    });
    if (result?.data) {
      const data = { ...result.data.variants };
      const keys = [...Object.keys(data)];
      keys.map((item) => {
        c_size.push({
          label: data[item]?.variant,
          value: data[item]?.variant_id,
        });
      });
      setSize(c_size);
    } else {
      setSize("");
    }
  };
  // Lets get only electronics features
  const getElectronics = () => {
    var temp = [];
    const data = { ...features?.features };
    const keys = Object.keys(data);
    keys.map((item, i) => {
      if (data[item]?.parent_id == "14") {
        temp.push(data[item]);
      }
    });
    setElectronics(temp);
  };
  // lets get Electronics items according to electronic category
  const getElectItems = async (id) => {
    var temp = [];
    const result = await apicall({
      url: `/vendors/62/features/${id}`,
    });
    if (result?.data) {
      const data = { ...result.data.variants };
      const keys = [...Object.keys(data)];
      keys.map((item) => {
        temp.push({
          label: data[item]?.variant,
          value: data[item]?.variant_id,
        });
      });
      setElectItems(temp);
    } else {
      setElectItems("");
    }
  };

  // Here we get  google export items 
  const getExportItems= ()=>{
    const data = [ ...features?.features ];
    var element= data.filter((item, i) => {
      return(item.parent_id=='550')
    }).map( (item, index)=>{
      return (
        <Form.Item name={item?.description} label={item?.description} onClick={()=>getExportSubItems(item.feature_id)}>
        <Select
        showSearch
        placeholder={`Select `+item?.description}
        optionFilterProp="children"
        onSelect={onSelect}
        onDeselect={onDeselect}
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={items}
      />
        </Form.Item>
      )
    }
    )
     return(element)
  }
  // get export sub items 
  const getExportSubItems= async (id)=>{
     const result= await apicall({
      url:`vendors/62/features/${id}`
     })
 const temp = Object.values(result.data.variants).map((dat,i)=>({
    label: dat.variant,
    value:dat.variant_id
  }))
  setItems(temp);
 
  }
  return (
    <div className={styles.feature_container}>
      <Form
        name="features"
        initialValues={{}}
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
        <Card className={styles.first_card}>
          <Form.Item label="Brand" name="brand" onClick={() => getBrands()}>
            <Select
              showSearch
              placeholder="Select a brand"
              optionFilterProp="children"
              onSelect={onSelect}
              onDeselect={onDeselect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={brands}
            />
          </Form.Item>

          <Form.Item label="Color" name="color" onClick={() => getColors()}>
            <Select
              showSearch
              placeholder="Select a brand"
              optionFilterProp="children"
              onSelect={onSelect}
              onDeselect={onDeselect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={colors}
            />
          </Form.Item>

          <Form.Item label="Size" name="size" onClick={() => getSize()}>
            <Select
              showSearch
              placeholder="Select a size"
              optionFilterProp="children"
              onSelect={onSelect}
              onDeselect={onDeselect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={size}
            />
          </Form.Item>
        </Card>
        <div
          className={styles.electronics_title}
          onClick={() => setElectro(!electro)}
        >
          <h3 className={styles.electronics}>Electronics</h3>
          {electro ? <AiFillCaretRight /> : <AiFillCaretDown />}
        </div>
        <Card className={electro ? styles.close_electro : ""}>
          {electronics?.map((item) => {
            return (
              <Form.Item name={item.internal_name} label={item.internal_name} onClick={()=>getElectItems(item.feature_id)}>
              <Select
              showSearch
              placeholder={`Select a `+item.internal_name}
              optionFilterProp="children"
              onSelect={onSelect}
              onDeselect={onDeselect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={electItems}
            />
              </Form.Item>
            );
          })}
        </Card>
        <div
        className={styles.export_title}
        onClick={() => setGexport(!gExport)}
      >
        <h3 className={styles.export}>Google export features</h3>
        {gExport ? <AiFillCaretRight /> : <AiFillCaretDown />}
      </div>
      <Card className={gExport ? styles.close_electro :styles.export}>
      {
        getExportItems()
      }
      </Card>
      </Form>
    </div>
  );
};

export default Features;
