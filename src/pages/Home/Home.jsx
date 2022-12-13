import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/DarkAndLightMode/DarkAndLightContex";
import styles from "./Home.module.css";
import LineCharts from "./../../pagecomponents/Home/Charts/LineCharts";
import AnalyticsCard from "./../../pagecomponents/Home/Cards/AnalyticsCard/AnalyticsCard";
import { AiFillSetting, AiOutlinePlus } from "react-icons/ai";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import RecentOrders from "./../../pagecomponents/Home/RecentOrders/RecentOrders";
import OrderByStatus from "./../../pagecomponents/Home/OrderByStatus/OrderByStatus";
import RecentActivities from "./../../pagecomponents/Home/RecentActivities/RecentActivities";
import CurrentPlanUsage from "./../../pagecomponents/Home/CurrentPlanUsage/CurrentPlanUsage";
import {
  DollarCircleOutlined,
  RiseOutlined,
  FormOutlined,
  LineOutlined,
  RobotOutlined,
  DeliveredProcedureOutlined,
  CopyrightOutlined,
  FolderOpenOutlined,
  InsertRowAboveOutlined,
} from "@ant-design/icons";
import { apicall } from "../../utils/apicall/apicall";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState([]);

  const [statusModalOpen, setStatusModalOpen] = useState({
    open: false,
    data: {},
    orderId: null,
  });

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    getOrders();
  }, [statusModalOpen.open]);

  const getOrders = async () => {
    const result = await apicall({
      url: "vendors/62/orders",
    });

    setOrder(result.data.orders);
  };

  const getStatus = async () => {
    const result = await apicall({
      url: "vendors/62/statuses",
    });

    setStatus(result.data.statuses);
  };

  const series = [
    {
      name: "Guests",
      data: [1, 0, 0, -1],
    },
  ];
  const options = {
    xaxis: {
      categories: ["2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04"],
    },
  };

  const leftContainerData = [
    {
      title: "income",
      icon: <DollarCircleOutlined />,
      data: "रु22",
      color: "#5F8D4E",
    },
    {
      title: "sales",
      icon: <RiseOutlined />,
      data: "रु22",
      color: "#6ECCAF",
    },
    {
      title: "active products",
      icon: <FormOutlined />,
      data: "1",
      color: "#59C1BD",
    },
    {
      title: "out of stock",
      icon: <LineOutlined />,
      data: "1",
      color: "#DC3535",
    },
    {
      title: "products on moderations",
      icon: <DeliveredProcedureOutlined />,
      data: "1",
      color: "#975C8D",
    },
    {
      title: "disapproved",
      icon: <CopyrightOutlined />,
      data: "1",
      color: "#CF0A0A",
    },
    {
      title: "registered customers",
      icon: <FolderOpenOutlined />,
      data: "1",
      color: "#332FD0",
    },
    {
      title: "categories",
      icon: <InsertRowAboveOutlined />,
      data: "1",
      color: "#628E90",
    },
    {
      title: "web pages",
      icon: <RobotOutlined />,
      data: "1",
      color: "#B1B2FF",
    },
  ];

  const { TextArea } = Input;

  return (
    <>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardHeaderLeft}>Dashboard</div>
        <div className={styles.dashboardHeaderRight}>
          <RangePicker />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <AnalyticsCard>
            <div className={styles.cardWrapperAd}>
              <Button type="primary" onClick={() => setOpen(true)}>
                Contact Administration
              </Button>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapperAd}>
              <div> -रु10</div>
              <Button type="primary">Refill balance</Button>
            </div>
          </AnalyticsCard>

          {leftContainerData.map((dat, i) => (
            <AnalyticsCard key={i}>
              <div className={styles.cardWrapper}>
                <div
                  className={styles.cardIcon}
                  style={{
                    backgroundColor: dat.color + "41",
                    color: dat.color,
                  }}
                >
                  {dat.icon}
                  {/* <AiOutlinePlus style={{ color: "#865be9" }} /> */}
                </div>
                <div className={styles.cardValue}>{dat.data}</div>

                <div className={styles.cardTitle}>{dat.title}</div>
              </div>
            </AnalyticsCard>
          ))}
        </div>
        <div className={styles.rightContainer}>
          <LineCharts series={series} options={options} height={"300px"} />
          <div className={styles.margin} />
          <RecentOrders
            order={order}
            status={status}
            statusModalOpen={statusModalOpen}
            setStatusModalOpen={setStatusModalOpen}
          />
          <div className={styles.margin} />
          <div className={styles.osAndCpu}>
            {/* <OrderByStatus order={order} status={status} /> */}
            {/* <CurrentPlanUsage /> */}
          </div>
          <CurrentPlanUsage />
          <div className={styles.margin} />
          <RecentActivities />
        </div>
        <Modal
          title="Contact administrator"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Subject
"
              name="Subject
"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Your message to administrator"
              name="Your message to administrator"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Home;
