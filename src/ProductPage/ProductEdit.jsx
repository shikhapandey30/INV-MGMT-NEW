import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class ProductEdit extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      brandName:'',
      category:'',
      name:'',
      code:'',
      cgst:'',
      sgst:'',
      hsnCode:'',
      description:'',
      vendors:'',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getProductDetails();
    this.props.dispatch(userActions.getAllcategory());
  }
  getProductDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let productId = this.props.product_id;
    axios.get(`${config.apiUrl}/products/${productId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        name: response.data.data.name,
        brandName: response.data.data.brandName,
        category: response.data.data.category,
        cgst: response.data.data.cgst,
        sgst: response.data.data.sgst,
        hsnCode: response.data.data.hsnCode,
        description: response.data.data.description,
        code: response.data.data.code
       
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editProduct(product){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    var productdata = { name: product.name, cgst: product.cgst, sgst: product.sgst, hsnCode: product.hsnCode, description: product.description, brandName: product.brandName, code: product.code, id: product.id, category: {id: product.category}}
    axios.put(`${config.apiUrl}/products`, productdata, {
    headers: headers
  })
    .then(response => {
      this.setState({ locations: response.data });
      let product_id = response.data.data.id;
      window.location = `/product/${product_id}`
    })
  }

  onSubmit(e){
    const product = {
      name: this.refs.name.value,
      brandName: this.refs.brandName.value,
      category: this.refs.category.value,
      code: this.refs.code.value,
      cgst: this.refs.cgst.value,
      sgst: this.refs.sgst.value,
      hsnCode: this.refs.hsnCode.value,
      description: this.refs.description.value,
      id: this.refs.id.value,
    }
    this.editProduct(product);
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
    const { product } = this.state;
    this.setState({product: event.target.value});
    this.setState({
        product: { ...product, [name]: value }
    });
  }

  render() {
    const { loggingIn, allcategories} = this.props;
    const { submitted } = this.state;
    const current_user = JSON.parse(localStorage.getItem('singleUser'))

    return (
      <div>
        <div>
          <div className="container">
            <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productname" className="label">Product Name</label>
                  <div>
                    <input className="form-control" type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="productbrandName" className="label">Product Brand Name</label>
                  <div>
                    <input className="form-control" type="text" name="brandName" ref="brandName" value={this.state.brandName} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productcode" className="label">Product Code</label>
                  <div>
                    <input className="form-control" type="text" name="code" ref="code" value={this.state.code} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="productcgst" className="label">Product cgst</label>
                  <div>
                    <input className="form-control" type="text" name="cgst" ref="cgst" value={this.state.cgst} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productsgst" className="label">Product sgst</label>
                  <div>
                    <input className="form-control" type="text" name="sgst" ref="sgst" value={this.state.sgst} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="producthsnCode" className="label">Product hsnCode</label>
                  <div>
                    <input className="form-control" type="text" name="hsnCode" ref="hsnCode" value={this.state.hsnCode} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div><br/>  
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="productcategory" className="label">Product Category</label>
                  <div>
                    { allcategories.items && allcategories.items.length > 0 &&
                      <select value={this.state.category.id} onChange={this.handleChange} name="category" ref="category" className="form-control select-field" >
                        {allcategories.items.map((category, index) =>
                          <option key={index} value={this.state.category.id} >
                            {category.name}
                          </option>
                        )}
                      </select>
                     }
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="productdescription" className="label">Product Description</label>
                  <div>
                    <textarea className="form-control" name="description" ref="description" value={this.state.description} onChange={this.handleInputChange}  autoFocus />
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
  const {productid, allcategories, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allcategories
  };
}

const connectedProductEdit = connect(mapStateToProps)(ProductEdit);
export { connectedProductEdit as ProductEdit };