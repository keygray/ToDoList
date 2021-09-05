import { SORT_TASK } from "../constants/ActionTypes";


var initialState = {
    by: 'name',
    value: 1
};
var myReducer = (state= initialState,action) => {
    
    switch (action.type) {
        case SORT_TASK:
            var sort = {
                by: action.sort.by,
                value: action.sort.value
            }
            return sort;
        default:
            return state;
    }
};

export default myReducer;