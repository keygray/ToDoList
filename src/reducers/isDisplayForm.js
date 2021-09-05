import { CLOSE_FORM, OPEN_FORM, TOGGLE_FORM } from "../constants/ActionTypes";


var initialState = false;
var myReducer = (state= initialState,action) => {
    switch (action.type) {
        case TOGGLE_FORM:
            return !state;
        case CLOSE_FORM:
            return false;
        case OPEN_FORM:
            return true;
        default:
            return state;
    }
};

export default myReducer;