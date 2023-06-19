import React from "react";
import { Collapse, Tag, theme } from "antd";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useGeneralContext } from "../../../../ContextProvider/ContextProvider";
const getStatusTag = (status) => {
  switch (status) {
    case "A":
      return <Tag color="green">Active</Tag>;
    case "H":
      return <Tag color="purple">Hidden</Tag>;
    case "D":
      return <Tag color="red">Disabled</Tag>;
    default:
      return <Tag color="cyan">Unknown</Tag>;
  }
};
const NestedObjectDataWithDetail = ({ data }) => {
  const { token } = theme.useToken();
  const categoryContext = useGeneralContext();
  const navigate = useNavigate();
  const panelStyle = {
    marginBottom: 5,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const renderData = (obj = []) => {
    return obj.map((item, i) => {
      if (item?.subcategories && item !== null) {
        return (
          <Panel
            key={item?.category_id}
            header={
              <CustomPanelHeader
                item={[item]}
                panelKey={item?.category_id || ""}
                children={item?.category || ""}
                status={item?.status || ""}
                count={item?.product_count || 0}
                position={item?.position || ""}
              />
            }
            style={panelStyle}
          >
            <NestedObjectDataWithDetail data={item?.subcategories} />
          </Panel>
        );
      } else {
        return (
          <Panel
            key={item?.category_id}
            header={
              <CustomPanelHeader
                item={[item]}
                panelKey={item?.category_id}
                children={item?.category}
                status={item?.status || ""}
                count={item?.product_count || 0}
                position={item?.position || ""}
              />
            }
            style={panelStyle}
          >
            <div
              className={styles.panel_header_title}
              onClick={() => {
                categoryContext.setNestedCategories({
                  type: "NESTED_CATEGORIES",
                  value: item?.category,
                });
                navigate(`/Categories/${item?.category_id}`);
              }}
            >
              {item?.category}
            </div>
          </Panel>
        );
      }
    });
  };
  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
    >
      {renderData(data)}
    </Collapse>
  );
};

export default NestedObjectDataWithDetail;
export const CustomPanelHeader = ({
  panelKey,
  children,
  item,
  status,
  count,
  position,
}) => {
  const categoryContext = useGeneralContext();
  const navigate = useNavigate();
  return (
    <div className={styles.panel_header}>
      <div
        className={styles.panel_header_title}
        onClick={() => {
          categoryContext.setNestedCategories({
            type: "NESTED_CATEGORIES",
            value: item,
          });
          navigate(`/Categories/${panelKey}`);
        }}
      >
        {children}
      </div>
      <div className={styles.panel_header_content}>
        <div>
          <div className={styles.panel_header_content_item}>Position:</div>{" "}
          <div>{position}</div>
        </div>
        <div>
          <div className={styles.panel_header_content_item}>Products:</div>{" "}
          <div>{count}</div>
        </div>
        <div>
          <div className={styles.panel_header_content_item}>Status:</div>{" "}
          <div>{getStatusTag(status)}</div>
        </div>
      </div>
    </div>
  );
};
