import React from 'react'
import { Table } from 'antd'
import useWindowSize from '../../../../../utils/Hooks/useWindowSize';
const ConditionTable = ({conditions}) => {
  console.log("🚀 ~ file: ConditionTable.jsx:5 ~ ConditionTable ~ conditions", conditions)
  
const windowSize=useWindowSize()
  const columns = [
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
      width:200
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      width:150
    },
    {
      title: "Values",
      dataIndex: "values",
      key: "values",
    },
    {
      key: "status",
      dataIndex: "status",
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
  )
}

export default ConditionTable