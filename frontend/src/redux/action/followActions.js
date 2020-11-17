import axios from 'axios';
import { CUSTOMERS_GET, CUSTOMERS_FOLLOWING_GET, CUSTOMER_TO_FOLLOW } from '../action/actions';
import backend from '../../components/common/serverDetails';

export const getCustomers = (search) => dispatch => {
    console.log("followActions -> getCustomers -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    let customer_id = localStorage.getItem('customer_id');
    axios.get(`${backend}/follow/all/${customer_id}?search=${search}`)
    .then(response => {
        var locations = [];
        if (response.data) {
            if (response.data === 'NO_CUSTOMERS') {
                console.log('followActions -> getCustomers -> no records entered : ', response.data);
                return {
                    noRecord: true
                };
            } else {
                console.log('followActions -> getCustomers -> setting data : ', response.data);
                for (var i = 0; i < response.data.length; i++) {
                    if (!locations.includes(response.data[i].city) && !(response.data[i].city === null))
                        locations.push(response.data[i].city)
                }
                return {
                    locationsList: locations,
                    customersList: response.data,
                };
            }
        } 
    })
    .then(response => dispatch({
        type: CUSTOMERS_GET,
        payload: response,
        status: 'CUSTOMERS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('followActions -> getCustomers data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMERS_GET,
                payload: error.response.data,
                status: 'CUSTOMERS_GET_FAILED'
            });
        }
    });
}

export const getCustomersFollowing = (customer_id) => dispatch => {
    console.log("followActions -> getCustomersFollowing -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/follow/following/${customer_id}`)
    .then(response => dispatch({
        type: CUSTOMERS_FOLLOWING_GET,
        payload: response.data,
        status: 'CUSTOMERS_FOLLOWING_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('followActions -> getCustomersFollowing data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMERS_FOLLOWING_GET,
                payload: error.response.data,
                status: 'CUSTOMERS_FOLLOWING_GET_FAILED'
            });
        }
    });
}

export const followCustomer = (data) => dispatch => {
    console.log("followActions -> followCustomer -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/follow/customer`, data)
    .then(response => dispatch({
        type: CUSTOMER_TO_FOLLOW,
        payload: response.data,
        status: 'CUSTOMER_TO_FOLLOW_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('followActions -> followCustomer data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_TO_FOLLOW,
                payload: error.response.data,
                status: 'CUSTOMER_TO_FOLLOW_FAILED'
            });
        }
    });
}
