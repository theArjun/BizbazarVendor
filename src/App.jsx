import React, { lazy, useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuspenseWrapper from "./component/SuspenseWrapper/SuspenseWrapper";
import { DarkModeContext } from "./context/DarkAndLightMode/DarkAndLightContex";
import PrivateRoutes from "./utils/PrivateRoutes";

import { Result } from "antd";
import PublicRoute from "./utils/PublicRoute";
const Tweak = lazy(() => import("./pages/Orders/Tweak/Tweak"));
const MonthlyOrderReport = lazy(() =>
  import("./pages/Reports/MonthlyOrderReport/MonthlyOrderReport")
);

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

import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { GeneralContextProvider } from "./ContextProvider/ContextProvider";

const Home = lazy(() => import("./pages/Home/Home"));
const ProductCountReport = lazy(() =>
  import("./pages/Reports/ProductCountReport/ProductCountReport")
);
const ShippingMethod = lazy(() =>
  import("./pages/Setting/ShippingMethod/ShippingMethod")
);
const ViewOrders = lazy(() => import("./pages/Orders/ViewOrders/ViewOrders"));
const Shipments = lazy(() => import("./pages/Orders/Shipments/Shipments"));
const ViewShipment = lazy(() =>
  import("./pages/Orders/Shipments/ViewShipment/ViewShipment")
);
const CallRequests = lazy(() =>
  import("./pages/Orders/CallRequests/CallRequests")
);
const ReturnRequests = lazy(() =>
  import("./pages/Orders/ReturnRequests/ReturnRequests")
);
const Products = lazy(() => import("./pages/Product/Products"));
const ProductsOnModeration = lazy(() =>
  import("./pages/Product/ProductsOnModeration/ProductsOnModeration")
);
const BulkAddition = lazy(() =>
  import("./pages/Product/BulkAddition/BulkAddition")
);

const AddProduct = lazy(() => import("./pages/Product/AddProduct/AddProduct"));

const Edit = lazy(() => import("./pages/Product/Edit/Edit"));

const Reviews = lazy(() => import("./pages/Product/Reviews/Reviews"));
const ReviewDetail = lazy(() => import("./pages/Product/Reviews/ReviewDetail"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const ViewCategory = lazy(() =>
  import("./pages/Categories/ViewCategory/ViewCategory")
);
const ViewCategoryProducts = lazy(() =>
  import("./pages/Categories/ViewProducts/ViewProducts")
);

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
const ExplorePromotion = lazy(() =>
  import("./pages/Promotions/ExplorePromotion")
);

const ProductBundles = lazy(() =>
  import("./pages/ProductBundles/ProductBundles")
);
const SingleProductBundle = lazy(() =>
  import("./pages/ProductBundles/Edit/SingleProductBundle")
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
const LogosAndStyles = lazy(() =>
  import("./pages/Setting/LogosAndStyle/LogosAndStyle")
);
const OrderReports = lazy(() =>
  import("./pages/Sales/OrderReports/OrderReports")
);
const RewardPoint = lazy(() => import("./pages/Sales/RewardPoint/RewardPoint"));
const ProductDistributionOnCategory = lazy(() =>
  import(
    "./pages/Sales/ProductDistributionOnCategory/ProductDistributionOnCategory"
  )
);
const TopFiftyCustomers = lazy(() =>
  import("./pages/Sales/TopFiftyCustomers/TopFiftyCustomers")
);
const TopTenCategories = lazy(() =>
  import("./pages/Sales/TopTenCategories/TopTenCategories")
);
const TopTwentyProducts = lazy(() =>
  import("./pages/Sales/TopTwentyProducts/TopTwentyProducts")
);
const PaymentMethods = lazy(() =>
  import("./pages/Sales/PaymentMethods/PaymentMethods")
);
const Logs = lazy(() => import("./pages/Logs/Logs"));

export const queryClient = new QueryClient();

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route
              element={
                <SuspenseWrapper>
                  <GeneralContextProvider>
                    <Home />
                  </GeneralContextProvider>
                </SuspenseWrapper>
              }
              path="/"
              exact
            />
            <Route
              element={
                <SuspenseWrapper>
                  <Logs />
                </SuspenseWrapper>
              }
              path="/logs"
              exact
            />
            <Route
              element={
                <SuspenseWrapper>
                  <GeneralContextProvider>
                    <Seller />
                  </GeneralContextProvider>
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
            {/**Shipments */}
            <Route
              element={
                <SuspenseWrapper>
                  <Shipments />
                </SuspenseWrapper>
              }
              path="/Orders/Shipments"
            ></Route>
            {/**Shipments */}
            <Route
              element={
                <SuspenseWrapper>
                  <ViewShipment />
                </SuspenseWrapper>
              }
              path="/Orders/Shipments/:id"
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
            {/** Order Reports*/}
            <Route
              element={
                <SuspenseWrapper>
                  <OrderReports />
                </SuspenseWrapper>
              }
              path="/Sales/Order reports"
            ></Route>
            {/** Reward point*/}
            <Route
              element={
                <SuspenseWrapper>
                  <RewardPoint />
                </SuspenseWrapper>
              }
              path="/Sales/Reward Point"
            ></Route>
            {/** Product distribution on category */}
            <Route
              element={
                <SuspenseWrapper>
                  <ProductDistributionOnCategory />
                </SuspenseWrapper>
              }
              path="/Sales/Product Distribution On Category"
            ></Route>
            {/** Top fifty customers*/}
            <Route
              element={
                <SuspenseWrapper>
                  <TopFiftyCustomers />
                </SuspenseWrapper>
              }
              path="/Sales/Top 50 Customers"
            ></Route>
            {/** Top 10 Categories*/}
            <Route
              element={
                <SuspenseWrapper>
                  <TopTenCategories />
                </SuspenseWrapper>
              }
              path="/Sales/Top 10 Categories"
            ></Route>
            {/** Top 20 Products*/}
            <Route
              element={
                <SuspenseWrapper>
                  <TopTwentyProducts />
                </SuspenseWrapper>
              }
              path="/Sales/Top 20 Products"
            ></Route>
            {/** Payment Methods*/}
            <Route
              element={
                <SuspenseWrapper>
                  <PaymentMethods />
                </SuspenseWrapper>
              }
              path="/Sales/Payment Methods"
            ></Route>
            {/** product routing */}
            <Route
              element={
                <SuspenseWrapper>
                  <Products />
                </SuspenseWrapper>
              }
              path="/products"
            ></Route>
            <Route
              element={
                <SuspenseWrapper>
                  <ProductsOnModeration />
                </SuspenseWrapper>
              }
              path="/ProductsOnModeration"
            ></Route>
            {/** product add  */}
            <Route
              element={
                <SuspenseWrapper>
                  <AddProduct />
                </SuspenseWrapper>
              }
              path="/Products/Add Product"
            ></Route>{" "}
            {/*Bulk Product addition  */}
            <Route
              element={
                <SuspenseWrapper>
                  <BulkAddition />
                </SuspenseWrapper>
              }
              path="/BulkProductAddition"
            ></Route>{" "}
            {/** product edit  */}
            <Route
              element={
                <SuspenseWrapper>
                  <Edit />
                </SuspenseWrapper>
              }
              path="/Products/:id"
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
            {/** Categories */}
            <Route
              element={
                <SuspenseWrapper>
                  <GeneralContextProvider>
                    <Categories />
                  </GeneralContextProvider>
                </SuspenseWrapper>
              }
              path="/Categories"
            ></Route>
            {/** View Category */}
            <Route
              element={
                <SuspenseWrapper>
                  <GeneralContextProvider>
                    <ViewCategory />
                  </GeneralContextProvider>
                </SuspenseWrapper>
              }
              path="/Categories/:id"
            ></Route>{" "}
            {/** View Category */}
            <Route
              element={
                <SuspenseWrapper>
                  <GeneralContextProvider>
                    <ViewCategoryProducts />
                  </GeneralContextProvider>
                </SuspenseWrapper>
              }
              path="/Categories/:id/Products"
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
            {/** Single Product Bundles*/}
            <Route
              element={
                <SuspenseWrapper>
                  <SingleProductBundle />
                </SuspenseWrapper>
              }
              path="/Marketing/Product Bundles/:id"
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
              element={
                <SuspenseWrapper>
                  <LogosAndStyles />
                </SuspenseWrapper>
              }
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
              element={
                <SuspenseWrapper>
                  <MonthlyOrderReport />
                </SuspenseWrapper>
              }
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
            <Route
              element={
                <SuspenseWrapper>
                  <Tweak />
                </SuspenseWrapper>
              }
              path="/TweakAndInvoice/:id"
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
