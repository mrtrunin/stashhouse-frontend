import axios from "axios";
import Message from "components/Message";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_FULFILLED = "FETCH_PRODUCTS_FULFILLED";
export const FETCH_PRODUCTS_REJECTED = "FETCH_PRODUCTS_REJECTED";

export const FETCH_PRODUCTS_STOCK = "FETCH_PRODUCTS_STOCK";
export const FETCH_PRODUCTS_STOCK_FULFILLED = "FETCH_PRODUCTS_STOCK_FULFILLED";
export const FETCH_PRODUCTS_STOCK_REJECTED = "FETCH_PRODUCTS_STOCK_REJECTED";

const url = process.env.REACT_APP_SERVER_URL;

export function fetchProducts(businessName) {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS });

    try {
      const { data } = await axios.get(
        url + "/products/?business_name=" + businessName,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      dispatch({
        type: FETCH_PRODUCTS_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_REJECTED,
        payload: error
      });
    }
  };
}

export function fetchProductsStock(businessName) {
  return async dispatch => {
    await dispatch({
      type: FETCH_PRODUCTS_STOCK
    });

    try {
      const { data } = await axios.get(
        url + "/products-stock/?business_name=" + businessName,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      await dispatch({
        type: FETCH_PRODUCTS_STOCK_FULFILLED,
        payload: data
      });

      return data;
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_STOCK_REJECTED,
        payload: error
      });
      Message(error);
    }
  };
}
