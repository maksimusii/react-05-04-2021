import {
    LOAD_PROFILE_REQUEST,
    LOAD_PROFILE_ERROR,
    LOAD_PROFILE_SUCCESS
} from '../Actions/profileAction.js';

const initialStore = {
    profile: {},
    // firstName: 'Dmitry',
    // lastName: 'Yep',
    // age: '29',
    // photo: 'http://artmisto.com/uploads/posts/2012-09/1347354556_jessicatrinhphoto1.jpeg'
    isLoading: false
};


export default function profileReducer(store = initialStore, action) {
    switch (action.type) {
        case LOAD_PROFILE_REQUEST: {
            return {
                ...store,
                isLoading: true
            };
        }
        case LOAD_PROFILE_ERROR: {
            return {
                ...store,
                isLoading: false
            };
        }
        case LOAD_PROFILE_SUCCESS: {
            const profile = action.payload.entities.profile.undefined;
            // debugger;
            // payload.forEach(({id, title, messageList}) => {
            //     profile[id] = {
            //         title, 
            //         messageList
            //     };
            // });

            return {
                ...store,
                profile,
                isLoading: false
            };
        }
        default:
            return store;
    }
}