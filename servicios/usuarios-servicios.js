const url = "https://65418746f0b8287df1fe755a.mockapi.io/api/TpiLab3/usuarios";


async function listaUsuarios() {

    return await fetch(url)
        .then(respuesta => respuesta.json());
}

async function crearUsuario(apellido, nombre, correo, password, avatar) {

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
            avatar: avatar
        })
    })
}


export const usuariosServices = {
    listaUsuarios,
    crearUsuario
}