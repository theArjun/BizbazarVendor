import { useEffect, useMemo, useState } from "react";
import { SalesContent, SalesTabs, SearchForSalesReport } from "../..";
import styles from "./SalesReport.module.css";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useGetSalesReport } from "../../../apis/SalesApi";
import Spinner from "../../../component/Spinner/Spinner";
const INITIAL_PARAMS = {
  period: "C",
  time_from: "",
  time_to: "",
};
const SalesReport = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [active, setActive] = useState("");
  const [sideBar, setSideBar] = useState(false);
  const { data: salesData, isLoading: salesLoading } = useGetSalesReport();

  const navigationItems = useMemo(() => {
    let data = salesData?.data?.navigation?.map((item, i) => ({
      name: item?.title,
      value: String(item?.href).split("=")[1],
    }));
    return data || [];
  }, [salesData]);
  // Set default navigation button
  useEffect(() => {
    setActive(salesData?.data?.table?.report_id);
  }, [salesData?.data?.table]);
  if (salesLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.sales_report}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Orders/Sales Report">Sales Report</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.sales_report_wrapper}>
        <div className={styles.sales_report_left}>
          <SalesContent activeID={active} params={params} />
        </div>
        <div
          className={`${styles.tabs_wrapper}  ${
            sideBar && styles.open_tabs_wrapper
          }`}
        >
          <div
            onClick={() => setSideBar(!sideBar)}
            className={`${styles.toggle_side_bar} ${
              sideBar ? styles.open_toggle_btn : ""
            }`}
          >
            {!sideBar ? (
              <AiOutlineDoubleLeft size={25} />
            ) : (
              <AiOutlineDoubleRight size={25} />
            )}
          </div>
          <div className={styles.tabs}>
            <SalesTabs
              active={active}
              setActive={setActive}
              tabs={navigationItems}
            />
          </div>
          <SearchForSalesReport
            params={params}
            setParams={setParams}
            data={salesData?.data?.report || {}}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
