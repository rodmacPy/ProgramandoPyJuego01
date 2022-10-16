//JavaScript Final
// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
    'Nuestro texto de prueba.',
    'Comenzando a Programar.',
    'Pepito esta estudiando',
    'Aprendiendo en ProgramandoPy.',
    'El auto rojo.',
    'Estoy jugando a la pelota.',
    'Me gusta mucho viajar.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElemento = document.getElementById('quote');
const typedValueElement = document.getElementById('texto-tipeado');
const mostrarPuntaje = document.getElementById('puntaje');
let variableDelPuntaje;



// en el final de nuestro archivo script.js
document.getElementById('inicio').addEventListener('click', () => {
    document.getElementById('inicio').disabled = true
    typedValueElement.disabled = false
    // elegimos el texto de ejemplo a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length);
    const texto = textos[textoIndice];
    // separamos el texto en un array de palabras
    palabras = texto.split(' ');
    // reestablemos el idice de palabras para el seguimiento
    palabraIndice = 0;
    // Vaciamos el elemento textbox
    typedValueElement.value = '';
    // Actualizamos la interfaz de usuario
    // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
    const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
    // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
    textoElemento.innerHTML = spanPalabras.join('');
    // Resaltamos la primer palabra
    textoElemento.childNodes[0].className = 'highlight';

    // Definimos el elemento textbox
    
    // Definimos el foco en el elemento
    typedValueElement.focus();
    // Establecemos el manejador de eventos
    // Iniciamos el contador de tiempo
    startTime = new Date().getTime();
    mostrarPuntaje.textContent = 'Score: ' + obtener();
    mostrarPuntaje.classList = 'puntaje color';
    
  });

  document.getElementById('cerrar').addEventListener('click', () => {
    document.querySelector('.model').style.display = 'none';
  });

document.addEventListener('DOMContentLoaded', () => {
  if(!localStorage.getItem('puntaje')){
    localStorage.setItem('puntaje', 0)
  }
});

function obtener() {
  return localStorage.getItem('puntaje')
}
function guardarPuntaje(){
  let puntos = parseInt(obtener());
  localStorage.setItem('puntaje', ++puntos);
}
  // al final de nuestro archivo script.js
typedValueElement.addEventListener('input', () => {
    // tomamos la palabra actual
    const palabraActual = palabras[palabraIndice];
    // tomamos el valor actual
    const typedValue = typedValueElement.value;
    
    if (typedValue === palabraActual && palabraIndice === palabras.length - 1) {
      typedValueElement.disabled = true
      document.getElementById('inicio').disabled = false
      document.querySelector('.model').style.display = "block";
      // fin de la sentencia
      // Definimos el mensaje de éxito
      const elapsedTime = new Date().getTime() - startTime;
      guardarPuntaje();
      mostrarPuntaje.textContent = 'Score: ' + obtener();
    } else if (typedValue.endsWith(' ') && typedValue.trim() === palabraActual) {
      // fin de la palabra
      // vaciamos el valor typedValueElement para la siguiente palabra
      typedValueElement.value = '';
      // movemos a la palabra siguiente
      palabraIndice++;
      // reiniciamos el estado de todas las clases para los textos
      for (const palabraElemento of textoElemento.childNodes) {
        palabraElemento.className = '';
      }
      // resaltamos la palabra actual
      textoElemento.childNodes[palabraIndice].className = 'highlight'; 

      
    } else if (palabraActual.startsWith(typedValue)) {
      // correcta actual
      // resaltar la siguiente palabra
      typedValueElement.className = '';
    } else {
      // estado error
      typedValueElement.className = 'error';
    }
  });


  
  