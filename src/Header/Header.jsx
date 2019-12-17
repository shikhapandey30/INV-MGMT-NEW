import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Header extends React.Component {
    // componentDidMount() {
    //   console.log("mount")
    //     this.props.dispatch(userActions.getAll());
    // }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
      const { user, users} = this.props;
      // const current_user = JSON.parse(localStorage.getItem('singleUser'))
      var issuperadmin = user.data.isSuperAdmin.toString();
      var iswarehouseadmin = user.data.isWarehouseAdmin.toString();
      console.log("users", users)
      return (

        <div id="main">
            <nav>
              <div className="nav-xbootstrap" style={{zIndex:10}}>
                <ul>
                  <li><a href="/">Dashboard</a></li>
                  { issuperadmin == "true" &&
                    <li><a>Master<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
                      <ul className="dropdown">
                        <li><a href="/warehouses">Warehouse</a></li>
                        <li><a href="/categories">Category</a></li>
                        <li><a href="/products">Product</a></li>
                        <li><a href="/vendors">Vendor</a></li>
                        <li><a href="/inventories">Inventory</a></li>

                      </ul>
                    </li>
                  }
                  { iswarehouseadmin == "true" &&
                    <li><a href="/warehouses">Warehouse</a></li>
                  }  
                  <li><a href="/purchase-orders">Purchase Order</a></li>
                    <li><a href="/transfer-orders">Transfer Order</a></li>
                  
                  <li className="nav-item dropdown pull-right">
                    <a className="nav-link " id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      <i className="glyphicon glyphicon-th-list"></i>
                    </a>
                    <div className="dropdown-menu dropdown-default dropdown-d-color"
                      aria-labelledby="navbarDropdownMenuLink-333">
                      <a className="dropdown-item" href="/login">Logout</a>
                     
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            {/* <div className='content'></div> */}
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };