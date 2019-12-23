import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import Loader from 'react-loader-spinner'


class TransferOrderDetail extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      itemid: '',
      status: '',
      destinationWarehouse: '',
      sourceWarehouse: '',
    };
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  componentWillMount(){
    this.getTransferOrderDetails();
  }

  getTransferOrderDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let transferorderId = this.props.match.params.id;
    axios.get(`${config.apiUrl}/transfer_orders/${transferorderId}`, {
      headers: headers
    })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        destinationWarehouse: response.data.data.destinationWarehouse,
        status: response.data.data.status,
        itemid: response.data.data.itemid,
        sourceWarehouse: response.data.data.sourceWarehouse
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

    editTransferOrder(transferorder){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    var transferorders = {id: transferorder.id, status: transferorder.status, items: [], destinationWarehouse: {id: transferorder.destinationWarehouse}, sourceWarehouse: {id: transferorder.sourceWarehouse}}
    axios.put(`${config.apiUrl}/transfer_orders`, transferorders, {
    headers: headers
    })
      .then(response => {
        this.setState({ locations: response.data });
        let to_id = response.data.data.id;
        window.location = `/transfer-order/${to_id}`
      })
    }

    onSubmit(e){
    const transferorder = {
      id: this.refs.id.value,
      destinationWarehouse: this.refs.destinationWarehouse.value,
      status: this.refs.status.value,
      itemid: this.refs.itemid.value,
      sourceWarehouse: this.refs.sourceWarehouse.value
    }
    this.editTransferOrder(transferorder);
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
      const { transferorder } = this.state;
      this.setState({transferorder: event.target.value});
      this.setState({
          transferorder: { ...transferorder, [name]: value }
      });
    }

    componentDidMount(transferorder) {
      this.props.dispatch(userActions.gettransferorderdetail(this.props.match.params.id));
      this.props.dispatch(userActions.getAllwarehouse());
    }

    transferorderDelete = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/transfer_orders/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/transfer-orders"
        })
    }

    render() {
      const { user,allwarehouses, transferorder } = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("transferorder*******************************", transferorder)
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                  {transferorder.loading && <h5 className="loading-msg">
                    <em> 
                      <Loader
                       type="Oval"
                       color="#00BFFF"
                       height={70}
                       width={70}
                      />
                    </em></h5>
                  }
                  { transferorder.items && 
                    <h1 className="page-title">
                      <button type="button" className="btn btn-primary" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                      </button> &nbsp;
                      {transferorder.items.id}
                      <div className="pull-right">
                        <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.transferorderDelete(transferorder.items.id)};}}>Delete</button>
                        &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                          Edit
                        </button>
                      </div>
                    </h1>
                  }
                </div>
                <div className="panel filterable">
                  { transferorder.items && 
                    <table className="table table-bordered table table-border">
                      <tbody>
                        <tr>
                          <td>transferorder ID</td>
                          <td>{transferorder.items.id}</td>
                        </tr>
                         <tr>
                          <td>From Warehouse ID</td>
                          <td>{transferorder.items.sourceWarehouse.id}</td>
                        </tr>
                        <tr>
                          <td>From Warehouse Name</td>
                          <td>{transferorder.items.sourceWarehouse.name}</td>
                        </tr>
                        <tr>
                          <td>From Warehouse Address</td>
                          <td>{transferorder.items.sourceWarehouse.address}</td>
                        </tr>
                        <tr>
                          <td>From Warehouse City</td>
                          <td>{transferorder.items.sourceWarehouse.city}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse ID</td>
                          <td>{transferorder.items.destinationWarehouse.id}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse Name</td>
                          <td>{transferorder.items.destinationWarehouse.name}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse Address</td>
                          <td>{transferorder.items.destinationWarehouse.address}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse City</td>
                          <td>{transferorder.items.destinationWarehouse.city}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse State</td>
                          <td>{transferorder.items.destinationWarehouse.state}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse Country</td>
                          <td>{transferorder.items.destinationWarehouse.country}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse Landmark</td>
                          <td>{transferorder.items.destinationWarehouse.landmark}</td>
                        </tr>
                        <tr>
                          <td>To Warehouse Zipcode</td>
                          <td>{transferorder.items.destinationWarehouse.zipcode}</td>
                        </tr>

                      </tbody>
                    </table>

                  }
                  <center><h3>Products</h3></center>
                  { transferorder.items && 
                    <table className="table table-bordered table table-border">
                      <thead>
                        <tr className="filters">
                          <th>S.No</th>
                          <th>ID</th>
                          <th>Product ID</th>
                          <th>Quantity</th>
                        </tr>  
                      </thead>
                      { transferorder.items.items && transferorder.items.items.length > 0 &&
                        <tbody>
                          {transferorder.items.items.map((transfer_order, index) =>
                            <tr key={transfer_order.id} >
                              <td>{index + 1}</td>
                              <td>{transfer_order.id}</td>
                              <td>{transfer_order.product.id}</td>
                              <td>{transfer_order.quantity}</td>
                            </tr>
                          )}  
                        </tbody>
                      }
                    </table>
                  }  
                </div>
            </div>
          </div>
          { transferorder.items &&
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-box" role="document">
                  <div className="modal-content">
                    <div className="modal-header textdesign">
                      <p style={{ fontWeight: 'bold' }}>Transfer Order: {transferorder.items.id}</p>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="destinationWarehouse" className="label">destinationWarehouse</label>
                            <div>
                              { allwarehouses.items && allwarehouses.items.length > 0 &&
                                <select name="destinationWarehouse" ref="destinationWarehouse" value={this.state.destinationWarehouse} onChange={this.handleInputChange} className="form-control select-field" >
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
                            <label htmlFor="itemid" className="label">itemid</label>
                            <div>
                              <input className="form-control" type="text" name="itemid" ref="itemid" value={this.state.itemid} onChange={this.handleInputChange} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="sourceWarehouse" className="label">sourceWarehouse</label>
                            <div>

                            { allwarehouses.items && allwarehouses.items.length > 0 &&
                              <select name="sourceWarehouse" ref="sourceWarehouse" value={this.state.sourceWarehouse} onChange={this.handleInputChange} className="form-control select-field" >
                                {allwarehouses.items.map((warehouse, index) =>
                                  <option key={index} value={warehouse.id} >
                                    {warehouse.name}
                                  </option>
                                )}
                              </select>
                            }
                            </div><br/>
                          </div>
                        </div><br/>  
                        <input className="form-control" type="hidden" name="id" ref="id" value={transferorder.items.id} onChange={this.handleInputChange} />
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
  const { transferorderid,allwarehouses, transferorder, authentication } = state;
  const { user } = authentication;
  return {
    user,
    transferorder,
    allwarehouses
  };
}

const connectedTransferOrderDetail = connect(mapStateToProps)(TransferOrderDetail);
export { connectedTransferOrderDetail as TransferOrderDetail };