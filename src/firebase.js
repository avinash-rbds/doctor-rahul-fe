import app from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsi0vyNJaF1gn9iSPwI4shCp1oI5q_d_4",
  authDomain: "upedge-project.firebaseapp.com",
  projectId: "upedge-project",
  storageBucket: "upedge-project.appspot.com",
  messagingSenderId: "72311293683",
  appId: "1:72311293683:web:376aafb3795953ee26d986",
  measurementId: "G-WX3N14KBHV",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}

export default new Firebase();
