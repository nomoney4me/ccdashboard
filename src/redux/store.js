// Initial state of the store
const initialState = {
  loggedin: false,
  token: "",
  user: {},
  isAdmin: false,
}

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  SET_LOGGEDIN: "SET_LOGGEDIN",
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER",
  SET_ADMIN: "SET_ADMIN"
};

// Helpers to change states
export const actionCreators = {
  setLoggedIn: status => {
    return { type: types.SET_LOGGEDIN, payload: status };
  },
  setToken: token => {
    return { type: types.SET_TOKEN, payload: token };
  },
  setUser: user => {
    return { type: types.SET_USER, payload: user };
  },
  setAdmin: status => {
    return { type: types.SET_ADMIN, payload: status}
  }
};

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGGEDIN:
      return { ...state, loggedin: action.payload };
    case types.SET_TOKEN:
      return { ...state, token: action.payload };
    case types.SET_USER:
      return { ...state, user: action.payload };
    case types.SET_ADMIN:
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
}
