import React from "react";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
import { Table } from "antd";
const VariationTable = ({ data, columns, loading }) => {
    console.log(data)
  const windowSize = useWindowSize();
  return (
    <div>
      <Table
        id="product"
        // loading={loading}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
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
