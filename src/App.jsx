import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoutes";
import { Result } from "antd";
import PublicRoute from "./utils/PublicRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>{PrivateRoute}</Route>

          <Route element={<PublicRoute />}>{PublicRoutes}</Route>
          <Route
            path="*"
            element={
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<a href="/">Back Home</a>}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
