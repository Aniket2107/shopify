import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SAHIPPING_ADDRESS,
  CLEAR_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const exisItem = state.cartItems.find((x) => x.product === item.product);

      if (exisItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exisItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CLEAR_CART:
      localStorage.removeItem("cartItems");
      return {
        cartItems: [],
      };
    case CART_SAVE_SAHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
