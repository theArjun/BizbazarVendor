import React from "react";
import styles from "./Comments.module.css";
import { Button, Input } from "antd";
const { TextArea } = Input;
const Comments = () => {
  return (
    <div className={styles.comments}>
      <div className={styles.comments_body}>
        <div>Comments</div>
        <div className={styles.comments_text_area}>
          <TextArea rows={6} />
          <div style={{ marginBottom: "10px" }}>
            <Button type="primary">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
