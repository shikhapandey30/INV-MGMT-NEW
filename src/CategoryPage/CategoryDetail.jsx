import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { CategoryEdit } from '../CategoryPage';
import Loader from 'react-loader-spinner'


class CategoryDetail extends React.Component {

    constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(product) {
    this.props.dispatch(userActions.getcategorydetail(this.props.match.params.id));
  }

  categoryDelete = (id) => {
     const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      console.log("******************************************", id)
      axios.delete(`${config.apiUrl}/categories/${id}`, {
    headers: headers
    })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/categories"
      })
  }

    render() {
      const { user, category, loggingIn } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                {category.loading && <h5 className="loading-msg">
                  <em> 
                    <Loader
                     type="Oval"
                     color="#00BFFF"
                     height={100}
                     width={100}
                    />
                  </em></h5>
                }
                { category.items && 
                  <h1 className="page-title">
                    <button type="button" className="btn btn-primary" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                    </button>&nbsp;
                    {category.items.name}
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.categoryDelete(category.items.id)};}}>Delete</button>
                      &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                    </div>
                  </h1>
                }
              </div>
              <div className="panel filterable">
                { category.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Category ID</td>
                        <td>{category.items.id}</td>
                      </tr>
                      <tr>
                        <td>Category Name</td>
                        <td>{category.items.name}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
          { category.items &&
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-box" role="document">
                  <div className="modal-content">
                    <div className="modal-header textdesign">
                      <p style={{ fontWeight: 'bold' }}>{category.items.name}</p>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <CategoryEdit category_items={category.items.id} />
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
  const { categoryid, category, authentication } = state;
  const { user } = authentication;
  return {
    user,
    category
  };
}

const connectedCategoryDetail = connect(mapStateToProps)(CategoryDetail);
export { connectedCategoryDetail as CategoryDetail };