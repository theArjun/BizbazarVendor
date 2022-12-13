import React from 'react'
const ProductTable=React.lazy(()=>import('../pagecomponents/Products/Table/ProductTable'))
const ReviewSearch=React.lazy(()=>import('../pagecomponents/Products/Reviews/Search/Search'))
const ReviewTable=React.lazy(()=>import('../pagecomponents/Products/Reviews/Table/ReviewTable'))
const ProductSearch=React.lazy(()=>import('../pagecomponents/Products/Search/Search'))
const ViewOrdersTable=React.lazy(()=>import('../pagecomponents/Orders/ViewOrders/Table/Table'))
const ViewOrdersSearch=React.lazy(()=>import('../pagecomponents/Orders/ViewOrders/Search/Search'))
const CallRequestsSearch=React.lazy(()=>import('../pagecomponents/Orders/CallRequests/Search/Search'))
const CallRequestsTable=React.lazy(()=>import('../pagecomponents/Orders/CallRequests/Table/Table'))
const ReturnRequestsTable=React.lazy(()=>import('../pagecomponents/Orders/ReturnRequests/Table/Table'))
const ReturnRequestsSearch=React.lazy(()=>import('../pagecomponents/Orders/ReturnRequests/Search/Search'))
const AccountingTable=React.lazy(()=>import('../pagecomponents/Accounting/Table/AccountTable'))
const AccountingSearch=React.lazy(()=>import('../pagecomponents/Accounting/Search/Search'))

export{
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
    AccountingTable,
    AccountingSearch
}