import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import generateUniqueId from 'generate-unique-id';
import { storage } from '../../firebase';

// Action Types
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const SINGLE_CONTACT = 'SINGLE_CONTACT';
export const ADD_CONTACTS_SUCCESS = 'ADD_CONTACTS_SUCCESS';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

// Action Creators
export const addContact = (contact) => ({
    type: ADD_CONTACT,
    payload: contact,
});

export const deleteContact = (contacts) => ({
    type: DELETE_CONTACT,
    payload: contacts,
});

export const updateContact = (contacts) => ({
    type: UPDATE_CONTACT,
    payload: contacts,
});

export const singleContact = (contact) => ({
    type: SINGLE_CONTACT,
    payload: contact,
});

export const loading = () => ({
    type: LOADING,
});

export const error = (message) => ({
    type: ERROR,
    payload: message,
});

export const addContactsSuccess = (contacts) => ({
    type: ADD_CONTACTS_SUCCESS,
    payload: contacts,
});


export const addContactAsync = (contact) => {
    return (dispatch, getState) => {
        dispatch(loading());
        contact.id = generateUniqueId({
            length: 24,
            useLetters: true,
            useNumbers: true
        });
        axios.post('http://localhost:3007/contact', contact)
            .then(() => {
                const currentContacts = getState().contactReducer.contacts;
                const newContacts = [...currentContacts, contact];
                dispatch(addContact(newContacts));
            })
            .catch(err => {
                dispatch(error(err.message));
            });
    };
};

export const getContactsAsync = () => {
    return (dispatch) => {
        dispatch(loading());
        axios.get('http://localhost:3007/contact')
            .then(response => {
                dispatch(addContactsSuccess(response.data));
            })
            .catch(err => {
                dispatch(error(err.message));
            });
    };
};

export const deleteContactAsync = (id) => {
    return (dispatch, getState) => {
        axios.delete(`http://localhost:3007/contact/${id}`)
            .then(() => {
                const currentContacts = getState().contactReducer.contacts;
                const newContacts = currentContacts.filter(contact => contact.id !== id);
                dispatch(deleteContact(newContacts));
            })
            .catch(err => {
                dispatch(error(err.message));
            });
    };
};

export const singleContactAsync = (id) => {
    return (dispatch) => {
        dispatch(loading());
        axios.get(`http://localhost:3007/contact/${id}`)
            .then(response => {
                dispatch(singleContact(response.data));
            })
            .catch(err => {
                dispatch(error(err.message));
            });
    };
};

export const updateContactAsync = (contact) => {
    return (dispatch, getState) => {
        axios.put(`http://localhost:3007/contact/${contact.id}`, contact)
            .then(() => {
                const currentContacts = getState().contactReducer.contacts;
                const newContacts = currentContacts.map(c =>
                    c.id === contact.id ? contact : c
                );
                dispatch(updateContact(newContacts));
            })
            .catch(err => {
                dispatch(error(err.message));
            });
    };
};
export const uploadImg = (file) => {
    return (dispatch) => {
        const storageRef = ref(storage, `img/${file.name}`);

        return uploadBytes(storageRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                console.log('Uploaded file and got URL!', url);
                return url;
            })
            .catch(err => {
                console.error("Error uploading file: ", err);
                throw err;
            });
    };
};
