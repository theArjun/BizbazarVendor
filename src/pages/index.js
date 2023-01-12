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
  AdminCommunicationTable
};
