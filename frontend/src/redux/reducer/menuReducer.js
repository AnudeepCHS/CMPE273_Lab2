import { RESTAURANT_MENU_GET, 
    RESTAURANT_MENU_DISH_POST, 
    RESTAURANT_MENU_DISH_GET, 
    RESTAURANT_MENU_DISH_DELETE, 
    RESTAURANT_MENU_DISH_PUT,
    CUSTOMER_MENU_GET } from "../action/actions";

const initialState = {
    postDish : {},
    dishes : {},
    status: null,
    deleteDishStatus: null,
    updateDishStatus: null,
    updateDishImageStatus: null,
};

const menuReducer = (state = initialState, action) => {
    console.log('menuReducer.js -> action.payload : ', action.payload);
    switch (action.type) {
        case RESTAURANT_MENU_GET: 
            return {
                ...state,
                dishes: action.payload,
                status: action.status,
                deleteDishStatus: null,
                updateDishStatus: null,
                updateDishImageStatus: null,
            };
        case RESTAURANT_MENU_DISH_POST: 
            return {
                ...state,
                postDish: action.payload,
                status: action.status,
                deleteDishStatus: null,
                updateDishStatus: null,
                updateDishImageStatus: null,
            };
        case RESTAURANT_MENU_DISH_GET:  
            return {
                ...state,
                status: action.status,
                deleteDishStatus: null,
                updateDishStatus: null,
                updateDishImageStatus: null,
            };
        case RESTAURANT_MENU_DISH_DELETE: 
            return {
                ...state,
                deleteDishStatus: action.payload,
                status: action.status,
                updateDishStatus: null,
                updateDishImageStatus: null,
            }; 
        case RESTAURANT_MENU_DISH_PUT:  
            return {
                ...state,
                status: action.status,
                deleteDishStatus: null,
                updateDishStatus: action.payload,
                updateDishImageStatus: null,
            };
        case CUSTOMER_MENU_GET: 
            return {
                ...state,
                status: action.status,
            };          
        default:
            return state;
    }
};

export default menuReducer;