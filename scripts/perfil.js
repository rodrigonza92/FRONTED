const cambiarPassBtn = document.querySelector('.cambiar-pass-btn');
const dialog = document.querySelector('.change-pass-modal');
const perfil = document.querySelector('.perfil');

// Funcion para obtener los datos del usuario
const getUser = (id) => {
    const API_URL = `http://127.0.0.1:5000/users/${id}`;
    const response = fetch(API_URL, {
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
        return data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    return response;
  };


cambiarPassBtn.addEventListener('click', () => {
    dialog.showModal();
}
);

const displayPerfil = async (id) => {
    let data = await getUser(id);

    console.log(data, "Lata data que se encuentra en display perfil");

    perfil.innerHTML = `
    <div class="head-perfil">
        <img src="../assets/usuario.png" alt="">
        <h2>${data.first_name} ${data.last_name}</h2>
    </div>
    <div class="info-perfil">
        <div class="item">
            <div class="item-info">
                <p>Nombre de usuario:</p>
                <p>${data.username}</p>
            </div>
            <button type="button" data-field="username" value="username" class="btn-edit">Editar</button>
        </div>
        <div class="item">
            <div class="item-info">
                <p>Nombre:</p>
                <p>${data.first_name}</p>
            </div>
            <button type="button" data-field="first_name" value="first_name" class="btn-edit">Editar</button>
        </div>
        <div class="item">
            <div class="item-info">
                <p>Apellido:</p>
                <p>${data.last_name}</p>
            </div>
            <button type="button" data-field="last_name" value="last_name" class="btn-edit">Editar</button>
        </div>
        <div class="item">
            <div class="item-info">
                <p>Correo electronico:</p>
                <p>${data.email}</p>
            </div>
            <button type="button" data-field="email" class="btn-edit">Editar</button>
        </div>
            
    </div>
    `
    perfil.innerHTML = `
    <!-- ... (código para mostrar el perfil) ... -->
    `;

    const botonEdit = document.querySelectorAll('.btn-edit');
    botonEdit.forEach(boton => {
        boton.addEventListener('click', () => {
            const fieldToEdit = boton.getAttribute('data-field');
            const valorActual = data[fieldToEdit];
            editedValueInput.value = valorActual;
            editedValueInput.dataset.field = fieldToEdit; // Almacena el campo que se va a editar
            editModal.style.display = 'block';
        });
    });

    // const botonEdit = document.querySelectorAll('.btn-edit');
    // botonEdit.forEach(boton => {
    //     boton.addEventListener('click', () => {
    //         console.log(boton.value);
    //     })
    // })
}

// saveEditBtn.addEventListener('click', async () => {
//     const fieldToEdit = editedValueInput.dataset.field;
//     const nuevoValor = editedValueInput.value;
    
//     // Realiza la solicitud PUT para actualizar el valor en la API
//     const userId = 1; // Supongamos que tienes el ID del usuario
//     const API_URL = `http://127.0.0.1:5000/users/${userId}`;
    
//     try {
//         const response = await fetch(API_URL, {
//             method: 'PUT', // Utiliza el método PUT para actualizar
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ [fieldToEdit]: nuevoValor }), // Actualiza el campo específico
//         });
    
//         if (!response.ok) {
//             throw new Error('No se pudo actualizar el valor');
//         }
    
//         // Actualiza la vista con el nuevo valor
//         // Por ejemplo, puedes actualizar el contenido del elemento <p>
    
//         // Oculta la ventana emergente
//         editModal.style.display = 'none';
//     } catch (error) {
//         console.error('Error al guardar los cambios:', error);
//     }
// });


window.addEventListener('load', displayPerfil(1));
console.log('despues de la carga');