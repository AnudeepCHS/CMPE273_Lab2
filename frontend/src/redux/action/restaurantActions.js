import axios from 'axios';
import { RESTAURANT_PROFILE_GET, RESTAURANT_PROFILE_UPDATE} from '../action/actions';
import backend from '../../components/common/serverDetails';

export const getRestaurant = (restaurant_id) => dispatch => {
    console.log("restaurantActions -> getRestaurant -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/profiles/restaurants/${restaurant_id}`)
    .then(response => dispatch({
        type: RESTAURANT_PROFILE_GET,
        payload: response.data
    }))
    .catch(error => {
        console.log ('restaurantActions -> getCustomer data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_PROFILE_GET,
                payload: error.response.data
            });
        }
    });
}

export const updateRestaurant = (data) => dispatch => {
    console.log("restaurantActions -> updateRestaurant -> method entered");
    let restaurant_id = localStorage.getItem('restaurant_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/profiles/restaurants/${restaurant_id}`, data)
    .then(response => dispatch({
        type: RESTAURANT_PROFILE_UPDATE,
        payload: response.data,
        status: 'RESTAURANT_UPDATE_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('restaurantActions -> updateRestaurant data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_PROFILE_UPDATE,
                payload: error.response.data,
                status: 'RESGAURANT_UPDATE_FAILED'
            });
        }
    });
}