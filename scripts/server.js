const principal = document.querySelector('.contenido-principal');
const serversAdheridos = document.querySelector('.servers-adheridos');
const addServModal = document.querySelector('.add-server-modal');
const addServBtn = document.querySelector('.btn-add-servidor');
const addSerForm = document.querySelector('.add-server-form');

const USER_ID = 1;

const getServers = async () => {
    const API_URL = 'http://127.0.0.1:5000/servers/';
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('La solicitud no se completó correctamente.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los servidores:', error);
    }
}

const postServer =  (server) => {
    fetch('http://127.0.0.1:5000/servers/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(server),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }else{
            addServModal.close();
        }
        return response.json();
        
    })
}

const serversPorUser = async (USER_ID) => {
    const API_URL = `http://127.0.0.1:5000/servers/added/${USER_ID}`;
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('La solicitud no se completó correctamente.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los servidores:', error);
    }
}

const refreshServers = () => {
    serversPorUser(USER_ID).then((data) => {
        serversAdheridos.innerHTML = '';
        data.map((server) => {
            serversAdheridos.innerHTML += `
            <button class="show-channels-panel" >${server.nombre}</button>
            `

            

        })
    })
}


const main = () => {
    serversPorUser(USER_ID).then((data) => {
        if(data.length === 0){
            principal.innerHTML = `
                <h2> Aun no te has unido a un servidor </h2>
                <p> Para unirte a un servidor, debes tener una invitacion </p>`

        }else{
            data.map((server) => {
                serversAdheridos.innerHTML += `
                <button onClick="displayCanales(${server.id_server})" class="show-channels-panel" >${server.nombre}</button>
                `
            })
        }
    })
}

const explorar = async () => {
    const ver = await getServers();

    principal.innerHTML = `
        <h2> Elige un servidor </h2>
    `

    ver.map((server) => {
        principal.innerHTML += `
            <div class="server">
                <div class="info">
                    <h3>${server.nombre}</h3>
                    <p>${server.descripcion}</p>
                </div>
                <button class="btn-add-default-server" data-id="${server.id_server}" value="${server.nombre}">Unirse</button>
            </div>
        `
        const addDefaultServer = document.querySelectorAll('.btn-add-default-server');
        addDefaultServer.forEach((btn) => {
            btn.addEventListener('click', () => {

            const id_server = btn.dataset.id;
            const id_user = USER_ID;
            const data = {
                id_server,
                id_user
            }
            console.log(data);

            fetch('http://127.0.0.1:5000/servers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }else{
                    principal.innerHTML = ''
                    refreshServers();
                }
                return response.json();
                
            })


            //     serversAdheridos.innerHTML += `
            // <button class="show-channels-panel" >${btn.value}</button>
            // `
            
            });
        })

    })

}

const añadirServidor = () => {
    addServBtn.addEventListener('click', () => {
        addServModal.showModal();
        addSerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(addSerForm);
            const server = Object.fromEntries(formData.entries());
            const nombre = server.nombre;
            const descripcion = server.descripcion;


            const id_user = USER_ID;
            const data = {
                nombre,
                descripcion,
                id_user
            }
            console.log(data);

            postServer(data);
            refreshServers();
            addServModal.close();

        })
    })

}


main();
añadirServidor();

// CANALES

const getCanales = async () => {
    const API_URL = 'http://127.0.0.1:5000/channels/';
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('La solicitud no se completó correctamente.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los servidores:', error);
    }
}

const displayCanales = async (test_id_server) => {
    const canalesContainer = document.querySelector('.canales-container');
    const canales = await getCanales();

    const btnAñadir = document.querySelector('.add-canal-container');
    btnAñadir.innerHTML = '';
    btnAñadir.innerHTML = `<button onclick="openModal(${test_id_server})" type="button" class="btn-add-canal"> Añadir canal</button>`;

    console.log(canales);
    canalesContainer.innerHTML = '';
    canales.forEach((canal) => {
        if(test_id_server === canal.id_server){
            canalesContainer.innerHTML += `
            <button onclick="mostrarMensajes(${canal.id_channel})" class="channel-btn" data-id="${canal.id_channel}">${canal.nombre}</button>
            `
        }
        
        
    })
}


//  MENSAJES
// Al ingresar al canal ==>>
const mostrarMensajes = (id_channel) => {
    
    const msgForm = document.querySelector('.mensaje-form');
    msgForm.innerHTML = `
    <form class="form-mensaje">
        <input name="mensaje" type="text" class="mensaje-input" placeholder="Escribe un mensaje">
        <button  onclick="enviarMensaje(${id_channel})" type="submit"  class="mensaje-submit">Enviar</button>
    </form>`

    

    refreshMensajes(id_channel);
    

}

const refreshMensajes = (id_channel) => {
    fetch('http://127.0.0.1:5000/messages/', {
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
        const mensajes = document.querySelector('.mensajes');
        mensajes.innerHTML = '';
        data.map((mensaje) => {
            if(id_channel === mensaje.id_channel){
                
                mensajes.innerHTML += 
                `<div class="mensaje">
                    <div class="mensaje-info">
                        <div class="mensaje-info-usuario">
                            <p class="mensaje-info-usuario-nombre">${mensaje.id_user} cambiar a nombre de usuario</p>
                        </div>
                        <p class="mensaje-info-hora">${mensaje.fecha}</p>
                    </div>
                    <p class="mensaje-contenido">${mensaje.mensaje}</p>
                </div>`
            }
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Al enviar un mensaje ==>>

const enviarMensaje = (id_channel) => {
    const msgForm = document.querySelector('.form-mensaje');
    msgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mensaje = document.querySelector('.mensaje-input');

        const data = {
            id_user: USER_ID,
            id_channel: id_channel,
            mensaje: mensaje.value,
            fecha: new Date().toLocaleString()
        }

        console.log(data);
        
        fetch('http://127.0.0.1:5000/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }else{
                // refreshMensajes(id_channel);
                console.log('exitoso');
            }
            return response.json();
            
        })

    })
}