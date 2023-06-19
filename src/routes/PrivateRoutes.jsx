import React, { lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseWrapper from "../component/SuspenseWrapper/SuspenseWrapper";
import { GeneralContextProvider } from "../ContextProvider/ContextProvider";
const Tweak = lazy(() => import("../pages/Orders/Tweak/Tweak"));
const MonthlyOrderReport = lazy(() =>
  import("../pages/Reports/MonthlyOrderReport/MonthlyOrderReport")
);

const ViewRateAreas = lazy(() =>
  import("../pages/Setting/ShippingMethod/ViewRateAreas/ViewRateAreas")
);

const CouponVoucherReport = lazy(() =>
  import("../pages/Reports/CouponVoucherReport/CouponVoucherReport")
);

const VendorTransactionDetails = lazy(() =>
  import("../pages/Reports/VendorTransactionDetails/VendorTransactionDetails")
);

const OrderDetailsReport = lazy(() =>
  import("../pages/Reports/OrderDetailsReport/OrderDetailsReport")
);

const GiftCards = lazy(() => import("../pages/Reports/GiftCards/GiftCards"));

const Home = lazy(() => import("../pages/Home/Home"));
const ProductCountReport = lazy(() =>
  import("../pages/Reports/ProductCountReport/ProductCountReport")
);
const ShippingMethod = lazy(() =>
  import("../pages/Setting/ShippingMethod/ShippingMethod")
);
const ViewOrders = lazy(() => import("../pages/Orders/ViewOrders/ViewOrders"));
const Shipments = lazy(() => import("../pages/Orders/Shipments/Shipments"));
const ViewShipment = lazy(() =>
  import("../pages/Orders/Shipments/ViewShipment/ViewShipment")
);
const CallRequests = lazy(() =>
  import("../pages/Orders/CallRequests/CallRequests")
);
const ReturnRequests = lazy(() =>
  import("../pages/Orders/ReturnRequests/ReturnRequests")
);
const ViewReturnRequests = lazy(() =>
  import("../pages/Orders/ReturnRequests/ViewReturnRequests/ViewReturnRequests")
);
const Products = lazy(() => import("../pages/Product/Products"));
const ProductsOnModeration = lazy(() =>
  import("../pages/Product/ProductsOnModeration/ProductsOnModeration")
);
const BulkAddition = lazy(() =>
  import("../pages/Product/BulkAddition/BulkAddition")
);

const AddProduct = lazy(() => import("../pages/Product/AddProduct/AddProduct"));

const Edit = lazy(() => import("../pages/Product/Edit/Edit"));

const Reviews = lazy(() => import("../pages/Product/Reviews/Reviews"));
const ReviewDetail = lazy(() =>
  import("../pages/Product/Reviews/ReviewDetail")
);
const Categories = lazy(() => import("../pages/Categories/Categories"));
const ViewCategory = lazy(() =>
  import("../pages/Categories/ViewCategory/ViewCategory")
);
const ViewCategoryProducts = lazy(() =>
  import("../pages/Categories/ViewProducts/ViewProducts")
);

const CustomerCommunication = lazy(() =>
  import("../pages/MessageCenter/CustomerCommunication/CustomerCommunication")
);
const CustomerMessages = lazy(() =>
  import("../pages/MessageCenter/CustomerMessages/CustomerMessages")
);

const AdminMessages = lazy(() =>
  import("../pages/MessageCenter/AdminMessage/AdminMessages")
);

const AdminCommunication = lazy(() =>
  import("../pages/MessageCenter/AdminCommunication/AdminCommunication")
);

const Promotions = lazy(() => import("../pages/Promotions/Promotions"));
const ExplorePromotion = lazy(() =>
  import("../pages/Promotions/ExplorePromotion")
);

const ProductBundles = lazy(() =>
  import("../pages/ProductBundles/ProductBundles")
);
const SingleProductBundle = lazy(() =>
  import("../pages/ProductBundles/Edit/SingleProductBundle")
);

const Accounting = lazy(() => import("../pages/Accounting/Accounting"));

const OrderDetails = lazy(() =>
  import("../pages/Orders/OrderDetails/OrderDetails")
);

const AccountOrderDetails = lazy(() =>
  import("../pages/Reports/AccountOrderDetails/AccountOrderDetails")
);
const AddCatalogPromotion = lazy(() =>
  import("../pages/AddCatalogPromotion/AddCatalogPromotion")
);
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Seller = lazy(() => import("../pages/Seller/Seller"));

const ViewShippingMethod = lazy(() =>
  import("../pages/Setting/ViewShippingMethod/ViewShippingMethod")
);
const LogosAndStyles = lazy(() =>
  import("../pages/Setting/LogosAndStyle/LogosAndStyle")
);
const OrderReports = lazy(() =>
  import("../pages/Sales/OrderReports/OrderReports")
);
const RewardPoint = lazy(() =>
  import("../pages/Sales/RewardPoint/RewardPoint")
);
const ProductDistributionOnCategory = lazy(() =>
  import(
    "../pages/Sales/ProductDistributionOnCategory/ProductDistributionOnCategory"
  )
);
const TopFiftyCustomers = lazy(() =>
  import("../pages/Sales/TopFiftyCustomers/TopFiftyCustomers")
);
const TopTenCategories = lazy(() =>
  import("../pages/Sales/TopTenCategories/TopTenCategories")
);
const TopTwentyProducts = lazy(() =>
  import("../pages/Sales/TopTwentyProducts/TopTwentyProducts")
);
const PaymentMethods = lazy(() =>
  import("../pages/Sales/PaymentMethods/PaymentMethods")
);
const Logs = lazy(() => import("../pages/Logs/Logs"));

export default [
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
    key="dashboard"
  />,
  <Route
    element={
      <SuspenseWrapper>
        <Logs />
      </SuspenseWrapper>
    }
    path="/logs"
    exact
    key="logs"
  />,
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
    key="sellerInformation"
  />,
  <Route
    element={
      <SuspenseWrapper>
        <Profile />
      </SuspenseWrapper>
    }
    path="/Edit Profile"
    exact
    key="editProfile"
  />,

  <Route
    element={
      <SuspenseWrapper>
        <ViewOrders />
      </SuspenseWrapper>
    }
    path="/orders/View Orders"
    key="viewOrders"
  />,

  <Route
    element={
      <SuspenseWrapper>
        <Shipments />
      </SuspenseWrapper>
    }
    path="/Orders/Shipments"
    key="shipments"
  />,
  <Route
    element={
      <SuspenseWrapper>
        <ViewShipment />
      </SuspenseWrapper>
    }
    path="/Orders/Shipments/:id"
    key="single_shipment"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <CallRequests />
      </SuspenseWrapper>
    }
    path="/orders/Call Request"
    key="call_request"
  ></Route>,
  //  Route for return requests
  <Route
    element={
      <SuspenseWrapper>
        <ReturnRequests />
      </SuspenseWrapper>
    }
    path="/Orders/Return Request"
    key="return_request"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <ViewReturnRequests />
      </SuspenseWrapper>
    }
    path="/Orders/Return Request/:id"
    key="view_return_request"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <OrderReports />
      </SuspenseWrapper>
    }
    path="/Sales/Order reports"
    key="order_reports"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <RewardPoint />
      </SuspenseWrapper>
    }
    path="/Sales/Reward Point"
    key="reward_point"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <ProductDistributionOnCategory />
      </SuspenseWrapper>
    }
    path="/Sales/Product Distribution On Category"
    key="product_distribution_on_category"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <TopFiftyCustomers />
      </SuspenseWrapper>
    }
    path="/Sales/Top 50 Customers"
    key="top_fifty_customers"
  ></Route>,

  <Route
    element={
      <SuspenseWrapper>
        <TopTenCategories />
      </SuspenseWrapper>
    }
    path="/Sales/Top 10 Categories"
    key="top_ten_categories"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <TopTwentyProducts />
      </SuspenseWrapper>
    }
    path="/Sales/Top 20 Products"
    key="top_ten_products"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <PaymentMethods />
      </SuspenseWrapper>
    }
    path="/Sales/Payment Methods"
    key="payment_methods"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <Products />
      </SuspenseWrapper>
    }
    path="/products"
    key="products"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <ProductsOnModeration />
      </SuspenseWrapper>
    }
    path="/ProductsOnModeration"
    key="products_on_moderation"
  ></Route>,
  // {/** product add  */}
  <Route
    element={
      <SuspenseWrapper>
        <AddProduct />
      </SuspenseWrapper>
    }
    path="/Products/Add Product"
    key="add_product"
  ></Route>,
  // {/*Bulk Product addition  */}
  <Route
    element={
      <SuspenseWrapper>
        <BulkAddition />
      </SuspenseWrapper>
    }
    path="/BulkProductAddition"
    key="bulk_product_addition"
  ></Route>,
  // {/** product edit  */}
  <Route
    element={
      <SuspenseWrapper>
        <Edit />
      </SuspenseWrapper>
    }
    path="/Products/:id"
    key="edit_product"
  ></Route>,
  // {/** product Reviews */}
  <Route
    element={
      <SuspenseWrapper>
        <Reviews />
      </SuspenseWrapper>
    }
    path="/products/Reviews"
    key="reviews"
  ></Route>,
  // {/** product Reviews Detail */}
  <Route
    element={
      <SuspenseWrapper>
        <ReviewDetail />
      </SuspenseWrapper>
    }
    path="/products/Reviews/:id"
    key="review_detail"
  ></Route>,
  // {/** Categories */}
  <Route
    element={
      <SuspenseWrapper>
        <GeneralContextProvider>
          <Categories />
        </GeneralContextProvider>
      </SuspenseWrapper>
    }
    path="/Categories"
    key="categories"
  ></Route>,
  // {/** View Category */}
  <Route
    element={
      <SuspenseWrapper>
        <GeneralContextProvider>
          <ViewCategory />
        </GeneralContextProvider>
      </SuspenseWrapper>
    }
    path="/Categories/:id"
    key="view_category"
  ></Route>,
  // {/** View Category */}
  <Route
    element={
      <SuspenseWrapper>
        <GeneralContextProvider>
          <ViewCategoryProducts />
        </GeneralContextProvider>
      </SuspenseWrapper>
    }
    path="/Categories/:id/Products"
    key="view_category_products"
  ></Route>,
  // {/**Message Center */}
  // {/**Customer Commnunications */}
  <Route
    element={
      <SuspenseWrapper>
        <CustomerCommunication />
      </SuspenseWrapper>
    }
    path="/Message Center/Customer Communications"
    key="customer_communication"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <CustomerMessages />
      </SuspenseWrapper>
    }
    path="/Message Center/Customer Communications/CustomerMessage/:id"
    key="customer_message"
  ></Route>,
  // {/**Admins Communications*/}
  <Route
    element={
      <SuspenseWrapper>
        <AdminCommunication />
      </SuspenseWrapper>
    }
    path="/Message Center/Admins Communications"
    key="admin_communication"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <AdminMessages />
      </SuspenseWrapper>
    }
    path="/Message Center/Admins Communications/AdminMessage/:id"
    key="admin_messages"
  ></Route>,
  // {/**Marketing*/}
  // {/**Promotions*/}
  // {/**Add Catalog Promotion */}
  <Route
    element={
      <SuspenseWrapper>
        <AddCatalogPromotion />
      </SuspenseWrapper>
    }
    path="/Marketing/Add Catalog Promotion"
    key="add_catalog_promotion"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <Promotions />
      </SuspenseWrapper>
    }
    path="/Marketing/Promotions"
    key="promotions"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <ExplorePromotion />
      </SuspenseWrapper>
    }
    path="/Marketing/Promotions/:id"
    key="explore_promotion"
  ></Route>,
  // {/**Product Bundles*/}
  <Route
    element={
      <SuspenseWrapper>
        <ProductBundles />
      </SuspenseWrapper>
    }
    path="/Marketing/Product Bundles"
    key="product_bundles"
  ></Route>,
  // {/** Single Product Bundles*/}
  <Route
    element={
      <SuspenseWrapper>
        <SingleProductBundle />
      </SuspenseWrapper>
    }
    path="/Marketing/Product Bundles/:id"
    key="single_product_bundle"
  ></Route>,
  // {/**Accounting*/}
  <Route
    element={
      <SuspenseWrapper>
        <Accounting />
      </SuspenseWrapper>
    }
    path="/Accounting"
    key="accounting"
  ></Route>,
  // {/**Setting*/}
  // {/**Shipping Methods*/}
  <Route
    element={
      <SuspenseWrapper>
        <ShippingMethod />
      </SuspenseWrapper>
    }
    path="/Setting/Shipping Methods"
    key="shipping_methods"
  ></Route>,
  // {/**View Shipping Methods*/}
  <Route
    element={
      <SuspenseWrapper>
        <ViewShippingMethod />
      </SuspenseWrapper>
    }
    path="/Setting/Shipping Methods/:id"
    key="view_shipping_method"
  ></Route>,
  // {/**View Rate Areas*/}
  <Route
    element={
      <SuspenseWrapper>
        <ViewRateAreas />
      </SuspenseWrapper>
    }
    path="/Setting/Rate Areas/:id"
    key="view_rate_areas"
  ></Route>,
  // {/**Logos And Styles*/}
  <Route
    element={
      <SuspenseWrapper>
        <LogosAndStyles />
      </SuspenseWrapper>
    }
    path="/Setting/Logos And Styles"
    key="logos_and_styles"
  ></Route>,
  // {/**Files*/}
  <Route element={<>Files</>} path="/Setting/Files" key="files"></Route>,
  // {/**Reports*/}
  // {/**Account Ordes Details*/}
  <Route
    element={
      <SuspenseWrapper>
        <AccountOrderDetails />
      </SuspenseWrapper>
    }
    path="/Reports/Account Orders Details"
    key="account_order_details"
  ></Route>,
  // {/**Gift Cards*/}
  <Route
    element={
      <SuspenseWrapper>
        <GiftCards />
      </SuspenseWrapper>
    }
    path="/Reports/Gift Cards"
    key="gift_cards"
  ></Route>,
  // {/**Order Details*/}
  <Route
    element={
      <SuspenseWrapper>
        <OrderDetailsReport />
      </SuspenseWrapper>
    }
    path="/Reports/Order Details"
    key="order_details"
  ></Route>,
  // {/**Vendor Transaction Details*/}
  <Route
    element={
      <SuspenseWrapper>
        <VendorTransactionDetails />
      </SuspenseWrapper>
    }
    path="/Reports/Vendor Transaction Details"
    key="vendor_transaction_details"
  ></Route>,
  // {/**Coupon Voucher Report*/}
  <Route
    element={
      <SuspenseWrapper>
        <CouponVoucherReport />
      </SuspenseWrapper>
    }
    path="/Reports/Coupon Voucher Report"
    key="coupon_voucher_report"
  ></Route>,
  // {/**Product Count Reports*/}
  <Route
    element={
      <SuspenseWrapper>
        <ProductCountReport />
      </SuspenseWrapper>
    }
    path="/Reports/Product Count Reports"
    key="product_count_report"
  ></Route>,
  // {/**Monthly Order Report*/}
  <Route
    element={
      <SuspenseWrapper>
        <MonthlyOrderReport />
      </SuspenseWrapper>
    }
    path="/Reports/Monthly Order Report"
    key="monthly_order_report"
  ></Route>,
  // {/**Order details */}
  <Route
    element={
      <SuspenseWrapper>
        <OrderDetails />
      </SuspenseWrapper>
    }
    path="/Orders/orders details/:id"
    key="order_details"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <Tweak />
      </SuspenseWrapper>
    }
    path="/TweakAndInvoice/:id"
    key="tweak_and_invoice"
  ></Route>,
];
