import { Outlet, Navigate } from "react-router-dom";
import useWindowSize from "./Hooks/useWindowSize";
import styles from "./index.module.css";
import TopNavbar from "./../component/TopNavbar/TopNavbar";
import Navbar from "./../component/Navbar/Navbar";

const PrivateRoutes = () => {
  const windowSize = useWindowSize();

  return sessionStorage.getItem("userinfo") ? (
    <div
      className={styles.container}
      style={{ height: windowSize.height + "px" }}
    >
      <TopNavbar />
      <Navbar />

      <div
        className={styles.midContainer}
        // style={{ height: `${windowSize.height - 78 - 65}px` }}
        style={{ height: `${windowSize.height - 78 - 40}px` }}
      >
        <div className={styles.outletContain}>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
