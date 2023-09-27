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
        <img src="../images/perfil.png" alt="">
        <h2>${data.first_name} ${data.last_name}</h2>
    </div>
    <div class="info-perfil">
        <div class="item">
            <div class="item-info">
                <p>Nombre de usuario:</p>
                <p>${data.username}</p>
            </div>
            <button type="button" value="username" class="btn-edit">Editar</button>
        </div>
        <div class="item">
            <div class="item-info">
                <p>Nombre:</p>
                <p>${data.first_name}</p>
            </div>
            <button type="button" value="first_name" class="btn-edit">Editar</button>
        </div>
        <div class="item">
            <div class="item-info">
                <p>Apellido:</p>
                <p>${data.last_name}</p>
            </div>
            <button type="button" class="btn-edit">Editar</button>
        </div>
        <div class="item">
            <div class="item-info">
                <p>Correo electronico:</p>
                <p>${data.email}</p>
            </div>
            <button type="button" class="btn-edit">Editar</button>
        </div>
            
    </div>
    `
    const botonEdit = document.querySelectorAll('.btn-edit');
    botonEdit.forEach(boton => {
        boton.addEventListener('click', () => {
            console.log(boton.value);
        })
    })
}

window.addEventListener('load', displayPerfil(6));
console.log('despues de la carga');