import React from 'react';
import TaskItem from './TaskItem';
import {connect } from 'react-redux';
import * as actions from "../actions/index";
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1 // all là -1 , active: 1 ,deactive: 0
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    var filter = {
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value : this.state.filterStatus,
    }
    this.props.onFilterTable(filter);
    this.setState({
        [name]: value
    });
  }

  onClear = async() => {
    await this.setState({
      filterName: '',
      filterStatus: -1 // all là -1 , active: 1 ,deactive: 0
    });
    var filter = {
      name: this.state.filterName,
      status: this.state.filterStatus,
    }
    this.props.onFilterTable(filter);
  }
  render(){
    var {filterTable,tasks,keyword,sort} = this.props;


    // filter
    // filterTable: viết kiểu này có nghĩa là phải thỏa mãn điều kiện khác null undifine và 0
    if(filterTable) {
      if(filterTable.name){
        tasks = tasks.filter((task) => {
          // lặp qua các phần tử trong tasks và tìm kiếm nơi có tên như biến truyền vào
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        })
      }
      
      tasks = tasks.filter((task) => {
        // nếu trạng thái là -1 thì trả ra full
        if(filterTable.status === -1) {
          return task;
        }
        // nếu không thì nếu thì ta xét toán tử 3 ngôi với để trả mảng task có các giá trị false hoặc giá trị true
        else {
          return task.status === (filterTable.status === 1 ? true : false);
        }
      })
    }
    
    

    // end filter


    // search
    if(keyword) {
      tasks = tasks.filter( (task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }
    // end search


    // sort
    if(sort.by === 'name') {
      tasks.sort((a,b) => {
        // sort qua 2 mảng và sắp xếp
        if(a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a,b) => {
        // sort qua 2 mảng và sắp xếp
        if(a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }
    // end sort
    var {filterName , filterStatus} = this.state;
    var elmTaskItem = tasks.map((task,index) => {
        return <TaskItem  key={ task.id } 
                          index={index} 
                          task={task}
                          
                          />;
    });
    return (
        <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                    <button type="button" className="btn btn-danger" onClick={ this.onClear }>
                      Clear
                    </button>
                </td>
                <td>
                  <input type="text" className="form-control" 
                  name="filterName" value={filterName} 
                  onChange = { this.onChange }
                  />
                </td>
                <td>
                  <select className="form-control" name="filterStatus" value={filterStatus} onChange = { this.onChange }>
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {elmTaskItem}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// chuyển từ State sang Props thì hiện tai tasklist đã lấy được 1 giá trị prop là tasks
const mapStateToProps = (state) => {
  return {
    tasks : state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort,
  }
};

const mapDispatchToProps = (dispatch,props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTask(filter));
    }
  };
};
export default connect(mapStateToProps,mapDispatchToProps) (TaskList);
