const logIn = () => {
    const logForm = document.createElement('form');
    logForm.setAttribute('id', 'logForm');
    logForm.setAttribute('class', 'logForm');
    logForm.setAttribute('method', 'POST');
    logForm.innerHTML = `
        
        <div class="logForm-container">
        <h1 class"logForm-title>Iniciar Sesion</h1>

        <div class="email-container">
            <label for="userEmail" class="lbl-email">Correo electronico</label>
            <input type="email" name="userEmail" id="userEmail" placeholder="Usuario" required>
        </div>

        <div class="pass-container">
            <label for="userPass" class="lbl-pass">Contraseña</label>
            <input type="password" name="userPass" placeholder="Ingrese contraseña" required>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesion</button>

        <div class="sin-cuenta">
            ¿No tienes una cuenta? <a href="">Registrarse</a>
        </div>
    </div>`;
    return logForm;
}

export default logIn;


