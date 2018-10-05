import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_FULFILLED = "FETCH_PRODUCTS_FULFILLED";
export const FETCH_PRODUCTS_REJECTED = "FETCH_PRODUCTS_REJECTED";

export const FETCH_PRODUCTS_STOCK = "FETCH_PRODUCTS_STOCK";
export const FETCH_PRODUCTS_STOCK_FULFILLED = "FETCH_PRODUCTS_STOCK_FULFILLED";
export const FETCH_PRODUCTS_STOCK_REJECTED = "FETCH_PRODUCTS_STOCK_REJECTED";

export function fetchProducts(businessName) {
  return async dispatch => {
    dispatch({ type: FETCH_PRODUCTS });

    const url = process.env.REACT_APP_SERVER_URL + "/products/";
    const config = {
      params: {
        business_name: businessName
      }
    };

    try {
      const { data } = await axios.get(url, config);

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

export function fetchProductsStock(businessName, date = new Date()) {
  return async dispatch => {
    await dispatch({
      type: FETCH_PRODUCTS_STOCK
    });

    const url = process.env.REACT_APP_SERVER_URL + "/products-stock/";
    const config = {
      params: {
        business_name: businessName,
        date: date
      }
    };

    try {
      const { data } = await axios.get(url, config);

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
