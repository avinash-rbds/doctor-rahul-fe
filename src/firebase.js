import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

/*
RBDS: doctor-rahul-fe
const firebaseConfig = {
    apiKey: "AIzaSyCaZiXXhBWhG-d-d7UhafAx9iT-UdI_40M",
    authDomain: "doctor-rahul-fe.firebaseapp.com",
    projectId: "doctor-rahul-fe",
    storageBucket: "doctor-rahul-fe.appspot.com",
    messagingSenderId: "677740183611",
    appId: "1:677740183611:web:176b50945c76c131fd5c1e",
    measurementId: "G-2H9E8DNDF9",
};
*/

const firebaseConfig = {
    apiKey: "AIzaSyDpi7xXZ9c69aHRWyjEAaTAKuBkTmM2RQI",
    authDomain: "doctor-rahul-web.firebaseapp.com",
    projectId: "doctor-rahul-web",
    storageBucket: "doctor-rahul-web.appspot.com",
    messagingSenderId: "1069369360633",
    appId: "1:1069369360633:web:fe5c0b24d00d48dd8a6228",
    measurementId: "G-XHSD6DB1KL",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.database = app.database();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }
}

export default new Firebase();
