import {
  TRANSACTION_STATE_SET_TRANSACTION_TYPE,
  TRANSACTION_STATE_ADD_EXISTING_TRANSACTION,
  TRANSACTION_STATE_CHANGE_CUSTOMER,
  TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE,
  TRANSACTION_STATE_CHANGE_TO_WAREHOUSE,
  TRANSACTION_STATE_ADD_PRODUCT,
  TRANSACTION_STATE_REMOVE_PRODUCT,
  TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE,
  TRANSACTION_STATE_FETCHING,
  TRANSACTION_STATE_FETCHED,
  TRANSACTION_STATE_RESET,
  TRANSACTION_STATE_CHANGE_DAYS_DUE
} from "./TransactionActions";

export default function reducer(
  state = {
    transactionType: "",
    existingTransactionId: "",
    customer: {},
    fromWarehouse: {},
    toWarehouse: {},
    daysDue: "",
    products: [],
    error: null,
    fetching: false
  },
  action
) {
  switch (action.type) {
    case TRANSACTION_STATE_SET_TRANSACTION_TYPE: {
      return {
        ...state,
        transactionType: action.payload
      };
    }
    case TRANSACTION_STATE_ADD_EXISTING_TRANSACTION: {
      return {
        ...state,
        existingTransactionId: action.payload
      };
    }
    case TRANSACTION_STATE_CHANGE_CUSTOMER: {
      return {
        ...state,
        customer: action.payload
      };
    }
    case TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE: {
      return {
        ...state,
        fromWarehouse: action.payload
      };
    }
    case TRANSACTION_STATE_CHANGE_TO_WAREHOUSE: {
      return {
        ...state,
        toWarehouse: action.payload
      };
    }
    case TRANSACTION_STATE_CHANGE_DAYS_DUE: {
      return {
        ...state,
        daysDue: action.payload
      };
    }
    case TRANSACTION_STATE_ADD_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    }

    case TRANSACTION_STATE_REMOVE_PRODUCT: {
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.id),
          ...state.products.slice(action.id + 1)
        ]
      };
    }

    case TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE: {
      let attributeToChange = Object.keys(action).filter(attribute => {
        return !["type", "id"].includes(attribute);
      });

      return {
        ...state,
        products: [...state.products].map((product, index) => {
          if (index !== action.id) {
            return product;
          }

          return {
            ...product,
            [attributeToChange]: action[attributeToChange]
          };
        })
      };
    }

    case TRANSACTION_STATE_FETCHING: {
      return {
        ...state,
        fetching: true
      };
    }

    case TRANSACTION_STATE_FETCHED: {
      return {
        ...state,
        fetching: false
      };
    }

    case TRANSACTION_STATE_RESET: {
      return {
        ...state,
        customer: {},
        fromWarehouse: {},
        toWarehouse: {},
        products: [],
        daysDue: ""
      };
    }
    default:
  }

  return state;
}
