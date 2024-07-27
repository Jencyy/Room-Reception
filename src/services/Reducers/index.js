import { combineReducers } from 'redux';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
    reservation: reservationReducer
});

export default rootReducer;
