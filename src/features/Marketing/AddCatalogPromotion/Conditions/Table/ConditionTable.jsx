import React from "react";
import { Table } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import useWindowSize from "../../../../../utils/Hooks/useWindowSize";
const getOperatorName={
  "eq":"Equal",
  "neq":"Not equal",
  "lte":"Equal or less",
  "gte":"Equal or greater",
  "lt":"Less",
  "gt":"Greater",
  "in":"In",
  "nin":"Not in",
  "cont":"Contains",
  "ncont":"Does not contains"
}
const ConditionTable = ({
  conditions,
  setConditions,
  userData,
  productData,
  categoryData,
  loading
}) => {
  const windowSize = useWindowSize();

  const handleDelete = (index) => {
    let data = [...conditions.filter((item, i) => i != index)];
    setConditions(data);
  };

  const getNames = (ids, condition, variant_name) => {
    let product_ids = String(ids).split(",");
    switch (condition) {
      case "products":
        let product_name = productData
          ?.filter((product) => product_ids.includes(product?.product_id))
          .reduce((updater, current) => {
            updater = updater + ", " + current?.product;
            return updater;
          }, "");
        return product_name?.slice(1);
      case "purchased_products":
        let product_purchased_name = productData
          ?.filter((product) => product_ids.includes(product?.product_id))
          .reduce((updater, current) => {
            updater = updater + ", " + current?.product;
            return updater;
          }, "");
        return product_purchased_name?.slice(1);
      case "categories":
          let category_name = categoryData
            ?.filter((product) => product_ids.includes(product?.category_id))
            .reduce((updater, current) => {
              updater = updater + ", " + current?.category;
              return updater;
            }, "");
          return category_name?.slice(1);
      case "users":
            let users_name = userData
              ?.filter((product) => product_ids.includes(product?.user_id))
              .reduce((updater, current) => {
                updater = updater + ", " + current?.firstname+' '+current?.lastname;
                return updater;
              }, "");
            return users_name?.slice(1);

      case "usergroup":
        if(ids==='1'){
          return 'Guest'
        }
        return "Registered user"
      case 'feature':
        return variant_name
      default:
        return ids
      
    }
  };
  const columns = [
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
      width: 200,
      render:(operator)=>getOperatorName[operator]
    },
    {
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
      width: 250,
    },
    {
      title: "Values",
      dataIndex: "value",
      key: "values",
      render: (ids, row) => getNames(ids, row?.condition, row?.value_name),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
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
      ),
    },
  ];
  return (
    <div>
      <Table
      loading={loading}
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
