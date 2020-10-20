import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBA1X_w4P4wHmlIiB9k5yiQhDdJv8GGNqI",
        authDomain: "catch-of-the-day-eric-rodgers.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-eric-rodgers.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;