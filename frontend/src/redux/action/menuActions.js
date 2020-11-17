import axios from 'axios';
import { RESTAURANT_MENU_GET, 
    RESTAURANT_MENU_DISH_POST, 
    RESTAURANT_MENU_DISH_GET, 
    RESTAURANT_MENU_DISH_DELETE, 
    RESTAURANT_MENU_DISH_PUT,
    CUSTOMER_MENU_GET } from '../action/actions';
import backend from '../../components/common/serverDetails';

export const postDish = (data) => dispatch => {
    console.log("menuActions.js -> postDish -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/dishes/restaurants/${restaurant_id}`, data)
    .then(response => dispatch({
        type: RESTAURANT_MENU_DISH_POST,
        payload: response.data,
        status: 'RESTAURANT_MENU_DISH_POST_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('menuActions.js -> postDish data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MENU_DISH_POST,
                payload: error.response.data,
                status: 'RESTAURANT_MENU_DISH_POST_FAILED'
            });
        }
    });
}

export const getMenu = () => dispatch => {
    console.log("menuActions.js -> getMenu -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/dishes/restaurants/${restaurant_id}`)
    .then(response => dispatch({
        type: RESTAURANT_MENU_GET,
        payload: response.data,
        status: 'RESTAURANT_MENU_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('menuActions.js -> getMenu data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MENU_GET,
                payload: error.response.data,
                status: 'RESTAURANT_MENU_GET_FAILED'
            });
        }
    });
}

export const getDish = (dish_id) => dispatch => {
    console.log("menuActions.js -> getDish -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/dishes/restaurants/${restaurant_id}/dish/${dish_id}`)
    .then(response => dispatch({
        type: RESTAURANT_MENU_DISH_GET,
        payload: response.data,
        status: 'RESTAURANT_MENU_DISH_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('menuActions.js -> getDish data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MENU_DISH_GET,
                payload: error.response.data,
                status: 'RESTAURANT_MENU_DISH_GET_FAILED'
            });
        }
    });
}

export const putDish = (data) => dispatch => {
    console.log("menuActions.js -> putDish -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/dishes/restaurants/${restaurant_id}/${data.dish_id}`, data)
    .then(response => dispatch({
        type: RESTAURANT_MENU_DISH_PUT,
        payload: response.data,
        status: 'RESTAURANT_MENU_DISH_PUT_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('menuActions.js -> getDish data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MENU_DISH_PUT,
                payload: error.response.data,
                status: 'RESTAURANT_MENU_DISH_PUT_FAILED'
            });
        }
    });
}

export const deleteDish = (dish_id) => dispatch => {
    console.log("menuActions.js -> deleteDish -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.delete(`${backend}/dishes/restaurants/${restaurant_id}/${dish_id}`)
    .then(response => dispatch({
        type: RESTAURANT_MENU_DISH_DELETE,
        payload: response.data,
        status: 'RESTAURANT_MENU_DISH_DELETE_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('menuActions.js -> deleteDish data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_MENU_DISH_DELETE,
                payload: error.response.data,
                status: 'RESTAURANT_MENU_DISH_DELETE_FAILED'
            });
        }
    });
}

export const customerMenuGet = (rest_id) => dispatch => {
    console.log("menuActions.js -> customerMenuGet -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/dishes/restaurants/${restaurant_id}`)
    .then(response => dispatch({
        type: CUSTOMER_MENU_GET,
        payload: response.data,
        status: 'CUSTOMER_MENU_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('menuActions.js -> customerMenuGet data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_MENU_GET,
                payload: error.response.data,
                status: 'CUSTOMER_MENU_GET_FAILED'
            });
        }
    });
}