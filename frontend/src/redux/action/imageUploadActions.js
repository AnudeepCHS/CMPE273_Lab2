import { UPLOAD_CUST_IMAGE, UPLOAD_REST_IMAGE, UPLOAD_DISH_IMAGE } from './actions';
import axios from "axios";
import backend from '../../components/common/serverDetails';

export const uploadCustomerImage = (formData, uploadConfig) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backend}/uploads/customers/${localStorage.getItem("customer_id")}/profilePicture`, 
        formData, 
        uploadConfig)
        .then(response => response.data)
        .then(image => dispatch({
            type: UPLOAD_CUST_IMAGE,
            payload: image
        }))
        .catch(err => {
            console.log("Error");
        });
}

export const uploadRestaurantImage = (formData, uploadConfig) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backend}/uploads/restaurants/${localStorage.getItem("restaurant_id")}/restaurantImages`, 
        formData, 
        uploadConfig)
        .then(response => response.data)
        .then(image => dispatch({
            type: UPLOAD_REST_IMAGE,
            payload: image
        }))
        .catch(err => {
            console.log(err);
        });
}

export const uploadDishImage = (dish_id, formData, uploadImageConfig) => dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.post(`${backend}/uploads/restaurants/${localStorage.getItem("restaurant_id")}/dishes/${dish_id}/dishImages`, 
        formData, uploadImageConfig)
        .then(response => response.data)
        .then(image => dispatch({
            type: UPLOAD_DISH_IMAGE,
            payload: image
        }))
        .catch(err => {
            console.log(err);
        });
}