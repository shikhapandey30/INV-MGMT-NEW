import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';

class VendorDetail extends React.Component {

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
    };
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  goBack(){
    this.props.history.goBack();
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

    componentDidMount(vendor) {
      this.props.dispatch(userActions.getvendordetail(this.props.match.params.id));
    }

    vendorDelete = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/vendors/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/vendors"
        })
    }

    render() {
      const { user, vendor, loggingIn } = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                { vendor.items && 
                  <h1 className="page-title">
                    <button type="button" className="btn btn-primary back-btn" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </button> &nbsp;
                    {vendor.items.name}
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.vendorDelete(vendor.items.id)};}}>Delete</button>
                      &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                    </div>
                  </h1>
                }
              </div>
              <div className="panel filterable">
                { vendor.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Vendor ID</td>
                        <td>{vendor.items.id}</td>
                      </tr>
                      <tr>
                        <td>Vendor Name</td>
                        <td>{vendor.items.name}</td>
                      </tr>
                      <tr>
                        <td>Vendor Address</td>
                        <td>{vendor.items.address}</td>
                      </tr>
                      <tr>
                        <td>Vendor Landmark</td>
                        <td>{vendor.items.landmark}</td>
                      </tr>
                      <tr>
                        <td>Vendor Zipcode</td>
                        <td>{vendor.items.zipcode}</td>
                      </tr>
                      <tr>
                        <td>Vendor City</td>
                        <td>{vendor.items.city}</td>
                      </tr>
                      <tr>
                        <td>Vendor State</td>
                        <td>{vendor.items.state}</td>
                      </tr>
                      <tr>
                        <td>Vendor Country</td>
                        <td>{vendor.items.country}</td>
                      </tr>
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
          { vendor.items &&
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-box" role="document">
                            <div className="modal-content">
                              <div className="modal-header textdesign">
                                <p style={{ fontWeight: 'bold' }}>{ vendor.items.name}</p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
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
            </div>
          }
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { vendorid, vendor, authentication } = state;
  const { user } = authentication;
  return {
    user,
    vendor
  };
}

const connectedVendorDetail = connect(mapStateToProps)(VendorDetail);
export { connectedVendorDetail as VendorDetail };