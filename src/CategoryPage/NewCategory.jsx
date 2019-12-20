import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class NewCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: {
                name: '',
                loaded: 0
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { category } = this.state;
      this.setState({
          category: { ...category, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { category } = this.state;
      const { dispatch } = this.props;

      axios.post(`${config.apiUrl}/categories`, category, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        let category_id = response.data.data.id;
        window.location = `/category/${category_id}`
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
      const { loggingIn, user, users } = this.props;
        const { category, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("users", users)
      return (
        <div>
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="form-group model-warehouse">
                <label htmlFor="categoryname" className="label">Category Name</label>
                <div>
                  <input type="text" id="categoryname" className="form-control" placeholder="Category Name" name="name" value={category.name} onChange={this.handleChange}  autoFocus />
                  {submitted && !category.name && 
                    <div className="help-block required-msg"> Category Name is required</div>
                  }
                </div><br/>
              </div>
              <div className="form-group">
                <div className="pull-right">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { users,warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse,
    users
  };
}

const connectedNewCategory = connect(mapStateToProps)(NewCategory);
export { connectedNewCategory as NewCategory };