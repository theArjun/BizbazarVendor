import React from "react";
import styles from "./Options.module.css";
import { useState } from "react";
import { Button } from "antd";
import CreateModal from "./components/CreateModal/CreateModal";
import AddMoreModal from "./components/AddMoreModal/AddMoreModal";
import { Link } from "react-router-dom";
const Options = () => {
const [openCreateModal, setOpenCreateModal]= useState(false)
const [addMoreModal, setAddMoreModal]= useState(false)
const data= [{name:'Color'},{name:'Size'},{name:'Material'}]
  return (
    <div className={styles.options}>
     <div className={styles.options_container}>
      <div className={styles.options_header}>
        <div className={styles.options_buttons}>
          <Button type="primary" onClick={()=>setAddMoreModal(true)}>Add more options </Button>
          <Button type="primary" onClick={()=>setOpenCreateModal(true)}>Create option </Button>
        </div>
      </div>
      <div className={styles.options_body}>
       { data.map((el,i )=>{
        return (
          <div key={i} className={styles.option_item}>
              <Link  to="#">{el.name}</Link>
          </div>
        )
       })}
      </div>
      </div> 
      <CreateModal  openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal}/>
      <AddMoreModal openCreateModal={addMoreModal} setOpenCreateModal={setAddMoreModal}/>
    </div>
  );
};

export default Options;
