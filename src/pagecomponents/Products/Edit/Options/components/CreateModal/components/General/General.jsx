import React from 'react'
import { Checkbox, Input, Select } from "antd";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import styles from  './General.module.css'
const General = () => {
    return (
        <div className={styles.option_general}>
          <div className={styles.option_input_items}>
              <div className={styles.label}>Name:</div>
              <div className={styles.value}> <Input type='text'/></div>
          </div>
           <div className={styles.option_input_items}>
              <div className={styles.label}>Position:</div>
              <div className={styles.value}> <Input type='text'/></div>
          </div>
<div className={styles.option_input_items}>
              <div className={styles.label}>Storefront:</div>
              <div className={styles.value}> Vision computer solution</div>
          </div>
<div className={styles.option_input_items}>
              <div className={styles.label}>Type:</div>
              <div className={styles.value}> <Select defaultValue={'C'} options={[{label:'Checkbox', value:'C' }, {label:'Radio', value:'R'}]}/></div>
          </div>
<div className={styles.option_input_items}>
              <div className={styles.label}>Description:</div>
              <div className={styles.value}> <ReactQuill type='snow' /> </div>
          </div>
<div className={styles.option_input_items}>
              <div className={styles.label}>Required:</div>
              <div className={styles.value}> <Checkbox  /> </div>
          </div>
<div className={styles.option_input_items}>
              <div className={styles.label}>Missing variants handling:</div>
              <div className={styles.value}> <Select defaultValue={'R'} options={[{label:'Checkbox', value:'C' }, {label:'Radio', value:'R'}]}/> </div>
          </div>

        </div>
      );
}

export default General