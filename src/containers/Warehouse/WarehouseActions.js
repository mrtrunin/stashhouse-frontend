import axios from "axios";
import Message from "components/Message";

export const FETCH_WAREHOUSE = "FETCH_WAREHOUSE";
export const FETCH_WAREHOUSE_FULFILLED = "FETCH_WAREHOUSE_FULFILLED";
export const FETCH_WAREHOUSE_REJECTED = "FETCH_WAREHOUSE_REJECTED";
export const WAREHOUSE_UPDATE_FIELD = "WAREHOUSE_UPDATE_FIELD";
export const RESET_WAREHOUSE = "RESET_WAREHOUSE";

const url = process.env.REACT_APP_SERVER_URL;

export function createWarehouse(name, business_name) {
  return async dispatch => {
    let payload = {};

    payload.name = name;
    payload.business = {
      name: business_name
    };

    try {
      const { data } = await axios.post(url + "/warehouses/", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      Message("Warehouse Created!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function updateWarehouse(name, warehouseId) {
  return async dispatch => {
    let payload = {};

    payload.name = name;

    try {
      const { data } = await axios.patch(
        url + "/warehouses/" + warehouseId + "/",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );

      Message("Warehouse Updated Successfully!");

      return data;
    } catch (error) {
      Message(error, "error");
    }
  };
}

export function deleteWarehouse(id) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(url + "/warehouses/" + id + "/", {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      Message("Warehouse " + id + " deleted successfully!");
      return data;
    } catch (error) {
      Message("Could not delete Warehouse " + id);
      Message(error);
    }
  };
}

export function fetchWarehouse(warehouseId) {
  return async dispatch => {
    dispatch({
      type: FETCH_WAREHOUSE
    });

    try {
      const { data } = await axios.get(url + "/warehouses/" + warehouseId, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      dispatch({
        type: FETCH_WAREHOUSE_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_WAREHOUSE_REJECTED,
        payload: error
      });
    }
  };
}