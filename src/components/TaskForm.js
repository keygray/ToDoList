import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    componentDidMount() {
        if(this.props.taskEditing && this.props.taskEditing.id !== null) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
            
        } else {
            this.onClear();
        }
    }


    // để xét xem trạng thái chạy và set lại state vì hàm componentDidMount chỉ chạy 1 lần khi được load
    // load mỗi khi nhận thấy 1 giá trị thay đổi
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            });
        } else if (!nextProps.taskEditing){
            this.onClear();
        }

        // trường hợp đnag bấm sửa mà bấm thêm mà vẫn giữ nguyên form thì ta sẽ phải xóa hết value bằng cách set state về ban đầu
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if( name === 'status') {
            value = target.value === "true" ? true : false
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    } 
    
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState( {
            name: '',
            status: false
        });
    }
    render(){
        var {name ,status, id} = this.state;
        return (
            <div className="panel panel-warning mb-15">
            <div className="panel-heading">
            <h3 className="panel-title">{ id !== "" ? 'Cập nhật công việc' : 'Thêm Công Việc'}</h3>
            <span className="fas fa-times" onClick= { this.onCloseForm }></span>
            </div>
            <div className="panel-body">
            <form onSubmit= {this.onSubmit}>
                <div className="form-group">
                <label>Tên :</label>
                <input type="text" className="form-control" name="name" value={name} onChange={ this.onChange}/>
                </div>
                <label>Trạng Thái :</label>
                <select className="form-control" required="required" name="status" value={status} onChange={ this.onChange}>
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
                </select>
                <br />
                <div className="text-center">
                <button type="submit" className="btn btn-warning">{ id !== '' ? 'Cập nhật' : 'Thêm'}</button>&nbsp;
                <button type="button" className="btn btn-danger" onClick={ this.onClear }>Clear</button>
                </div>
            </form>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskEditing: state.taskEditing
    }
};

const mapDispatchToProps = (dispatch,props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (TaskForm);
