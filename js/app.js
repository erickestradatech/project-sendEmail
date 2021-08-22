// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');

const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Lo colacamos arriba para que pueda ser accedido por todos
// Scope global
const er =
   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
   // Cuando la app arranca
   document.addEventListener('DOMContentLoaded', iniciarApp);

   // Campos del formulario
   email.addEventListener('blur', validarFormulario);
   asunto.addEventListener('blur', validarFormulario);
   mensaje.addEventListener('blur', validarFormulario);

   // Enviar email
   //  submit -> Vamos a escuchar por el type="submit" que haya en el formulario
   formulario.addEventListener('submit', enviarEmail);

   // Reinicia el formulario
   btnReset.addEventListener('click', resetearFormulario);
}

// Funciones
function iniciarApp() {
   // Deshabilitamos la opcion de enviar en el boton
   btnEnviar.disabled = true;

   // Estilos para que el usuario sepa que esta deshabilitado desde el comienzo
   btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
   if (e.target.value.length > 0) {
      // Elimina el parrafo creado para mostrar el error
      const error = document.querySelector('p.error');

      if (error) {
         error.remove();
      }

      // En caso de que todo este bien
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-green-500');
   } else {
      // Si no hay nada
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');

      // Cuando validemos el formulario, mostrar en el HTML un mensaje
      mostrarError('Todos los campos son obligatorios');
   }

   if (e.target.type === 'email') {
      // Expresion regular para validar email extraida de una pagina
      // Scope -> er solamente lo puedo acceder si estoy dentro de este if
      //   const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // e.target.value -> sirve para ver lo que hay dentro cuando pasamos ocurre el evento blur
      // e.target.value hace referencia al campo actual
      if (er.test(e.target.value)) {
         const error = document.querySelector('p.error');

         if (error) {
            error.remove();
         }

         // Si pasamos la validacion de la expresion regular
         e.target.classList.remove('border', 'border-green-500');
         e.target.classList.add('border', 'border-green-500');
      } else {
         // Para el caso de que el email no se correcto, validado por la expresion regular
         e.target.classList.remove('border', 'border-green-500');
         e.target.classList.add('border', 'border-red-500');
         mostrarError('Email no válido');
      }
   }

   // email.value hace referencia a los valores que estan declarados en la parte superior
   if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
      // Habilitamos para que podamos enviar con el boton una vez pasado todas las validaciones
      btnEnviar.disabled = false;
      btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
   }
}

// Colocamos el parametro mensaje para personalizar el mensaje que esta en el parrafo de error
function mostrarError(mensaje) {
   // Creamos el parrafo de error
   const mensajeError = document.createElement('p');

   // Dentro de la etiqueta <p> </p> colocamos el texto
   mensajeError.textContent = mensaje;

   // Añadimos las clases de talwindcss a la etiqueta <p class="....">
   mensajeError.classList.add(
      'border',
      'border-red-500',
      'bg-red-100',
      'text-red-500',
      'p-3',
      'mt-5',
      'text-center',
      'error'
   );

   // Me devuelve un array con todos los elementos que tengan la clase "error"
   const errores = document.querySelectorAll('.error');

   // Se coloca errores.length === 0 porque todavia no hemos añadido la clase "error" con el appendChild, ya que primero evaluamos si tiene la clase "error", luego si no lo tiene recien colocamos el mensajeError con SU CLASE "error"
   if (errores.length === 0) {
      formulario.appendChild(mensajeError);
   }
}

// Enviar email
function enviarEmail(e) {
   e.preventDefault();

   // Mostrar el spinner
   const spinner = document.querySelector('#spinner');

   // Inicialmente el spinner estaba con un display = none
   // Le ponemos display = flex, para que se pueda visualizar, asimismo flex porque tiene un justify-content = center;
   spinner.style.display = 'flex';

   // Despues de 3 segundos ocultar el spinner y mostrar el mensaje
   setTimeout(() => {
      spinner.style.display = 'none';

      // Mensaje que dice que se envio correctamente
      const parrafo = document.createElement('p');
      parrafo.textContent = 'El mensaje se envió correctamente';
      parrafo.classList.add('text-center', 'my-10', 'p-5', 'bg-green-100', 'text-green-500');

      // Inserta el parrafo antes del spinner con el ide #spinner
      formulario.insertBefore(parrafo, spinner);

      setTimeout(() => {
         // Despues de 5 segundos se elimina el mensaje de exito
         parrafo.remove();

         // Despues de 5 segundos tambien reseteamos el formulario
         resetearFormulario();
      }, 5000);
   }, 3000);
}

// Función que resetea el formulario
function resetearFormulario() {
   // Resetea todos los campos del formulario
   formulario.reset();

   // Debido a que una ves que se resetea el formulario el boton de enviar aun queda habilitado, debemos volver a iniciarApp para que el boton quede deshabilitado.
   iniciarApp();

   // Eliminar el color de los boredes del input email, asunto y mensaje
   deleteColors();
}

// Funcion para eliminar el color de los bordes
function deleteColors() {
   email.classList.remove('border-green-500', 'border-red-500');
   asunto.classList.remove('border-green-500', 'border-red-500');
   mensaje.classList.remove('border-green-500', 'border-red-500');
}
