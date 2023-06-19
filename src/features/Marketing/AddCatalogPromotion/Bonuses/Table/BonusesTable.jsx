import React from 'react'
import { Table } from 'antd';
import { AiTwotoneDelete } from 'react-icons/ai';
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
const BonusesTable = ({bonuses,setBonuses}) => {
    const windowSize = useWindowSize();
    const handleDelete=(index)=>{
        let data = [...bonuses.filter((item, i) => i != index)];
        setBonuses(data)
    }
    const columns = [
        {
          title: "Bonus type",
          dataIndex: "bonus",
          key: "bonus",
          width: 200,
        },
        {
          title: "Condition",
          dataIndex: "discount_bonus",
          key: "discount_bonus",
          width: 200,
        },
        {
          title: "Values",
          dataIndex: "discount_value",
          key: "discount_value",
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
      dataSource={bonuses}
      pagination={false}
      scroll={{
        y: windowSize.height > 670 ? 300 : 200,
        x: 1000,
      }}
    />
  </div>
  )
}

export default BonusesTable