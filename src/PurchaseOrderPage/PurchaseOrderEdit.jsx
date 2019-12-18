import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class PurchaseOrderEdit extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      warehouse:'',
      status:'',
      items:'',
      vendor:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getPurchaseOrderDetails();
    this.props.dispatch(userActions.getAllwarehouse());
    this.props.dispatch(userActions.getAllvendor());
  }
  getPurchaseOrderDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let purchaseorderId = this.props.purchaseorder_id;
    axios.get(`${config.apiUrl}/purchase_orders/${purchaseorderId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        warehouse: response.data.data.warehouse,
        status: response.data.data.status,
        items: response.data.data.items,
        vendor: response.data.data.vendor
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editPurchaseOrder(purchaseorder){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    var purchaseorders = {id: purchaseorder.id, status: purchaseorder.status, items: [], vendor: {id: purchaseorder.vendor}, warehouse: {id: purchaseorder.warehouse}}
    axios.put(`${config.apiUrl}/purchase_orders`, purchaseorders, {
    headers: headers
  })
    .then(response => {
      this.setState({ locations: response.data });
      window.location = "/purchase-orders"
    })
  }

  onSubmit(e){

    const purchaseorder = {
      id: this.refs.id.value,
      warehouse: this.refs.warehouse.value,
      status: this.refs.status.value,
      items: this.refs.items.value,
      vendor: this.refs.vendor.value
    }
    this.editPurchaseOrder(purchaseorder);
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
      const { purchaseorder } = this.state;
      this.setState({purchaseorder: event.target.value});
      this.setState({
          purchaseorder: { ...purchaseorder, [name]: value }
      });
    }

    render() {
      const { loggingIn, allwarehouses,allvendors} = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))

      return (
        <div>
          <div>
            <div className="container">
              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="warehouse" className="label">Warehouse</label>
                    <div>
                      { allwarehouses.items && allwarehouses.items.length > 0 &&
                        <select name="warehouse" ref="warehouse" value={this.state.warehouse.id} onChange={this.handleInputChange} className="form-control select-field" >
                          {allwarehouses.items.map((warehouse, index) =>
                            <option key={index} value={warehouse.id} >
                              {warehouse.name}
                            </option>
                          )}
                        </select>
                      }
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="status" className="label">Status</label>
                    <div>
                      <input className="form-control" type="text" name="status" ref="status" value={this.state.status} onChange={this.handleInputChange} />
                    </div>
                  </div>
                </div><br/>  
                <div className="row model-warehouse">
                  <div className="col-md-6">
                    <label htmlFor="items" className="label">Items</label>
                    <div>
                      <input className="form-control" type="text" name="items" ref="items" value={this.state.items.id} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="vendor" className="label">Vendor</label>
                    <div>

                    { allvendors.items && allvendors.items.length > 0 &&
                      <select name="vendor" ref="vendor" value={this.state.vendor.id}  onChange={this.handleInputChange}  className="form-control select-field" >
                        {allvendors.items.map((vendor, index) =>
                          <option key={index} value={vendor.id} >
                            {vendor.name}
                          </option>
                        )}
                      </select>
                    }

                    </div><br/>
                  </div>
                </div><br/>  
                <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
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
  const {purchaseorderid, allwarehouses, allvendors, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allwarehouses,
    allvendors
  };
}

const connectedPurchaseOrderEdit = connect(mapStateToProps)(PurchaseOrderEdit);
export { connectedPurchaseOrderEdit as PurchaseOrderEdit };