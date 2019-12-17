import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { WareHouseNewUser } from '../WareHousePage';
import Loader from 'react-loader-spinner'


class WareHouseDetail extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      city:'',
      address:'',
      country:'',
      state:'',
      zipcode:'',
      landmark:'',
    };
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  componentWillMount(){
    this.getWarehouseDetails();
  }
  getWarehouseDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let warehouseId = this.props.match.params.id;
    axios.get(`${config.apiUrl}/warehouses/${warehouseId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        name: response.data.data.name,
        city: response.data.data.city,
        address: response.data.data.address,
        country: response.data.data.country,
        state: response.data.data.state,
        zipcode: response.data.data.zipcode,
        id: response.data.data.id,
        landmark: response.data.data.landmark
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editWarehouse(warehouse){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    axios.put(`${config.apiUrl}/warehouses`, warehouse, {
    headers: headers
  })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/warehouses"
      })
  }

  onSubmit(e){

    const warehouse = {
      name: this.refs.name.value,
      city: this.refs.city.value,
      address: this.refs.address.value,
      country: this.refs.country.value,
      state: this.refs.state.value,
      zipcode: this.refs.zipcode.value,
      id: this.refs.id.value,
      landmark: this.refs.landmark.value
    }
    this.editWarehouse(warehouse);
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
    const { warehouse } = this.state;
    this.setState({warehouse: event.target.value});
    this.setState({
        warehouse: { ...warehouse, [name]: value }
    });
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
      const { submitted } = this.state;
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
                    <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="warehousename" className="label">WareHouse Name</label>
                          <div>
                            <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="warehouseaddress" className="label">Address</label>
                          <div>
                            <input className="form-control" type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange} />
                          </div>
                        </div>
                      </div>
                      <br/>  
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="warehouselandmark" className="label">Landmark</label>
                          <div>
                            <input className="form-control" type="text" name="landmark" ref="landmark" value={this.state.landmark} onChange={this.handleInputChange} />
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <label htmlFor="warehousecity" className="label">City</label>
                          <div>
                            <input className="form-control" type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange} />
                          </div>
                        </div>
                      </div>
                       <br/> 
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="warehousezipcode" className="label">Zipcode</label>
                          <div>
                            <input className="form-control" type="text" name="zipcode" ref="zipcode" value={this.state.zipcode} onChange={this.handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="warehousestate" className="label">State</label>
                          <div>
                            <input className="form-control" type="text" name="state" ref="state" value={this.state.state} onChange={this.handleInputChange} />
                          </div>
                        </div>
                      </div><br/>
                      <div className="row model-warehouse">
                        <div className="col-md-6">
                          <label htmlFor="warehousecountry" className="label">Country</label>
                          <div>
                            <input className="form-control" type="text" name="country" ref="country" value={this.state.country} onChange={this.handleInputChange} />
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