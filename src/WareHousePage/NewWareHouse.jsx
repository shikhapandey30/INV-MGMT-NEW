import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'reactjs-places-autocomplete';


class NewWareHouse extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            warehouse: {
              name: '',
              city: '',
              state: '',
              address: '',
              country: '',
              zipcode: '',
              landmark: ''
            },
            address: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeocodeChange = this.handleGeocodeChange.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { warehouse } = this.state;
      this.setState({
          warehouse: { ...warehouse, [name]: value }
      });
    }

    handleGeocodeChange = address => {
      this.setState({ address });
    };

    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setaddress(latLng))
        .catch(error => console.error('Error', error));

    };

    setaddress(latLng){
       axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latLng.lat+','+latLng.lng+'&sensor=true&key=AIzaSyAvuPSxdugPS2FJQibo-i78wVZHWgmKemk')
      .then(response => {
        this.setState({
          warehouse: {
            name: $("#warehousename").val(),
            address: response.data.results[0].formatted_address,
            landmark: response.data.results[0].address_components[2].long_name,
            city: response.data.results[0].address_components[3].long_name,
            zipcode: response.data.results[0].address_components[6].long_name,
            state: response.data.results[0].address_components[4].long_name,
            country: response.data.results[0].address_components[5].long_name
          }
        });
      })
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { warehouse } = this.state;
      const { dispatch } = this.props;
      axios.post(`${config.apiUrl}/warehouses`, warehouse, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        let warehouse_id = response.data.data.id;
        window.location = `/warehouse/${warehouse_id}`
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
      const { loggingIn, user, users } = this.props;
      const { warehouse, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("users", users)
      return (
        <div>
          <div className="container">

          

            <form name="form" autoComplete="off" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="row">
               <div className="col-md-6">
                  <label htmlFor="warehousename" className="label">WareHouse Name</label>
                  <div>
                    {submitted && !warehouse.name && 
                      <div className="help-block required-msg"> Warehouse Name is required</div>
                    }
                    <input type="text" id="warehousename" className="form-control" placeholder="WareHouse Name" name="name" value={warehouse.name} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="warehouseaddress" className="label">Address</label>
                  <div>
                    {submitted && !warehouse.address && 
                      <div className="help-block required-msg"> Warehouse Address is required</div>
                    }

                    <PlacesAutocomplete
                      value={this.state.address}
                      onChange={this.handleGeocodeChange}
                      onSelect={this.handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input form-control',
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                              const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                    <input type="hidden" id="warehouseaddress" name="address" value={warehouse.address} />

                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="warehouselandmark" className="label">Landmark</label>
                  <div>
                    {submitted && !warehouse.landmark && 
                      <div className="help-block required-msg"> Warehouse landmark is required</div>
                    }
                    <input type="text" id="warehouselandmark" className="form-control" placeholder="Landmark" name="landmark" value={warehouse.landmark} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="warehousecity" className="label">City</label>
                  <div>
                    {submitted && !warehouse.city && 
                      <div className="help-block required-msg"> Warehouse City is required</div>
                    }
                    <input type="text" id="warehousecity" className="form-control" placeholder="City" name="city" value={warehouse.city} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
              </div><br/>  
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="warehousezipcode" className="label">Zipcode</label>
                  <div>
                    {submitted && !warehouse.zipcode && 
                      <div className="help-block required-msg"> Warehouse Zipcode is required</div>
                    }
                    <input type="text" id="warehousezipcode" className="form-control" placeholder="Zipcode" name="zipcode" value={warehouse.zipcode} onChange={this.handleChange}  autoFocus /><br/>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="warehousestate" className="label">State</label>
                  <div>
                    {submitted && !warehouse.state && 
                      <div className="help-block required-msg"> Warehouse State is required</div>
                    }
                    <input type="text" id="warehousestate" className="form-control" placeholder="State" name="state" value={warehouse.state} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
              </div>  
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="warehousecountry" className="label">Country</label>
                  <div>
                    {submitted && !warehouse.country && 
                      <div className="help-block required-msg"> Warehouse Country is required</div>
                    }
                    <input type="text" id="warehousecountry" className="form-control" placeholder="Country" name="country" value={warehouse.country} onChange={this.handleChange}  autoFocus />
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
  const { users,warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse,
    users
  };
}

const connectedNewWareHouse = connect(mapStateToProps)(NewWareHouse);
export { connectedNewWareHouse as NewWareHouse };