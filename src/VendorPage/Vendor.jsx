import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewVendor } from '../VendorPage';
import Loader from 'react-loader-spinner'


class Vendor extends React.Component {

    constructor(props){
       super(props);
       this.goBack = this.goBack.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllvendor());
    }

    render() {
      const { user, allvendors } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allvendors*******************************", allvendors)
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
                  Vendors
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Vendor
                    </button>
                  </div>
                </h1>
              </div>
              <div className="panel filterable">
                {allvendors.loading && <h5 className="loading-msg"><em>
                  <Loader
                   type="Oval"
                   color="#00BFFF"
                   height={70}
                   width={70}
                  />
                </em></h5>}
                <table className="table table-hover">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>  
                  </thead>
                  
                  { allvendors.items && allvendors.items.length > 0 &&
                    <tbody>
                    {allvendors.items.map((vendor, index) =>
                      <tr key={vendor.id} >
                        <td>{index + 1}</td>
                        <td>{ vendor.id}</td>
                        <td><Link to={"/vendor/" + vendor.id} onClick={this.forceUpdate}>{vendor.name}</Link></td>
                      </tr>
                      
                    )}  
                    </tbody>
                  }  
                </table>
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-box" role="document">
              <div className="modal-content">
                <div className="modal-header textdesign">
                  <p style={{ fontWeight: 'bold' }}>Add New Vendor</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewVendor/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { allvendors, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allvendors
  };
}

const connectedVendor = connect(mapStateToProps)(Vendor);
export { connectedVendor as Vendor };