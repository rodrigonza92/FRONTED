const principal = document.querySelector('.contenido-principal');
const serversAdheridos = document.querySelector('.servers-adheridos');

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

const main = () => {
    if(serversAdheridos.childElementCount === 0){
        principal.innerHTML = `
            <h2> Aun no te has unido a un servidor </h2>
            <p> Para unirte a un servidor, debes tener una invitacion </p>`
            
  
    }else {
        console.log('no hay nada');
    }
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
                <button class="btn btn-primario">Unirse</button>
            </div>
        `
    })


    // principal.innerHTML =+ `
    //     <h2> Elige un servidor </h2>
    //     <p> Explora los servidores a los que puedes unirte </p>`
    //     console.log(ver);
}

const prueba = () => {
    console.log('prueba');
}



main();
