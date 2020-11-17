import axios from 'axios';
import { CUSTOMER_PROFILE_GET, CUSTOMER_PROFILE_UPDATE, SEARCH_RESTAURANT, GET_RESTAURANT_DETAILS } from "./actions";
import backend from '../../components/common/serverDetails';

export const getCustomer = (customerId) => dispatch => {
    console.log("customerActions -> getCustomer -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/profiles/customers/${customerId}`)
    .then(response => dispatch({
        type: CUSTOMER_PROFILE_GET,
        payload: response.data
    }))
    .catch(error => {
        console.log ('customerActions -> getCustomer data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_PROFILE_GET,
                payload: error.response.data
            });
        }
    });
}

export const updateCustomerProfile = (data) => dispatch => {
    console.log("customerActions -> updateCustomer -> method entered");
    let customerId = localStorage.getItem('customer_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/profiles/customers/${customerId}`, data)
    .then(response => dispatch({
        type: CUSTOMER_PROFILE_UPDATE,
        payload: response.data,
        status: 'CUSTOMER_UPDATE_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('customerActions -> updateCustomerProfile data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_PROFILE_UPDATE,
                payload: error.response.data,
                status: 'CUSTOMER_UPDATE_FAILED'
            });
        }
    });
}

export const getRestaurantSearch = (search_input) => dispatch => {
    console.log("customerActions -> getRestaurantSearch -> method entered");
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backend}/restaurantSearch/input/${search_input}`)
    .then(response => {
        var locations = [];
        var deliverMethods = ["Home Delivery" ,"Dine In", "Pick Up"];
        if (response.data) {
            if (response.data === 'NO_RECORD') {
                return {
                    noRecord: true
                };
            }
            else {
                console.log('customerActions -> getRestaurantSearch response data for locationList: ', response.data);
                for (var i = 0; i < response.data.length; i++) {
                    if (!locations.includes(response.data[i].location))
                        locations.push(response.data[i].location)
                }
                return {
                    restaurantList: response.data,
                    locationsList: locations,
                    deliverMethodsList: deliverMethods,
                };
            }
        }
    })
    .then(search_result => dispatch({
        type: SEARCH_RESTAURANT,
        payload: search_result,
        status: 'SEARCH_RESTAURANT_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('customerActions -> getRestaurantSearch error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: SEARCH_RESTAURANT,
                payload: error.response.data,
                status: 'SEARCH_RESTAURANT_ERROR'
            });
        }
    });
}

export const getRestaurantDetails = (restaurant_id) => dispatch => {
    console.log("customerActions -> getRestaurantDetails -> method entered for : ", restaurant_id);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.get(`${backend}/restaurantSearch/details/${restaurant_id}`)
        .then(response => dispatch({
            type: GET_RESTAURANT_DETAILS,
            payload: response.data,
            status: 'GET_RESTAURANT_DETAILS_SUCCESSFUL'
        }))
        .catch(error => {
            console.log ('customerActions -> getRestaurantDetails data from error call : ', error);
            if (error.response && error.response.data) {
                return dispatch({
                    type: GET_RESTAURANT_DETAILS,
                    payload: error.response.data,
                    status: 'GET_RESTAURANT_DETAILS_FAILED'
                });
            }
        });
}

