import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class WareHouseEdit extends React.Component {

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
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getWarehouseDetails();
  }
  getWarehouseDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let warehouseId = this.props.warehouse_id;
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

  render() {
    const { loggingIn} = this.props;
    const { submitted } = this.state;
    const current_user = JSON.parse(localStorage.getItem('singleUser'))

    return (
      <div>
        <div>
          <div className="container">
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
    );
  }
}

function mapStateToProps(state) {
  const {warehouseid, authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedWareHouseEdit = connect(mapStateToProps)(WareHouseEdit);
export { connectedWareHouseEdit as WareHouseEdit };