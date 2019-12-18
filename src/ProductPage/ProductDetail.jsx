import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { ProductEdit } from '../ProductPage';


class ProductDetail extends React.Component {

     constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

    componentDidMount(product) {
      this.props.dispatch(userActions.getproductdetail(this.props.match.params.id));
    }

    productDelete = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/products/${id}`,  {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/products"
        })
    }

    render() {
      const { user, product, loggingIn, allcategories } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                { product.items && 
                  <h1 className="page-title">
                  <button type="button" className="btn btn-primary" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                  </button> &nbsp;
                    {product.items.name}
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.productDelete(product.items.id)};}}>Delete</button>
                      &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                    </div>
                  </h1>
                }
              </div>
              <div className="panel filterable">
                { product.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Product ID</td>
                        <td>{product.items.id}</td>
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        <td>{product.items.name}</td>
                      </tr>
                      <tr>
                        <td>Category ID</td>
                        <td>{product.items.category.id}</td>
                      </tr>
                      <tr>
                        <td>Category  Name</td>
                        <td>{product.items.category.name}</td>
                      </tr>
                      <tr>
                        <td>Product Code</td>
                        <td>{product.items.code}</td>
                      </tr>
                      <tr>
                        <td>Product BrandName</td>
                        <td>{product.items.brandName}</td>
                      </tr>
                      <tr>
                        <td>Product Description</td>
                        <td>{product.items.description}</td>
                      </tr>
                      
                      <tr>
                        <td>Product image</td>
                        <td>
                        <a target = "_blank" href={product.items.imageUrl}><img style={{width: 100, height: 100}} className='tc br3' alt='none' src={ product.items.imageUrl } /></a>
                        </td>
                      </tr>
                      <tr>
                        <td>Product hsnCode</td>
                        <td>{product.items.hsnCode}</td>
                      </tr>
                      <tr>
                        <td>Product cgst</td>
                        <td>{product.items.cgst}</td>
                      </tr>
                      <tr>
                        <td>Product sgst</td>
                        <td>{product.items.sgst}</td>
                      </tr>
                      <tr>
                        <td>Product isActive</td>
                        <td>{product.items.isActive.toString()}</td>
                      </tr>
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
          { product.items &&
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-box" role="document">
                  <div className="modal-content">
                    <div className="modal-header textdesign">
                      <p style={{ fontWeight: 'bold' }}>{product.items.name}</p>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <ProductEdit product_id={product.items.id} />
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
  const { productid, product,allcategories, authentication } = state;
  const { user } = authentication;
  return {
    user,
    product,
    allcategories
  };
}

const connectedProductDetail = connect(mapStateToProps)(ProductDetail);
export { connectedProductDetail as ProductDetail };