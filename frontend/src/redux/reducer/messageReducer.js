import { 
    RESTAURANT_MESSAGES_GET,
    RESTAURANT_MESSAGES_PUT,
    CUSTOMER_ALL_MESSAGES_GET,
    CUSTOMER_MESSAGES_GET,
    CUSTOMER_MESSAGES_PUT } from '../action/actions';

const initialState = {
    restaurantMessages: {},
    restaurantMessageUpdateStatus: null,
    status: null,
};

const messageReducer = (state = initialState, action) => {
    console.log('messageReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case RESTAURANT_MESSAGES_GET: 
            return {
                ...state,
                restaurantMessages: action.payload,
                restaurantMessageUpdateStatus: null,
            };
        case RESTAURANT_MESSAGES_PUT: 
            return {
                ...state,
                restaurantMessageUpdateStatus: action.payload,
            };
        case CUSTOMER_ALL_MESSAGES_GET: 
            return {
                ...state,
                customerAllMessages: action.payload,
                customerMessageUpdateStatus: null,
            };
        case CUSTOMER_MESSAGES_GET: 
            return {
                ...state,
                customerMessages: action.payload,
                customerMessageUpdateStatus: null,
            };
        case CUSTOMER_MESSAGES_PUT: 
            return {
                ...state,
                customerMessageUpdateStatus: action.payload,
            };
        default:
            return state;
    }
};

export default messageReducer;
