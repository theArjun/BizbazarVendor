import React from "react";
import { Table } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
const ConditionTable = ({ conditions, setConditions }) => {
  const windowSize = useWindowSize();

  const handleDelete=(index)=>{
    let data = [...conditions.filter((item, i) => i != index)];
    setConditions(data)
}
  const columns = [
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
      width: 200,
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      width: 150,
    },
    {
      title: "Values",
      dataIndex: "values",
      key: "values",
    },
    { title:'Action',
    key: "action",
    dataIndex: "action",
    fixed:'right',
    width: 100,
     render: (text, row, i) => (
  <div>
    <AiTwotoneDelete
      size={20}
      color={"rgb(231, 77, 35)"}
      style={{ cursor: "pointer" }}
      onClick={() => handleDelete(i)}
    />
  </div>
)
  },
  ];
  return (
    <div>
      <Table
        id="product"
        columns={columns}
        dataSource={conditions}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default ConditionTable;
