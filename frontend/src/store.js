import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productTopRatedReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducer.js";
import {
  orderCreatReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliveredReducer,
} from "./reducers/orderReducer.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducer.js";
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  prouctReviewCreate: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreatReducer,
  orderDetails: orderDetailReducer,
  orderDelivered: orderDeliveredReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const ShippingAddressFromStorage = localStorage.getItem("ShippingAddress")
  ? JSON.parse(localStorage.getItem("ShippingAddress"))
  : {};

const initialStage = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: ShippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middelware = [thunk];
const store = createStore(
  reducer,
  initialStage,
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;
