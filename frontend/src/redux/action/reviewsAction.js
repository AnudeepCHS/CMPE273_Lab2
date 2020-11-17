import axios from 'axios';
import { RESTAURANT_REVIEW_POST, RESTAURANT_REVIEW_GET} from '../action/actions';
import backend from '../../components/common/serverDetails';

export const postRestaurantReview = (data) => dispatch => {
    console.log("reviewsActions -> postRestaurantReview -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/reviews/restaurants`, data)
    .then(response => dispatch({
        type: RESTAURANT_REVIEW_POST,
        payload: response.data,
        status: 'RESTAURANT_REVIEW_POST_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('reviewsActions -> postRestaurantReview data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_REVIEW_POST,
                payload: error.response.data,
                status: 'RESTAURANT_REVIEW_POST_FAILED'
            });
        }
    });
}

export const getRestaurantReviews = (restaurant_id) => dispatch => {
    console.log("reviewsActions -> getRestaurantReviews -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/reviews/restaurants/${restaurant_id}`)
    .then(response => dispatch({
        type: RESTAURANT_REVIEW_GET,
        payload: response.data,
        status: 'RESTAURANT_REVIEW_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('reviewsActions -> getRestaurantReviews data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_REVIEW_GET,
                payload: error.response.data,
                status: 'RESTAURANT_REVIEW_GET_FAILED'
            });
        }
    });
}