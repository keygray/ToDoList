import { SAVE_TASK, LIST_ALL, UPDATE_STATUS,DELETE_TASK } from "../constants/ActionTypes";

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateID = () => {
    return s4() + s4() + "-" + s4() + s4() + "-" + s4() + s4() + s4() + "-" + s4() + "-" + s4() + s4() + s4() + "-" + s4();
}

  // lấy ra vị trí index theo id
var findIndex = (tasks,id) => {
    var result = -1;
    tasks.forEach((task,index) => {
        if(task.id === id){
        result = index;
        }
    });
    return result;
}
  
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var myReducer = (state= initialState,action) => {
    var id = '';
    var index = -1;
    switch (action.type) {
        case LIST_ALL:
            return state;
        case SAVE_TASK:
            
            var task = {
                id : action.task.id,
                name: action.task.name, 
                status: action.task.status
            };
            
            if(!task.id){
                task.id = generateID();
                state.push(task);
            } else {
                index = findIndex(state,task.id);
                state[index] = task;
            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case UPDATE_STATUS:
            id = action.id;
            index = findIndex(state,id);
            if(index !== -1) {

                //  cách 1
                    // var cloneTask = {...state[index]};
                    // cloneTask.status = !cloneTask.status;
                    // state[index] = cloneTask;


                // cách 2 : ngắn hơn tương đồng về tư duy với cách 1
                state[index] = {
                    // copy lại ra phần tử mới bằng dấu ... và cập nhật lại status boolean , với cấu trúc mới ta có thể 
                    //  cập nhật lại 1 trường trong object khi gọi tên trường của nó như dưới
                    ...state[index],
                    status: !state[index].status
                };

            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case DELETE_TASK:
            id = action.id;
            index = findIndex(state,id);
            if(index !== -1) {
                state.splice(index,1);
            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
};

export default myReducer;