import axios from 'axios';
import { RESTAURANT_EVENTS_GET, RESTAURANT_EVENT_POST, 
    CUSTOMER_EVENTS, CUSTOMER_REGISTERED_EVENTS, CUSTOMER_REGISTER_TO_EVENT,
    } from '../action/actions';
import backend from '../../components/common/serverDetails';

export const getCustomerEvents = (search, order) => dispatch => {
    console.log("eventActions -> getCustomerEvents -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/events/customers?search=${search}&order=${order}`)
    .then(response => {
        if (response.data) {
            if (response.data === 'NO_EVENTS') {
                console.log('eventActions -> getCustomerEvents -> no records entered : ', response.data);
                return {
                    noRecord: true
                };
            } else {
                console.log('eventActions -> getCustomerEvents -> setting data : ', response.data);
                return response.data;
            }
        } 
    })
    .then(response => dispatch({
        type: CUSTOMER_EVENTS,
        payload: response,
        status: 'CUSTOMER_EVENTS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> getCustomerEvents data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_EVENTS,
                payload: error.response.data,
                getEventsStatus: 'CUSTOMER_EVENTS_GET_FAILED'
            });
        }
    });
}

export const getCustomerRegisteredEvents = (customer_id) => dispatch => {
    console.log("eventActions -> getCustomerRegisteredEvents -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/events/customers/registered/${customer_id}`)
    .then(response => dispatch({
        type: CUSTOMER_REGISTERED_EVENTS,
        payload: response.data,
        regestiredEventGetStatus: 'CUSTOMER_REGISTERED_EVENTS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> getCustomerRegisteredEvents data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_REGISTERED_EVENTS,
                payload: error.response.data,
                regestiredEventGetStatus: 'CUSTOMER_REGISTERED_EVENTS_GET_FAILED'
            });
        }
    });
}

export const registerToEvent = (data) => dispatch => {
    console.log("eventActions -> registerToEvent -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/events/customers/register`, data)
    .then(response => dispatch({
        type: CUSTOMER_REGISTER_TO_EVENT,
        payload: response.data,
        registerEventStatus: 'CUSTOMER_REGISTER_TO_EVENT_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> getCustomerRegisteredEvents data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_REGISTER_TO_EVENT,
                payload: error.response.data,
                registerEventStatus: 'CUSTOMER_REGISTER_TO_EVENT_FAILED'
            });
        }
    });
}

export const postRestaurantEvent = (data) => dispatch => {
    console.log("eventActions -> postRestaurantEvent -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/events/restaurants`, data)
    .then(response => dispatch({
        type: RESTAURANT_EVENT_POST,
        payload: response.data,
        status: 'RESTAURANT_EVENT_POST_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> postRestaurantEvent data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_EVENT_POST,
                payload: error.response.data,
                status: 'RESTAURANT_EVENT_POST_FAILED'
            });
        }
    });
}

export const getRestaurantEvents = (restaurant_id) => dispatch => {
    console.log("eventActions -> getRestaurantEvents -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/events/restaurants/${restaurant_id}`)
    .then(response => {
        if (response.data) {
            if (response.data === 'NO_EVENTS') {
                return { noRecord: true };
            }
            else {
                return { eventsList: response.data };
            }
        }
    })
    .then(events => dispatch({
        type: RESTAURANT_EVENTS_GET,
        payload: events,
        status: 'RESTAURANT_EVENTS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> getRestaurantEvents data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_EVENTS_GET,
                payload: error.response.data,
                status: 'RESTAURANT_EVENTS_GET_ERROR'
            });
        }
    });
}