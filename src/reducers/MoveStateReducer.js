export default function reducer(
  state = {
    merchant: {},
    fromWarehouse: {},
    toWarehouse: {},
    products: [],
    error: null,
    fetching: false
  },
  action
) {
  switch (action.type) {
    case "MOVE_STATE_CHANGE_MERCHANT": {
      return {
        ...state,
        merchant: action.payload
      };
    }
    case "MOVE_STATE_CHANGE_FROM_WAREHOUSE": {
      return {
        ...state,
        fromWarehouse: action.payload
      };
    }
    case "MOVE_STATE_CHANGE_TO_WAREHOUSE": {
      return {
        ...state,
        toWarehouse: action.payload
      };
    }
    case "MOVE_STATE_ADD_PRODUCT": {
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    }

    case "MOVE_STATE_REMOVE_PRODUCT": {
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.id),
          ...state.products.slice(action.id + 1)
        ]
      };
    }

    case "MOVE_STATE_CHANGE_PRODUCT_ATTRIBUTE": {
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

    case "MOVE_STATE_FETCHING": {
      return {
        ...state,
        fetching: true
      };
    }

    case "MOVE_STATE_FETCHED": {
      return {
        ...state,
        fetching: false
      };
    }

    case "MOVE_STATE_RESET": {
      return {
        ...state,
        merchant: {},
        fromWarehouse: {},
        toWarehouse: {},
        products: []
      };
    }
    default:
  }

  return state;
}
