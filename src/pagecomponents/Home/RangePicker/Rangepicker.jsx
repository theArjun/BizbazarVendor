import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import styles from "./RangePicker.module.css";
import format from "date-fns/format";
import "./index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const INITIAL_PARAMS = {
  time_from: "",
  time_to: "",
};
const DateRangePickerComp = ({ params, setParams }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      // endDate: addDays(new Date(), -30),
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
              setTimePeriod(item);
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
