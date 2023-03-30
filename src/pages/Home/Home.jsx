import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import LineCharts from "../../pagecomponents/Home/Charts/LineCharts/LineCharts";
import BarCharts from "../../pagecomponents/Home/Charts/Barcharts/Barcharts";
import AnalyticsCard from "./../../pagecomponents/Home/Cards/AnalyticsCard/AnalyticsCard";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import RecentOrders from "./../../pagecomponents/Home/RecentOrders/RecentOrders";
import RecentActivities from "./../../pagecomponents/Home/RecentActivities/RecentActivities";
import CurrentPlanUsage from "./../../pagecomponents/Home/CurrentPlanUsage/CurrentPlanUsage";
import Spinner from "../../component/Spinner/Spinner";
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

import DateRangePickerComp from "../../pagecomponents/Home/RangePicker/Rangepicker";
import { addDays } from "date-fns";
import ProductCountReport from "./../../pagecomponents/Reports/ProductCountReport/ProductCountReport";
import { useGetDashboardData } from "../../apis/DashboardApi";
import { useCreateAdminMessage } from "../../apis/MessageCenterApi";
const { id } = JSON.parse(localStorage.getItem("userinfo"));
const INITIAL_MESSAGE = {
  thread: {
    object_type: "",
    object_id: 0,
    communication_type: "vendor_to_admin",
    subject: "api message",
    companies: {
      0: id,
    },
    message: " ",
  },
};
const Home = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([]);
  const [order, setOrder] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      // endDate: addDays(new Date(), -30),
    },
  ]);

  const [statusModalOpen, setStatusModalOpen] = useState({
    open: false,
    data: {},
    orderId: null,
  });
  const { data: dashboardData, isLoading: dashboardLoading } =
    useGetDashboardData();
  const { mutate, isLoading: sendLoading } = useCreateAdminMessage();
  useEffect(() => {
    if (dashboardData?.data) {
      console.log(
        "🚀 ~ file: Home.jsx:50 ~ useEffect ~ dashboardData?.data:",
        dashboardData?.data
      );
      setData(dashboardData.data);
      setOrder(dashboardData?.data?.recent_orders?.all || []);
    }
  }, [dashboardData]);
  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    getOrders();
  }, [statusModalOpen.open]);

  const getOrders = async () => {
    const result = await apicall({
      url: "orders",
    });

    // setOrder(result.data.orders);
  };

  const getStatus = async () => {
    const result = await apicall({
      url: "statuses",
    });

    setStatus(result.data.statuses);
  };

  const gRN = () => {
    return Math.ceil(Math.random() * (100 + 100) - 100);
  };
  // send message to admin
  const onFinish = (values) => {
    console.log(values);
    INITIAL_MESSAGE.thread.message = values.message;
    INITIAL_MESSAGE.thread.subject = values.subject;
    mutate(INITIAL_MESSAGE, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  const onFinishFailed = () => {};
  const series = [
    {
      name: "Guests",
      data: [
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
        gRN(),
      ],
    },
  ];
  const options = {
    stroke: {
      curve: "smooth",
    },
    colors: ["#218c74"],

    // xaxis: {
    //   categories: ["2019-05-01", "2019-05-02", "2019-05-03", "2019-05-04"],
    // },
  };

  const leftContainerData = [
    {
      title: "sales",
      icon: <RiseOutlined />,
      data: "रु22",
      color: "#6ECCAF",
    },
  ];

  const { TextArea } = Input;
  if (dashboardLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardHeaderLeft}>Dashboard</div>
        <div className={styles.dashboardHeaderRight}>
          {/* <RangePicker value={dateRange} onChange={(e, a) => setDateRange(e)} /> */}
          <DateRangePickerComp range={range} setRange={setRange} />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <AnalyticsCard>
            <div className={styles.cardWrapperAd}>
              <Button
                style={{ width: "80%" }}
                type="primary"
                onClick={() => setOpen(true)}
              >
                Contact Administration
              </Button>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapperAd}>
              <div> रु{Math.round(data?.current_balance || 0)}</div>
              <Button type="primary">Refill balance</Button>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#5F8D4E" + "41",
                  color: "#5F8D4E",
                }}
              >
                <DollarCircleOutlined />
              </div>
              <div className={styles.cardValue}>
                रु
                {data.period_income || 0}
              </div>

              <div className={styles.cardTitle}>Income</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#59C1BD" + "41",
                  color: "#59C1BD",
                }}
              >
                <FormOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.general_stats?.products?.total_products || 0}
              </div>

              <div className={styles.cardTitle}>Active products</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#DC3535" + "41",
                  color: "#DC3535",
                }}
              >
                <LineOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.general_stats?.products?.out_of_stock_products || 0}
              </div>

              <div className={styles.cardTitle}> Out of stock</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#975C8D" + "41",
                  color: "#975C8D",
                }}
              >
                <DeliveredProcedureOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.products_on_moderation || 0}
              </div>

              <div className={styles.cardTitle}> Products on moderation</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#CF0A0A" + "41",
                  color: "#CF0A0A",
                }}
              >
                <CopyrightOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.disapproved_count || 0}
              </div>

              <div className={styles.cardTitle}> Disapproved</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#332FD0" + "41",
                  color: "#332FD0",
                }}
              >
                <FolderOpenOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.general_stats?.customers?.registered_customers || 0}
              </div>

              <div className={styles.cardTitle}>Registered Customers</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#628E90" + "41",
                  color: "#628E90",
                }}
              >
                <InsertRowAboveOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.general_stats?.categories?.total_categories || 0}
              </div>

              <div className={styles.cardTitle}>Categories</div>
            </div>
          </AnalyticsCard>
          <AnalyticsCard>
            <div className={styles.cardWrapper}>
              <div
                className={styles.cardIcon}
                style={{
                  backgroundColor: "#B1B2FF" + "41",
                  color: "#B1B2FF",
                }}
              >
                <RobotOutlined />
              </div>
              <div className={styles.cardValue}>
                {data?.general_stats?.pages?.total_pages || 0}
              </div>

              <div className={styles.cardTitle}>Web pages</div>
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
                </div>
                <div className={styles.cardValue}>{dat.data}</div>

                <div className={styles.cardTitle}>{dat.title}</div>
              </div>
            </AnalyticsCard>
          ))}
        </div>

        <div className={styles.rightContainer}>
          <BarCharts series={series} options={options} height={"300px"} />
          <div className={styles.margin} />
          <LineCharts series={series} options={options} height={"300px"} />
          <div className={styles.margin} />
          <RecentOrders order={order} status={status} />
          <div className={styles.margin} />
          <div className={styles.osAndCpu}></div>
          <div className={styles.container_recent_orders}>
            <div className="heading-tab">Vendor products</div>

            <ProductCountReport />
          </div>
          <div className={styles.margin} />
          <CurrentPlanUsage />
          <div className={styles.margin} />
          <RecentActivities />
        </div>
        <div></div>
        <Modal
          title="Contact administrator"
          centered
          open={open}
          onCancel={() => setOpen(false)}
          cancelButtonProps={{
            style: {
              display: "none",
            },
          }}
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          width={1000}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: "" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Your message to administrator"
              name="message"
              rules={[{ required: true, message: "" }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <div className={styles.submit_button}>
              <Button loading={sendLoading} htmlType="submit" type="primary">
                Send
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Home;
