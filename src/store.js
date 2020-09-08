import { createStore, combineReducers, compose } from "redux";
import firebase, { initializeApp } from "firebase";
import "firebase/firebase";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
//@todo

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCWKxx752IzPAeicuB3JqlD0KdUXRvSSwg",
  authDomain: "reactborrowtracker.firebaseapp.com",
  databaseURL: "https://reactborrowtracker.firebaseio.com",
  projectId: "reactborrowtracker",
  storageBucket: "reactborrowtracker.appspot.com",
  messagingSenderId: "406799369978",
  appId: "1:406799369978:web:bf057b2549f18e53d86b43",
  measurementId: "G-4MH9X905HR",
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);

//Init firestore
const firestore = firebase.firestore();

//Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //firebase instance at first argument
  reduxFirestore(firebase) // <-- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

//create initial state
const initialState = {};

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
