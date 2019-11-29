import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewWareHouse } from '../WareHousePage';

class WareHouse extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllwarehouse());
    }

    render() {
      const { user, allwarehouses } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allwarehouses", allwarehouses)
      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                <h1 className="page-title">
                  Warehouses
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Warehouse
                    </button>
                  </div>
                </h1>
              </div>
              <div className="panel filterable">
                {allwarehouses.loading && <h5 className="loading-msg"><em>Loading All Warehouses .....</em></h5>}
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Landmark</th>
                      <th>Zipcode</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Created At</th>
                    </tr>  
                  </thead>
                  
                  { allwarehouses.items && allwarehouses.items.length > 0 &&
                    <tbody>
                    {allwarehouses.items.map((warehouse, index) =>
                      <tr key={warehouse.id} >
                        <td>{index + 1}</td>
                        <td>{warehouse.id}</td>
                        <td><Link to={"/warehouse/" + warehouse.id} onClick={this.forceUpdate}>{warehouse.name}</Link></td>
                        <td>{warehouse.address}</td>
                        <td>{warehouse.landmark}</td>
                        <td>{warehouse.zipcode}</td>
                        <td>{warehouse.city}</td>
                        <td>{warehouse.state}</td>
                        <td>
                          {new Intl.DateTimeFormat('en-GB', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric'
                          }).format(new Date(warehouse.createdAt))}
                        </td>
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
                  <p style={{ fontWeight: 'bold' }}>Add New WareHouse</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewWareHouse/>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
}

function mapStateToProps(state) {
  const { allwarehouses, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allwarehouses
  };
}

const connectedWareHouse = connect(mapStateToProps)(WareHouse);
export { connectedWareHouse as WareHouse };