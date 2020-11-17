import { CUSTOMER_SIGNUP, RESTAURANT_SIGNUP } from "./actions";
import backend from '../../components/common/serverDetails';
import axios from "axios";

// Action creator for CUSTOMER_LOGIN action
// Data has CUSTOMER email_id and password
export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backend}/signup/customers`, customerData)
        .then(response => {
            console.log("signupActions -> customerSignup -> Status Code : ",response.status, "Response JSON : ",response.data);
            dispatch({
            type: CUSTOMER_SIGNUP,
            payload: response.data
        })
    })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}

export const restaurantSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backend}/signup/restaurants`, customerData)
        .then(response => {
            console.log("signupActions -> restaurantSignup -> Status Code : ",response.status, "Response JSON : ",response.data);
            dispatch({
            type: RESTAURANT_SIGNUP,
            payload: response.data
        })
    })
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RESTAURANT_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}