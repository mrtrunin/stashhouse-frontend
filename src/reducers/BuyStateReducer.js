export default function reducer(
  state = {
    customer: {},
    warehouse: {},
    products: [],
    error: null,
    fetching: false
  },
  action
) {
  switch (action.type) {
    case "BUY_STATE_CHANGE_CUSTOMER": {
      return {
        ...state,
        customer: action.payload
      };
    }
    case "BUY_STATE_CHANGE_TO_WAREHOUSE": {
      return {
        ...state,
        warehouse: action.payload
      };
    }
    case "BUY_STATE_ADD_PRODUCT": {
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    }

    case "BUY_STATE_REMOVE_PRODUCT": {
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.id),
          ...state.products.slice(action.id + 1)
        ]
      };
    }

    case "BUY_STATE_CHANGE_PRODUCT_ATTRIBUTE": {
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

    case "BUY_STATE_FETCHING": {
      return {
        ...state,
        fetching: true
      };
    }

    case "BUY_STATE_FETCHED": {
      return {
        ...state,
        fetching: false
      };
    }

    case "BUY_STATE_RESET": {
      return {
        ...state,
        customer: {},
        warehouse: {},
        products: []
      };
    }
    default:
  }

  return state;
}
