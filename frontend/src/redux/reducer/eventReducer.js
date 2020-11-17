import { RESTAURANT_EVENTS_GET, RESTAURANT_EVENT_POST, 
    CUSTOMER_EVENTS, CUSTOMER_REGISTERED_EVENTS, CUSTOMER_REGISTER_TO_EVENT } from "../action/actions";

const initialState = {
    restaurantEventAdd: {},
    restaurantEvents: {},
    customerRegisteredEvents: {},
    status: null,
    // regestiredEventGetStatus: null,
    // registerEventStatus: null,
    // getEventsStatus: null,
};

const eventReducer = (state = initialState, action) => {
    console.log('eventReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case RESTAURANT_EVENTS_GET: 
            return {
                ...state,
                restaurantEvents: action.payload,
                restaurantEventAdd: {},
                status: action.status,
            };
        case RESTAURANT_EVENT_POST: 
            return {
                ...state,
                restaurantEventAdd: action.payload,
                status: action.status,
                customerRegisterToEvent: null
            };
        case CUSTOMER_EVENTS:  
            return {
                ...state,
                customerEvents: action.payload,
                // getEventsStatus: action.getEventsStatus,
                customerRegisterToEvent: null
            };
        case CUSTOMER_REGISTERED_EVENTS: 
            return {
                ...state,
                customerRegisteredEvents: action.payload,
                // regestiredEventGetStatus: action.regestiredEventGetStatus,
                customerRegisterToEvent: null
            };
        case CUSTOMER_REGISTER_TO_EVENT: 
            return {
                ...state,
                customerRegisterToEvent: action.payload,
                status: action.status,
            };          
        default:
            return state;
    }
};

export default eventReducer;
