import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class VendorEdit extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      name:'',
      address:'',
      city:'',
      country:'',
      landmark:'',
      state:'',
      zipcode:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getVendorDetails();
  }
  getVendorDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let vendorId = this.props.vendor_id;
    axios.get(`${config.apiUrl}/vendors/${vendorId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        name: response.data.data.name,
        address: response.data.data.address,
        city: response.data.data.city,
        country: response.data.data.country,
        landmark: response.data.data.landmark,
        state: response.data.data.state,
        zipcode: response.data.data.zipcode
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editVendor(vendor){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    axios.put(`${config.apiUrl}/vendors`, vendor, {
    headers: headers
  })
      .then(response => {
        this.setState({ locations: response.data });
        let vendor_id = response.data.data.id;
        window.location = `/vendor/${vendor_id}`
      })
  }

  onSubmit(e){
    const vendor = {
      name: this.refs.name.value,
      id: this.refs.id.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      country: this.refs.country.value,
      landmark: this.refs.landmark.value,
      state: this.refs.state.value,
      zipcode: this.refs.zipcode.value
    }
    this.editVendor(vendor);
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
    const { vendor } = this.state;
    this.setState({vendor: event.target.value});
    this.setState({
        vendor: { ...vendor, [name]: value }
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
                  <label htmlFor="vendorname" className="label">Vendor Name</label>
                  <div>
                    <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendoraddress" className="label">Vendor Address</label>
                  <div>
                    <input className="form-control" type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorcity" className="label">Vendor City</label>
                  <div>
                    <input className="form-control" type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorstate" className="label">Vendor State</label>
                  <div>
                    <input className="form-control" type="text" name="state" ref="state" value={this.state.state} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorcountry" className="label">Vendor Country</label>
                  <div>
                    <input className="form-control" type="text" name="country" ref="country" value={this.state.country} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorlandmark" className="label">Vendor Landmark</label>
                  <div>
                    <input className="form-control" type="text" name="landmark" ref="landmark" value={this.state.landmark} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="vendorzipcode" className="label">Vendor Zipcode</label>
                  <div>
                    <input className="form-control" type="text" name="zipcode" ref="zipcode" value={this.state.zipcode} onChange={this.handleInputChange} />
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
  const {vendorid, authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedVendorEdit = connect(mapStateToProps)(VendorEdit);
export { connectedVendorEdit as VendorEdit };