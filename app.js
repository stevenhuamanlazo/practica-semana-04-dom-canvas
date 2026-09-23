// Práctica Semana 04 - Mini Sistema Solar (IS093A)
// IA (Claude): esqueleto de la IIFE y cuerpos de alternarPausa, fijarVelocidad
// y fijarNombre, además del comentario del closure. El resto lo escribo yo.

(() => {
  'use strict';

  // Estado privado: solo es accesible desde esta IIFE.
  const estado = {
    anguloTierra: 0,
    anguloMarte: 0,
    velocidad: 3,
    nombre: 'Tierra',
    pausado: false
  };

  // Métodos que "recuerdan" el estado por closure.
  const alternarPausa = () => {
    estado.pausado = !estado.pausado;
    return estado.pausado;
  };

  const fijarVelocidad = (valor) => {
    estado.velocidad = Number(valor);
  };

  const fijarNombre = (texto) => {
    estado.nombre = texto.trim();
  };

  // CLOSURE: el objeto `estado` y las funciones de arriba se crean dentro de
    // IA (Claude): esqueleto de selectores y listeners. Validación y lógica: mía.
  const btnToggle = document.querySelector('#btn-toggle');
  const inpVelocidad = document.querySelector('#inp-velocidad');
  const inpNombre = document.querySelector('#inp-nombre');
  const btnTema = document.querySelector('#btn-tema');
  const msgError = document.querySelector('#msg-error');
  const spanEstado = document.querySelector('#estado');

  const mostrarError = (texto) => {
    // TODO: poner el texto en msgError y quitar la clase 'oculto'
  };

  const ocultarError = () => {
    // TODO: agregar la clase 'oculto'
  };

  btnToggle.addEventListener('click', () => {
    // TODO: alternarPausa(), cambiar texto del botón,
    // classList.toggle('pausado') y actualizar spanEstado
  });

  inpVelocidad.addEventListener('input', (e) => {
    // TODO: validar número entre 1 y 10; si falla mostrarError y salir
  });

  inpNombre.addEventListener('input', (e) => {
    // TODO: validar con trim() que no esté vacío; si falla mostrarError
  });

  btnTema.addEventListener('click', () => {
    // TODO: document.body.classList.toggle('tema-claro')
  });
  // porque las funciones (y más adelante el bucle de animación) todavía las
  // referencian. Por eso, en cada frame, `estado` conserva los ángulos, la
  // velocidad y el nombre del frame anterior. Como no está en el scope global,
  // ningún otro script puede modificarlo por accidente.
})();