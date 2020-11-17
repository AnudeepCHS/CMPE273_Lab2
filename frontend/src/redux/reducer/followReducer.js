import { CUSTOMERS_FOLLOWING_GET, CUSTOMER_TO_FOLLOW, CUSTOMERS_GET } from "../action/actions";

const initialState = {
    customerToFollow: {},
    customers: {},
    customersFollowing: {},
    status: null,
};

const followReducer = (state = initialState, action) => {
    console.log('eventReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case CUSTOMERS_GET:  
            return {
                ...state,
                customers: action.payload,
                customerToFollow: null
            };
        case CUSTOMERS_FOLLOWING_GET: 
            return {
                ...state,
                customersFollowing: action.payload,
                customerToFollow: null
            };
        case CUSTOMER_TO_FOLLOW: 
            return {
                ...state,
                customerToFollow: action.payload,
                status: action.status,
            };          
        default:
            return state;
    }
};

export default followReducer;
