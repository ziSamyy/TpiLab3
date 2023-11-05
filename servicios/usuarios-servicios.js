const url = "https://65418746f0b8287df1fe755a.mockapi.io/api/TpiLab3/usuarios";


async function listaUsuarios(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crearUsuario(apellido, nombre, correo, password, avatar, pais, ciudad, direccion, telefono) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apellido: apellido,
            nombre: nombre,
            correo: correo,
            password: password,
            avatar: avatar,
            pais: pais,
            ciudad: ciudad,
            direccion: direccion,
            telefono:  telefono
        })
    })
}

async function editarUsuario(id, apellido, nombre, correo, password, avatar, pais, ciudad, direccion, telefono) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            apellido: apellido,
            nombre: nombre,
            correo: correo,
            password: password,
            avatar: avatar,
            pais: pais,
            ciudad: ciudad,
            direccion: direccion,
            telefono:  telefono
        })
    })
}

async function borrarUsuario(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}

export const usuariosServices = {
    listaUsuarios,
    crearUsuario,
    editarUsuario,
    borrarUsuario
}