import { combineReducers } from "redux";
import businesseReducer from "./businesses";
import businessDetailReducer from "./businessDetails";

const rootReducer = combineReducers({
  businesses: businesseReducer,
  businessDetail: businessDetailReducer
})

export default rootReducer