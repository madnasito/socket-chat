var socket = io();

if (!params.has("nombre") || !params.has('sala')) {
    window.location = "index.html"
    throw new Error("El nombre y la sala son necesarios")
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit("entrarChat", usuario, (resp) => {

        // console.log("Usuarios conectados ", resp);
        rendirizarUsuarios(resp)

    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    renderizarMensajes(mensaje, false)
    scrollBottom()

});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat
socket.on("listaPersona", (personas) => {

    rendirizarUsuarios(personas)

})

//Mensajes privados
socket.on("mensajePrivado", (mensaje) => {

    console.log("Mensaje privado", mensaje);

})