import React from "react";
import { Collapse, theme } from "antd";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useGeneralContext } from "../../../../ContextProvider/ContextProvider";
const NestedObjectData = ({ data, panelKey = "" }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const categoryContext = useGeneralContext();
  const panelStyle = {
    marginBottom: 5,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const renderData = (obj) => {
    return obj.map((item, i) => {
      if (item?.subcategories && item !== null) {
        return (
          <Panel
            key={item?.category_id}
            header={
              <CustomPanelHeader
                panelKey={item?.category_id}
                children={item?.category}
                item={[item]}
              />
            }
            style={panelStyle}
          >
            <NestedObjectData data={item?.subcategories} />
          </Panel>
        );
      } else {
        return (
          <Panel
            key={item?.category_id}
            header={
              <CustomPanelHeader
                panelKey={item?.category_id}
                children={item?.category}
                item={[item]}
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
      defaultActiveKey={[panelKey]}
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        background: token.colorBgContainer,
      }}
    >
      {typeof data === "object" ? (
        renderData(data)
      ) : (
        <Panel key={panelKey} header={data} style={panelStyle}>
          {data}
        </Panel>
      )}
    </Collapse>
  );
};

export default NestedObjectData;
export const CustomPanelHeader = ({ panelKey, children, item }) => {
  const navigate = useNavigate();
  const categoryContext = useGeneralContext();
  return (
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
  );
};
