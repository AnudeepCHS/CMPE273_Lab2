import { CUSTOMER_SIGNUP, RESTAURANT_SIGNUP } from '../action/actions';

const initialState = {
    customer: {},
    restaurant: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_SIGNUP:
            return {
                ...state,
                customer: action.payload,
                restaurant: {}
            };
        case RESTAURANT_SIGNUP:
            return {
                ...state,
                restaurant: action.payload,
                customer:{}
            };
        default:
            return state;
    }
};