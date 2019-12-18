import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { InventoryEdit } from '../InventoryPage';


class InventoryDetail extends React.Component {

  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
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
                  <InventoryEdit inventory_id={inventory.items.id} />
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