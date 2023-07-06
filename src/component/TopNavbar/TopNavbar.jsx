import React, { useEffect, useState } from "react";
import { config } from "../../config/config";
import styles from "./TopNavbar.module.css";
import { HiOutlineMenuAlt1, HiChevronDown } from "react-icons/hi";
import { Drawer } from "antd";
import { navItem } from "../Navbar/navitem";
import { useNavigate, useLocation } from "react-router-dom";
import cx from "classnames";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import { handleLogout } from "../../utils/auth/auth";
import { useGetProfileInformation } from "../../apis/ProfileApi";
import { useMemo } from "react";
import Axios from "../../config/apiConfig";
function TopNavbar() {
  let { user_id, name, phone } = JSON.parse(sessionStorage.getItem("userinfo"));
  const windowsize = useWindowSize();
  const navigate = useNavigate();
  const locate = useLocation();
  const { data: profileData } = useGetProfileInformation(user_id);
  const visitStore = async () => {
    let company = await Axios.get("/Companies");
    const seo_name = company?.data?.company_data?.seo_name;
    window.open(`${config.BASE_URL}${seo_name}`, "_blank");
  };
  const [activeLink, setAvtivelink] = useState({
    main: "",
    sub: "none",
  });

  const [openSideBar, setOpenSideBar] = useState(false);
  const getProfileData = useMemo(() => {
    if (profileData?.data) {
      return profileData?.data?.data;
    }
    return {};
  }, [profileData]);
  useEffect(() => {
    const loc = locate.pathname.split("/");

    setAvtivelink({
      main:
        loc[1].split("%20").join(" ") === ""
          ? "Dashboard"
          : loc[1].split("%20").join(" "),
      sub: loc[2] ? loc[2].split("%20").join(" ") : "none",
    });
  }, [locate.pathname]);

  const img =
    "https://d20g9rk0b3pszo.cloudfront.net/images/logos/565/Asset-2_8dbd-l8_1lh5-00.png?t=1667197092";

  const profile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU";
  return (
    <div className={styles.container}>
      <div className={styles.desktopAndTab}>
        <div className={styles.visit_store_text} onClick={() => visitStore()}>
          {" "}
          <span>Storefront</span>
        </div>
      </div>
      <div className={styles.mobile}>
        <HiOutlineMenuAlt1
          className={styles.icons}
          onClick={() => setOpenSideBar((prev) => !prev)}
        />
      </div>
      <div>
        <img src={img} className={styles.logo} />
      </div>
      <div className={styles.profile}>
        <div className={styles.profileWrapper}>
          <div>
            <div className={styles.profileName}>
              <span>
                {getProfileData?.firstname
                  ? getProfileData?.firstname
                  : String(name).split(" ")[0]}
              </span>
              &nbsp;
              <span>
                {getProfileData?.lastname
                  ? getProfileData?.lastname
                  : String(name).split(" ")[1]}
              </span>
            </div>
            <div className={styles.profilerole}>
              {getProfileData?.phone ? getProfileData?.phone : phone}
            </div>
          </div>

          <div>
            <img src={profile} className={styles.profileImage} />
          </div>
        </div>
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownItems}
            onClick={() => {
              navigate("Edit Profile");
            }}
          >
            Edit profile
          </div>
          <div
            className={styles.dropdownItems}
            onClick={() => {
              navigate("SellerInformation");
            }}
          >
            Seller info
          </div>
          <div className={styles.dropdownItems} onClick={() => handleLogout()}>
            Logout
          </div>
        </div>
      </div>
      {windowsize.width < 800 && (
        <Drawer
          className={styles.mobile1}
          // title="Drawer with extra actions"
          placement={"left"}
          width={400}
          onClose={() => setOpenSideBar((prev) => !prev)}
          open={openSideBar}
        >
          <div
            className={styles.visit_store_text}
            style={{
              // background: "#c4b1f385",
              color: "#9b78ec",
              fontWeight: "400",
              padding: "10px 0",
            }}
            onClick={() => visitStore()}
          >
            Storefront
          </div>
          {navItem.map((dat, i) => (
            <div className={styles.navItem} key={i}>
              <div
                className={cx(
                  styles.navItemName,
                  activeLink.main === dat.navName ? styles.bgColor : null
                )}
                onClick={() => {
                  if (!dat?.dropdown) {
                    navigate(dat.navName === "Dashboard" ? "" : dat.navName);
                    setOpenSideBar((prev) => !prev);
                  }
                }}
              >
                {dat.navName}{" "}
                {dat?.dropdown?.length > 0 && (
                  <HiChevronDown className={styles.dropdownicons} />
                )}
              </div>

              {dat.dropdown && (
                <div className={styles.navdropdown}>
                  {dat.dropdown.map((datum, index) => (
                    <div
                      key={index}
                      className={cx(
                        styles.navDropdownItem,
                        activeLink.sub === datum.subNav ? styles.bgColor : null
                      )}
                      onClick={() => {
                        navigate(
                          datum.subNav === "Products" ||
                            datum.subNav === "Categories"
                            ? `${datum.subNav}`
                            : `${dat.navName}/${datum.subNav}`
                        );
                        setOpenSideBar((prev) => !prev);
                      }}
                    >
                      {datum.subNav}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Drawer>
      )}
    </div>
  );
}

export default TopNavbar;
