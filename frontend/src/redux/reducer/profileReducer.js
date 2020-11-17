import { CUSTOMER_PROFILE_GET, CUSTOMER_PROFILE_UPDATE, RESTAURANT_PROFILE_GET, RESTAURANT_PROFILE_UPDATE } from "../action/actions";

const initialState = {
    customerProfile: {},
    restaurantProfile: {},
    status: null
};

const profileReducer = (state = initialState, action) => {
    console.log('action.payload : ', action.payload);
    switch (action.type) {
        case CUSTOMER_PROFILE_GET: 
            return {
                ...state,
                customerProfile: action.payload,
                restaurantProfile: {},
                status: action.status,
            };
        case CUSTOMER_PROFILE_UPDATE: 
            return {
                ...state,
                customerProfile: action.payload,
                restaurantProfile: {},
                status: action.status,
            };
        case RESTAURANT_PROFILE_GET: 
            return {
                ...state,
                restaurantProfile: action.payload,
                customerProfile: {},
                status: action.status,
            };
        case RESTAURANT_PROFILE_UPDATE: 
            return {
                ...state,
                restaurantProfile: action.payload,
                customerProfile: {},
                status: action.status,
            };
        default:
            return state;
    }
};

export default profileReducer;