import logIn from "./src/Scripts/LogIn.js";

const logInContainer = logIn();

const form = document.querySelector('.iniciar-sesion');

form.appendChild(logInContainer);