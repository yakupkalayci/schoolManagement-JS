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
        this.ui.showModal(err.message);
      });
  }

  async login(email, password) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        window.location.pathname = "dashboard";
        console.log(userCredential);
      })
      .catch((err) => {
        this.ui.showModal(err.message);
      });
  }
}
