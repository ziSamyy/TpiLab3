/**ESTE MODULO SE ENCARGA DE RENDERIZAR LA PANTALLA DE LOGIN Y DE REGISTRO SEGUN CORRESPONDA */
import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

/**1- Se debe asignar a la siguiente constante todo el código correspondiente al componente de login (/asset/modulos/login.html)  */
const htmlLogin = `
    <div class="login-container">
        <form class="formLogin">
            <label for="loginEmail">Email:</label>
            <input type="email" id="loginEmail" required>
            
            <label for="loginPassword">Contraseña:</label>
            <input type="password" id="loginPassword" required>
            
            <label for="reLoginPassword" id="reLoginPasswordLabel" style="display: none;">Repetir Contraseña:</label>
            <input type="password" id="reLoginPassword" style="display: none;">
            
            <button type="submit">Ingresar</button>
        </form>
    </div>
`;
/*2-Se deben definir 4 variables globales al módulo, una para el formulario html, y otras tres para los inputs de email, contraseña y 
*   repetir contraseña
*/
let formulario;
let inputEmail;
let inputPassword;
let inputRepetirPass;



export async function login(){
    /** 3- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de login
     * 
    */
    crearFormulario(false);
    formulario.addEventListener('submit', ingresar);
}  

export async function register(){
     /** 4- Esta función se encarga de llamar a la función crearFormulario y de enlazar el evento submit del formulario de registro.
      *     Esta función es similar a la de login, pero en el llamado a la función crearFormulario lo hace pasando el valor true al 
      *     al parámetro registro que espera función mencionada.
      *     Por último enlaza el evento submit del formulario a la función registrarUsuario.
     * 
    */
   crearFormulario(true);
   formulario.addEventListener('submit', registrarUsuario);
}  



function crearFormulario(registrar){
    /**
     * 1- Esta función deberá capturar el elemento cuya clase es .carrusel y le asignará en su interior un blanco para eliminar su contenido previo.
     * 2- Deberá realizar lo mismo para la clase .seccionProductos y .vistaProducto.
     * 3- Luego deberá capturar la .seccionLogin para asignarle el contenido html del componente login, el cual se encuentra previamente 
     *    cargado en la constante htmlLogin.
     * 4- Deberá capturar los id correspondientes a loginEmail, loginPassword y reLoginPassword para asignarlos a las variable definidas
     *    inputEmail, inputPassword e inputRepetirPass.
     * 5- En el caso que el parámetro registrar sea falso deberá eliminar el contenido del elemento id reLoginPassword.
     * 6- Para el caso que el parámetro registrar sea verdadero deberá cambiar el valor de la propiedad css dysplay a block. De esta forma
     *    el input reLoginPassword se mostrará en pantalla.
     * 7- Por último se deberá capturar el formulario indentificado con la clase .formLogin y asignarlo a la variable global formulario.
     */
    let carruselElement = document.querySelector('.carrusel');
    carruselElement.innerHTML = '';

    let seccionLoginElement = document.querySelector('.seccionLogin');
    seccionLoginElement.innerHTML = htmlLogin;

    inputEmail = document.getElementById('loginEmail');
    inputPassword = document.getElementById('loginPassword');
    inputRepetirPass = document.getElementById('reLoginPassword');

    if (!registrar) {
        inputRepetirPass.value = '';
    } else {
        inputRepetirPass.style.display = 'block';
        document.getElementById('reLoginPasswordLabel').style.display = 'block';
    }

    formulario = document.querySelector('.formLogin');
} 

async function  ingresar(e){
    /**
     * 1- Esta función tiene como objetivo controlar que el texto en inputEmail e inputPassword se corresponda con alguna cuenta almacenada
     *    en el REST-API.
     * 2- Para ello en primera instancia deberá cancelar el comportamiento por defecto del envento recibido . Para ello deberá
     *    tomar el parámetro evento ( e ) y ejecutar el método preventDefault().
     * 3- Luego se deberá llamar la función llamada usuarioExiste. La misma devuelve un valor falso si el usuario no existe y el id del 
     *    usuario en el caso que la cuenta sea válida.
     * 4- Através de una estructura de desición se deberá, en el caso de que el usuario sea válido :
     *     a- Llamar a la función setUsuarioAutenticado (usuariosServices) pasandole como parámetro el valor true y el id del usuario. De esta forma dicha 
     *        función guardará estos datos en el sessionStorage del navegado, para poder ser consultados en el momento de la compra.
     *     b- Llamar a la función mostrarUsuario, pasandole como parámetro el texto del email de la cuenta.  
     * 5- En el caso de que el usuario no sea válido se deberá mostrar una alerta con el texto 'Email o contraseña incorrecto, intenta nuevamente'.
     */
    e.preventDefault();
    const usuarioId = await usuarioExiste();
    if (usuarioId) {
        // Si el usuario es válido
        setUsuarioAutenticado(true, usuarioId);
        mostrarUsuario(inputEmail.value);
    } else {
        // Si el usuario no es válido
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
    }
}

async function registrarUsuario(e) {
    // Cancels the default behavior of the event
    e.preventDefault();

    // Checks if the passwords match
    if (inputPassword.value === inputRepetirPass.value) {
        // Registers the new user in the REST-API
        await usuariosServices.crear(
            '', // apellido
            '', // nombre
            inputEmail.value, // correo
            inputPassword.value, // password
            '', // avatar
            '', // pais
            '', // ciudad
            '', // direccion
            ''  // telefono
        );

        // Shows a success alert
        mostrarMensaje('Email registrado');

        // Redirects to the login screen
        window.location.href = '#login';
    } else {
        // Shows an error alert
        mostrarMensaje('Las contraseñas ingresadas no son iguales');
    }
}
async function usuarioExiste() {
    // Get the list of users from the REST-API
    const usuarios = await usuariosServices.listar();

    // Loop through the list of users
    for (let usuario of usuarios) {
        // Compare the email and password entered by the user with those stored in the REST-API
        if (usuario.correo === inputEmail.value && usuario.password === inputPassword.value) {
            // If the email and password are valid, return the user ID
            return usuario.id;
        }
    }

    // If the email and password are not valid, return false
    return false;
}

export function mostrarUsuario(email) {
    // Capture the element with the class .btnLogin and assign the email text to it
    const btnLogin = document.querySelector('.btnLogin');
    btnLogin.textContent = email;

    // Capture the element with the class .btnRegister, assign the text "Logout" and set the href attribute to "#logout"
    const btnRegister = document.querySelector('.btnRegister');
    btnRegister.textContent = 'Logout';
    btnRegister.setAttribute('href', '#logout');
}

function mostrarMensaje(msj) {
    /**
     * Esta función muestra una alerta con el texto recibido en el parámetro msj.
     */
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    // Register the values in the sessionStorage
    sessionStorage.setItem('autenticado', booleano);
    sessionStorage.setItem('idUsuario', idUsuario);
}
export function getUsuarioAutenticado() {
    // Read the values stored in the sessionStorage
    const autenticado = sessionStorage.getItem('autenticado');
    const idUsuario = sessionStorage.getItem('idUsuario');
    const email = sessionStorage.getItem('email');

    // Construct an object with the values
    const usuario2 = {
        autenticado: autenticado === 'true', // Convert to boolean
        idUsuario: idUsuario,
        email: email
    };

    // Return the object
    return usuario2;
}
