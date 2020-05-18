import {combineReducers} from "redux";
import itemsList from "./itemReducer";

export default combineReducers({
    data:itemsList
})