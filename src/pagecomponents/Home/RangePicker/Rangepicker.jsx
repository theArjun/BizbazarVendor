import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import styles from "./RangePicker.module.css";
// import format from "date-fns/format";
import "./index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerComp = ({ range, setRange, setLoad }) => {
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
      
      </div>

      <div ref={refOne} className={styles.calendarElement}>
        {open && (
          <DateRangePicker
            onChange={(item) => {
              setRange([item.range1]);
              setLoad((dat) => !dat);
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
