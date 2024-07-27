import {
    ADD_RESERVATION,
    DELETE_RESERVATION,
    UPDATE_RESERVATION,
    SINGLE_RESERVATION,
    ADD_RESERVATIONS_SUCCESS,
    LOADING,
    ERROR
} from '../Action/reservationAction';

const initialState = {
    reservation: null,
    reservations: [],
    isLoading: false,
    error: null
};

const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESERVATION:
            return {
                ...state,
                reservations: [...state.reservations, action.payload],
                isLoading: false
            };
        case DELETE_RESERVATION:
            return {
                ...state,
                reservations: state.reservations.filter(reservation => reservation.id !== action.payload),
                isLoading: false
            };
        case UPDATE_RESERVATION:
            return {
                ...state,
                reservations: state.reservations.map(reservation =>
                    reservation.id === action.payload.id ? action.payload : reservation
                ),
                isLoading: false
            };
        case SINGLE_RESERVATION:
            return {
                ...state,
                reservation: action.payload,
                isLoading: false
            };  
        case ADD_RESERVATIONS_SUCCESS:
            return {
                ...state,
                reservations: action.payload,
                isLoading: false
            };
        case LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reservationReducer;
