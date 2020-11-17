import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import imageUploadReducer from './imageUploadReducer'
import restaurantSearchReducer from './restaurantSearchReducer'
import reviewsReducer from './reviewsReducer'
import eventReducer from './eventReducer'
import menuReducer from './menuReducer'
import followReducer from './followReducer'
import ordersReducer from './ordersReducer'
import messageReducer from './messageReducer'

export default combineReducers({
    profileState: profileReducer,
    signupState: signupReducer,
    loginState: loginReducer,
    imageState: imageUploadReducer,
    restaurantSearchState: restaurantSearchReducer,
    reviewsState: reviewsReducer,
    eventState: eventReducer,
    menuState: menuReducer,
    followState: followReducer,
    ordersState: ordersReducer,
    messageState: messageReducer,
})
