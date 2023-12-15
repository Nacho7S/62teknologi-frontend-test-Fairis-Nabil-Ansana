import { DETAIL_BUSINESS_LOADING, SUCCESS_FETCH_BUSINESS_DETAILS } from "../Actions/actionType"

const initialState = {
  business: '',
  loadingDetail: false
}

const businessDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_FETCH_BUSINESS_DETAILS:
      return {
        ...state,
        business: action.payload
      }
    case DETAIL_BUSINESS_LOADING:
      return {
        ...state,
        loadingDetail: action.payload
      }
    default:
      return state
  }
}

export default businessDetailReducer