import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class NewPurchaseOrder extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
          products_quantity: [{product:"", quantity:""}],
          owner: "",
          description: "",
          itemid: '',
          status: '',
          vendorid: '',
          warehouseid: '',
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    handleChange = (e) => {
      if (["product", "quantity"].includes(e.target.className) ) {
        let products_quantity = [...this.state.products_quantity]
        products_quantity[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
        this.setState({ products_quantity }, () => console.log(this.state.products_quantity))
      } else {
        this.setState({ [e.target.name]: e.target.value.toUpperCase() })
      }
    }
    addProductQuantity = (e) => {
      this.setState((prevState) => ({
        products_quantity: [...prevState.products_quantity, {product:"", quantity:""}],
      }));
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { purchaseorders } = this.state;
      const { dispatch } = this.props;


      const { products_quantity } = this.state;

      const product_ids = [];
      {products_quantity.map((product_id) =>
        product_ids.push({product: {id: product_id.product}, quantity: product_id.quantity})
      )}

      var purchaseorder = { items: product_ids,status: this.state.status, vendor: {id: this.state.vendorid}, warehouse: {id: this.state.warehouseid}}
      axios.post(`${config.apiUrl}/purchase_orders`, purchaseorder, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/purchase-orders"
        let po_id = response.data.data.id;
        window.location = `/purchase-order/${po_id}`
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
      this.props.dispatch(userActions.getAllwarehouse());
      this.props.dispatch(userActions.getAllvendor());
    }

    render() {
      const { loggingIn, user, allproducts,allvendors, allwarehouses,allcategories } = this.props;
      const { purchaseorders, category, submitted } = this.state;
      let {owner, description, products_quantity, itemid, status, vendorid, warehouseid} = this.state
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      console.log("allwarehouses*******************************", allwarehouses)
      return (
        <div>
          <div className="container">
           <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="itemid" className="label">Item ID</label>
                  <div>
                    <input type="text" className="form-control" placeholder="Item" name="itemid" id="itemid" value={itemid}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="status" className="label">Status</label>
                  <div>
                    <input type="text" className="form-control" placeholder="Status" name="status" id="status" value={status} autoFocus required="required" />
                  </div>
                </div>
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorid" className="label">Vendor</label>
                  <div>
                      { allvendors.items && allvendors.items.length > 0 &&
                        <select value={vendorid} id="vendorid" name="vendorid" className="form-control select-field" >
                          {allvendors.items.map((vendor, index) =>
                            <option key={index} value={vendor.id} >
                              {vendor.name}
                            </option>
                          )}
                        </select>
                       }
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="warehouseid" className="label">Warehouse</label>
                  <div>
                    { allwarehouses.items && allwarehouses.items.length > 0 &&
                      <select name="warehouseid" id="warehouseid" value={warehouseid} className="form-control select-field" >
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
             <div className="row addmoreproduct">
                {
                  products_quantity.map((val, idx)=> {
                    let productId = `product-${idx}`, quantityId = `quantity-${idx}`
                    return (
                      <div key={idx}>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="{productId}" className="label" style={{marginLeft: -50}}>{`Product # ${idx + 1}`}</label>
                            <div>
                              { allproducts.items && allproducts.items.length > 0 &&
                                <select vname={productId}
                                  data-id={idx}
                                  id={productId}
                                  value={products_quantity[idx].product}
                                  className="product" style={{"height": 34, "width": 270, marginLeft: -50, borderRadius: 4 }} >
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
                            <label htmlFor="{quantityId}" className="label" style={{marginLeft: -22}}>{`Quantity # ${idx + 1}`}</label> 
                            <div> 
                              <input
                                type="number"
                                name={quantityId}
                                data-id={idx}
                                id={quantityId}
                                value={products_quantity[idx].quantity}
                                className="quantity"
                                style={{"height": 34, "width": 270, marginLeft: -19}} required="required"
                              />
                            </div>  
                          </div>
                        </div><br/>  
                      </div>
                    )
                  })
                }
             </div><br/>
             <center className="model-warehouse">
               <a className="btn btn-primary" onClick={this.addProductQuantity} style={{"color": 'white'}}><i className="fa fa-plus" aria-hidden="true"></i> Add New Product</a>
              </center>  
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
  const { purchaseorders,allproducts,allwarehouses, allvendors, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    allwarehouses,
    purchaseorders,
    allvendors,
    users,
  };
}

const connectedNewPurchaseOrder = connect(mapStateToProps)(NewPurchaseOrder);
export { connectedNewPurchaseOrder as NewPurchaseOrder };