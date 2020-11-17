import { UPLOAD_CUST_IMAGE, UPLOAD_REST_IMAGE, UPLOAD_DISH_IMAGE } from '../action/actions';

const initialState = {
    cust_image: {},
    rest_image: {},
    dish_image: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_CUST_IMAGE:
            return {
                ...state,
                cust_image: action.payload
            };
        case UPLOAD_REST_IMAGE:
            return {
                ...state,
                rest_image: action.payload
            };
        case UPLOAD_DISH_IMAGE:
            return {
                ...state,
                dish_image: action.payload
            };
        default:
            return state;
    }
};