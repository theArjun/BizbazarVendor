import React from "react";
const ProductTable = React.lazy(() =>
  import("../pagecomponents/Products/Table/ProductTable")
);
const ReviewSearch = React.lazy(() =>
  import("../pagecomponents/Products/Reviews/Search/Search")
);
const ReviewTable = React.lazy(() =>
  import("../pagecomponents/Products/Reviews/Table/ReviewTable")
);
const ProductSearch = React.lazy(() =>
  import("../pagecomponents/Products/Search/Search")
);
const ViewOrdersTable = React.lazy(() =>
  import("../pagecomponents/Orders/ViewOrders/Table/Table")
);
const ViewOrdersSearch = React.lazy(() =>
  import("../pagecomponents/Orders/ViewOrders/Search/Search")
);
const CallRequestsSearch = React.lazy(() =>
  import("../pagecomponents/Orders/CallRequests/Search/Search")
);
const CallRequestsTable = React.lazy(() =>
  import("../pagecomponents/Orders/CallRequests/Table/Table")
);
const ReturnRequestsTable = React.lazy(() =>
  import("../pagecomponents/Orders/ReturnRequests/Table/Table")
);
const ReturnRequestsSearch = React.lazy(() =>
  import("../pagecomponents/Orders/ReturnRequests/Search/Search")
);
const TransactionTable = React.lazy(() =>
  import("../pagecomponents/Accounting/Transaction/Table/TransactionTable")
);
const TransactionSearch = React.lazy(() =>
  import("../pagecomponents/Accounting/Transaction/Search/Search")
);
const WithdrawalTable = React.lazy(() =>
  import("../pagecomponents/Accounting/Withdrawals/Table/WithdrawalsTable")
);
const WithdrawalSearch = React.lazy(() =>
  import("../pagecomponents/Accounting/Withdrawals/Search/Search")
);
const EditGeneral = React.lazy(() =>
  import("../pagecomponents/Products/Edit/General/General")
);
const EditShipping = React.lazy(() =>
  import("../pagecomponents/Products/Edit/Shipping/Shipping")
);
const EditFeatures = React.lazy(() =>
  import("../pagecomponents/Products/Edit/Features/Features")
);
const EditOptions = React.lazy(() =>
  import("../pagecomponents/Products/Edit/Options/Options")
);
const EditSeo = React.lazy(() =>
  import("../pagecomponents/Products/Edit/Seo/Seo")
);
const EditQuantityDiscount = React.lazy(() =>
  import("../pagecomponents/Products/Edit/QuantityDiscounts/QuantityDiscounts")
);
const EditVariations = React.lazy(() =>
  import("../pagecomponents/Products/Edit/Variations/Variations")
);
const CustomerCommunicationSearch = React.lazy(() =>
  import("../pagecomponents/MessageCenter/CustomerCommunication/Search/Search")
);
const CustomerCommunicationTable = React.lazy(() =>
  import("../pagecomponents/MessageCenter/CustomerCommunication/Table/Table")
);
const AdminCommunicationSearch = React.lazy(() =>
  import("../pagecomponents/MessageCenter/AdminCommunication/Search/Search")
);
const AdminCommunicationTable = React.lazy(() =>
  import("../pagecomponents/MessageCenter/AdminCommunication/Table/Table")
);
const AdditionField = React.lazy(() =>
  import("../pagecomponents/Products/BulkAddition/AdditionField/AdditionField")
);
const AdditionTable = React.lazy(() =>
  import("../pagecomponents/Products/BulkAddition/AdditionTable/AdditionTable")
);
const ParticularReview = React.lazy(() =>
  import("../pagecomponents/Products/Edit/Reviews/Reviews")
);
const CatalogPromotionGeneral = React.lazy(() =>
  import("../pagecomponents/Marketing/AddCatalogPromotion/General/General")
);
const CatalogPromotionBonuses = React.lazy(() =>
  import("../pagecomponents/Marketing/AddCatalogPromotion/Bonuses/Bonuses")
);
const CatalogPromotionConditions = React.lazy(() =>
  import(
    "../pagecomponents/Marketing/AddCatalogPromotion/Conditions/Conditions"
  )
);
const AdminPromotion = React.lazy(() =>
  import("../pagecomponents/Marketing/Promotion/AdminPromotion")
);
const VendorPromotion = React.lazy(() =>
  import("../pagecomponents/Marketing/Promotion/VendorPromotion")
);
const SellerGeneral = React.lazy(() =>
  import("../pagecomponents/Seller/General/General")
);
const SellerDescription = React.lazy(() =>
  import("../pagecomponents/Seller/Description/Description")
);
const SellerTermsAndConditions = React.lazy(() =>
  import("../pagecomponents/Seller/TermsAndConditions/TermsAndConditions")
);
const SellerPlan = React.lazy(() =>
  import("../pagecomponents/Seller/Plan/Plan")
);
const SellerLogos = React.lazy(() =>
  import("../pagecomponents/Seller/Logos/Logos")
);
const Logos = React.lazy(() =>
  import("../pagecomponents/Setting/LogosAndStyle/Logos/Logo")
);
const MonthlyOrderReportTable = React.lazy(() =>
  import("../pagecomponents/Reports/MonthlyOrderReport/Table/Table")
);
const MonthlyOrderReportSearch = React.lazy(() =>
  import("../pagecomponents/Reports/MonthlyOrderReport/Search/Search")
);
const ShippingMethodGeneral = React.lazy(() =>
  import(
    "../pagecomponents/Setting/ShippingMethod/EditShipping/General/General"
  )
);
const ShippingTimeRates = React.lazy(() =>
  import(
    "../pagecomponents/Setting/ShippingMethod/EditShipping/ShippingTimeRates/ShippingTimeRates"
  )
);
const ShippingAdditionalSetting = React.lazy(() =>
  import(
    "../pagecomponents/Setting/ShippingMethod/EditShipping/AdditionalSettings/AdditionalSettings"
  )
);
const TestRateCalculation = React.lazy(() =>
  import(
    "../pagecomponents/Setting/ShippingMethod/EditShipping/TestRateCalculation/TestRateCalculation"
  )
);
const StoreFronts = React.lazy(() =>
  import(
    "../pagecomponents/Setting/ShippingMethod/EditShipping/StoreFronts/StoreFronts"
  )
);
const ShippingSuppliers = React.lazy(() =>
  import(
    "../pagecomponents/Setting/ShippingMethod/EditShipping/Suppliers/Suppliers"
  )
);
const LogList = React.lazy(() =>
  import("../pagecomponents/Logs/LogList/LogList")
);
const LogSearch = React.lazy(() =>
  import("../pagecomponents/Logs/Search/Search")
);
const ProductBundleSearch = React.lazy(() =>
  import("../pagecomponents/Marketing/ProductBundle/Search/Search")
);
const ProductBundleTable = React.lazy(() =>
  import("../pagecomponents/Marketing/ProductBundle/Table/Table")
);

export {
  ProductTable,
  ReviewSearch,
  ReviewTable,
  ViewOrdersTable,
  ViewOrdersSearch,
  ProductSearch,
  CallRequestsSearch,
  CallRequestsTable,
  ReturnRequestsTable,
  ReturnRequestsSearch,
  TransactionTable,
  TransactionSearch,
  WithdrawalTable,
  WithdrawalSearch,
  EditGeneral,
  EditShipping,
  EditFeatures,
  EditOptions,
  EditSeo,
  EditQuantityDiscount,
  EditVariations,
  CustomerCommunicationSearch,
  CustomerCommunicationTable,
  AdminCommunicationSearch,
  AdminCommunicationTable,
  AdditionField,
  AdditionTable,
  ParticularReview,
  CatalogPromotionBonuses,
  CatalogPromotionConditions,
  CatalogPromotionGeneral,
  AdminPromotion,
  VendorPromotion,
  SellerGeneral,
  SellerDescription,
  SellerTermsAndConditions,
  SellerPlan,
  SellerLogos,
  Logos,
  MonthlyOrderReportTable,
  MonthlyOrderReportSearch,
  ShippingMethodGeneral,
  ShippingAdditionalSetting,
  ShippingTimeRates,
  TestRateCalculation,
  StoreFronts,
  ShippingSuppliers,
  LogList,
  LogSearch,
  ProductBundleSearch,
  ProductBundleTable,
};
