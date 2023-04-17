import { Dropdown, Input, Menu, Tag, Select } from "antd";
import OrderStatusModal from "../../../../../component/OrderStatusModal/OrderStatusModal";
import styles from "./RightContain.module.css";
import { useGetCarriers, useGetManager } from "../../../../../apis/OrdersApi";
import { useMemo } from "react";
function RightContain({
  orderDetail,
  statusModalOpen,
  setStatusModalOpen,
  setUpdateState,
  updateState,
  status,
}) {
  const { data: carrierData, isLoading: carrierLoading } = useGetCarriers();
  const { data: managerData, isLoading: managerLoading } = useGetManager();
  //Getting manager
  const managers = useMemo(() => {
    return managerData?.data?.vendormanagers || [];
  }, [managerData]);
  // Getting Carriers
  const carriers = useMemo(() => {
    let temp = Object.entries(carrierData?.data?.carriers || {}).map((dat) => ({
      label: dat[1]?.name,
      value: dat[0],
    }));
    return temp || [];
  }, [carrierData]);

  const menu = (filterStatus, objId) => (
    <Menu
      items={status
        .filter((datt, index) => filterStatus != datt?.description)
        .map((dat, i) => ({
          key: i,
          label: (
            <div
              key={i}
              onClick={() => {
                setStatusModalOpen({
                  open: true,
                  data: dat,
                  orderId: objId,
                });
              }}
              target="_blank"
              style={{ color: dat?.params?.color }}
            >
              {dat.description}
            </div>
          ),
        }))}
    />
  );

  const getStatusTag = (data, obj) => {
    const [statusOfRow] = status.filter((dat) => dat.status === data);
    return (
      <Dropdown overlay={menu(statusOfRow?.description, obj)}>
        <Tag className={styles.dpContainer} color={statusOfRow?.params?.color}>
          {statusOfRow?.description}
        </Tag>
      </Dropdown>
    );
  };
  return (
    <div className={styles.container}>
      <div>
        {" "}
        <lable className={styles.label}>Status</lable>{" "}
        {getStatusTag(orderDetail.status, orderDetail.order_id)}
      </div>
      <div> </div>
      <div>
        {" "}
        <lable className={styles.label}>Payment information</lable>
      </div>
      <div>
        {" "}
        Method {orderDetail?.payment_method?.payment}{" "}
        {orderDetail?.payment_method?.description}
      </div>
      <div style={{ display: "flex" }}>
        {" "}
        <lable className={styles.label}>Manager</lable> <br />
        <Select
          loading={managerLoading}
          onChange={(a) => setUpdateState((prev) => ({ ...prev, manager: a }))}
          defaultValue={updateState?.manager || orderDetail?.issuer_id}
          // onChange={(a)=>setManagerApi(a)}
          style={{ width: "100%", marginLeft: "10px" }}
          dropdownMatchSelectWidth={false}
          options={[
            { label: "None", value: "0" },
            ...managers.map((dat) => ({
              value: dat.id,
              label: dat.text,
            })),
          ]}
        />
      </div>
      <div>
        {orderDetail?.issuer_data?.firstname}{" "}
        {orderDetail?.issuer_data?.lastname}{" "}
      </div>
      <div>
        {" "}
        <lable className={styles.label}>Shipping information</lable>
      </div>
      {orderDetail?.shipping?.map((dat, i) => (
        <div key={i}>
          <div>{dat?.group_name}</div>
          <div>Method : {dat?.shipping}</div>
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <div>Tracking Number </div>
        <Input
          defaultValue={
            updateState?.trackingNumber ||
            orderDetail?.shipment_info?.length > 0
              ? orderDetail?.shipment_info[0]?.tracking_number
              : ""
          }
          onChange={(a) =>
            setUpdateState((prev) => ({
              ...prev,
              trackingNumber: a.target.value,
            }))
          }
          style={{ height: "2.5em" }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px" }}>Carrier </div>{" "}
        <Select
          // defaultValue="HangZhou"
          loading={carrierLoading}
          style={{ width: 120 }}
          dropdownMatchSelectWidth={false}
          defaultValue={
            updateState?.carrier || orderDetail?.shipment_info?.length > 0
              ? orderDetail?.shipment_info[0]?.carrier
              : ""
          }
          onChange={(a) => setUpdateState((prev) => ({ ...prev, carrier: a }))}
          options={[{ label: "None", value: " " }, ...carriers]}
        />
      </div>
      <OrderStatusModal
        statusModalOpen={statusModalOpen}
        setStatusModalOpen={setStatusModalOpen}
      />
    </div>
  );
}

export default RightContain;
