import React from "react";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { Table } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { apicall } from "../../../../utils/apicall/apicall";
const data= ''
const VariationTable = ({ variation, columns }) => {
    console.log(variation)
  const windowSize = useWindowSize();
const [column, setColumn]=useState('')
useEffect(()=>{

},[])


  
  return (
    <div>
      <Table
        id="product"
        // loading={loading}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        // onChange={onChange}
        scroll={{
          y: windowSize.height > 670 ? 500 : 300,
          x: 1000,
        }}
      />
    </div>
  );
};

export default VariationTable;
