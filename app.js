/**
 * PASO 2: Patrón IIFE (Immediately Invoked Function Expression)
 * Encapsula el estado orbital y la lógica de renderizado.
 */
const OrbitEngine = (() => {
  /**
   * CLOSURE SCOPE:
   * Las variables privadas se mantienen vivas en la memoria gracias a los
   * métodos que retornamos hacia afuera (referencia léxica persistente).
   */
  let state = {
    angle: 0,
    speedFactor: 0.03,
    isAnimating: true,
    astroName: "MIGUEL",
    orbitsCompleted: 0,
    impulses: 0,
    statusText: "Estable",
    lastTime: performance.now(),
    frameCount: 0,
    fps: 60,
    satellites: [
      { radius: 70, speedMultiplier: 1, size: 10, color: "#ef4444", selfRotation: 0, hasRings: true },
      { radius: 45, speedMultiplier: 1.7, size: 7, color: "#38bdf8", selfRotation: 0, hasRings: false }
    ],
    stars: [],
    leakMemoryArray: []
  };

  // Generación de fondo espacial de estrellas
  const initStars = () => {
    state.stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * 480,
      y: Math.random() * 220,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));
  };

  const drawStarfield = (ctx, width, height) => {
    ctx.fillStyle = "#010409";
    ctx.fillRect(0, 0, width, height);

    state.stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Sol con efecto resplandor pulsante
  const drawSun = (ctx, cx, cy, time) => {
    const pulse = Math.sin(time * 0.003) * 2.5;
    const sunRadius = 18 + pulse;

    // Resplandor radial exterior
    const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, sunRadius + 22);
    glowGrad.addColorStop(0, "rgba(251, 191, 36, 0.7)");
    glowGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.2)");
    glowGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius + 22, 0, Math.PI * 2);
    ctx.fill();

    // Núcleo solar brillante
    const sunGrad = ctx.createRadialGradient(cx - 5, cy - 5, 2, cx, cy, sunRadius);
    sunGrad.addColorStop(0, "#fffbeb");
    sunGrad.addColorStop(0.4, "#fde047");
    sunGrad.addColorStop(0.8, "#f59e0b");
    sunGrad.addColorStop(1, "#b45309");

    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  // Planeta realista en 3D con atmósfera
  const drawRealisticPlanet = (ctx, x, y, radius, baseColor, name, selfRotation, hasRings) => {
    ctx.save();

    // Anillos planetarios
    if (hasRings) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, 0.35);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 2.1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(217, 119, 6, 0.6)";
      ctx.lineWidth = 3.5;
      ctx.stroke();
      ctx.restore();
    }

    // Esfera planetaria con luz radial
    const grad = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.35, radius * 0.1, x, y, radius);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.25, baseColor);
    grad.addColorStop(0.8, "#0f172a");
    grad.addColorStop(1, "#020617");

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Etiqueta del nombre
    if (name) {
      ctx.fillStyle = "#f8fafc";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(name, x, y - radius - 8);
    }

    ctx.restore();
  };

  // Dibujo Paso 1
  const drawStep1Canvas = (time) => {
    const canvas = document.getElementById("orbitCanvasStep1");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 68;

    drawStarfield(ctx, canvas.width, canvas.height);
    drawSun(ctx, cx, cy, time);

    // Órbita
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    const px = cx + Math.cos(state.angle) * r;
    const py = cy + Math.sin(state.angle) * r;
    drawRealisticPlanet(ctx, px, py, 12, "#10b981", state.astroName, state.angle * 2, false);
  };

  // Dibujo Paso 4
  const drawStep4Canvas = (time) => {
    const canvas = document.getElementById("orbitCanvasStep4");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    drawStarfield(ctx, canvas.width, canvas.height);
    drawSun(ctx, cx, cy, time);

    state.satellites.forEach((sat) => {
      sat.selfRotation += 0.02;

      ctx.beginPath();
      ctx.arc(cx, cy, sat.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.stroke();

      const sx = cx + Math.cos(state.angle * sat.speedMultiplier) * sat.radius;
      const sy = cy + Math.sin(state.angle * sat.speedMultiplier) * sat.radius;

      drawRealisticPlanet(ctx, sx, sy, sat.size, sat.color, null, sat.selfRotation, sat.hasRings);
    });
  };

  // Main Render Loop con Delta Time (dt)
  const mainLoop = (currentTime) => {
    const dt = (currentTime - state.lastTime) / 1000 || 0;
    
    // Cálculo de FPS dinámicos
    state.frameCount++;
    if (currentTime - state.lastTime >= 1000) {
      state.fps = state.frameCount;
      state.frameCount = 0;
      const fpsElem = document.getElementById("fpsVal");
      if (fpsElem) fpsElem.textContent = state.fps;

      // Lectura de memoria Heap si está disponible
      if (window.performance && window.performance.memory) {
        const memMB = (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
        const memElem = document.getElementById("memVal");
        if (memElem) memElem.textContent = memMB;
      }
    }
    state.lastTime = currentTime;

    if (state.isAnimating) {
      const previousAngle = state.angle;
      state.angle += state.speedFactor * dt * 60;

      if (Math.floor(state.angle / (Math.PI * 2)) > Math.floor(previousAngle / (Math.PI * 2))) {
        state.orbitsCompleted++;
        const counterElem = document.getElementById("counterOrbits");
        if (counterElem) counterElem.textContent = state.orbitsCompleted;
      }
    }

    drawStep1Canvas(currentTime);
    drawStep4Canvas(currentTime);

    requestAnimationFrame(mainLoop);
  };

  return {
    init: () => {
      initStars();
      state.lastTime = performance.now();
      requestAnimationFrame(mainLoop);
      OrbitEngine.generateFPSBars();
    },

    // Handlers
    setName: (val) => { state.astroName = val || "MIGUEL"; },
    setSpeed: (val) => { state.speedFactor = (parseInt(val) / 10) * 0.05; },
    togglePlay: (play) => { state.isAnimating = play; },
    resetPaso1: () => { state.angle = 0; },

    applyBoost: () => {
      state.impulses++;
      state.speedFactor += 0.01;
      state.statusText = "Acelerado";
      document.getElementById("counterClicks").textContent = state.impulses;
      document.getElementById("lastActionText").textContent = state.statusText;
    },

    addSatellite: () => {
      const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
      state.satellites.push({
        radius: Math.random() * 55 + 35,
        speedMultiplier: Math.random() * 2 + 0.5,
        size: Math.random() * 5 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        selfRotation: 0,
        hasRings: Math.random() > 0.5
      });
    },

    simulateMemoryLeak: () => {
      for (let i = 0; i < 50000; i++) {
        state.leakMemoryArray.push({ id: i, payload: new Array(100).fill("orbit_leak") });
      }
      document.getElementById("leaksVal").textContent = state.leakMemoryArray.length > 0 ? "1" : "0";
      OrbitEngine.logConsole("ADVERTENCIA: Fuga de memoria simulada (+50,000 referencias creadas)");
    },

    cleanMemory: () => {
      state.leakMemoryArray = [];
      document.getElementById("leaksVal").textContent = "0";
      OrbitEngine.logConsole("Limpieza realizada. Memoria Heap liberada.");
    },

    logConsole: (msg) => {
      const consoleBox = document.getElementById("consoleLogs");
      if (!consoleBox) return;
      const time = new Date().toLocaleTimeString();
      consoleBox.innerHTML += `<p>[${time}] ${msg}</p>`;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    },

    generateFPSBars: () => {
      const chart = document.getElementById("fpsBarChart");
      if (!chart) return;
      chart.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${Math.floor(Math.random() * 30 + 70)}%`;
        chart.appendChild(bar);
      }
    }
  };
})();

// DOM Events Setup
document.addEventListener("DOMContentLoaded", () => {
  OrbitEngine.init();

  /* ==========================================================================
     INTERACTIVIDAD DE TABS DE NAVEGACIÓN (SOMBREADO DINÁMICO)
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.step-card');

  // 1. Cambiar sombreado al hacer clic en los botones
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 2. Cambiar sombreado automáticamente al hacer scroll por la página
  window.addEventListener('scroll', () => {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('href') === `#${currentSection}`) {
        btn.classList.add('active');
      }
    });
  });

  // --- Resto de tus event listeners (Paso 1, Paso 2, Paso 3, etc.) ---
  document.getElementById("btnPlay").addEventListener("click", () => OrbitEngine.togglePlay(true));
  document.getElementById("btnPause").addEventListener("click", () => OrbitEngine.togglePlay(false));
  document.getElementById("btnReset").addEventListener("click", () => OrbitEngine.resetPaso1());
  document.getElementById("inputName").addEventListener("input", (e) => OrbitEngine.setName(e.target.value));
  document.getElementById("rangeSpeed").addEventListener("input", (e) => {
    document.getElementById("speedDisplay").textContent = e.target.value;
    OrbitEngine.setSpeed(e.target.value);
  });

  document.getElementById("btnBoostClosure").addEventListener("click", () => OrbitEngine.applyBoost());

  const planetBox = document.getElementById("planetDemoBox");
  document.getElementById("btnToggleTheme").addEventListener("click", () => planetBox.classList.toggle("neon-mode"));
  document.getElementById("btnPulseOrbit").addEventListener("click", () => planetBox.classList.toggle("pulse"));
  document.getElementById("btnResetPlanet").addEventListener("click", () => planetBox.className = "demo-box planet-mode");

  document.getElementById("btnStartAnim").addEventListener("click", () => OrbitEngine.togglePlay(true));
  document.getElementById("btnStopAnim").addEventListener("click", () => OrbitEngine.togglePlay(false));
  document.getElementById("btnAddSatellite").addEventListener("click", () => OrbitEngine.addSatellite());

  document.getElementById("btnSimulateLeak").addEventListener("click", () => OrbitEngine.simulateMemoryLeak());
  document.getElementById("btnCleanMem").addEventListener("click", () => OrbitEngine.cleanMemory());
  document.getElementById("btnAnalyze").addEventListener("click", () => {
    OrbitEngine.logConsole("Análisis de Rendimiento y Profiling iniciado...");
  });
});