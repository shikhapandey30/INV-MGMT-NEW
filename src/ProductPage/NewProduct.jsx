import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';

class NewProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          products: {
              name: '',
              code: '',
              brandName: '',
              category: '',
              cgst: '',
              hsnCode: '',
              imageUrl: '',
              isActive: '',
              sgst: '',
              description: '',
              selectedFile: null,
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { products, category } = this.state;
      this.setState({
          products: { ...products, [name]: value }
      });
    }

    handleChanges(FileList) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      console.log(FileList[0].name);
      const data = new FormData()
      data.append('file', FileList[0], FileList[0].name)
      axios.post(`${config.apiUrl}/images`, data, {
      headers: headers
      })
      .then(res => {
        console.log(res.data)
        this.setState({
            imageUrl: res.data.data
          })
      })
      
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { products } = this.state;
      const { dispatch } = this.props;
      var product = { name: products.name, code: products.code, brandName: products.brandName, description: products.description, cgst: products.cgst, hsnCode: products.hsnCode, imageUrl: this.state.imageUrl, isActive: products.isActive, sgst: products.sgst,   category: { id: products.category} }
      axios.post(`${config.apiUrl}/products`, product, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        let product_id = response.data.data.id;
        window.location = `/product/${product_id}`
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllcategory());
    }

    render() {
      const { loggingIn, user, allcategories } = this.props;
      const { products, category, imageUrl, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("imageUrl*******************************", imageUrl)
      console.log("allcategories*******************************", allcategories)
      return (
        <div>
          <div className="container">
          <div className="product-img-upload">
          </div>
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <label htmlFor="image" className="label">Product Image Upload </label>
                <input className="image-box" type="file" onChange={ (e) => this.handleChanges(e.target.files) } />
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                <label htmlFor="productname" className="label">Product Name</label>
                <div>
                  {submitted && !products.name && 
                    <div className="help-block required-msg"> Product Name is required</div>
                  }
                  <input type="text" id="productname" className="form-control" placeholder="Product Name" name="name" value={products.name} onChange={this.handleChange}  autoFocus />
                  <input type="hidden" name="image" value={this.state.imageUrl} onChange={this.handleChange} />
                </div>
                </div>
                <div className="col-md-6">
                <label htmlFor="productcode" className="label">Product Code</label>
                <div>
                  {submitted && !products.code && 
                    <div className="help-block required-msg"> Product Code is required</div>
                  }
                  <input type="text" id="productcode" className="form-control" placeholder="Product Code" name="code" value={products.code} onChange={this.handleChange}  autoFocus />
                </div>
                </div>
              </div><br/>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productbrandName" className="label">Product Brand Name</label>
                  <div>
                    {submitted && !products.brandName && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="productbrandName" className="form-control" placeholder="Product Brand Name" name="brandName" value={products.brandName} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">  
                  <label htmlFor="productcategoryid" className="label">Category </label>
                  <div>
                     { allcategories.items && allcategories.items.length > 0 &&
                      <select value={products.category} onChange={this.handleChange} name="category" className="form-control select-form" >
                        {allcategories.items.map((category, index) =>
                          <option key={index} value={category.id} >
                            {category.name}
                          </option>
                        )}
                      </select>
                     }
                  </div>
                </div>     
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productcgst" className="label">Product cgst</label>
                  <div>
                    {submitted && !products.cgst && 
                      <div className="help-block required-msg"> Product cgst is required</div>
                    }
                    <input type="text" id="productcgst" className="form-control" placeholder="Product cgst" value={products.cgst}  name="cgst"  onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="producthsnCode" className="label">Product hsnCode</label>
                  <div>
                    {submitted && !products.hsnCode && 
                      <div className="help-block required-msg"> Product hsnCode is required</div>
                    }
                    <input type="text" id="producthsnCode" className="form-control" placeholder="Product hsnCode" value={products.hsnCode}  name="hsnCode"  onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  
              </div><br/>
              <input type="hidden" id="productisActive" className="form-control" placeholder="Product isActive" value={products.isActive}  name="isActive"  onChange={this.handleChange}  autoFocus />

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productsgst" className="label">Product sgst</label>
                  <div>
                    {submitted && !products.sgst && 
                      <div className="help-block required-msg"> Product sgst is required</div>
                    }
                    <input type="text" id="productsgst" className="form-control" placeholder="Product sgst" value={products.sgst}  name="sgst"  onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="productisActive" className="label">isActive </label>
                  <select value={products.isActive} onChange={this.handleChange} name="isActive" className="form-control select-form" >
                      <option >
                        {"true"}
                      </option><br/>
                      <option >
                        {"false"}
                      </option>
                  </select>
                </div> 
              </div> <br/> 
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="productdescription" className="label">Product Description</label>
                  <div>
                    {submitted && !products.description && 
                      <div className="help-block required-msg"> Product description is required</div>
                    }
                    <textarea id="productdescription" className="form-control" placeholder="Product Description" value={products.description}  name="description"  onChange={this.handleChange}  autoFocus />
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
  const { products,imageUrl,allcategories, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allcategories,
    products,
    imageUrl,
    users,
  };
}

const connectedNewProduct = connect(mapStateToProps)(NewProduct);
export { connectedNewProduct as NewProduct };