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
};
