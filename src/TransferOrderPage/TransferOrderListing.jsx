import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { NewTransferOrder } from '../TransferOrderPage';
import Loader from 'react-loader-spinner'


class TransferOrderListing extends React.Component {

    constructor(props){
       super(props);
       this.goBack = this.goBack.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAlltranferorderslist());
    }

    render() {
      const { user, alltransferorders } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("alltransferorders*******************************", alltransferorders)
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
                  Transfer Orders
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Transfer Order
                    </button>
                  </div>
                </h1>
              </div>
              <div className="panel filterable">
                {alltransferorders.loading && <h5 className="loading-msg"><em> 
                  <Loader
                   type="Oval"
                   color="#00BFFF"
                   height={100}
                   width={100}
                  />
                </em></h5>}
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>Transfer Order ID</th>
                      <th>From Warehouse ID</th>
                      <th>From Warehouse</th>
                      <th>From Warehouse Address</th>
                      <th>To Warehouse</th>
                      <th>To Address</th>
                      <th>Status</th>
                      <th>View</th>
                    </tr>  
                  </thead>
                  
                  { alltransferorders.items && alltransferorders.items.length > 0 &&
                    <tbody>
                    {alltransferorders.items.map((transfer_order, index) =>
                      <tr key={transfer_order.id} >
                        <td>{index + 1}</td>
                        <td>{transfer_order.id}</td>
                        <td>{transfer_order.sourceWarehouse.id}</td>
                        <td>{transfer_order.sourceWarehouse.name}</td>
                        <td>{transfer_order.sourceWarehouse.address}</td>
                        <td>{transfer_order.destinationWarehouse.name}</td>
                        <td>{transfer_order.destinationWarehouse.address}</td>
                        <td>{transfer_order.status}</td>
                        <td><Link to={"/transfer-order/" + transfer_order.id} onClick={this.forceUpdate}>View</Link></td>
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
                  <p style={{ fontWeight: 'bold' }}>Add New Transfer Order</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewTransferOrder/>
                </div>
              </div>
            </div>
          </div>
        </div> 
      );
    }
}

function mapStateToProps(state) {
  const { alltransferorders, authentication } = state;
  const { user } = authentication;
  return {
    user,
    alltransferorders
  };
}

const connectedTransferOrderListing = connect(mapStateToProps)(TransferOrderListing);
export { connectedTransferOrderListing as TransferOrderListing };