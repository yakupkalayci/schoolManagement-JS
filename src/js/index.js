import "../css/styles.scss";

import * as bootstrap from "bootstrap";

import LOGO from "../images/logo.png";
import HOMEIMG from "../images/illustration-intro.svg";
import BGPATTERN from "../images/bg-tablet-pattern.svg";
import DEFAULTPROFILE from "../images/default_profile.png";
import CARDBG from '../images/cardBG.jpg';

import Dashboard from "./dashboard";
import { Firebase } from "./firebase";
import { Auth } from "./auth";
import { UI } from "./ui";
import { Storage } from "./storage";

const loginBtn = document.querySelector("button#loginBtn");
const signupBtn = document.querySelector("button#signupBtn");
const loginInputs = {
  email: document.querySelector('form#loginForm input[type="email"]'),
  password: document.querySelector('form#loginForm input[type="password"]'),
};
const signpInputs = {
  name: document.querySelector("form#signupForm input#name"),
  surname: document.querySelector("form#signupForm input#surname"),
  email: document.querySelector("form#signupForm input#email2"),
  password: document.querySelector("form#signupForm input#password2"),
  repassword: document.querySelector("form#signupForm input#repassword"),
};

const firebase = new Firebase();
const auth = new Auth();
const ui = new UI();
const storage = new Storage();

function signup(e) {
  e.preventDefault();

  let isValid = true;
  for (const input of Object.values(signpInputs)) {
    if (!input.value) isValid = false;
  }

  if (isValid) {
    if (signpInputs.password.value === signpInputs.repassword.value) {
      auth
        .createNewUser(signpInputs.email.value, signpInputs.password.value);
    } else {
      ui.toggleAuthModal("Passwords must be same!");
    }
  } else {
    ui.toggleAuthModal("Please fill all inputs!");
  }
}

function login(e) {
  e.preventDefault();

  let isValid = true;
  for (const input of Object.values(loginInputs)) {
    if (!input.value) isValid = false;
  }

  if (isValid) {
    auth.login(loginInputs.email.value, loginInputs.password.value);
  } else {
    ui.toggleAuthModal('Please fill all inputs!');
  }
}

function eventListeners() {
  loginBtn?.addEventListener("click", login);
  signupBtn?.addEventListener("click", signup);
}

document.addEventListener('DOMContentLoaded', () => {
  if(window.location.pathname.includes('/dashboard.html')) {
    if(!(storage.getSessionStorage('activeUser'))) {
      window.location.pathname = "/";
    }
    else {
      Dashboard();
    }
  }
  if(window.location.pathname.includes('/auth.html')) {
    if(storage.getSessionStorage('activeUser')) {
      window.location.pathname = "/dashboard.html";
    }
  }
});

eventListeners();
