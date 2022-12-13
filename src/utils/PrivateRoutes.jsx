import { Outlet, Navigate } from "react-router-dom";
// import TopNavbar from "./../component/TopNavbar/TopNavbar";
// import second from "./../component/Navbar/Navbar";
import SuspenseWrapper from "../component/SuspenseWrapper/SuspenseWrapper";
import useWindowSize from "./Hooks/useWindowSize";
import styles from "./index.module.css";

const PrivateRoutes = () => {
  const windowSize = useWindowSize();

  return localStorage.getItem("login") ? (
    <div
      className={styles.container}
      style={{ height: windowSize.height + "px" }}
    >
      <SuspenseWrapper path="component/TopNavbar/TopNavbar" />
      <SuspenseWrapper path="component/Navbar/Navbar" />

      <div
        className={styles.midContainer}
        style={{ height: `${windowSize.height - 78 - 65}px` }}
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
