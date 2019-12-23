import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewProduct } from '../ProductPage';
import Loader from 'react-loader-spinner'

class Product extends React.Component {

    constructor(props){
       super(props);
       this.goBack = this.goBack.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
    }
    render() {
      // debugger
      const { user, allproducts } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                <div className="pull-left">
                  <button type="button" className="btn btn-primary back-btn" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                  </button>
                </div>
                <h1 className="page-title heading-title">
                  Products
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Product
                    </button>
                  </div>
                </h1>
              </div>
              <div className="panel filterable">
                {allproducts.loading && <h5 className="loading-msg"><em> 
                  <Loader
                   type="Oval"
                   color="#00BFFF"
                   height={70}
                   width={70}
                  />
                </em></h5>}
                <table className="table table-hover">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Image Preview</th>
                    </tr>  
                  </thead>
                  
                  { allproducts.items && allproducts.items.length > 0 &&
                    <tbody>
                    {allproducts.items.map((product, index) =>
                      <tr key={product.id} >
                        <td>{index + 1}</td>
                        <td>{product.id}</td>
                        <td><Link to={"/product/" + product.id} onClick={this.forceUpdate}>{product.name}</Link></td>
                        <td>{product.code}</td>
                        <td>{ product.imageUrl}</td>
                      </tr>
                      
                    )}  
                    </tbody>
                  }  
                </table>
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-box" role="document">
              <div className="modal-content">
                <div className="modal-header textdesign">
                  <p style={{ fontWeight: 'bold' }}>Add New Product</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewProduct/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { allproducts, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts
  };
}

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product };