import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import styles from "./RangePicker.module.css";
import format from "date-fns/format";
import "./index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerComp = ({ range, setRange }) => {
  const [open, setOpen] = useState(false);
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
