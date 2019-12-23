import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { NewPurchaseOrder } from '../PurchaseOrderPage';
import Loader from 'react-loader-spinner'


class PurchaseOrderListing extends React.Component {

    constructor(props){
       super(props);
       this.goBack = this.goBack.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllpuchaseorderslist());
    }

    render() {
      const { user, allpuchaseorders } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allpuchaseorders*******************************", allpuchaseorders)
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
                  Purchase Orders
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Purchase Order
                    </button>
                  </div>
                </h1>
              </div>
              <div className="panel filterable">
                {allpuchaseorders.loading && <h5 className="loading-msg"><em> 
                  <Loader
                   type="Oval"
                   color="#00BFFF"
                   height={70}
                   width={70}
                  />
                </em></h5>}
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>PO ID</th>
                      <th>Status</th>
                      <th>Warehouse ID</th>
                      <th>Warehouse Name</th>
                      <th>Warehouse Address</th>
                      <th>Warehouse City</th>
                      <th>Warehouse State</th>
                      <th>Vendor ID</th>
                      <th>Vendor Name</th>
                      <th>View</th>
                    </tr>  
                  </thead>
                  
                  { allpuchaseorders.items && allpuchaseorders.items.length > 0 &&
                    <tbody>
                    {allpuchaseorders.items.map((po, index) =>
                      <tr key={po.id} >
                        <td>{index + 1}</td>
                        <td>{po.id}</td>
                        <td>{po.status}</td>
                        <td>{po.warehouse.id}</td>
                        <td>{po.warehouse.name}</td>
                        <td>{po.warehouse.address}</td>
                        <td>{po.warehouse.city}</td>
                        <td>{po.warehouse.state}</td>
                        <td>{po.vendor.id}</td>
                        <td>{po.vendor.name}</td>
                        <td><Link to={"/purchase-order/" + po.id} onClick={this.forceUpdate}>View</Link></td>
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
                  <p style={{ fontWeight: 'bold' }}>Add New Purchase Order</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewPurchaseOrder/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { allpuchaseorders, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allpuchaseorders
  };
}

const connectedPurchaseOrderListing = connect(mapStateToProps)(PurchaseOrderListing);
export { connectedPurchaseOrderListing as PurchaseOrderListing };