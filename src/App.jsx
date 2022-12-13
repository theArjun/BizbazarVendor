import React, { useContext,useEffect} from "react";
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
function App() {
  const dispatch = useDispatch();
  dispatch(loadTableData);
  useEffect(() => {
    getAllCategories();
  
  }, []);
  const { darkMode } = useContext(DarkModeContext);
  const getAllCategories= async()=>{
    const result = await apicall({
      url: `vendors/62/categories`,
    });
    if(result.data){
     await dispatch(saveCategories(result.data.categories))
    }
  }
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/** Dashboard */}
          <Route
            element={<SuspenseWrapper path="pages/Home/Home" />}
            path="/"
            exact
          />
          {/**Order routing */}
          {/**view orders */}
          <Route
            element={
              <SuspenseWrapper path="pages/Orders/ViewOrders/ViewOrders" />
            }
            path="/orders/View Orders"
          ></Route>
          {/** Cancel orders*/}
          <Route
            element={
              <SuspenseWrapper path="pages/Orders/CallRequests/CallRequests" />
            }
            path="/orders/Call Request"
          ></Route>{" "}
          {/** Return Request*/}
          <Route
            element={
              <SuspenseWrapper path="pages/Orders/ReturnRequests/ReturnRequests" />
            }
            path="/orders/Return Request"
          ></Route>
          {/** product routing */}
          <Route
            element={<SuspenseWrapper path="pages/Product/Products" />}
            path="/products/Products"
          ></Route>

          {/** product add  */}
          <Route
          element={<SuspenseWrapper path="pages/Product/AddProduct/AddProduct" />}
          path="/products/Products/Add Product"
        >
        </Route> {/** product edit  */}
          <Route
          element={<SuspenseWrapper path="pages/Product/Edit/Edit" />}
          path="/products/Products/Edit Product"
        ></Route>
          {/** product Reviews */}
          <Route
            element={<SuspenseWrapper path="pages/Product/Reviews/Reviews" />}
            path="/products/Reviews"
          ></Route>
          {/**Message Center */}
          {/**Customer Commnunications */}
          <Route
            element={
              <SuspenseWrapper path="pages/CuntomerCommunication/CuntomerCommunication" />
            }
            path="/Message Center/Customer Commnunications"
          ></Route>
          {/**Admins Communications*/}
          <Route
            element={
              <SuspenseWrapper path="pages/AdminsCommunications/AdminsCommunications" />
            }
            path="/Message Center/Admins Communications"
          ></Route>
          {/**Marketing*/}
          {/**Promotions*/}
          <Route
            element={<SuspenseWrapper path="pages/Promotions/Promotions" />}
            path="/Marketing/Promotions"
          ></Route>
          {/**Product Bundles*/}
          <Route
            element={
              <SuspenseWrapper path="pages/ProductBundles/ProductBundles" />
            }
            path="/Marketing/Product Bundles"
          ></Route>
          {/**Accounting*/}
          <Route element={<>Accounting</>} path="/Accounting"></Route>
          {/**Setting*/}
          {/**Shipping Methods*/}
          <Route
            element={<>Shipping Methods</>}
            path="/Setting/Shipping Methods"
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
            element={<>Account Ordes Details</>}
            path="/Reports/Account Ordes Details"
          ></Route>
          {/**Gift Cards*/}
          <Route element={<>Gift Cards</>} path="/Reports/Gift Cards"></Route>
          {/**Order Details*/}
          <Route
            element={<>Order Details</>}
            path="/Reports/Order Details"
          ></Route>
          {/**Vendor Transaction Details*/}
          <Route
            element={<>Vendor Transaction Details</>}
            path="/Reports/Vendor Transaction Details"
          ></Route>
          {/**Coupon Voucher Report*/}
          <Route
            element={<>Coupon Voucher Report</>}
            path="/Reports/Coupon Voucher Report"
          ></Route>
          {/**Product Count Reports*/}
          <Route
            element={<>Product Count Reports</>}
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
              <SuspenseWrapper path="./pages/Orders/OrderDetails/OrderDetails" />
            }
            path="/Orders/orders details/:id"
          ></Route>
          <Route path="*" element={<>Notfound</>} />
        </Route>

        <Route
          element={<SuspenseWrapper path="pages/Login/Login" />}
          path="/login"
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
