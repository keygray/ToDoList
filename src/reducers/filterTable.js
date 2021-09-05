import { FILTER_TABLE } from "../constants/ActionTypes";


var initialState = {
    name: '',
    status: -1
};
var myReducer = (state= initialState,action) => {
    
    switch (action.type) {
        case FILTER_TABLE:
            return {
                name: action.filter.name.toLowerCase(),
                status: parseInt(action.filter.status, 10)
            };
        default:
            return state;
    }
};

export default myReducer;