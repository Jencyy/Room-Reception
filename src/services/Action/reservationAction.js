import axios from 'axios';
import generateUniqueId from 'generate-unique-id';

export const ADD_RESERVATION = 'ADD_RESERVATION';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const UPDATE_RESERVATION = 'UPDATE_RESERVATION';
export const SINGLE_RESERVATION = 'SINGLE_RESERVATION';
export const ADD_RESERVATIONS_SUCCESS = 'ADD_RESERVATIONS_SUCCESS';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

export const addReservation = (reservation) => ({
    type: ADD_RESERVATION,
    payload: reservation,
});

export const deleteReservation = (id) => ({
    type: DELETE_RESERVATION,
    payload: id,
});

export const updateReservation = (reservation) => ({
    type: UPDATE_RESERVATION,
    payload: reservation,
});

export const singleReservation = (reservation) => ({
    type: SINGLE_RESERVATION,
    payload: reservation,
});

export const loading = () => ({
    type: LOADING,
});

export const addReservationsSuccess = (reservations) => ({
    type: ADD_RESERVATIONS_SUCCESS,
    payload: reservations,
});

export const addReservationAsync = (reservation) => {
    return (dispatch) => {
        dispatch(loading());
        reservation.id = generateUniqueId({
            length: 24,
            useLetters: true,
            useNumbers: true
        });
        axios.post('http://localhost:3004/reservations', reservation)
            .then(() => dispatch(getReservationsAsync()))
            .catch((err) => {
                dispatch({ type: ERROR, payload: err.message });
                console.error(err);
            });
    };
};

export const getReservationsAsync = () => {
    return (dispatch) => {
        dispatch(loading());
        axios.get('http://localhost:3004/reservations')
            .then((res) => dispatch(addReservationsSuccess(res.data)))
            .catch((err) => {
                dispatch({ type: ERROR, payload: err.message });
                console.error(err);
            });
    };
};

export const deleteReservationAsync = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/reservations/${id}`)
            .then(() => dispatch(getReservationsAsync()))
            .catch((err) => {
                dispatch({ type: ERROR, payload: err.message });
                console.error(err);
            });
    };
};

export const singleReservationAsync = (id) => {
    return (dispatch) => {
        dispatch(loading());
        axios.get(`http://localhost:3004/reservations/${id}`)
            .then((res) => dispatch(singleReservation(res.data)))
            .catch((err) => {
                dispatch({ type: ERROR, payload: err.message });
                console.error(err);
            });
    };
};

export const updateReservationAsync = (reservation) => {
    return (dispatch) => {
        axios.put(`http://localhost:3004/reservations/${reservation.id}`, reservation)
            .then(() => dispatch(getReservationsAsync()))
            .catch((err) => {
                dispatch({ type: ERROR, payload: err.message });
                console.error(err);
            });
    };
};
