const cambiarPassBtn = document.querySelector('.cambiar-pass-btn');
const editModal = document.querySelector('.edit-modal');
const editForm = document.querySelector('.edit-form');
const perfil = document.querySelector('.perfil');

// Función para obtener los datos del usuario
const getUser = async (id) => {
    const API_URL = `http://127.0.0.1:5000/users/${id}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para actualizar un campo del usuario
const updateUserField = async (id, field, value) => {
    const API_URL = `http://127.0.0.1:5000/users/${id}`;
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [field]: value }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

cambiarPassBtn.addEventListener('click', () => {
    editModal.showModal();
});

// Mostrar el formulario de edición al hacer clic en el botón "Editar"
const botonEdit = document.querySelectorAll('.btn-edit');
botonEdit.forEach(boton => {
    boton.addEventListener('click', () => {
        const fieldToEdit = boton.value;
        document.getElementById('edit-field').value = fieldToEdit;
        document.getElementById('edit-value').value = '';
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newValue = document.getElementById('edit-value').value;
            await updateUserField(id, fieldToEdit, newValue);
            editModal.close();
            // Volver a cargar el perfil después de la edición
            await displayPerfil(id);
        });
        document.querySelector('.cancel-edit').addEventListener('click', () => {
            editModal.close();
        });
        editModal.showModal();
    });
});

const displayPerfil = async (id) => {
    let data = await getUser(id);
    perfil.innerHTML = `
        <div class="head-perfil">
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
            <button type="button" value="last_name" class="btn-edit">Editar</button>
            </div>
            <div class="item">
            <div class="item-info">
                <p>Correo electronico:</p>
                <p>${data.email}</p>
            </div>
            <button type="button" value="email" class="btn-edit">Editar</button>
            </div>
            
        </div>
    `;
};

window.addEventListener('load', () => {
    displayPerfil(1);
});