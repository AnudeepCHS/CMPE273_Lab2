import { CUSTOMER_ORDERS_GET, CUSTOMER_ORDERS_POST, RESTAURANT_ORDERS_GET, RESTAURANT_ORDERS_EDIT } from '../action/actions';

const initialState = {
    customerOrders: {},
    restaurantOrders: {},
    customerOrderPost: null,
    restaurantOrderEdit: null,
    status: null,
};

const ordersReducer = (state = initialState, action) => {
    console.log('ordersReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case CUSTOMER_ORDERS_GET: 
            return {
                ...state,
                customerOrders: action.payload,
                orderCreateStatus: null,
                updateOrderStatus: null,
            };
        case CUSTOMER_ORDERS_POST: 
            return {
                ...state,
                orderCreateStatus: action.payload,
                updateOrderStatus: null,
            };
        case RESTAURANT_ORDERS_GET:  
            return {
                ...state,
                restaurantOrders: action.payload,
                status: action.status,
                orderCreateStatus: null,
                updateOrderStatus: null,
            };
        case RESTAURANT_ORDERS_EDIT: 
            return {
                ...state,
                updateOrderStatus: action.payload,
                orderCreateStatus: null,
                status: action.status,
            };         
        default:
            return state;
    }
};

export default ordersReducer;
