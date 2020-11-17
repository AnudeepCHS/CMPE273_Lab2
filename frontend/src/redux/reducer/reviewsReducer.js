import { RESTAURANT_REVIEW_GET, RESTAURANT_REVIEW_POST } from "../action/actions";

const initialState = {
    restaurantReview: {},
    status: null,
};

const reviewReducer = (state = initialState, action) => {
    console.log('reviewReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case RESTAURANT_REVIEW_GET: 
        case RESTAURANT_REVIEW_POST: 
            return {
                ...state,
                restaurantReview: action.payload,
                status: action.status,
            };        
        default:
            return state;
    }
};

export default reviewReducer;
