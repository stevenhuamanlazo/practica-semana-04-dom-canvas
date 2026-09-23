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
  // la IIFE. Cuando la IIFE termina de ejecutarse, esas variables no se borran
  // porque las funciones (y más adelante el bucle de animación) todavía las
  // referencian. Por eso, en cada frame, `estado` conserva los ángulos, la
  // velocidad y el nombre del frame anterior. Como no está en el scope global,
  // ningún otro script puede modificarlo por accidente.
})();