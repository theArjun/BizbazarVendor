import React from 'react'
import styles from './TermsAndConditions.module.css'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { Form } from 'antd';
const TermsAndConditions = () => {
  return (
    <div className={styles.terms_condition}>
    <div className={styles.terms_condition_body}>
      <div className={styles.terms_condition_title}>Terms & conditions:</div>
      <div className={styles.terms_condition_field}>
      <Form.Item
      extra={'If you want a customer to agree to your terms and conditions at checkout, fill in Terms & Conditions. If you leave Terms & Conditions empty, a customer proceeds without agreement.'}
      >
      <ReactQuill
        theme="snow"
        value={''}
        // onChange={setDescription}
      />
      </Form.Item>
      </div>
    </div>
  </div>
  )
}

export default TermsAndConditions