import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ModernDatepicker from 'react-modern-datepicker';

class NewInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inventories: {
              barcode: '',
              batch: '',
              mrpCost: '',
              product: '',
              expiryDate: '',
              purchaseCost: '',
              quantity: '',
              referenceNumber: '',
              remark: '',
              salesCost: '',
              specialCost: '',
              warehouse: '',
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { inventories } = this.state;
      this.setState({
          inventories: { ...inventories, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { inventories } = this.state;
      const { dispatch } = this.props;
      var inventory = { barcode: inventories.barcode, expiryDate: inventories.expiryDate, batch: inventories.batch, mrpCost: inventories.mrpCost, purchaseCost: inventories.purchaseCost, quantity: inventories.quantity, referenceNumber: inventories.referenceNumber, remark: inventories.remark, salesCost: inventories.salesCost, specialCost: inventories.specialCost, product: { id: inventories.product}, warehouse: { id: inventories.warehouse} }
      axios.post(`${config.apiUrl}/inventories`, inventory, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        let inventory_id = response.data.data.id;
        window.location = `/inventory/${inventory_id}`
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
      this.props.dispatch(userActions.getAllwarehouse());
    }

    render() {
      const { loggingIn, user, allproducts, allwarehouses } = this.props;
      const { inventories, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      console.log("allwarehouses*******************************", allwarehouses)
      return (
        <div>
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inventorybarcode" className="label">Barcode</label>
                  <div>
                    {submitted && !inventories.barcode && 
                      <div className="help-block required-msg"> Inventory barcode is required</div>
                    }
                    <input type="text" id="inventorybarcode" className="form-control" placeholder="Barcode" name="barcode" value={inventories.barcode} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  

                <div className="col-md-6">
                  <label htmlFor="inventoryexpiryDate" className="label">Expiry Date</label>
                  <div>
                    {submitted && !inventories.expiryDate && 
                      <div className="help-block required-msg"> Inventory expiryDate is required</div>
                    }
                    
                    <input type="date" id="inventoryexpiryDate" className="form-control" placeholder="expiryDate" name="expiryDate" value={inventories.expiryDate} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
              </div><br/>  

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inventorybatch" className="label">Batch</label>
                  <div>
                    {submitted && !inventories.batch && 
                      <div className="help-block required-msg"> Inventory batch is required</div>
                    }
                    <input type="text" id="inveventorybatch" className="form-control" placeholder="Batch" name="batch" value={inventories.batch} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inventorymrpCost" className="label">MRP Cost</label>
                  <div>
                    {submitted && !inventories.mrpCost && 
                      <div className="help-block required-msg"> Inventory mrpCost is required</div>
                    }
                    <input type="text" id="inventorymrpCost" className="form-control" placeholder="MRP Cost" name="mrpCost" value={inventories.mrpCost} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
              </div><br/> 
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inventoryproductid" className="label">Product </label>
                  <div>
                     { allproducts.items && allproducts.items.length > 0 &&
                      <select value={inventories.product} onChange={this.handleChange} name="product" className="form-control select-field" >
                        {allproducts.items.map((product, index) =>
                          <option key={index} value={product.id} >
                            {product.name}
                          </option>
                         
                        )}
                      </select>
                     }
                  </div>   
                </div>
                <div className="col-md-6">
                  <label htmlFor="inventorywarehouseid" className="label">Warehouse </label>
                  <div>
                     { allwarehouses.items && allwarehouses.items.length > 0 &&
                      <select value={inventories.warehouse} onChange={this.handleChange} name="warehouse" className="form-control select-field" >
                        {allwarehouses.items.map((warehouse, index) =>
                          <option key={index} value={warehouse.id} >
                            {warehouse.name}
                          </option>
                        )}
                      </select>
                     }
                  </div>   
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inventorypurchaseCost" className="label">Purchase Cost</label>
                  <div>
                    {submitted && !inventories.purchaseCost && 
                      <div className="help-block required-msg"> Inventory PurchaseCost is required</div>
                    }
                    <input type="text" id="inventorypurchaseCost" className="form-control" placeholder="Purchase Cost" value={inventories.purchaseCost}  name="purchaseCost"  onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inventoryquantity" className="label">Quantity</label>
                  <div>
                    {submitted && !inventories.quantity && 
                      <div className="help-block required-msg"> Inventory Quantity is required</div>
                    }
                    <input type="text" id="inventoryquantity" className="form-control" placeholder="Quantity" value={inventories.quantity}  name="quantity"  onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="inventoryreferenceNumber" className="label">Reference Number</label>
                  <div>
                    {submitted && !inventories.referenceNumber && 
                      <div className="help-block required-msg"> Inventory Reference Number is required</div>
                    }

                     <input type="text" id="inventoryreferenceNumber" className="form-control" placeholder="Reference Number" value={inventories.referenceNumber}  name="referenceNumber"  onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inventoryremark" className="label">Remark </label>
                  <div>
                    {submitted && !inventories.remark && 
                      <div className="help-block required-msg"> Inventory remark is required</div>
                    }
                    <input type="text" id="inventoryremark" className="form-control" placeholder="Remark" value={inventories.remark}  name="remark"  onChange={this.handleChange}  autoFocus />
                  </div>   
                </div>
              </div><br/>  
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="inventorysalesCost" className="label">Sales Cost </label>
                  <div>
                    {submitted && !inventories.salesCost && 
                      <div className="help-block required-msg"> Inventory Sales Cost is required</div>
                    }
                    <input type="text" id="inventorysalesCost" className="form-control" placeholder="Sales Cost" value={inventories.salesCost}  name="salesCost"  onChange={this.handleChange}  autoFocus />
                  </div>   
                </div>
                <div className="col-md-6">
                  <label htmlFor="inventoryspecialCost" className="label">Special Cost </label>
                  <div>
                    {submitted && !inventories.specialCost && 
                      <div className="help-block required-msg"> Inventory Special Cost is required</div>
                    }
                    <input type="text" id="inventoryspecialCost" className="form-control" placeholder="Special Cost" value={inventories.specialCost}  name="specialCost"  onChange={this.handleChange}  autoFocus />
                  </div><br/>   
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
      );
    }
}

function mapStateToProps(state) {
  const { inventories,allproducts, allwarehouses, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    inventories,
    allwarehouses,
    users,
  };
}

const connectedNewInventory = connect(mapStateToProps)(NewInventory);
export { connectedNewInventory as NewInventory };