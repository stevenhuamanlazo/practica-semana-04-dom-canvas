# Práctica Semana 04 - Simulador Orbital Interactivo (Mini Sistema Solar)

Proyecto desarrollado para la asignatura **Desarrollo de Aplicaciones Web (IS093A)** - Universidad Nacional del Centro del Perú.

## 📌 Descripción del Proyecto
Aplicación web interactiva que simula la mecánica orbital de un sistema planetario haciendo uso de **Vanilla JS**, **DOM API** y **Canvas API**. Implementa patrones de programación avanzada como funciones autoinvocadas (IIFE) y closures para la gestión de estado encapsulado, además de un loop de renderizado optimizado mediante `requestAnimationFrame` y delta time ($dt$).

---

## 🛠️ Tecnologías y Conceptos Aplicados

- **HTML5 Semántico & CSS3 Custom Properties**: Interfaz oscura espacial basada en Glassmorphism, temas neón y diseño de tarjetas independientes por cada paso.
- **Vanilla JavaScript (ES6+)**: Sin librerías ni frameworks externos.
- **IIFE & Closures**: Encapsulamiento del estado de la simulación (ángulos, velocidad, contador de órbitas e impulsos) sin contaminar el scope global.
- **DOM API & Event Handling**: Manipulación dinámica de clases (`classList.toggle`) y vinculación de eventos interactivos.
- **Canvas API & Render Loop**: Dibujo 2D (sol, órbitas, planetas con atmósferas y sombras) sincronizado a la tasa de refresco mediante `requestAnimationFrame` y delta time.
- **Profiling de Rendimiento**: Monitoreo en vivo de FPS, uso de memoria JS Heap y detección de Memory Leaks.

---

## 📊 Métricas de Rendimiento (DevTools Performance & Memory)

Valores registrados mediante Google Chrome DevTools durante la ejecución de la animación:

| Métrica | Valor Registrado | Notas / Observaciones |
| :--- | :--- | :--- |
| **FPS promedio (Performance)** | **60 - 144 FPS** | Tasa de refresco fluida y estable gracias al uso de `requestAnimationFrame`. |
| **Long Tasks detectadas** | **0** | No se registraron bloqueos del hilo principal (*main thread*) superiores a 50 ms. |
| **Heap inicial** | **~8.5 MB** | Consumo de memoria tras la carga e inicialización del lienzo Canvas. |
| **Heap final** | **~12.4 MB** | Estado estable tras 60 segundos de renderizado continuo. |
| **Detached DOM nodes** | **0** | No hay fugas de memoria por nodos DOM huérfanos sin referencias. |

---

## 🤖 Declaración de Uso de Herramientas de IA

Siguiendo las reglas de la guía práctica (lógica y desarrollo propio ≥ 70%):

1. **Paso 1 (Setup Base)**: Estructura HTML, variables de CSS y plantilla inicial del `README.md`.
2. **Paso 2 (IIFE & Closures)**: Guía conceptual para estructurar la encapsulación del objeto `state`.
3. **Paso 3 & 4 (DOM y Canvas API)**: Sugerencias de optimización para el cálculo de posiciones trigonométricas con delta time ($dt$).
4. **Paso 5 (Profiling)**: Interpretación técnica de las métricas registradas en las pestañas *Performance* y *Memory* de DevTools.

---
## 🚀 Despliegue y Enlaces

- **Repositorio en GitHub**: [practica-semana-04-dom-canvas](https://github.com/stevenhuamanlazo/practica-semana-04-dom-canvas)
- **Proyecto en Vivo (GitHub Pages)**: [Ver Aplicación en Vivo](https://stevenhuamanlazo.github.io/practica-semana-04-dom-canvas/)