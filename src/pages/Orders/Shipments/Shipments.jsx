import React, { useEffect, useMemo, useState } from "react";
import styles from "./Shipments.module.css";
import { SearchForShipment, TableForShipment } from "../..";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useGetShipments } from "../../../apis/ShipmentApi";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  cname: "",
  full_order_shipment: "",
  order_id: "",
  status: "",
  sort_order: "",
  sort_by: "",
};
const Shipments = () => {
  const [params, setParams] = useState(INITIAL_PARAMS);
  const [bottom, setBottom] = useState(false);
  const [sortBy, setSortBy] = useState("");
  // Handling sorting item using shipment  id
  useEffect(() => {
    setParams((items) => ({
      ...items,
      sort_by: "id",
      sort_order: sortBy?.order === "ascend" ? "asc" : "desc",
    }));
  }, [sortBy]);
  const {
    isLoading: shipmentLoading,
    fetchNextPage,
    isFetchingNextPage,
    data: shipmentData,
  } = useGetShipments(params);
  //  Defining constant to hold incoming data 9from shipment
  const data = useMemo(() => {
    let temp = [];
    shipmentData?.pages?.map((el, i) => {
      temp = [...temp, ...el?.data?.shipments];
    });
    return temp;
  }, [shipmentData]);
  // handle data when the there  is scroll in product table
  const handleScroll = (event) => {
    const condition =
      event.target.scrollTop + event.target.offsetHeight + 100 >
      event.target.scrollHeight;
    setBottom(condition);
  };
  // Handle infinite scroll
  useDebounce(
    () => {
      if (!bottom) {
        return;
      }
      fetchNextPage();
    },
    300,
    [bottom]
  );
  return (
    <div className={styles.shipment}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="">Orders</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Shipments</Breadcrumb.Item>
      </Breadcrumb>
      <SearchForShipment params={params} setParams={setParams} />
      <TableForShipment
        loading={shipmentLoading || isFetchingNextPage}
        shipments={data}
        handleScroll={handleScroll}
        setSortBy={setSortBy}
      />
    </div>
  );
};

export default Shipments;
