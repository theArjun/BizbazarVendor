import React from "react";
import styles from "./Options.module.css";
import { useState } from "react";
import { Button, Empty, Result } from "antd";
import CreateModal from "./components/CreateModal/CreateModal";
import AddMoreModal from "./components/AddMoreModal/AddMoreModal";
import { Link } from "react-router-dom";
import { useGetProductOptions } from "../../../../apis/ProductApi";
import { useMemo } from "react";
import useDebounce from "../../../../utils/Hooks/useDebounce";
const Options = ({ options_data = [], option_keys = [] }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [addMoreModal, setAddMoreModal] = useState(false);
  const [bottom, setBottom] = useState(false);
  const {
    isLoading: optionsLoading,
    data: optionsData,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetProductOptions();
  const options = useMemo(() => {
    let temp = [];
    optionsData?.pages?.map((el) => {
      temp = [...temp, ...el?.data?.product_options];
    });
    return temp;
  }, [optionsData]);
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
    <div className={styles.options}>
      <div className={styles.options_container}>
        <div className={styles.options_header}>
          <div className={styles.options_buttons}>
            <Button type="primary" onClick={() => setAddMoreModal(true)}>
              Add more options{" "}
            </Button>
            <Button type="primary" onClick={() => setOpenCreateModal(true)}>
              Create option{" "}
            </Button>
          </div>
        </div>
        <div className={styles.options_body}>
          {!options_data.length && (
            <div className={styles.no_data}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
          {options_data?.map((el, i) => {
            return (
              <div key={i} className={styles.option_item}>
                <Link to="#">{el?.option_name}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <CreateModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
      <AddMoreModal
        openCreateModal={addMoreModal}
        setOpenCreateModal={setAddMoreModal}
        options={options}
        loading={optionsLoading || isFetchingNextPage}
        handleScroll={handleScroll}
        option_keys={option_keys}
      />
    </div>
  );
};

export default Options;
