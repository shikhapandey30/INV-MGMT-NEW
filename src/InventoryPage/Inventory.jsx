import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewInventory } from '../InventoryPage';
import axios from 'axios';
import config from 'config';


class Inventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          filterinventory: {
              product: '',
              warehouse: '',
              loaded: 0
          },
          allfilterinventories: [],
          inventoryfilterdata: [],
          submitted: false
        };
        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { filterinventory } = this.state;
      this.setState({
          filterinventory: { ...filterinventory, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { filterinventory } = this.state;
      const { dispatch } = this.props;
      var productID = this.state.filterinventory.product;
      var warehouseID = this.state.filterinventory.warehouse;

      axios.get(`http://18.217.112.188:8084/api/v1/inventory/inventories?product_id=${productID}&warehouse_id=${warehouseID}`, {
      headers: headers
      })
      .then(response => {
        this.setState({ allfilterinventories: response.data });
      })
    }

    componentDidMount() {
      this.getallInventoryDetails();

      this.props.dispatch(userActions.getAllproduct());
      this.props.dispatch(userActions.getAllwarehouse());
    }


    getallInventoryDetails(){
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      axios.get(`${config.apiUrl}/inventories`, {
      headers: headers
    })
    .then(response => {
      this.setState({
        allfilterinventories: response.data
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

    render() {
      const { user, allinventories, allproducts, allwarehouses } = this.props;
      const { filterinventory, submitted, inventoryfilterdata } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allinventories*******************************", allinventories)
      return (
          <div>
            <Header />
            <div className="container">
              <div className="filterinventory">
                <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}  > 
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="filterinventoryproduct" className="label">Product</label>
                      <div>
                        { allproducts.items && allproducts.items.length > 0 &&
                          <select value={filterinventory.product} onChange={this.handleChange} name="product" className="form-control select-field" >
                            <option>Select Product</option>
                            {allproducts.items.map((product, index) =>
                              <option key={index} value={product.id} >
                                {product.name}
                              </option>
                            )}
                          </select>
                         }
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="filterinventorywarehouse" className="label">warehouse</label>
                      <div>
                        { allwarehouses.items && allwarehouses.items.length > 0 &&
                          <select value={filterinventory.warehouse} onChange={this.handleChange} name="warehouse" className="form-control select-field" >
                            <option>Select Warehouse</option>
                            {allwarehouses.items.map((warehouse, index) =>
                              <option key={index} value={warehouse.id} >
                                {warehouse.name}
                              </option>
                            )}
                          </select>
                         }
                      </div>
                    </div>
                    <div className="col-md-3">
                       <button className="btn btn-primary filtersubmit">Filter</button>
                    </div>
                  </div>  
                </form>
              </div><br/>
              <p>
                <div>
                  <div className="page-header">
                    <div className="pull-left">
                      <button type="button" className="btn btn-primary back-btn" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                      </button>
                    </div>
                    <h1 className="page-title heading-title">
                      Inventories
                      <div className="pull-right">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                          <i className="fa fa-plus" aria-hidden="true"></i> Add New Inventory
                        </button>
                      </div>
                    </h1>
                  </div>
                  <div className="panel filterable">
                    {this.state.allfilterinventories.loading && <h5 className="loading-msg"><em>Loading All Inventory .....</em></h5>}
                    <table className="table table-hover table-responsive">
                      <thead>
                        <tr className="filters">
                          <th>S.No</th>
                          <th>ID</th>
                          <th>Wh id</th>
                          <th>Product Name</th>
                          <th>Batch No</th>
                          <th>Qty</th>
                          <th>Purchase Cost</th>
                          <th>Sales Cost</th>
                          <th>MRP Cost</th>
                          <th>Special Cost</th>
                          <th>Barcode</th>
                          <th>Reference Number</th>
                          <th>Remark</th>
                        </tr>  
                      </thead>
                      { this.state.allfilterinventories.data && this.state.allfilterinventories.data.length > 0 &&
                        <tbody>
                        {this.state.allfilterinventories.data.map((inventory, index) =>
                          <tr key={inventory.id} >
                            <td>{index + 1}</td>
                            <td><Link to={"/inventory/" + inventory.id} onClick={this.forceUpdate}>{inventory.id}</Link></td>
                            <td>{inventory.warehouse.id}</td>
                            <td>{inventory.product.name}</td>
                            <td>{inventory.batch}</td>
                            <td>{inventory.quantity}</td>
                            <td>{inventory.purchaseCost}</td>
                            <td>{inventory.salesCost}</td>
                            <td>{inventory.mrpCost}</td>
                            <td>{inventory.specialCost}</td>
                            <td>{inventory.barcode}</td>
                            <td>{inventory.referenceNumber}</td>
                            <td>{inventory.remark}</td>
                          </tr>
                          
                        )}  
                        </tbody>
                      }  
                    </table>
                  </div>
                </div>
              </p>  
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-box" role="document">
                <div className="modal-content">
                  <div className="modal-header textdesign">
                    <p style={{ fontWeight: 'bold' }}>Add New Inventory</p>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <NewInventory/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    }
}

function mapStateToProps(state) {
  const { allinventories, allproducts, allwarehouses, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allinventories,
    allproducts,
    allwarehouses
  };
}

const connectedInventory = connect(mapStateToProps)(Inventory);
export { connectedInventory as Inventory };
