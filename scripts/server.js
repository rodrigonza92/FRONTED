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
                <button class="show-channels-panel" >${server.nombre}</button>
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
                <button class="btn-add-default-server" value="${server.nombre}">Unirse</button>
            </div>
        `
        const addDefaultServer = document.querySelectorAll('.btn-add-default-server');
        addDefaultServer.forEach((btn) => {
            btn.addEventListener('click', () => {
                serversAdheridos.innerHTML += `
            <button class="show-channels-panel" >${btn.value}</button>
            `
            principal.innerHTML = ''
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