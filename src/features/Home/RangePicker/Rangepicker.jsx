import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import styles from "./RangePicker.module.css";
import format from "date-fns/format";
import "./index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useDebounce from "../../../utils/Hooks/useDebounce";
const INITIAL_PARAMS = {
  time_from: "",
  time_to: "",
};
const DateRangePickerComp = ({ params, setParams, date }) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [range, setRange] = useState([
    {
      startDate: new Date(date?.time_from * 1000),
      endDate: new Date(date?.time_to * 1000),
    },
  ]);
  const setTimePeriod = (values) => {
    INITIAL_PARAMS.time_from = Math.round(
      values.range1.startDate.getTime() / 1000
    );
    INITIAL_PARAMS.time_to = Math.round(values.range1.endDate.getTime() / 1000);
    let temp_params = `time_from=${INITIAL_PARAMS.time_from}&time_to=${INITIAL_PARAMS.time_to}`;
    setParams(temp_params);
    // queryClient.invalidateQueries(["dashboard", temp_params]);
  };
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    return () => document.removeEventListener("click", hideOnClickOutside);
  }, []);
  useDebounce(
    () => {
      setTimePeriod(item);
    },
    500,
    [item]
  );
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.calendarWrap}>
      <div className={styles.dateWrap} onClick={() => setOpen((open) => !open)}>
        {range[0]?.startDate && range[0]?.endDate
          ? `${format(range[0]?.startDate, "MM/dd/yyyy")} - ${format(
              range[0]?.endDate,
              "MM/dd/yyyy"
            )}`
          : "Select date range"}
      </div>

      <div ref={refOne} className={styles.calendarElement}>
        {open && (
          <DateRangePicker
            onChange={(item) => {
              setRange([item.range1]);
              setItem(item);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            className={styles.datepicker}
            months={1}
          />
        )}
      </div>
    </div>
  );
};

export default DateRangePickerComp;
