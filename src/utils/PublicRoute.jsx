import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  return !localStorage.getItem("userinfo") ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
