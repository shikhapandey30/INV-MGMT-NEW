import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { VendorEdit } from '../VendorPage';
import Loader from 'react-loader-spinner'

class VendorDetail extends React.Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
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
    const current_user = JSON.parse(localStorage.getItem('singleUser'))
    return (
      <div>
        <Header />
        <div className="container">
          <div>
            <div className="page-header">
                <center className="loading-msg"> 
                  <Loader
                   type="Oval"
                   color="#00BFFF"
                   height={100}
                   width={100}
                   timeout={500}
                  />
                </center>
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
                    <VendorEdit vendor_id={vendor.items.id} />
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