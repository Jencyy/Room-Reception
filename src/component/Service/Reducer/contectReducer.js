import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SINGLE_CONTACT,
    ADD_CONTACTS_SUCCESS,
    LOADING,
    ERROR
} from "../Action/contectAction";

const initialState = {
    contact: null,
    contacts: [],
    isLoading: false,
    error: null
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
        case DELETE_CONTACT:
           
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: action.payload,
                isLoading: false
            };
        case SINGLE_CONTACT:
            return {
                ...state,
                contact: action.payload,
                isLoading: false
            };
        case ADD_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload,
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

export default contactReducer;
