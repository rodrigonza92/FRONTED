// const form = document.querySelector('.registration');
// const dialog = document.querySelector('#dialog')

// const API_URL = 'http://127.0.0.1:5000/users/';

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   register();
// });

// const register = () => {

//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());

//     const newUser = {
//         "first_name": data.firstname,
//         "last_name": data.lastname,
//         "birthday": data.birthday,
//         "email": data.email,
//         "username": data.username,
//         "passwd": data.password,
//     }

//     fetch('http://127.0.0.1:5000/users/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newUser),
//     })
//     .then(response => {
//         if (!response.ok) {
//         throw new Error('Network response was not ok');
//         }else{
//             dialog.showModal();
//         }
//         return response.json();
        
//     })
// }

// const acceptButton = document.querySelector('.btn-accept');
// acceptButton.addEventListener('click', () => {
//     dialog.close();
//     window.location.href = "http://127.0.0.1:5500/templates/login.html";
// });


// const getUsers = () => {
//     fetch(API_URL, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };


// window.addEventListener('load', getUsers);


const form = document.querySelector('.registration');
const dialog = document.querySelector('#dialog');

const API_URL = 'http://127.0.0.1:5000/users/';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkIfUserExists(); // Verificar si el usuario ya existe antes de registrar.
});

const checkIfUserExists = () => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Realiza una consulta para verificar si el usuario ya existe en tu sistema
  fetch(`${API_URL}${data.username}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((userData) => {
      // Si la consulta es exitosa, significa que el usuario ya existe
      // Puedes mostrar un mensaje de usuario ya registrado aquí.
      dialog.showModal();
    })
    .catch((error) => {
      // Si la consulta falla, significa que el usuario no existe y puedes proceder con el registro.
      register();
    });
};

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
  };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        // Si el registro es exitoso, muestra un cuadro de diálogo modal.
        dialog.showModal();
      }
      return response.json();
    });
};

const showDialog = (message) => {
  // Muestra un cuadro de diálogo modal con el mensaje proporcionado.
  dialog.querySelector('.message').textContent = message;
  dialog.showModal();
};

const acceptButton = document.querySelector('.btn-accept');
acceptButton.addEventListener('click', () => {
  dialog.close();
  window.location.href = "http://127.0.0.1:5500/templates/login.html";
});
