
const form = document.querySelector('.registration');
const dialog = document.querySelector('#dialog');
const API_URL = 'http://127.0.0.1:5000/users/';

// Esta función realiza la verificación del usuario
async function verificarUsuario(email, username) {
    try {
        // Realiza una solicitud fetch para obtener los datos del usuario
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("No se pudo obtener los datos del usuario.");
        }

        const userData = await response.json();

        let autenticado = false; // Variable para realizar el seguimiento de la autenticación

        userData.forEach(element => {
            if (element.email === email && element.username === username) {
                autenticado = true; // Autenticación exitosa
            }
        });

        return autenticado; // Devuelve el valor de autenticado
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
        throw error;
    }
}

// Agrega un evento de envío al formulario de registro
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtiene los valores del formulario
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;

    try {
        const autenticado = await verificarUsuario(email, username);

        if (autenticado) {
            // La autenticación fue exitosa
            alert("Usuario ya registrado");
        } else {
            // La autenticación falló, por lo que procede con el registro
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

            // Realiza una solicitud POST para registrar al nuevo usuario
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
        }
    } catch (error) {
        // Maneja errores de autenticación o registro
        alert("Error en la autenticación o el registro. Por favor, inténtalo de nuevo más tarde.");
    }
});

// Cierra el cuadro de diálogo modal y redirige después de hacer clic en el botón "Aceptar"
const acceptButton = document.querySelector('.btn-accept');
acceptButton.addEventListener('click', () => {
    dialog.close();
    window.location.href = "http://127.0.0.1:5500/templates/login.html";
});

