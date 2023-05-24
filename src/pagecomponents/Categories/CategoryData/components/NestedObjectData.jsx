import React from "react";
import { Collapse, theme } from "antd";
import { Link } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
const NestedObjectData = ({ data, panelKey = "" }) => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 5,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const renderData = (obj) => {
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        return (
          <Panel
            key={key}
            header={<CustomPanelHeader panelKey={key} children={key} />}
            style={panelStyle}
          >
            <NestedObjectData data={value} />
          </Panel>
        );
      } else {
        return (
          <Panel
            key={key}
            header={<CustomPanelHeader panelKey={key} children={key} />}
            style={panelStyle}
          >
            <Link to={`/Categories/${key}`}>{value}</Link>
          </Panel>
        );
      }
    });
  };
  return (
    <Collapse
      defaultActiveKey={[String(panelKey)]}
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

export default NestedObjectData;
export const CustomPanelHeader = ({ panelKey, children }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.panel_header}
      onClick={() => navigate(`/Categories/${panelKey}`)}
    >
      {children}
    </div>
  );
};
