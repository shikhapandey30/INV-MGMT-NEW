import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';
import MultiSelect from "@khanacademy/react-multi-select";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'reactjs-places-autocomplete';


class NewVendor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          vendors: {
              name: '',
              address: '',
              city: '',
              state: '',
              country: '',
              landmark: '',
              zipcode: '',
              product: '',
              loaded: 0
          },
          selected: [],
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeocodeChange = this.handleGeocodeChange.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { vendors } = this.state;
      this.setState({
          vendors: { ...vendors, [name]: value }
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
          vendors: {
            name: $("#vendorname").val(),
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
      const { dispatch } = this.props;
      const { selected } = this.state;
      const { vendors } = this.state;

      const product_ids = [];
      {selected.map((product_id) =>
        product_ids.push({id: product_id})
      )}
      var vendor = { name: vendors.name, address: vendors.address, city: vendors.city, state: vendors.state, country: vendors.country,landmark: vendors.landmark, zipcode: vendors.zipcode,products: product_ids }
      axios.post(`${config.apiUrl}/vendors`, vendor, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        let vendor_id = response.data.data.id;
        window.location = `/vendor/${vendor_id}`
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
    }

    render() {
      const { loggingIn, user, allproducts } = this.props;
      const { vendors, category, submitted, selected } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      const options = [];
      {allproducts.items && allproducts.items.length > 0 && allproducts.items.map((product) =>
        options.push({label: product.name, value: product.id})
      )}

      return (
        <div>
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorname" className="label">Name</label>
                  <div>
                    {submitted && !vendors.name && 
                      <div className="help-block required-msg"> Vendor Name is required</div>
                    }
                    <input type="text" id="vendorname" className="form-control" placeholder="Vendor Name" name="name" value={vendors.name} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendoraddress" className="label">Address</label>
                  <div>
                    {submitted && !vendors.address && 
                      <div className="help-block required-msg"> Vendor Address is required</div>
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
                    <input type="hidden" id="vendoraddress" name="address" value={vendors.address} />
                  </div>
                </div>  
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorcity" className="label">City</label>
                  <div>
                    {submitted && !vendors.city && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorcity" className="form-control" placeholder="City" name="city" value={vendors.city} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorstate" className="label">State</label>
                  <div>
                    {submitted && !vendors.state && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorstate" className="form-control" placeholder="State" name="state" value={vendors.state} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorcountry" className="label">Country</label>
                  <div>
                    {submitted && !vendors.country && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorcountry" className="form-control" placeholder="Country" name="country" value={vendors.country} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorlandmark" className="label">Landmark</label>
                  <div>
                    {submitted && !vendors.landmark && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorlandmark" className="form-control" placeholder="Landmark" name="landmark" value={vendors.landmark} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  
              </div><br/>
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="vendorzipcode" className="label">Zipcode</label>
                  <div>
                    {submitted && !vendors.zipcode && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorzipcode" className="form-control" placeholder="Zipcode" name="zipcode" value={vendors.zipcode} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorproductid" className="label">Product </label>
                  <div>
                      <MultiSelect value={vendors.product}
                        options={options}
                        selected={selected}
                        onSelectedChanged={selected => this.setState({selected})}
                      />

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
  const { vendors,allproducts, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    vendors,
    users,
  };
}

const connectedNewVendor = connect(mapStateToProps)(NewVendor);
export { connectedNewVendor as NewVendor };