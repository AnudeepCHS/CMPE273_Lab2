import { CUSTOMER_LOGIN, RESTAURANT_LOGIN, LOGOUT } from "../action/actions";

 const initialState = {
    customer: {},
    restaurant: {}
 };

 export default function(state = initialState, action){
    switch(action.type){
        case CUSTOMER_LOGIN:
            return {
                ...state,
                customer: action.payload,
                restaurant: {}
            };
        case RESTAURANT_LOGIN:
            return {
                ...state,
                restaurant: action.payload,
                customer: {}
            };
        case LOGOUT:
            return {};
        default:
            return state;
    }
};