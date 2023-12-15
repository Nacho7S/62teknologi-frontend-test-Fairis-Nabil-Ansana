import { LOADING_BUSINESS, SUCCESS_FETCH_BUSINESS } from "../Actions/actionType";

const initialState = {
  businesses: '',
  businessLoading: false
}

const businesseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_FETCH_BUSINESS:
      return {
        ...state,
        businesses: action.payload
      }
    case LOADING_BUSINESS:
      return {
        ...state,
        businessLoading: action.payload
      }
    default:
      return state
  }
}

export default businesseReducer