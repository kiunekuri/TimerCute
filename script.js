let tiempoRestante = 25 * 60; // 1500 segundos (25 minutos)
const tiempoInicial = 25 * 60; // Para reiniciar a 25 minutos
let tiempoDeInicio;
let intervalo;

const countdownElement = document.getElementById('countdown');
const kawaiiSong1 = document.getElementById('kawaiiSong1');
const kawaiiSong2 = document.getElementById('kawaiiSong2');
const kawaiiSong3 = document.getElementById('kawaiiSong3');
const kawaiiSong4 = document.getElementById('kawaiiSong4');

// Ajustamos los volúmenes (falta volumen para la cuarta canción)
kawaiiSong1.volume = 0.5;
kawaiiSong2.volume = 0.1;
kawaiiSong3.volume = 0.7;
kawaiiSong4.volume = 0.6; // Ajusta el volumen para la cuarta canción

const restartBtn = document.getElementById('restartBtn');

function actualizarTemporizador() {
    const tiempoActual = new Date();
    const tiempoTranscurrido = Math.floor((tiempoActual - tiempoDeInicio) / 1000);
    const tiempoRestanteActual = tiempoRestante - tiempoTranscurrido;

    if (tiempoRestanteActual >= 0) {
        const minutos = Math.floor(tiempoRestanteActual / 60);
        const segundos = tiempoRestanteActual % 60;
        countdownElement.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    } else {
        clearInterval(intervalo);
        reproducirCancionAleatoria();
    }
}

function reproducirCancionAleatoria() {
    const canciones = [kawaiiSong1, kawaiiSong2, kawaiiSong3, kawaiiSong4];
    const cancionAleatoria = canciones[Math.floor(Math.random() * canciones.length)];

    // Pausamos todas las canciones antes de reproducir la aleatoria
    kawaiiSong1.pause();
    kawaiiSong1.currentTime = 0;
    kawaiiSong2.pause();
    kawaiiSong2.currentTime = 0;
    kawaiiSong3.pause();
    kawaiiSong3.currentTime = 0;
    kawaiiSong4.pause();
    kawaiiSong4.currentTime = 0;

    // Reproducimos la canción aleatoria
    cancionAleatoria.play();
}

function iniciarTemporizador() {
    tiempoDeInicio = new Date();
    intervalo = setInterval(actualizarTemporizador, 1000);
}

function reiniciarTemporizador() {
    clearInterval(intervalo);
    tiempoRestante = tiempoInicial;
    countdownElement.textContent = "25:00";
    
    // Pausamos todas las canciones
    kawaiiSong1.pause();
    kawaiiSong1.currentTime = 0;
    kawaiiSong2.pause();
    kawaiiSong2.currentTime = 0;
    kawaiiSong3.pause();
    kawaiiSong3.currentTime = 0;
    kawaiiSong4.pause();
    kawaiiSong4.currentTime = 0;
    
    iniciarTemporizador();
}

iniciarTemporizador();

restartBtn.addEventListener('click', reiniciarTemporizador);

// Función para agregar un nuevo cliente a la tabla
const clienteForm = document.getElementById('clienteForm');
const clientesTabla = document.getElementById('clientesTabla').querySelector('tbody');

clienteForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const ultimaCompra = document.getElementById('ultimaCompra').value;

    const nuevaFila = document.createElement('tr');

    const nombreCelda = document.createElement('td');
    nombreCelda.textContent = nombre;

    // Convertimos la fecha a un formato con mes en letras
    const fecha = new Date(ultimaCompra); // Cambié "ultimacompra" a "ultimaCompra"
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);

    const ultimaCompraCelda = document.createElement('td');
    ultimaCompraCelda.textContent = fechaFormateada;

    // Añadir botón de eliminar
    const eliminarCelda = document.createElement('td');
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.classList.add('eliminar-btn');
    eliminarBtn.addEventListener('click', function() {
        clientesTabla.removeChild(nuevaFila);
    });

    eliminarCelda.appendChild(eliminarBtn);

    nuevaFila.appendChild(nombreCelda);
    nuevaFila.appendChild(ultimaCompraCelda);
    nuevaFila.appendChild(eliminarCelda);

    clientesTabla.appendChild(nuevaFila);

    clienteForm.reset();
});
