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

const ViewRateAreas = lazy(() =>
  import("./pages/Setting/ShippingMethod/ViewRateAreas/ViewRateAreas")
);

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

import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";

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
const BulkAddition = lazy(() => import("./pages/Product/BulkAddition/BulkAddition"));

const AddProduct = lazy(() => import("./pages/Product/AddProduct/AddProduct"));

const Edit = lazy(() => import("./pages/Product/Edit/Edit"));

const Reviews = lazy(() => import("./pages/Product/Reviews/Reviews"));
const ReviewDetail = lazy(() => import("./pages/Product/Reviews/ReviewDetail"));

const CustomerCommunication = lazy(() =>
  import("./pages/MessageCenter/CustomerCommunication/CustomerCommunication")
);
const CustomerMessages = lazy(() =>
  import("./pages/MessageCenter/CustomerMessages/CustomerMessages")
);

const AdminMessages = lazy(() =>
  import("./pages/MessageCenter/AdminMessage/AdminMessages")
);

const AdminCommunication = lazy(() =>
  import("./pages/MessageCenter/AdminCommunication/AdminCommunication")
);

const Promotions = lazy(() => import("./pages/Promotions/Promotions"));
const ExplorePromotion = lazy(() => import("./pages/Promotions/ExplorePromotion"));

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

export const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
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
        {  /*Bulk Product addition  */}
          <Route
            element={
              <SuspenseWrapper>
                <BulkAddition />
              </SuspenseWrapper>
            }
            path="/products/BulkProductAddition"
          ></Route>{" "}
          {/** product edit  */}
          <Route
            element={
              <SuspenseWrapper>
                <Edit />
              </SuspenseWrapper>
            }
            path="/products/Products/Edit Product/:id"
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
           {/** product Reviews Detail */}
          <Route
            element={
              <SuspenseWrapper>
                <ReviewDetail />
              </SuspenseWrapper>
            }
            path="/products/Reviews/:id"
          ></Route>
          {/**Message Center */}
          {/**Customer Commnunications */}
          <Route
            element={
              <SuspenseWrapper>
                <CustomerCommunication />
              </SuspenseWrapper>
            }
            path="/Message Center/Customer Communications"
          ></Route>
          <Route
          element={
            <SuspenseWrapper>
              <CustomerMessages />
            </SuspenseWrapper>
          }
          path="/Message Center/Customer Communications/CustomerMessage/:id"
        ></Route>
        
          {/**Admins Communications*/}
          <Route
            element={
              <SuspenseWrapper>
                <AdminCommunication />
              </SuspenseWrapper>
            }
            path="/Message Center/Admins Communications"
          ></Route>

          <Route
          element={
            <SuspenseWrapper>
              <AdminMessages />
            </SuspenseWrapper>
          }
          path="/Message Center/Admins Communications/AdminMessage/:id"
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
          <Route
            element={
              <SuspenseWrapper>
                <ExplorePromotion />
              </SuspenseWrapper>
            }
            path="/Marketing/Promotions/:id"
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
          {/**View Rate Areas*/}
          <Route
            element={
              <SuspenseWrapper>
                <ViewRateAreas />
              </SuspenseWrapper>
            }
            path="/Setting/Rate Areas/:id"
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
        ></Route>
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
