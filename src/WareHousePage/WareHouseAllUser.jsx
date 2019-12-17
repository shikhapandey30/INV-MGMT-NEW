import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { RSAA } from 'redux-api-middleware'


class WareHouseAllUser extends React.Component {
    // componentDidMount(warehouse) {
    //   this.props.dispatch(userActions.getwarehouseuser(this.props.match.params.id));
    // }
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        warehouseusers: [],
        response: {}
      };
      this.goBack = this.goBack.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    componentDidMount() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      let warehouseId = this.props.match.params.id;
      axios.get(`${config.apiUrl}/warehouses/${warehouseId}/users`, {
      headers: headers
      })
      .then(result => {
        this.setState({
            warehouseusers: result.data.data
          });
      })
  }
    
    render() {
      const { user, warehouse, warehousealluser } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      const { warehouseusers} = this.state;
      console.log("warehousealluser", warehousealluser)
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                <div className="pull-left">
                  <button type="button" className="btn btn-primary back-btn" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                  </button>
                </div>
                <h1 className="page-title heading-title">
                  Warehouse Users
                </h1>
              </div>
              <div className="panel filterable">

              <table className="table table-hover table-responsive">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>User Name</th>
                      <th>Warehouse ID</th>
                      <th>Warehouse Name</th>
                      <th>Warehouse Address</th>
                      <th>Warehouse Landmark</th>
                      <th>Warehouse Zipcode</th>
                      <th>Warehouse City</th>
                      <th>Warehouse State</th>
                      <th>Warehouse Country</th>
                      <th>CreatedAt</th>
                      <th>SuperAdmin</th>

                    </tr>  
                  </thead>
                    <tbody>
                    {warehouseusers.map((warehouseuser, index) =>
                      <tr key={warehouseuser.id} >
                        <td>{index + 1}</td>
                        <td>{warehouseuser.id}</td>
                        <td><Link to={"/warehouses/" + warehouseuser.warehouse.id + "/users/" + warehouseuser.id} onClick={this.forceUpdate}>{warehouseuser.userName}</Link></td>
                        <td>{warehouseuser.warehouse.id}</td>
                        <td>{warehouseuser.warehouse.name}</td>
                        <td>{warehouseuser.warehouse.address}</td>
                        <td>{warehouseuser.warehouse.landmark}</td>
                        <td>{warehouseuser.warehouse.zipcode}</td>
                        <td>{warehouseuser.warehouse.city}</td>
                        <td>{warehouseuser.warehouse.state}</td>
                        <td>{warehouseuser.warehouse.country}</td>
                        <td>
                          {new Intl.DateTimeFormat('en-GB', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric'
                          }).format(new Date(warehouseuser.warehouse.createdAt))}
                        </td>
                        <td>{warehouseuser.superAdmin.toString()}</td>
                      </tr>
                    )}  
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { warehouseid,warehousealluser, warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehousealluser,
    warehouse
  };
}

const connectedWareHouseAllUser = connect(mapStateToProps)(WareHouseAllUser);
export { connectedWareHouseAllUser as WareHouseAllUser };