import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { WareHouseNewUser } from '../WareHousePage';
import { WareHouseEdit } from '../WareHousePage';
import Loader from 'react-loader-spinner'


class WareHouseDetail extends React.Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(warehouse) {
    this.props.dispatch(userActions.getwarehousedetail(this.props.match.params.id));
  }

  warehouseDelete = (id) => {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      console.log("******************************************", id)
      axios.delete(`${config.apiUrl}/warehouses/${id}`, {
    headers: headers
    })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/warehouses"
      })
  }

    render() {
      const { user, warehouse, loggingIn } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'));
      
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                <center> 
                  <Loader
                   type="TailSpin"
                   color="#00BFFF"
                   height={100}
                   width={100}
                   timeout={500}
                  />
                </center>
                { warehouse.items && 
                  <h1 className="page-title">
                  <button type="button" className="btn btn-primary back-btn" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                  </button> &nbsp;
                    {warehouse.items.name}
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.warehouseDelete(warehouse.items.id)};}}>Delete</button>
                      &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                      &nbsp;
                      <Link to={"/warehouse/" + warehouse.items.id + "/users"} onClick={this.forceUpdate} className="btn btn-primary" >Warehouse Users</Link>
                       &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addNewUser">
                        Add New User
                      </button>
                    </div>
                  </h1>
                }
              </div>
              <div className="panel filterable">
                { warehouse.items && 
                  <table className="table table-bordered table table-border">
                    
                    <tbody>
                      <tr>
                        <td>Warehouse ID</td>
                        <td>{warehouse.items.id}
                        </td>
                      </tr>
                      <tr>
                        <td>Warehouse Name</td>
                        <td>{warehouse.items.name}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Address</td>
                        <td>{warehouse.items.address}</td>
                      </tr>
                      <tr>
                        <td>Warehouse City</td>
                        <td>{warehouse.items.city}</td>
                      </tr>
                      <tr>
                        <td>Warehouse State</td>
                        <td>{warehouse.items.state}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Country</td>
                        <td>{warehouse.items.country}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Landmark</td>
                        <td>{warehouse.items.landmark}</td>
                      </tr>
                    </tbody>

                  </table>
                }
              </div>
            </div>
          </div>
          { warehouse.items &&
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-box" role="document">
                <div className="modal-content">
                  <div className="modal-header textdesign">
                    <p style={{ fontWeight: 'bold' }}>{warehouse.items.name}</p>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <WareHouseEdit warehouse_id={warehouse.items.id} />  
                  </div>
                </div>
              </div>
            </div>
          }
          <div className="modal fade" id="addNewUser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-box" role="document">
              <div className="modal-content">
                <div className="modal-header textdesign">
                  <p style={{ fontWeight: 'bold' }}>Add New WareHouse User</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <WareHouseNewUser/>
                </div>
              </div>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { warehouseid, warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse
  };
}

const connectedWareHouseDetail = connect(mapStateToProps)(WareHouseDetail);
export { connectedWareHouseDetail as WareHouseDetail };