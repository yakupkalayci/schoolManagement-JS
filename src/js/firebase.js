import { initializeApp } from "firebase/app";

export class Firebase {
  firebaseConfig = {
    apiKey: "AIzaSyCcRrDTYhSwxZOd8SJp-fayJtPQt6VyM34",
    authDomain: "school-management-bcfbe.firebaseapp.com",
    projectId: "school-management-bcfbe",
    storageBucket: "school-management-bcfbe.appspot.com",
    messagingSenderId: "213630741306",
    appId: "1:213630741306:web:639a7604635925c2cf7e03",
  };
  app = initializeApp(this.firebaseConfig);
}
