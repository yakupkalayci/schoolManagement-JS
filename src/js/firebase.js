import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push, update } from "firebase/database";

export class Firebase {
  firebaseConfig = {
    apiKey: "AIzaSyCQx3c6iq-Dxeb-zMZuDmJ7PG2M-MJRMcA",
    authDomain: "schoolmanagement-82536.firebaseapp.com",
    projectId: "schoolmanagement-82536",
    storageBucket: "schoolmanagement-82536.appspot.com",
    messagingSenderId: "106706783343",
    appId: "1:106706783343:web:1b02bd74bbe608cd53d19a",
    databaseURL: "https://schoolmanagement-82536-default-rtdb.firebaseio.com",
  };
  app = initializeApp(this.firebaseConfig);
  database = getDatabase(this.app);

  addNewUsertoDb(userId) {
    return set(ref(this.database, "users/" + userId), {
      classes: ''
    });
  }

  getClasses(userId) {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null;
        }
      })
      .catch((err) => console.log(err));
  }

  addNewClass(userId, value) {
  
    // Get a key for a new Post.
    const newClassKey = push(child(ref(this.database), 'classes')).key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/users/' + userId + "/classes"] = newClassKey;
    updates['/classes/' + newClassKey] = value;
  
    return update(ref(this.database), updates);
  }

}
