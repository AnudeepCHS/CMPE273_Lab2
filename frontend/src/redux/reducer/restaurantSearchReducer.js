import { SEARCH_RESTAURANT, GET_RESTAURANT_DETAILS } from '../action/actions';

const initialState = {
    restaurant_data: {},
    status: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESTAURANT:
            return {
                ...state,
                restaurant_data: action.payload,
                status: action.status,
            };
        case GET_RESTAURANT_DETAILS:
            return {
                ...state,
                restaurant_data: action.payload,
                status: action.status,
            };
        default:
            return state;
    }
};