import { Table } from "antd";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import useWindowSize from "../../../../utils/Hooks/useWindowSize";
const AdditionTable = ({ products, categories, setProducts }) => {
  const windowSize = useWindowSize();

  const getStatusTag=(status)=>{
    switch(status){
        case 'A':
            return <div style={{color:'green'}}>Active</div>
        case 'D':
            return <div style={{color:'gray'}}>Disabled</div>
        case 'H':
            return <div style={{color:'rgb(243, 174, 25)'}}>Hidden</div>
    }
  }
  const getCategoryName=(id)=>{
    let name=categories.filter((item)=>item.category_id==id)
    return name[0].category

}
const handleDelete=(index)=>{
   let data=[...products.filter((item,i)=>i!=index)];
      setProducts(data)
}
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "product",
      render:(text)=>getCategoryName(text)
    },
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    }, 
     {
      title: "In stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render:(text)=>getStatusTag(text)
    }, 
    {
     
      key: "status",
      dataIndex: "status",
      render:(text, row, i)=>(
        <div>
            <AiTwotoneDelete size={20} color={'rgb(231, 77, 35)'} style={{cursor:'pointer'}} onClick={()=>handleDelete(i)}/>
        </div>
      )
    },
  ];
  return (
    <div>
      <Table
        id="product"
        columns={columns}
        dataSource={products}
        pagination={false}
        scroll={{
          y: windowSize.height > 670 ? 300 : 200,
          x: 1000,
        }}
      />
    </div>
  );
};

export default AdditionTable;
