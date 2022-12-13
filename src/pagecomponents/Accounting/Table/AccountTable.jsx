import React, { useState, useEffect } from "react";
import styles from './Table.module.css'
import { useSelector, useDispatch } from "react-redux";
import { Table, Dropdown, Image,Skeleton} from "antd";
import { apicall } from "../../../utils/apicall/apicall";
import { AiFillEdit, AiFillSetting } from "react-icons/ai";
import { handleEditData, loadTableData, setSelectedProductId } from "../../../redux/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../utils/Hooks/useWindowSize";
const AccountTable = ({handleScroll,loading}) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product.products);
    const [productId, setProductId] = useState("");
    const navigate=useNavigate();
    const windowSize = useWindowSize();
    useEffect(() => {
      document 
      .querySelector("#product > div > div.ant-table-body")                
        ?.addEventListener("scroll", handleScroll);
  
      return () => {
        document
          .querySelector("#product > div > div.ant-table-body")
          ?.removeEventListener("scroll", handleScroll);
      };
    }, [handleScroll]);
    // Set id 
    const setSelectedRow=async (id,method)=>{
        setProductId(id);
        window.localStorage.setItem('productRowId',JSON.stringify(id))
        var result = await apicall({
          url: `vendors/62/products/${id}`,
        });
        dispatch(handleEditData(result.data));
        if(method==='detail'){
          navigate('Edit Product');
        }
    }
    const items = [
      {
        key: "1",
        label: (
          <a  rel="noopener noreferrer" href="#" onClick={()=>navigate('Edit Product')}>
            Edit <AiFillEdit />
          </a>
        ),
      },
    ];
    const columns = [
      {
        title: "Status",
        dataIndex: ["product_id", "product", "product_code", "main_pair"],
        data: "data",
        key: "product",
        render: (text, row) => (
          <div className={styles.product_info}>
            <Image
              width={70}
              src={!row["main_pair"] ? "" : row["main_pair"].detailed.image_path}
              alt={""}
            />
            <div className={styles.product_name}>
             <a href="#" onClick={()=>setSelectedRow(row['product_id'],'detail')}> <strong>{row["product"]}</strong></a>
              <small>{row["product_code"]}</small>
            </div>
          </div>
        ),
  
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        
      }, {
        title: "Transaction value",
        dataIndex: "transaction_value",
        key: "transaction_value",
        
      },
      {
        title: "Voucher cost",
        key: "voucher_cost",
        dataIndex: 'voucher_cost',
        render: (id) => (
          <div
            className={styles.product_action}
            onClick={() => setSelectedRow(id)}
          >
          <p>{'Status'}</p>
          </div>
        ),
      },
      {
        title: "Gift certificate cost",
        key: "certificate_cost",
        dataIndex:'certificate_cost',
        render: (certificate) => (
         <div>
              {certificate}
         </div>
        ),
      },
      {
        title: "Shipping cost",
        dataIndex: "shipping",
        key: "shipping",
        
      },{
        title: "Shipping cost",
        dataIndex: "shipping",
        key: "shipping",
        
      },
    ];
  return (
    <div>
    <Table
      id='product'
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{
        y: windowSize.height > 670 ? 300 : 200,
        x:1000
      }}
    />
  </div>
  )
}

export default AccountTable