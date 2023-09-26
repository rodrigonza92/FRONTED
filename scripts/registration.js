const form = document.querySelector('.registration');

const API_URL = 'http://127.0.0.1:5000/users/';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  register();
});

const register = () => {

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newUser = {
        "first_name": data.firstname,
        "last_name": data.lastname,
        "birthday": data.birthday,
        "email": data.email,
        "username": data.username,
        "passwd": data.password,
    }

    fetch('http://127.0.0.1:5000/users/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }else{
            window.location.href = "http://127.0.0.1:5500/templates/login.html";
        }
        return response.json();
    })
}


const getUsers = () => {
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


window.addEventListener('load', getUsers);