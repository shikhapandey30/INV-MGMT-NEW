import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class WareHouseNewUser extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            warehouse: {
                password: '',
                superAdmin: '',
                token: JSON.parse(localStorage.getItem('user')).data.token,
                userName: '',
                warehouse: '',
                warehouseAdmin: '',
                loaded: 0
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { warehouse } = this.state;
      this.setState({
          warehouse: { ...warehouse, [name]: value }
      });
    }


    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { warehouse } = this.state;
      const { dispatch } = this.props;
      var warehouseadminuser = JSON.parse(warehouse.warehouseAdmin);
      var warehouseuser = {password: warehouse.password, superAdmin: false, token: warehouse.token, userName: warehouse.userName,warehouseAdmin: warehouseadminuser}
       let warehouseId = this.props.warehouse.items.id;
      axios.post(`${config.apiUrl}/warehouses/${warehouseId}/users`, warehouseuser, {
      headers: headers
      })
      .then(result => {
        this.setState(locations: result.data.data);
        window.location = "/warehouses"
      })
    }

    render() {
      const { loggingIn, user, users } = this.props;
      const { warehouse, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("users", users)
      return (
        <div>
          <div className="container">
            <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                
                 <div className="col-md-6">
                  <label htmlFor="warehouseuserName" className="label">User Email</label>
                  <div>
                    {submitted && !warehouse.userName && 
                      <div className="help-block required-msg"> Warehouse userName is required</div>
                    }
                    <input type="email" id="warehouseuserName" className="form-control" placeholder="Email" name="userName" value={warehouse.userName} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="warehousepassword" className="label">Password</label>
                  <div>
                    {submitted && !warehouse.password && 
                      <div className="help-block required-msg"> Warehouse Password is required</div>
                    }
                    <input type="password" id="warehousepassword" className="form-control" placeholder="Password" name="password" value={warehouse.password} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <input type="hidden" id="warehousetoken" className="form-control" placeholder="token" name="token" value={warehouse.token} onChange={this.handleChange}  autoFocus />
                <div className="col-md-6">
                  <label htmlFor="warehousewarehouseAdmin" className="label">Warehouse Admin</label>
                  <div >
                    <select value={warehouse.warehouseAdmin} onChange={this.handleChange} name="warehouseAdmin" className="form-control select-field">
                      <option value="">select</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
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
      );
    }
}

function mapStateToProps(state) {
  const { warehouseid, users,warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse,
    users
  };
}

const connectedWareHouseNewUser = connect(mapStateToProps)(WareHouseNewUser);
export { connectedWareHouseNewUser as WareHouseNewUser };