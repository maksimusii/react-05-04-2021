import { LOAD_PROFILE_SUCCESS } from "../actions/profileActions";

const initialStore = {};

export default function profileReducer(store = initialStore, action) {
  switch (action.type) {
    case LOAD_PROFILE_SUCCESS: {
      debugger;
      const {
        systemName,
        firstName,
        secondName,
        email,
        description,
      } = action.payload;

      return {
        ...store,
        systemName: systemName,
        firstName: firstName,
        secondName: secondName,
        email: email,
        description: description,
      };
    }
  }
  return store;
}
