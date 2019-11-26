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
    let vendorId = this.props.match.params.id;
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
        window.location = "/vendors"
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
            <Header />
            <div className="container">
              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                  <center><h2>Edit Vendor </h2></center><br/>
                  

                  <div className="form-group">
                    <label htmlFor="vendorname" className="col-sm-2 control-label">Vendor Name</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendoraddress" className="col-sm-2 control-label">Vendor Address</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendorcity" className="col-sm-2 control-label">Vendor City</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendorstate" className="col-sm-2 control-label">Vendor State</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="state" ref="state" value={this.state.state} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendorcountry" className="col-sm-2 control-label">Vendor Country</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="country" ref="country" value={this.state.country} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendorlandmark" className="col-sm-2 control-label">Vendor Landmark</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="landmark" ref="landmark" value={this.state.landmark} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendorzipcode" className="col-sm-2 control-label">Vendor Zipcode</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="zipcode" ref="zipcode" value={this.state.zipcode} onChange={this.handleInputChange} />
                    </div>
                  </div>


                  <div className="form-group">
                    <div className="col-sm-3">
                      <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-1 col-sm-offset-2">
                      <button className="btn btn-primary btn-block">Submit</button>
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