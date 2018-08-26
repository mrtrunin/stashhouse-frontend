import axios from "axios";
import Message from "components/Message";

export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_PRODUCT_FULFILLED = "FETCH_PRODUCT_FULFILLED";
export const PRODUCT_UPDATE_FIELD = "PRODUCT_UPDATE_FIELD";
export const FETCH_PRODUCT_REJECTED = "FETCH_PRODUCT_REJECTED";
export const RESET_PRODUCT = "RESET_PRODUCT";

const url = process.env.REACT_APP_SERVER_URL;

export function createProduct(
  name,
  ean,
  default_price,
  tax_rate,
  business_name
) {
  return async dispatch => {
    let payload = {};

    payload.name = name;
    payload.ean = ean;
    payload.default_price = default_price;
    payload.tax_rate = tax_rate;
    payload.business = {
      name: business_name
    };

    try {
      const { data } = await axios.post(url + "/products/", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      Message("Product Created!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function deleteProduct(id) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(url + "/products/" + id + "/", {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      Message("Product " + id + " deleted successfully!");
      return data;
    } catch (error) {
      Message("Could not delete Product " + id);
      Message(error);
    }
  };
}

export function fetchProduct(productId) {
  return async dispatch => {
    dispatch({
      type: FETCH_PRODUCT
    });

    try {
      const { data } = await axios.get(url + "/products/" + productId, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      dispatch({
        type: FETCH_PRODUCT_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCT_REJECTED,
        payload: error
      });
    }
  };
}

export function updateProduct(name, ean, default_price, tax_rate, productId) {
  return async dispatch => {
    let payload = {};

    payload.name = name;
    payload.ean = ean;
    payload.default_price = default_price;
    payload.tax_rate = tax_rate;

    try {
      const { data } = await axios.patch(
        url + "/products/" + productId + "/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      Message("Product Updated Successfully!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function resetProduct() {
  return async dispatch => {
    dispatch({
      type: RESET_PRODUCT
    });
  };
}

export function updateProductField(name, value) {
  return async dispatch => {
    dispatch({
      type: PRODUCT_UPDATE_FIELD,
      field: name,
      payload: value
    });
  };
}
