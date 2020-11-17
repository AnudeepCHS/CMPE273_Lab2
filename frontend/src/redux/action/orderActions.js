import axios from 'axios';
import { CUSTOMER_ORDERS_GET, CUSTOMER_ORDERS_POST, RESTAURANT_ORDERS_GET, RESTAURANT_ORDERS_EDIT } from '../action/actions';
import backend from '../../components/common/serverDetails';

export const getCustomerOrders = (customer_id) => dispatch => {
    console.log("orderActions -> getCustomerOrders -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/orders/customers/${customer_id}`)
    .then(response => {
        if (response.data) {
            if (response.data === 'NO_ORDERS') {
                console.log('orderActions -> getCustomerOrders -> no records entered : ', response.data);
                return {
                    noRecord: true
                };
            } else {
                console.log('orderActions -> getCustomerOrders -> setting data : ', response.data);
                return {
                    ordersList: response.data,
                };
            }
        } 
    })
    .then(response => dispatch({
        type: CUSTOMER_ORDERS_GET,
        payload: response,
        status: 'CUSTOMER_ORDERS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('orderActions -> getCustomerOrders data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_ORDERS_GET,
                payload: error.response.data,
                status: 'CUSTOMER_ORDERS_GET_FAILED'
            });
        }
    });
}

export const getRestaurantOrders = (restaurant_id) => dispatch => {
    console.log("orderActions -> getRestaurantOrders -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/orders/restaurants/${restaurant_id}`)
    .then(response => {
        if (response.data) {
            if (response.data === 'NO_ORDERS') {
                console.log('orderActions -> getRestaurantOrders -> no records entered : ', response.data);
                return {
                    noRecord: true
                };
            } else {
                console.log('orderActions -> getRestaurantOrders -> setting data : ', response.data);
                return {
                    ordersList: response.data,
                };
            }
        } 
    })
    .then(response => dispatch({
        type: RESTAURANT_ORDERS_GET,
        payload: response,
        status: 'RESTAURANT_ORDERS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('orderActions -> getRestaurantOrders data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_ORDERS_GET,
                payload: error.response.data,
                status: 'RESTAURANT_ORDERS_GET_FAILED'
            });
        }
    });
}

export const createOrder = (data) => dispatch => {
    console.log("orderActions -> createOrder -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/orders/customers`, data)
    .then(response => {
        if (response.data) {
            if (response.data === 'ORDER_POST_SUCCESS') {
                console.log('orderActions -> createOrder -> Create Order Successful : ', response.data);
                return response.data;
            } else {
                console.log('orderActions -> createOrder -> Create Order Failed : ', response.data);
                return response.data;
            }
        } 
    })
    .then(response => dispatch({
        type: CUSTOMER_ORDERS_POST,
        payload: response,
        status: 'CUSTOMER_ORDERS_POST_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('orderActions -> createOrder data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_ORDERS_POST,
                payload: error.response.data,
                status: 'CUSTOMER_ORDERS_POST_FAILED'
            });
        }
    });
}

export const updateOrder = (order_id, data) => dispatch => {
    console.log("orderActions -> updateOrder -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/orders/${order_id}`, data)
    .then(response => {
        if (response.data) {
            if (response.data === 'ORDER_STATUS_UPDATED') {
                console.log('orderActions -> updateOrder -> Update Order Successful : ', response.data);
                return response.data;
            } else {
                console.log('orderActions -> updateOrder -> Update Order Failed : ', response.data);
                return response.data;
            }
        } 
    })
    .then(response => dispatch({
        type: RESTAURANT_ORDERS_EDIT,
        payload: response,
        status: 'RESTAURANT_ORDERS_EDIT_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('orderActions -> updateOrder data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_ORDERS_EDIT,
                payload: error.response.data,
                status: 'RESTAURANT_ORDERS_EDIT_FAILED'
            });
        }
    });
}