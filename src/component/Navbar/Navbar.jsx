import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { navItem } from "./navitem";
import cx from "classnames";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeLink, setAvtivelink] = useState({
    main: "",
    sub: "none",
  });

  useEffect(() => {
    const loc = location.pathname.split("/");

    setAvtivelink({
      main:
        loc[1].split("%20").join(" ") === ""
          ? "Dashboard"
          : loc[1].split("%20").join(" "),
      sub: loc[2] ? loc[2].split("%20").join(" ") : "none",
    });
  }, [location.pathname]);

  return (
    <div className={cx(styles.container)}>
      {navItem.map((dat, i) => (
        <div
          className={cx(
            styles.button,
            activeLink.main === dat.navName ? styles.bgColor : null
          )}
          key={i}
          onClick={() => {
            if (!dat?.dropdown) {
              navigate(dat.navName === "Dashboard" ? "" : dat.navName);
            }
          }}
        >
          {dat.navName}
          {dat?.dropdown?.length > 0 && (
            <HiChevronDown className={styles.icons} />
          )}
          {dat?.dropdown && (
            <div className={styles.dropdown}>
              {dat.dropdown.map((datum, index) => (
                <div
                  key={index}
                  className={cx(
                    styles.dropdownItems,
                    activeLink.sub === datum.subNav
                      ? styles.activeDropdown
                      : null
                  )}
                  onClick={() => {
                    navigate(
                      datum.subNav === "Products" ||
                        datum.subNav === "Categories"
                        ? `${datum.subNav}`
                        : `${dat.navName}/${datum.subNav}`
                    );
                  }}
                >
                  {datum.subNav}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
