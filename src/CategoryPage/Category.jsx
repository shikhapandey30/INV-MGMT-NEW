import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import config from 'config';
import { NewCategory } from '../CategoryPage';
import { Route, Redirect } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Loader from 'react-loader-spinner'


class Category extends React.Component {
    constructor(props){
      super(props);
      this.goBack = this.goBack.bind(this);
    }

    goBack(){
      this.props.history.goBack();
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllcategory());
    }

    render() {
      const { user, allcategories } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allcategories*******************************", allcategories)
      const allrecord = [];
      {allcategories.loading && <em>Loading allcategories</em>}
      { allcategories.items && allcategories.items.length > 0 &&
        <ul className="list-group">
          {allcategories.items.map((category, index) =>
            <div key={index}>
              { allrecord.push({sn: index + 1, id: category.id, name: category.name, view: <Link to={"/category/" + category.id} onClick={this.forceUpdate}>View</Link>})
              }
            </div>
          )}
        </ul>
      } 
      this.state = { allrecord };
      const data = {
        columns: [
          {
            header: 'NO',
            label: 'S No.',
            field: 'sn',
            sort: 'disabled',
            width: 150
          },
          {
            label: 'ID',
            field: 'id',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'View',
            field: 'view',
            sort: 'disabled',
            width: 150
          },
        ],
        rows: allrecord
      };
      
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
                  Categories
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Category
                    </button>
                  </div>
                </h1>
              </div>
              {allcategories.loading && <h5 className="loading-msg"><em> 
                  <Loader
                   type="Oval"
                   color="#00BFFF"
                   height={70}
                   width={70}
                  /></em></h5>}
              <div className="panel filterable">
                <MDBDataTable
                  small
                  hover
                  data={data}
                />
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-box" role="document">
              <div className="modal-content">
                <div className="modal-header textdesign">
                  <p style={{ fontWeight: 'bold' }}>Add New Purchase Order</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewCategory/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { allcategories, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allcategories
  };
}

const connectedCategory = connect(mapStateToProps)(Category);
export { connectedCategory as Category };