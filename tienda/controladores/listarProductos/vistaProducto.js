/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto(){
    // 1. Capturar los elementos HTML y blanquear su contenido
    const carrusel = document.querySelector(".carrusel");
    const seccionProducto = document.querySelector(".seccionProducto");
    const seccionLogin = document.querySelector(".seccionLogin");
    const vistaProducto = document.querySelector(".vistaProducto");

    carrusel.innerHTML = '';
    seccionProducto.innerHTML = '';
    seccionLogin.innerHTML = '';
    
    // 2. Capturar el elemento .vistaProducto
    vistaProducto.innerHTML = '';
    
    // 3. Recuperar el idProducto desde la URL
    const idProducto = leerParametro();
    if (!idProducto) {
        vistaProducto.innerHTML = "<p>Error: No se encontró el producto.</p>";
        return;
    }
    
    try {
        // 4. Leer los datos del producto desde la API
        const producto = await productosServices.listar(idProducto);
        if (!producto) {
            vistaProducto.innerHTML = "<p>Error: Producto no encontrado.</p>";
            return;
        }

        // 5. Generar el HTML con htmlVistaProducto
        const productoHTML = htmlVistaProducto(
            producto.id,
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.foto
        );

        // 6. Asignar el HTML generado al elemento .vistaProducto
        vistaProducto.innerHTML = productoHTML;

        // 7. Capturar el elemento btnComprar y enlazar el evento click a registrarCompra
        const btnComprar = document.querySelector("#btnComprar");
        btnComprar.addEventListener("click", registrarCompra);
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        vistaProducto.innerHTML = "<p>Error al cargar el producto.</p>";
    }
}

function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
     *  
     *  ejemplo
     *   let titulo = 'Señora';  
     *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
     *   
    */
    return `
    <div class="producto-detalle">
        <img src="${imagen}" alt="Imagen del producto ${nombre}" class="producto-imagen">
        <h2 id="nameProducto">${nombre}</h2>
        <p>${descripcion}</p>
        <p><strong>Precio:</strong> $${precio}</p>
        <button id="btnComprar" data-idproducto="${id}">Comprar</button>
    </div>
`;
    
}
function leerParametro(){
    // Captura el idProducto de la dirección URL enviada por la página que llama
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get("idProducto");
    return idProducto ? idProducto.trim() : null;
}


function registrarCompra(){
    /**1-Esta función es la encargada de procesar el evento click del anchor btnComprar.
     * 2-Luego deberá recuperar con la función getUsuarioAutenticado presente en el módulo login.js el objeto session
     * 3-Si la propiedad autenticado del objeto session es falso, el usuario no ha iniciado sesión, y se deberá emitir 
     *   una alerta que comunique al usuario que antes de realizar una compra debe haber iniciado sesión y salir de la 
     * ejecución de la función.
     * 4-Si la propiedad autenticado es true la ejecución continua.
     * 5-En este punto se deben almacenar los datos necesario para registrar la venta.
     * 5-Necesitamos idUsuario, emailUsuario, idProducto, nameProducto, cantidad y fecha.
     * 6-Los dos primeros los extraemos del objeto session.
     * 7-El resto de los datos los capturamos desde el objeto document utilizando los id: nameProducto, cantidadProducto. 
     *   El idProducto lo recuperamos desde el atributo data-idproducto y a fecha la obtenemos desde la fecha del sistema con
     *   el objeto Date() de javascript.
     * 8-Una vez reunido todos los datos necesarios llamamos a la función ventasServices.crear pasando lo parámetros obtenidos. 
     * 9-Luego de registrar la venta utilizando el objeto location.replace("tienda.html") renderizamos nuevamente la página 
     *   dejando el sitio en el estado inicial.
     * 10-Finalmente emitimos una alerta con la leyenda "Compra finalizada."
     *     
     */
    // 1. Recuperar los datos del usuario autenticado
    const usuario = getUsuarioAutenticado();
    if (!usuario.autenticado) {
        alert("Debe iniciar sesión antes de realizar una compra.");
        return;
    }

    // 2. Capturar los datos necesarios del producto y la compra
    const idUsuario = usuario.idUsuario;
    const emailUsuario = usuario.email;
    const idProducto = document.querySelector("#btnComprar").getAttribute("data-idproducto");
    const nameProducto = document.querySelector("#nameProducto").textContent;
    const cantidad = 1; // Asumimos cantidad fija para esta implementación
    const fecha = new Date().toISOString();
    const despachado = false;

    // 3. Registrar la venta en la API
    ventasServices.crear(idUsuario, emailUsuario, idProducto, nameProducto, cantidad, fecha, despachado)
        .then(() => {
            // 4. Redirigir al usuario a la tienda y mostrar un mensaje de éxito
            alert("Compra finalizada.");
            location.replace("tienda.html");
        })
        .catch(error => {
            console.error("Error al registrar la compra:", error);
            alert("Hubo un error al procesar la compra. Inténtelo nuevamente.");
        });
    
}