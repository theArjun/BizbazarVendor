import React from "react";
const ProductTable = React.lazy(() =>
  import("../features/Products/Table/ProductTable")
);
const ReviewSearch = React.lazy(() =>
  import("../features/Products/Reviews/Search/Search")
);
const ReviewTable = React.lazy(() =>
  import("../features/Products/Reviews/Table/ReviewTable")
);
const ProductSearch = React.lazy(() =>
  import("../features/Products/Search/Search")
);
const ViewOrdersTable = React.lazy(() =>
  import("../features/Orders/ViewOrders/Table/Table")
);
const ViewOrdersSearch = React.lazy(() =>
  import("../features/Orders/ViewOrders/Search/Search")
);
const CallRequestsSearch = React.lazy(() =>
  import("../features/Orders/CallRequests/Search/Search")
);
const CallRequestsTable = React.lazy(() =>
  import("../features/Orders/CallRequests/Table/Table")
);
const ReturnRequestsTable = React.lazy(() =>
  import("../features/Orders/ReturnRequests/Table/Table")
);
const ReturnRequestsSearch = React.lazy(() =>
  import("../features/Orders/ReturnRequests/Search/Search")
);
const TransactionTable = React.lazy(() =>
  import("../features/Accounting/Transaction/Table/TransactionTable")
);
const TransactionSearch = React.lazy(() =>
  import("../features/Accounting/Transaction/Search/Search")
);
const WithdrawalTable = React.lazy(() =>
  import("../features/Accounting/Withdrawals/Table/WithdrawalsTable")
);
const WithdrawalSearch = React.lazy(() =>
  import("../features/Accounting/Withdrawals/Search/Search")
);
const EditGeneral = React.lazy(() =>
  import("../features/Products/Edit/General/General")
);
const EditShipping = React.lazy(() =>
  import("../features/Products/Edit/Shipping/Shipping")
);
const EditFeatures = React.lazy(() =>
  import("../features/Products/Edit/Features/Features")
);
const EditOptions = React.lazy(() =>
  import("../features/Products/Edit/Options/Options")
);
const EditSeo = React.lazy(() => import("../features/Products/Edit/Seo/Seo"));
const EditQuantityDiscount = React.lazy(() =>
  import("../features/Products/Edit/QuantityDiscounts/QuantityDiscounts")
);
const EditVariations = React.lazy(() =>
  import("../features/Products/Edit/Variations/Variations")
);
const CustomerCommunicationSearch = React.lazy(() =>
  import("../features/MessageCenter/CustomerCommunication/Search/Search")
);
const CustomerCommunicationTable = React.lazy(() =>
  import("../features/MessageCenter/CustomerCommunication/Table/Table")
);
const AdminCommunicationSearch = React.lazy(() =>
  import("../features/MessageCenter/AdminCommunication/Search/Search")
);
const AdminCommunicationTable = React.lazy(() =>
  import("../features/MessageCenter/AdminCommunication/Table/Table")
);
const AdditionField = React.lazy(() =>
  import("../features/Products/BulkAddition/AdditionField/AdditionField")
);
const AdditionTable = React.lazy(() =>
  import("../features/Products/BulkAddition/AdditionTable/AdditionTable")
);
const ParticularReview = React.lazy(() =>
  import("../features/Products/Edit/Reviews/Reviews")
);
const CatalogPromotionGeneral = React.lazy(() =>
  import("../features/Marketing/AddCatalogPromotion/General/General")
);
const CatalogPromotionBonuses = React.lazy(() =>
  import("../features/Marketing/AddCatalogPromotion/Bonuses/Bonuses")
);
const CatalogPromotionConditions = React.lazy(() =>
  import("../features/Marketing/AddCatalogPromotion/Conditions/Conditions")
);
const AdminPromotion = React.lazy(() =>
  import("../features/Marketing/Promotion/AdminPromotion")
);
const VendorPromotion = React.lazy(() =>
  import("../features/Marketing/Promotion/VendorPromotion")
);
const SellerGeneral = React.lazy(() =>
  import("../features/Seller/General/General")
);
const SellerDescription = React.lazy(() =>
  import("../features/Seller/Description/Description")
);
const SellerTermsAndConditions = React.lazy(() =>
  import("../features/Seller/TermsAndConditions/TermsAndConditions")
);
const SellerPlan = React.lazy(() => import("../features/Seller/Plan/Plan"));
const SellerLogos = React.lazy(() => import("../features/Seller/Logos/Logos"));
const Logos = React.lazy(() =>
  import("../features/Setting/LogosAndStyle/Logos/Logo")
);
const MonthlyOrderReportTable = React.lazy(() =>
  import("../features/Reports/MonthlyOrderReport/Table/Table")
);
const MonthlyOrderReportSearch = React.lazy(() =>
  import("../features/Reports/MonthlyOrderReport/Search/Search")
);
const ShippingMethodGeneral = React.lazy(() =>
  import("../features/Setting/ShippingMethod/EditShipping/General/General")
);
const ShippingTimeRates = React.lazy(() =>
  import(
    "../features/Setting/ShippingMethod/EditShipping/ShippingTimeRates/ShippingTimeRates"
  )
);
const ShippingAdditionalSetting = React.lazy(() =>
  import(
    "../features/Setting/ShippingMethod/EditShipping/AdditionalSettings/AdditionalSettings"
  )
);
const TestRateCalculation = React.lazy(() =>
  import(
    "../features/Setting/ShippingMethod/EditShipping/TestRateCalculation/TestRateCalculation"
  )
);
const StoreFronts = React.lazy(() =>
  import(
    "../features/Setting/ShippingMethod/EditShipping/StoreFronts/StoreFronts"
  )
);
const ShippingSuppliers = React.lazy(() =>
  import("../features/Setting/ShippingMethod/EditShipping/Suppliers/Suppliers")
);
const LogList = React.lazy(() => import("../features/Logs/LogList/LogList"));
const LogSearch = React.lazy(() => import("../features/Logs/Search/Search"));
const ProductBundleSearch = React.lazy(() =>
  import("../features/Marketing/ProductBundle/Search/Search")
);
const ProductBundleTable = React.lazy(() =>
  import("../features/Marketing/ProductBundle/Table/Table")
);
const ProductBundleGeneralTab = React.lazy(() =>
  import(
    "../features/Marketing/ProductBundle/ProductBundleCreateModal/Components/General/General"
  )
);
const ProductBundleProductTab = React.lazy(() =>
  import(
    "../features/Marketing/ProductBundle/ProductBundleCreateModal/Components/Products/Products"
  )
);
const ProductsSales = React.lazy(() =>
  import("../features/Sales/OrderReports/ProductsSales/ProductsSales")
);
const CategoriesSales = React.lazy(() =>
  import("../features/Sales/OrderReports/CategoriesSales/CategoriesSales")
);
const MostActiveCustomers = React.lazy(() =>
  import(
    "../features/Sales/OrderReports/MostActiveCustomers/MostActiveCustomers"
  )
);
const ShippingCostPerOrder = React.lazy(() =>
  import(
    "../features/Sales/OrderReports/ShippingCostPerOrder/ShippingCostPerOrder"
  )
);
const OrderStatuses = React.lazy(() =>
  import("../features/Sales/OrderReports/OrderStatuses/OrderStatuses")
);
const TopFiftyCustomersNoOfOrders = React.lazy(() =>
  import(
    "../features/Sales/TopFiftyCustomers/TopFiftyCustomersNoOfOrders/TopFiftyCustomersNoOfOrders"
  )
);
const TopFiftyCustomersOrderSales = React.lazy(() =>
  import(
    "../features/Sales/TopFiftyCustomers/TopFiftyCustomersOrderSales/TopFiftyCustomersOrderSales"
  )
);
const TopTwentyVendors = React.lazy(() =>
  import("../features/Sales/TopTenCategories/TopTwentyVendors/TopTwentyVendors")
);
const TopTenCategoriesItemSold = React.lazy(() =>
  import(
    "../features/Sales/TopTenCategories/TopTenCategoriesItemSold/TopTenCategoriesItemSold"
  )
);
const TopTenCategoriesItemSoldTable = React.lazy(() =>
  import(
    "../features/Sales/TopTenCategories/TopTenCategoriesItemSoldTable/TopTenCategoriesItemSoldTable"
  )
);
const TopTenCategoriesCost = React.lazy(() =>
  import(
    "../features/Sales/TopTenCategories/TopTenCategoriesCost/TopTenCategoriesCost"
  )
);
const TopTenCategoriesCostTable = React.lazy(() =>
  import(
    "../features/Sales/TopTenCategories/TopTenCategoriesCostTable/TopTenCategoriesCostTable"
  )
);
const TopTwentyProductsItemSoldTable = React.lazy(() =>
  import(
    "../features/Sales/TopTwentyProducts/TopTwentyProductsItemSoldTable/TopTwentyProductsItemSoldTable"
  )
);

const TopTwentyProductsItemSold = React.lazy(() =>
  import(
    "../features/Sales/TopTwentyProducts/TopTwentyProductsItemSold/TopTwentyProductsItemSold"
  )
);
const TopTwentyProductsCost = React.lazy(() =>
  import(
    "../features/Sales/TopTwentyProducts/TopTwentyProductsCost/TopTwentyProductsCost"
  )
);
const TopTwentyProductsCostTable = React.lazy(() =>
  import(
    "../features/Sales/TopTwentyProducts/TopTwentyProductsCostTable/TopTwentyProductsCostTable"
  )
);
const PaymentMethodsChartCost = React.lazy(() =>
  import(
    "../features/Sales/PaymentMethods/PaymentMethodsChartCost/PaymentMethodsChartCost"
  )
);
const PaymentMethodsChartOrdersPlaced = React.lazy(() =>
  import(
    "../features/Sales/PaymentMethods/PaymentMethodsChartOrdersPlaced/PaymentMethodsChartOrdersPlaced"
  )
);

const SearchForSalesReport = React.lazy(() =>
  import("../component/SearchForSalesReport/SearchForSalesReport")
);

const SearchForShipment = React.lazy(() =>
  import("../features/Orders/Shipments/Search/Search")
);
const TableForShipment = React.lazy(() =>
  import("../features/Orders/Shipments/Table/Table")
);
const CategoryData = React.lazy(() =>
  import("../features/Categories/CategoryData/CategoryData")
);
const CategoryTotalData = React.lazy(() =>
  import("../features/Categories/TotalData/TotalData")
);
const CategoryNest = React.lazy(() =>
  import("../features/Categories/ViewCategory/CategoryNest/CategoryNest")
);
const SingleCategory = React.lazy(() =>
  import("../features/Categories/ViewCategory/SingleCategory/SingleCategory")
);
export {
  //Orders
  ViewOrdersTable,
  ViewOrdersSearch,
  CallRequestsSearch,
  CallRequestsTable,
  ReturnRequestsTable,
  ReturnRequestsSearch,
  SearchForShipment,
  TableForShipment,
  //Accounting
  TransactionTable,
  TransactionSearch,
  WithdrawalTable,
  WithdrawalSearch,
  //Products
  ProductTable,
  ProductSearch,
  EditGeneral,
  EditShipping,
  EditFeatures,
  EditOptions,
  EditSeo,
  EditQuantityDiscount,
  EditVariations,
  ReviewSearch,
  ReviewTable,
  ParticularReview,
  CategoryData,
  CategoryTotalData,
  CategoryNest,
  SingleCategory,
  //MessageCenter
  CustomerCommunicationSearch,
  CustomerCommunicationTable,
  AdminCommunicationSearch,
  AdminCommunicationTable,
  AdditionField,
  AdditionTable,
  //Promotions
  CatalogPromotionBonuses,
  CatalogPromotionConditions,
  CatalogPromotionGeneral,
  AdminPromotion,
  VendorPromotion,
  //SellerInformation
  SellerGeneral,
  SellerDescription,
  SellerTermsAndConditions,
  SellerPlan,
  SellerLogos,
  Logos,
  MonthlyOrderReportTable,
  MonthlyOrderReportSearch,
  //Shipping method
  ShippingMethodGeneral,
  ShippingAdditionalSetting,
  ShippingTimeRates,
  TestRateCalculation,
  StoreFronts,
  ShippingSuppliers,
  //Logs
  LogList,
  LogSearch,
  //ProductBundle
  ProductBundleSearch,
  ProductBundleTable,
  ProductBundleGeneralTab,
  ProductBundleProductTab,
  //Sales
  ProductsSales,
  CategoriesSales,
  MostActiveCustomers,
  ShippingCostPerOrder,
  OrderStatuses,
  TopFiftyCustomersNoOfOrders,
  TopFiftyCustomersOrderSales,
  TopTenCategoriesCostTable,
  TopTenCategoriesCost,
  TopTenCategoriesItemSold,
  TopTenCategoriesItemSoldTable,
  TopTwentyVendors,
  TopTwentyProductsCost,
  TopTwentyProductsCostTable,
  TopTwentyProductsItemSold,
  TopTwentyProductsItemSoldTable,
  PaymentMethodsChartOrdersPlaced,
  PaymentMethodsChartCost,
  SearchForSalesReport,
};
