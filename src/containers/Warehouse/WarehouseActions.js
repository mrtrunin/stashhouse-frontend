import axios from "axios";
import Message from "components/Message/Message";

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

      Message("Warehouse Created!", "success");

      return data;
    } catch (error) {
      Message("Could not create warehouse: " + error, "error");
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

      Message("Warehouse Updated Successfully!", "success");

      return data;
    } catch (error) {
      Message("Could not update warehouse: " + error, "error");
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

      Message("Warehouse " + id + " deleted successfully!", "success");
      return data;
    } catch (error) {
      Message("Could not delete Warehouse " + id + ": " + error, "error");
    }
  };
}

export function fetchWarehouse(warehouseId) {
  return async dispatch => {
    await dispatch({
      type: FETCH_WAREHOUSE
    });

    try {
      const { data } = await axios.get(url + "/warehouses/" + warehouseId, {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      });

      await dispatch({
        type: FETCH_WAREHOUSE_FULFILLED,
        payload: data
      });
    } catch (error) {
      await dispatch({
        type: FETCH_WAREHOUSE_REJECTED,
        payload: error
      });
    }
  };
}

export function resetWarehouse() {
  return async dispatch => {
    dispatch({
      type: RESET_WAREHOUSE
    });
  };
}
