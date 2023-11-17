import { usuariosServices } from "../../../servicios/usuarios-servicios.js";

const htmlLogin=
`<div class="contenedorLogin">
    <div class="cajaLogin">
        <p >Iniciar sesión</p>

        <form  class="formLogin" >

            <div class="input-group">
                
                <input type="email" class="form-control" id="loginEmail" placeholder="Email" name="loginEmail" autocomplete required>
                
            </div>

            <div class="input-group">
                
                <input type="password" class="form-control" id="loginPassword" placeholder="Password" name="loginPassword" autocomplete required>
            
            </div>

            <div class="input-group">
                
                <input type="password" class="form-control" id="reLoginPassword" placeholder="Repetir Password" name="reLoginPassword"  required>
            
            </div>
                        
            <div class="row">
                                
                <div class="col-4">
                <button type="submit"  id="iniciar-sesion" class="btnAmarillo">Login</button>
                </div>
                    
            </div>
        </form>
            
    </div>
</div>
`;
var formulario;
var inputEmail;
var inputPassword;
var inputRepetirPass;

async function  ingresar(e){
    e.preventDefault();
    let idUsuario = await usuarioExiste();
    if (idUsuario) {
        setUsuarioAutenticado(true, idUsuario); 
        mostrarUsuario(idUsuario);
        window.location.href = "#" ;

    }else{
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
    }

}

async function  registrarUsuario(e){
    e.preventDefault();
 
    if( inputPassword.value === inputRepetirPass.value) {
       await usuariosServices.crear(null, null, inputEmail.value, inputPassword.value);
       mostrarMensaje('Email registrado.') 
       window.location.href = "#login" ; 
    }else{
        mostrarMensaje('Las contraseñas no son iguales');
    }
    
}


export async function login(){
    crearFormulario();
    formulario.addEventListener("submit", ingresar);
}  

export async function register(){
    crearFormulario(true);

    formulario.addEventListener("submit", registrarUsuario);
}  



function crearFormulario(registrar){
    let d = document;
    let seccionLogin = d.querySelector(".seccionLogin");
    let carrusel = d.querySelector(".carrusel");
    carrusel.innerHTML = '';
    let seccionProductos = d.querySelector(".seccionProductos");
    seccionProductos.innerHTML = '';
    let vistaProducto = d.querySelector(".vistaProducto");
    vistaProducto.innerHTML = '';
    
    seccionLogin.innerHTML = htmlLogin;
    inputEmail= d.getElementById("loginEmail");
    inputPassword= d.getElementById("loginPassword");
    inputRepetirPass = d.getElementById("reLoginPassword");
    if (! registrar ){        
        inputRepetirPass.outerHTML = "";
    }else{
        
        inputRepetirPass.style.display ="block";
        d.querySelector(".cajaLogin p").innerHTML = "Registar usuario"
    }
    
    formulario = seccionLogin.querySelector(".formLogin");
} 


function mostrarUsuario(idUsuario){
    let d=document;
    let btnLogin =d.querySelector(".btnLogin");
    let btnLogout =d.querySelector(".btnRegister");
    btnLogin.setAttribute("data-emailUsuario", inputEmail.value);
    btnLogin.setAttribute("data-idUsuario", idUsuario);
    btnLogin.textContent = inputEmail.value;
    btnLogout.textContent = "Logout";
    btnLogout.setAttribute("href", "#logout");

}


async function usuarioExiste() {

    let existeUsuario;
    let idUsuario;
    
    await usuariosServices.listar( )
        .then(respuesta => {
            respuesta.forEach(usuario => {
                
                if (usuario.correo === inputEmail.value && usuario.password === inputPassword.value) {
                    idUsuario = usuario.id;
                    return existeUsuario = true;
                } else {
                    return;
                }
            });
        })
        .catch(error => console.log(error));

    if (!existeUsuario) {
       return false;
    } else {
       return idUsuario; 
       
    }
}


function mostrarMensaje(msj) {
    alert(msj);
}

export function setUsuarioAutenticado(booleano, idUsuario) {
    let email="";
    if (inputEmail)
       email = inputEmail.value
    sessionStorage.setItem('autenticado', booleano);
    sessionStorage.setItem('idUsuario', idUsuario);
    sessionStorage.setItem('email', email);


}
export function getUsuarioAutenticado() {
    var session  = new Object();
    session.autenticado = sessionStorage.getItem('autenticado') === "true";
    session.idUsuario = sessionStorage.getItem('idUsuario')
    session.email = sessionStorage.getItem('email');
    return session;
       
}
