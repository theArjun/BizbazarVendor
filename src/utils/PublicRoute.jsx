import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  return !sessionStorage.getItem("userinfo") ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
