import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
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

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  }
  render(){
    return (

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <div className="input-group">
                            <input type="text" 
                            className="form-control" 
                            placeholder="Nhập từ khóa..." 
                            name = "keyword"
                            onChange = {this.onChange}
                            value = { this.state.keyword}
                            />
                            <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick = {this.onSearch}>
                                <span className="fa fa-search mr-5" />Tìm
                            </button>
                            </span>
                        </div>
                    </div>
    );
  }
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    onSearch: (keyword) => {
      dispatch(actions.searchTask(keyword));
    }
  }
};
export default connect(null,mapDispatchToProps) (Search);

