import React, { lazy, useContext, useEffect } from "react";
import "./App.css";
import cx from "classnames";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuspenseWrapper from "./component/SuspenseWrapper/SuspenseWrapper";
import { DarkModeContext } from "./context/DarkAndLightMode/DarkAndLightContex";
import PrivateRoutes from "./utils/PrivateRoutes";
import { loadTableData } from "./redux/features/products/productSlice";
import { saveCategories } from "./redux/features/products/productSlice";
import { apicall } from "./utils/apicall/apicall";
import { Button, Result } from "antd";
import PublicRoute from "./utils/PublicRoute";

const CouponVoucherReport = lazy(() =>
  import("./pages/Reports/CouponVoucherReport/CouponVoucherReport")
);

const VendorTransactionDetails = lazy(() =>
  import("./pages/Reports/VendorTransactionDetails/VendorTransactionDetails")
);

const OrderDetailsReport = lazy(() =>
  import("./pages/Reports/OrderDetailsReport/OrderDetailsReport")
);

const GiftCards = lazy(() => import("./pages/Reports/GiftCards/GiftCards"));

const Home = lazy(() => import("./pages/Home/Home"));
const ProductCountReport = lazy(() =>
  import("./pages/Reports/ProductCountReport/ProductCountReport")
);
const ShippingMethod = lazy(() =>
  import("./pages/Setting/ShippingMethod/ShippingMethod")
);
const ViewOrders = lazy(() => import("./pages/Orders/ViewOrders/ViewOrders"));
const CallRequests = lazy(() =>
  import("./pages/Orders/CallRequests/CallRequests")
);
const ReturnRequests = lazy(() =>
  import("./pages/Orders/ReturnRequests/ReturnRequests")
);
const Products = lazy(() => import("./pages/Product/Products"));

const AddProduct = lazy(() => import("./pages/Product/AddProduct/AddProduct"));

const Edit = lazy(() => import("./pages/Product/Edit/Edit"));

const Reviews = lazy(() => import("./pages/Product/Reviews/Reviews"));

const CuntomerCommunication = lazy(() =>
  import("./pages/CuntomerCommunication/CuntomerCommunication")
);

const Promotions = lazy(() => import("./pages/Promotions/Promotions"));

const ProductBundles = lazy(() =>
  import("./pages/ProductBundles/ProductBundles")
);

const Accounting = lazy(() => import("./pages/Accounting/Accounting"));

const OrderDetails = lazy(() =>
  import("./pages/Orders/OrderDetails/OrderDetails")
);

const Login = lazy(() => import("./pages/Login/Login"));
const AccountOrderDetails = lazy(() =>
  import("./pages/Reports/AccountOrderDetails/AccountOrderDetails")
);
const AddCatalogPromotion = lazy(() =>
  import("./pages/AddCatalogPromotion/AddCatalogPromotion")
);
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Seller = lazy(() => import("./pages/Seller/Seller"));

const ResetPassword = lazy(() => import("./pages/Resetpassword/ResetPassword"));
const ViewShippingMethod = lazy(() =>
  import("./pages/Setting/ViewShippingMethod/ViewShippingMethod")
);

function App() {
  const dispatch = useDispatch();
  dispatch(loadTableData);
  useEffect(() => {
    getAllCategories();
  }, []);
  const { darkMode } = useContext(DarkModeContext);
  const getAllCategories = async () => {
    const result = await apicall({
      url: `categories`,
    });
    if (result.data) {
      await dispatch(saveCategories(result.data.categories));
    }
  };

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <SuspenseWrapper>
                <Home />
              </SuspenseWrapper>
            }
            path="/"
            exact
          />
          <Route
            element={
              <SuspenseWrapper>
                <Seller />
              </SuspenseWrapper>
            }
            path="/SellerInformation"
            exact
          />
          <Route
            element={
              <SuspenseWrapper>
                <Profile />
              </SuspenseWrapper>
            }
            path="/Edit Profile"
          />{" "}
          {/** Dashboard */}
          {/**Order routing */}
          {/**view orders */}
          <Route
            element={
              <SuspenseWrapper>
                <ViewOrders />
              </SuspenseWrapper>
            }
            path="/orders/View Orders"
          ></Route>
          {/** Cancel orders*/}
          <Route
            element={
              <SuspenseWrapper>
                <CallRequests />
              </SuspenseWrapper>
            }
            path="/orders/Call Request"
          ></Route>{" "}
          {/** Return Request*/}
          <Route
            element={
              <SuspenseWrapper>
                <ReturnRequests />
              </SuspenseWrapper>
            }
            path="/orders/Return Request"
          ></Route>
          {/** product routing */}
          <Route
            element={
              <SuspenseWrapper>
                <Products />
              </SuspenseWrapper>
            }
            path="/products/Products"
          ></Route>
          {/** product add  */}
          <Route
            element={
              <SuspenseWrapper>
                <AddProduct />
              </SuspenseWrapper>
            }
            path="/products/Products/Add Product"
          ></Route>{" "}
          {/** product edit  */}
          <Route
            element={
              <SuspenseWrapper>
                <Edit />
              </SuspenseWrapper>
            }
            path="/products/Products/Edit Product"
          ></Route>
          {/** product Reviews */}
          <Route
            element={
              <SuspenseWrapper>
                <Reviews />
              </SuspenseWrapper>
            }
            path="/products/Reviews"
          ></Route>
          {/**Message Center */}
          {/**Customer Commnunications */}
          <Route
            element={
              <SuspenseWrapper>
                <CuntomerCommunication />
              </SuspenseWrapper>
            }
            path="/Message Center/Customer Commnunications"
          ></Route>
          {/**Admins Communications*/}
          <Route
            element={
              <SuspenseWrapper>
                <Promotions />
              </SuspenseWrapper>
            }
            path="/Message Center/Admins Communications"
          ></Route>
          {/**Marketing*/}
          {/**Promotions*/}
          {/**Add Catalog Promotion */}
          <Route
            element={
              <SuspenseWrapper>
                <AddCatalogPromotion />
              </SuspenseWrapper>
            }
            path="/Marketing/Add Catalog Promotion"
          ></Route>
          <Route
            element={
              <SuspenseWrapper>
                <Promotions />
              </SuspenseWrapper>
            }
            path="/Marketing/Promotions"
          ></Route>
          {/**Product Bundles*/}
          <Route
            element={
              <SuspenseWrapper>
                <ProductBundles />
              </SuspenseWrapper>
            }
            path="/Marketing/Product Bundles"
          ></Route>
          {/**Accounting*/}
          <Route
            element={
              <SuspenseWrapper>
                <Accounting />
              </SuspenseWrapper>
            }
            path="/Accounting"
          ></Route>
          {/**Setting*/}
          {/**Shipping Methods*/}
          <Route
            element={
              <SuspenseWrapper>
                <ShippingMethod />
              </SuspenseWrapper>
            }
            path="/Setting/Shipping Methods"
          ></Route>
          {/**View Shipping Methods*/}
          <Route
            element={
              <SuspenseWrapper>
                <ViewShippingMethod />
              </SuspenseWrapper>
            }
            path="/Setting/Shipping Methods/:id"
          ></Route>
          {/**Logos And Styles*/}
          <Route
            element={<>Logos And Styles</>}
            path="/Setting/Logos And Styles"
          ></Route>
          {/**Files*/}
          <Route element={<>Files</>} path="/Setting/Files"></Route>
          {/**Reports*/}
          {/**Account Ordes Details*/}
          <Route
            element={
              <SuspenseWrapper>
                <AccountOrderDetails />
              </SuspenseWrapper>
            }
            path="/Reports/Account Orders Details"
          ></Route>
          {/**Gift Cards*/}
          <Route
            element={
              <SuspenseWrapper>
                <GiftCards />
              </SuspenseWrapper>
            }
            path="/Reports/Gift Cards"
          ></Route>
          {/**Order Details*/}
          <Route
            element={
              <SuspenseWrapper>
                <OrderDetailsReport />
              </SuspenseWrapper>
            }
            path="/Reports/Order Details"
          ></Route>
          {/**Vendor Transaction Details*/}
          <Route
            element={
              <SuspenseWrapper>
                <VendorTransactionDetails />
              </SuspenseWrapper>
            }
            path="/Reports/Vendor Transaction Details"
          ></Route>
          {/**Coupon Voucher Report*/}
          <Route
            element={
              <SuspenseWrapper>
                <CouponVoucherReport />
              </SuspenseWrapper>
            }
            path="/Reports/Coupon Voucher Report"
          ></Route>
          {/**Product Count Reports*/}
          <Route
            element={
              <SuspenseWrapper>
                <ProductCountReport />
              </SuspenseWrapper>
            }
            path="/Reports/Product Count Reports"
          ></Route>
          {/**Monthly Order Report*/}
          <Route
            element={<>Monthly Order Report</>}
            path="/Reports/Monthly Order Report"
          ></Route>
          {/**Order details */}
          <Route
            element={
              <SuspenseWrapper>
                <OrderDetails />
              </SuspenseWrapper>
            }
            path="/Orders/orders details/:id"
          ></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route
            element={
              <SuspenseWrapper>
                <Login />
              </SuspenseWrapper>
            }
            path="/login"
          ></Route>
          <Route
            element={
              <SuspenseWrapper>
                <ResetPassword />
              </SuspenseWrapper>
            }
            path="/resetpassword"
          ></Route>
        </Route>
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
        />
      </Routes>
    </Router>
  );
}

export default App;
