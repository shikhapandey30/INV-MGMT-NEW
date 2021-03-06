import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getwarehouseuser,
    getAllwarehouse,
    getwarehousedetail,
    getAllproduct,
    getproductdetail,
    getAllcategory,
    getcategorydetail,
    getAllinventory,
    getinventorydetail,
    getAllvendor,
    getvendordetail,
    getAllpuchaseorderslist,
    getpurchaseorderdetail,
    getAlltranferorderslist,
    gettransferorderdetail,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrlLogin}/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          return user;

      });
}

function logout() {
    localStorage.removeItem('user');
}

function getAllwarehouse() {
  const requestOptions = {
    method: 'GET',
    // headers: authHeader()
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/warehouses`, requestOptions)
    .then(handleResponse)
    .then(allwarehouses => {
      console.log("Response",allwarehouses)
      return allwarehouses.data;
    });
}

function getwarehousedetail(warehouseID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/warehouses/${warehouseID}`, requestOptions)
    .then(handleResponse)
    .then(warehouse => {
      console.log("Response",warehouse)
      return warehouse.data;
    });
}

function getwarehouseuser(warehouseID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/warehouses/${warehouseID}/users`, requestOptions)
    .then(handleResponse)
    .then(warehousealluser => {
      console.log("Response@@@@@@@@@@@@",warehousealluser)
      return warehousealluser.data;
    });
}

function getproductdetail(productID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/products/${productID}`, requestOptions)
    .then(handleResponse)
    .then(product => {
      console.log("Response",product)
      return product.data;
    });
}


function getAllproduct() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/products`, requestOptions)
    .then(handleResponse)
    .then(allproducts => {
      console.log("Response",allproducts)
      return allproducts.data;
    });
}

function getAllcategory() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/categories`, requestOptions)
    .then(handleResponse)
    .then(allcategories => {
      console.log("Response",allcategories)
      return allcategories.data;
    });
}

function getcategorydetail(categoryID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/categories/${categoryID}`, requestOptions)
    .then(handleResponse)
    .then(category => {
      console.log("Response",category)
      return category.data;
    });
}

function getAllinventory() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/inventories`, requestOptions)
    .then(handleResponse)
    .then(allinventories => {
      console.log("Response",allinventories)
      return allinventories.data;
    });
}

function getinventorydetail(inventoryID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/inventories/${inventoryID}`, requestOptions)
    .then(handleResponse)
    .then(inventory => {
      console.log("Response",inventory)
      return inventory.data;
    });
}

function getAllvendor() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/vendors`, requestOptions)
    .then(handleResponse)
    .then(allvendors => {
      console.log("Response",allvendors)
      return allvendors.data;
    });
}

function getvendordetail(vendorID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/vendors/${vendorID}`, requestOptions)
    .then(handleResponse)
    .then(vendor => {
      console.log("Response",vendor)
      return vendor.data;
    });
}

function getAllpuchaseorderslist() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/purchase_orders`, requestOptions)
    .then(handleResponse)
    .then(allpuchaseorders => {
      console.log("Response",allpuchaseorders)
      return allpuchaseorders.data;
    });
}

function getpurchaseorderdetail(purchaseorderID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/purchase_orders/${purchaseorderID}`, requestOptions)
    .then(handleResponse)
    .then(purchaseorder => {
      console.log("Response",purchaseorder)
      return purchaseorder.data;
    });
}

function getAlltranferorderslist() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/transfer_orders`, requestOptions)
    .then(handleResponse)
    .then(alltransferorders => {
      console.log("Response",alltransferorders)
      return alltransferorders.data;
    });
}

function gettransferorderdetail(transferorderID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/transfer_orders/${transferorderID}`, requestOptions)
    .then(handleResponse)
    .then(transferorder => {
      console.log("Response",transferorder)
      return transferorder.data;
    });
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}