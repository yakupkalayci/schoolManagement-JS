import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Firebase } from "./firebase";
import { UI } from "./ui";

export class Auth {
  constructor() {
    this.firebase = new Firebase();
    this.ui = new UI();
    this.auth = getAuth(this.firebase.app);
  }

  async createNewUser(email, password) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.pathname = "dashboard";
        console.log(user);
      })
      .catch((err) => {
        this.ui.toogleModal(this.errorParser(err.message));
      });
  }

  async login(email, password) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        window.location.pathname = "dashboard";
        console.log(userCredential);
      })
      .catch((err) => {
        this.ui.toogleModal(this.errorParser(err.message));
      });
  }

  errorParser(err) {
    const startIndex = err.indexOf('(');
    const endIndex = err.indexOf(')');

    let msg = err.slice(startIndex+1, endIndex);

    switch(msg) {
      case 'auth/weak-password':
        return "Password should be at least 6 characters.";
      case 'auth/email-already-in-use':
        return "Email already in use. Please use a different email address.";
      case 'auth/invalid-email':
          return "Invalid email address!";
      case 'auth/invalid-password':
          return 'Invalid password. Password should be at least 6 characters.';
      case 'auth/user-not-found':
          return "User not found!";
      case 'auth/invalid-login-credentials':
          return "Invalid login information!"
      default:
        return msg;
    }

  }
}
