import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class CategoryEdit extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getCategoryDetails();
  }
  getCategoryDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let categoryId = this.props.category_items;
    axios.get(`${config.apiUrl}/categories/${categoryId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        name: response.data.data.name
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editCategory(category){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    axios.put(`${config.apiUrl}/categories`, category, {
    headers: headers
  })
    .then(response => {
      this.setState({ locations: response.data });
      let category_id = response.data.data.id;
      window.location = `/category/${category_id}`
    })
  }

  onSubmit(e){
    const category = {
      name: this.refs.name.value,
      id: this.refs.id.value
    }
    this.editCategory(category);
    e.preventDefault();
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { category } = this.state;
    this.setState({category: event.target.value});
    this.setState({
        category: { ...category, [name]: value }
    });
  }

  render() {
    const { loggingIn} = this.props;
    const { submitted } = this.state;
    const current_user = JSON.parse(localStorage.getItem('singleUser'))

    return (
      <div>
        <div>
          <div className="container">
            <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
              <div className="row model-warehouse">
                <div className="col-md-12">
                  <label htmlFor="categoryname" className="label">Category Name</label>
                  <div>
                    <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                  </div><br/>
                </div>
                <div className="col-md-6">
                  <div>
                    <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="form-group">
               <div className="pull-right">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {categoryid, authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedCategoryEdit = connect(mapStateToProps)(CategoryEdit);
export { connectedCategoryEdit as CategoryEdit };