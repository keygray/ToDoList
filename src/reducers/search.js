import { SEARCH_TASK } from "../constants/ActionTypes";


var initialState = '';
var myReducer = (state= initialState,action) => {
    
    switch (action.type) {
        case SEARCH_TASK:
            var keyword = action.keyword.toLowerCase();
            return keyword;
        default:
            return state;
    }
};

export default myReducer;