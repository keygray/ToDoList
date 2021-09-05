import React from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
import { connect } from 'react-redux';
import * as actions from "./actions/index";

class App extends React.Component {

  onToggleForm = () => {
    var taskEditing = this.props.taskEditing;
    // nếu đang xuất hiện task sửa và task sửa không bằng rỗng thì vẫn giữ nguyên mở form và đổi thành thêm
    if(taskEditing && taskEditing !== '') {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }

    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
    
  }

  render(){
    
    var {isDisplayForm} = this.props;
    var elmTaskForm = isDisplayForm ? <TaskForm /> : null;
    var elmFullForm = isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
    return (
      <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          {/* FORM */}
          { elmTaskForm }
        </div>
        <div className={elmFullForm}>
          <button type="button" 
                  className="btn btn-primary"
                  onClick = {this.onToggleForm}>
            <span className="fa fa-plus mr-5" />Thêm Công Việc
          </button>

          {/* Search - sort */}
          <Control 
          onSort = {this.onSort}
          />


          {/* Task - list */}

          <TaskList />
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing
  }
};
const mapDispatchToProps = (dispatch,props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },
    onClearTask: (task) => {
      dispatch(actions.updateTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm())
    },
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (App);
