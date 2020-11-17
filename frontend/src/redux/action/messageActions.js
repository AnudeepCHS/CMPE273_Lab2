import axios from 'axios';
import { 
    RESTAURANT_MESSAGES_GET, 
    RESTAURANT_MESSAGES_PUT ,
    CUSTOMER_ALL_MESSAGES_GET,
    CUSTOMER_MESSAGES_GET, 
    CUSTOMER_MESSAGES_PUT} from '../action/actions';
import backend from '../../components/common/serverDetails';

export const getRestaurantMessages = (restaurant_id, customer_id) => dispatch => {
    console.log("messageActions -> getRestaurantMessages -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/messages/restaurants/${restaurant_id}?customer_id=${customer_id}`)
    .then(response => dispatch({
        type: RESTAURANT_MESSAGES_GET,
        payload: response.data,
        status: 'RESTAURANT_MESSAGES_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('messageActions -> getRestaurantMessages data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MESSAGES_GET,
                payload: error.response.data,
                status: 'RESTAURANT_MESSAGES_GET_FAILED'
            });
        }
    });
}

export const putRestaurantMessage = (data) => dispatch => {
    console.log("messageActions -> putRestaurantMessage -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/messages/restaurants/${restaurant_id}`, data)
    .then(response => dispatch({
        type: RESTAURANT_MESSAGES_PUT,
        payload: response.data,
        status: 'RESTAURANT_MESSAGES_PUT_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('messageActions -> putRestaurantMessage data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MESSAGES_PUT,
                payload: error.response.data,
                status: 'RESTAURANT_MESSAGES_PUT_FAILED'
            });
        }
    });
}

export const getAllCustomerMessages = () => dispatch => {
    console.log("messageActions -> getAllCustomerMessages -> method entered");
    let customer_id = localStorage.getItem('customer_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/messages/customers/${customer_id}`)
    .then(response => dispatch({
        type: CUSTOMER_ALL_MESSAGES_GET,
        payload: response.data,
        status: 'CUSTOMER_ALL_MESSAGES_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('messageActions -> getAllCustomerMessages data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_ALL_MESSAGES_GET,
                payload: error.response.data,
                status: 'CUSTOMER_ALL_MESSAGES_GET_FAILED'
            });
        }
    });
}

export const getCustomerMessages = (restaurant_id) => dispatch => {
    console.log("messageActions -> getCustomerMessages -> method entered");
    let customer_id = localStorage.getItem('customer_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/messages/customers/${customer_id}?restaurant_id=${restaurant_id}`)
    .then(response => dispatch({
        type: CUSTOMER_MESSAGES_GET,
        payload: response.data,
        status: 'CUSTOMER_MESSAGES_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('messageActions -> getCustomerMessages data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_MESSAGES_GET,
                payload: error.response.data,
                status: 'CUSTOMER_MESSAGES_GET_FAILED'
            });
        }
    });
}

export const putCustomerMessage = (data) => dispatch => {
    console.log("messageActions -> putRestaurantMessage -> method entered");
    let customer_id = localStorage.getItem('customer_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/messages/customers/${customer_id}`, data)
    .then(response => dispatch({
        type: CUSTOMER_MESSAGES_PUT,
        payload: response.data,
        status: 'CUSTOMER_MESSAGES_PUT_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('reviewsActions -> putRestaurantMessage data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_MESSAGES_PUT,
                payload: error.response.data,
                status: 'CUSTOMER_MESSAGES_PUT_FAILED'
            });
        }
    });
}