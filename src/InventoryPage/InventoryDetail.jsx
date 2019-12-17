import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class InventoryDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id:'',
      barcode:'',
      expiryDate:'',
      mrpCost:'',
      product:'',
      purchaseCost:'',
      quantity:'',
      referenceNumber:'',
      remark:'',
      salesCost:'',
      specialCost:'',
      warehouse:'',
    };
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  componentWillMount(){
    this.getInventoryDetails();
    this.props.dispatch(userActions.getAllwarehouse());
    this.props.dispatch(userActions.getAllproduct());
  }
  getInventoryDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let inventoryId = this.props.match.params.id;
    axios.get(`${config.apiUrl}/inventories/${inventoryId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        barcode: response.data.data.barcode,
        batch: response.data.data.batch,
        expiryDate: response.data.data.expiryDate,
        mrpCost: response.data.data.mrpCost,
        product: response.data.data.product,
        purchaseCost: response.data.data.purchaseCost,
        quantity: response.data.data.quantity,
        referenceNumber: response.data.data.referenceNumber,
        remark: response.data.data.remark,
        salesCost: response.data.data.salesCost,
        specialCost: response.data.data.specialCost,
        warehouse: response.data.data.warehouse
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editInventory(inventory){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    var inventorydata = {barcode: inventory.barcode, batch: inventory.batch, expiryDate: inventory.expiryDate, id: inventory.id, mrpCost: inventory.mrpCost, product: {id: inventory.product}, purchaseCost: inventory.purchaseCost, quantity: inventory.quantity, referenceNumber: inventory.referenceNumber, remark: inventory.remark, salesCost: inventory.salesCost, specialCost: inventory.specialCost, warehouse: {id: inventory.warehouse}}
    axios.put(`${config.apiUrl}/inventories`, inventorydata, {
    headers: headers
  })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/inventories"
      })
  }

  onSubmit(e){

    const inventory = {
      barcode: this.refs.barcode.value,
      id: this.refs.id.value,
      batch: this.refs.batch.value,
      expiryDate: this.refs.expiryDate.value,
      mrpCost: this.refs.mrpCost.value,
      product: this.refs.product.value,
      purchaseCost: this.refs.purchaseCost.value,
      quantity: this.refs.quantity.value,
      referenceNumber: this.refs.referenceNumber.value,
      remark: this.refs.remark.value,
      salesCost: this.refs.salesCost.value,
      specialCost: this.refs.specialCost.value,
      warehouse: this.refs.warehouse.value
    }
    this.editInventory(inventory);
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
      const { inventory } = this.state;
      this.setState({inventory: event.target.value});
      this.setState({
          inventory: { ...inventory, [name]: value }
      });
    }

    componentDidMount(inventory) {
      this.props.dispatch(userActions.getinventorydetail(this.props.match.params.id));
    }

    inventoryDelete = (id) => {
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/inventories/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/inventories"
        })
    }

    render() {
      const { user, inventory, loggingIn, allwarehouses, allproducts } = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                { inventory.items && 
                  <h1 className="page-title">
                    <button type="button" className="btn btn-primary" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </button> &nbsp;
                    {inventory.items.id}
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.inventoryDelete(inventory.items.id)};}}>Delete</button>
                      &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                    </div>
                  </h1>
                }
              </div>
              <div className="panel filterable">
                { inventory.items && 
                  <table className="table table-bordered table table-border">
                    
                    <tbody>
                      <tr>
                        <td>inventory ID</td>
                        <td>{inventory.items.id}</td>
                      </tr>
                      <tr>
                        <td>Warehouse ID</td>
                        <td>{inventory.items.warehouse.id}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Name</td>
                        <td>{inventory.items.warehouse.name}</td>
                      </tr>
                      <tr>
                        <td>Product ID</td>
                        <td>{inventory.items.product.id}</td>
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        <td>{inventory.items.product.name}</td>
                      </tr>
                      <tr>
                        <td>Bar Code</td>
                        <td>{inventory.items.barcode}</td>
                      </tr>
                      <tr>
                        <td>Batch</td>
                        <td>{inventory.items.batch}</td>
                      </tr>
                      <tr>
                        <td>Purchase Cost</td>
                        <td>{inventory.items.purchaseCost}</td>
                      </tr>
                      <tr>
                        <td>Sales Cost</td>
                        <td>{inventory.items.salesCost}</td>
                      </tr>
                      <tr>
                        <td>MRP Cost</td>
                        <td>{inventory.items.mrpCost}</td>
                      </tr>
                      <tr>
                        <td>Special Cost</td>
                        <td>{inventory.items.specialCost}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td>{inventory.items.quantity}</td>
                      </tr>
                      <tr>
                        <td>Batch</td>
                        <td>{inventory.items.batch}</td>
                      </tr>
                      <tr>
                        <td>Reference Number</td>
                        <td>{inventory.items.referenceNumber}</td>
                      </tr>
                      <tr>
                        <td>Remark</td>
                        <td>{inventory.items.remark}</td>
                      </tr>
                      
                    </tbody>

                  </table>
                }
              </div>
            </div>
          </div>
          { inventory.items &&
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-box" role="document">
                            <div className="modal-content">
                              <div className="modal-header textdesign">
                                <p style={{ fontWeight: 'bold' }}> Inventory: {inventory.items.id}</p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="inventorybarcode" className="label">Inventory Barcode</label>
                                        <div>
                                          <input className="form-control" type="text" name="barcode" ref="barcode" value={this.state.barcode} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor="inventorybatch" className="label">Inventory Batch</label>
                                        <div>
                                          <input className="form-control" type="text" name="batch" ref="batch" value={this.state.batch} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                    </div><br/>  
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="inventoryexpiryDate" className="label">Inventory Expiry Date</label>
                                        <div>
                                          <input className="form-control" type="text" name="expiryDate" ref="expiryDate" value={this.state.expiryDate} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor="inventorymrpCost" className="label">Inventory MRP Cost</label>
                                        <div>
                                          <input className="form-control" type="text" name="mrpCost" ref="mrpCost" value={this.state.mrpCost} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                    </div><br/>  
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="inventoryproduct" className="label">Inventory Product</label>
                                        <div>
                                          { allproducts.items && allproducts.items.length > 0 &&
                                            <select name="product" ref="product" value={this.state.product.id} onChange={this.handleInputChange} className="form-control select-field" >
                                              {allproducts.items.map((product, index) =>
                                                <option key={index} value={this.state.product.id} >
                                                  {product.name}
                                                </option>
                                               
                                              )}
                                            </select>
                                          }
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor="inventorypurchaseCost" className="label">Inventory Purchase Cost</label>
                                        <div>
                                          <input className="form-control" type="text" name="purchaseCost" ref="purchaseCost" value={this.state.purchaseCost} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                    </div><br/>  
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="inventoryquantity" className="label">Inventory Quantity</label>
                                        <div>
                                          <input className="form-control" type="text" name="quantity" ref="quantity" value={this.state.quantity} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor="inventoryreferenceNumber" className="label">Inventory Reference Number</label>
                                        <div>
                                          <input className="form-control" type="text" name="referenceNumber" ref="referenceNumber" value={this.state.referenceNumber} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                    </div><br/>  
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label htmlFor="inventoryremark" className="label">Inventory Remark</label>
                                        <div>
                                          <input className="form-control" type="text" name="remark" ref="remark" value={this.state.remark} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor="inventorysalesCost" className="label">Inventory Sales Cost</label>
                                        <div>
                                          <input className="form-control" type="text" name="salesCost" ref="salesCost" value={this.state.salesCost} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                    </div><br/>  
                                    <div className="row model-warehouse">
                                      <div className="col-md-6">
                                        <label htmlFor="inventoryspecialCost" className="label">Inventory Special Cost</label>
                                        <div>
                                          <input className="form-control" type="text" name="specialCost" ref="specialCost" value={this.state.specialCost} onChange={this.handleInputChange} />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <label htmlFor="inventorywarehouse" className="label">Inventory Warehouse</label>
                                        <div>
                                          { allwarehouses.items && allwarehouses.items.length > 0 &&
                                            <select name="warehouse" ref="warehouse" value={this.state.warehouse.id} onChange={this.handleInputChange} className="form-control select-field" >
                                              {allwarehouses.items.map((warehouse, index) =>
                                                <option key={index} value={this.state.warehouse.id} >
                                                  {warehouse.name}
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
            </div>
          }
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { inventoryid, inventory,allwarehouses, allproducts, authentication } = state;
  const { user } = authentication;
  return {
    user,
    inventory,
    allwarehouses,
    allproducts
  };
}

const connectedInventoryDetail = connect(mapStateToProps)(InventoryDetail);
export { connectedInventoryDetail as InventoryDetail };