import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { WareHouseNewUser } from '../WareHousePage';


class WareHouseUserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      userName:'',
      password:'',
      error: null,
      warehouseuserdetail: '',
      response: {}
    };
    this.goBack = this.goBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  goBack(){
    this.props.history.goBack();
  }

  componentWillMount(){
    this.getWarehouseUserDetails();
  }

  getWarehouseUserDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let url = this.props.match.url
    axios.get(`${config.apiUrl}${url}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        userName: response.data.data.userName,
        password: response.data.data.password
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editWarehouseUser(warehouseuser){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let url = this.props.match.url
    axios.put(`${config.apiUrl}${url}`, warehouseuser, {
    headers: headers
    })
    .then(response => {
      this.setState({ locations: response.data });
      window.location = "/warehouses"
    })
  }

  onSubmit(e){
    const warehouseuser = {
      userName: this.refs.userName.value,
      id: this.refs.id.value,
      password: this.refs.password.value
    }
    this.editWarehouseUser(warehouseuser);
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
    const { warehouseuser } = this.state;
    this.setState({warehouseuser: event.target.value});
    this.setState({
        warehouseuser: { ...warehouseuser, [name]: value }
    });
  }

  componentDidMount(warehouse) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let url = this.props.match.url
    axios.get(`${config.apiUrl}${url}`, {
    headers: headers
    }).then(result => {
      this.setState({
        warehouseuserdetail: result.data.data
      });
    })
  }

  warehouseuserDelete = (id) => {
    const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let url = this.props.match.url
    axios.delete(`${config.apiUrl}${url}`, {
    headers: headers
    })
    .then(response => {
      this.setState({ locations: response.data });
      window.location = "/warehouses"
    })
  }

  render() {
    const { user, warehouse, loggingIn } = this.props;
    const { warehouseuserdetail, submitted} = this.state;
    const current_user = JSON.parse(localStorage.getItem('singleUser'))
    console.log("warehouseuserdetail##########", warehouseuserdetail)

    return (
      <div>
        <Header />
        <div className="container">
          <div>
            <div className="page-header">
              <h1 className="page-title">
                <button type="button" className="btn btn-primary back-btn" onClick={this.goBack}><i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                </button> &nbsp;
                {warehouseuserdetail.userName}
                <div className="pull-right">
                  <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.warehouseuserDelete(warehouseuserdetail.id)};}}>Delete</button>
                  &nbsp; <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                </div>
              </h1>
            </div>
            <div className="panel filterable">
              { warehouseuserdetail &&
                <table className="table table-bordered table table-border">
                  <tbody>
                    <tr>
                      <td>Warehouse User ID</td>
                      <td>{warehouseuserdetail.id}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse User Name</td>
                      <td>{warehouseuserdetail.userName}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse ID</td>
                      <td>{warehouseuserdetail.warehouse.id}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse Name</td>
                      <td>{warehouseuserdetail.warehouse.name}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse Address</td>
                      <td>{warehouseuserdetail.warehouse.address}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse Landmark</td>
                      <td>{warehouseuserdetail.warehouse.landmark}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse Zipcode</td>
                      <td>{warehouseuserdetail.warehouse.zipcode}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse City</td>
                      <td>{warehouseuserdetail.warehouse.city}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse State</td>
                      <td>{warehouseuserdetail.warehouse.state}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse Country</td>
                      <td>{warehouseuserdetail.warehouse.country}
                      </td>
                    </tr>
                    <tr>
                      <td>Super Admin</td>
                      <td>{warehouseuserdetail.superAdmin.toString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Warehouse Admin</td>
                      <td>{warehouseuserdetail.warehouseAdmin.toString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              }  
            </div>
          </div>
        </div>
        {
          warehouseuserdetail &&
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-box" role="document">
                <div className="modal-content">
                  <div className="modal-header textdesign">
                    <p style={{ fontWeight: 'bold' }}>Edit</p>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>

                      <div className="row">
                        <div className="col-md-6">
                         <label htmlFor="categoryname" className="label">userName</label>
                          <div>
                            <input className="form-control" type="text" name="userName" ref="userName" value={this.state.userName} onChange={this.handleInputChange} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="categorynamepassword" className="label">Password</label>
                          <div>
                            <input className="form-control" type="text" name="password" ref="password" value={this.state.password} onChange={this.handleInputChange} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group model-warehouse">
                        <div className="col-sm-3">
                          <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                        </div><br/>
                      </div>
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
  const { warehouseid, warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse
  };
}

const connectedWareHouseUserDetail = connect(mapStateToProps)(WareHouseUserDetail);
export { connectedWareHouseUserDetail as WareHouseUserDetail };