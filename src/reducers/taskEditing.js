import { UPDATE_TASK } from "../constants/ActionTypes";


var initialState = {
    id: '',
    name: '',
    status: false
};
var myReducer = (state= initialState,action) => {
    
    switch (action.type) {
        case UPDATE_TASK:
            return action.task;
        default:
            return state;
    }
};

export default myReducer;