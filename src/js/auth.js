import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { Firebase } from "./firebase";
import { UI } from "./ui";
import { Storage } from "./storage";

export class Auth {
  constructor() {
    this.firebase = new Firebase();
    this.ui = new UI();
    this.storage = new Storage();
    this.auth = getAuth(this.firebase.app);
  }

  async createNewUser(email, password) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.storage.setSessionStorage('activeUser', userCredential.user.uid);
        window.location.pathname = "dashboard.html";
      })
      .catch((err) => {
        this.ui.toggleAuthModal(this.errorParser(err.message));
      });
  }

  async login(email, password) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.storage.setSessionStorage('activeUser', userCredential.user.uid);
        window.location.pathname = "dashboard.html";
      })
      .catch((err) => {
        this.ui.toggleAuthModal(this.errorParser(err.message));
      });
  }

  async signOut() {
    signOut(this.auth).then(() => {
      window.location.pathname = "/";
      this.storage.setSessionStorage('activeUser', '');
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
