import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/registerScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreens";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/orderScreen";
import UserListscreen from "./screens/userListscreen";
import UserEditScreen from "./screens/userEditScreen";
import ProductListscreen from "./screens/ProductliistScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/orderListScreen";
function App() {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/admin/orderlist" component={OrderListScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
          ></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/admin/userlist" component={UserListscreen}></Route>
          <Route path="/admin/user/:id/edit" component={UserEditScreen}></Route>
          <Route
            path="/admin/productlist"
            component={ProductListscreen}
            exact
          ></Route>
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListscreen}
            exact
          ></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/page/:pageNumber" component={HomeScreen} exact></Route>
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          ></Route>
          <Route path="/search/:keyword" component={HomeScreen} exact></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
