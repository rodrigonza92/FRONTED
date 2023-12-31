
const form = document.querySelector('.registration');
const dialog = document.querySelector('#dialog');
const API_URL = 'http://127.0.0.1:5000/users/';

// Función para verificar los datos del usuario
async function verificarUsuario(email, password) {
    try {
        // Realiza una solicitud fetch para obtener los datos del usuario
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("No se pudo obtener los datos del usuario.");
        }
        
        const userData = await response.json();
        
        let autenticado = false; // Variable para realizar el seguimiento de la autenticación
        
        userData.forEach(element => {
            if (element.email === email && element.passwd === password) {
                autenticado = true; // Autenticación exitosa
            }
        });

        return autenticado; // Devuelve el valor de autenticado
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
        throw error;
    }
}

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtiene los valores del formulario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const autenticado = await verificarUsuario(email, password);
        //console.log(autenticado)
        if (autenticado) {
            // La autenticación fue exitosa
            //alert("Inicio de sesión exitoso");
            window.location.href = "http://127.0.0.1:5500/templates/server.html";
        } else {
            // La autenticación falló
            alert("Correo o Contraseña incorrectas.\nInténtalo nuevamente.");
        }
    } catch (error) {
        // Maneja errores de autenticación
        alert("Error en la autenticación. Por favor, inténtalo de nuevo más tarde.");
    }
});