import { CUSTOMER_LOGIN, RESTAURANT_LOGIN } from "./actions";
import backend from '../../components/common/serverDetails';
import axios from "axios";

export const customerLogin = (loginData) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log('loginActions -> customerLogin -> Login requested for customer : ', loginData)
    axios.post(`${backend}/login/customers`, loginData)
        .then(response => dispatch({
            type: CUSTOMER_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_LOGIN,
                    payload: error.response.data
                });
            }
        });
}

export const restaurantLogin = (loginData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backend}/login/restaurants`, loginData)
        .then(response => dispatch({
            type: RESTAURANT_LOGIN,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_LOGIN,
                    payload: error.response.data
                });
            }
        });
}