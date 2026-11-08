/* ==========================================================================
   OBEMSTAR · CONTENIDO DE LA WEB
   --------------------------------------------------------------------------
   Este es EL archivo que vas a tocar el 95 % de las veces.
   Aquí están tus enlaces, tu correo, tus juegos, modelos e impresiones.
   No hace falta saber programar: copia un bloque { ... }, pégalo debajo
   y cambia los textos. Mira GUIA.md, apartado "Añadir contenido".

   Reglas rápidas:
   - Los textos van entre comillas: "así".
   - Cada bloque { ... } termina en coma si hay otro detrás.
   - Las imágenes van en la carpeta assets/img/ y se escriben así:
       imagen: "assets/img/mi-imagen.jpg"
   - Si dejas un enlace vacío (url: ""), la web lo muestra como PENDIENTE.
   - ejemplo: true  -> la tarjeta sale marcada como DATOS DE EJEMPLO.
     Bórralo (o pon false) cuando sea contenido real.
   ========================================================================== */

window.OBEMSTAR = {

  /* ---------- Datos generales ---------- */
  config: {
    marca: "OBEMSTAR",
    // Correo de contacto de OBEMSTAR (aparece en el pie y en Transmit).
    email: "obemstar.studio@gmail.com",
    // Formulario de contacto (Transmit): pega aquí tu clave de web3forms.com
    // y cada mensaje te llegará como un correo normal a la dirección de esa clave.
    // La clave puede ser pública sin problema. Vacía = abre el programa de correo del visitante.
    web3formsKey: "",
    respuestaEstimada: "48 H",

    // Panel "ESTADO DEL SISTEMA" de la portada
    proyectoActivo: "Fallen Star Horizon",
    aceptandoEncargos: true,   // true = sí, false = no
    impresora: "LIBRE",        // "LIBRE", "OCUPADA", "MANTENIMIENTO"...

    // Redes sociales (deja url vacía para ocultarla)
    redes: [
      { nombre: "Instagram", url: "" },
      { nombre: "YouTube",   url: "" },
      { nombre: "X",         url: "" },
      { nombre: "TikTok",    url: "" }
    ]
  },

  /* ---------- 05 · UPLINK: tus tiendas ---------- */
  tiendas: [
    {
      nombre: "Steam",
      division: "Interactive Division",
      descripcion: "Mis juegos publicados y los que puedes añadir a tu lista de deseados.",
      url: ""   // ← pega aquí el enlace a tu página de desarrollador en Steam
    },
    {
      nombre: "Etsy",
      division: "Industries",
      descripcion: "Figuras, piezas impresas en 3D y productos de la Fabrication Unit.",
      url: ""   // ← enlace a tu tienda de Etsy
    },
    {
      nombre: "Sketchfab",
      division: "Núcleo 3D",
      descripcion: "Modelos 3D listos para usar en tus proyectos, juegos o impresiones.",
      url: ""   // ← enlace a tu perfil/tienda de Sketchfab
    }
    // Para añadir otra tienda (itch.io, Patreon, Ko-fi, Cults3D...),
    // copia uno de los bloques de arriba, pon una coma y pégalo aquí.
  ],

  /* ---------- 02 · INTERACTIVE DIVISION: juegos ---------- */
  juegos: [
    {
      titulo: "Fallen Star Horizon",
      estado: "EN DESARROLLO",          // PROTOTIPO · EN DESARROLLO · PUBLICADO
      genero: "FPS · Sci-fi retro",
      fecha: "2026-11-03",
      imagen: "assets/img/fallen-star-horizon.jpg",
      descripcion: "Shooter en primera persona ambientado en el universo de Fallen Star Horizon: pasillos industriales, enemigos en oleadas y la sombra de Atherum Corporation detrás de cada máquina.",
      enlaces: [
        { texto: "Lista de deseados en Steam", url: "" }
      ]
    }
  ],

  /* Laboratorio de prototipos: GIFs o vídeos cortos (.mp4 / .webm) */
  prototipos: [
    {
      titulo: "Prototipo de ejemplo",
      fecha: "2026-11-07",
      descripcion: "Aquí irá un clip corto de una mecánica, una prueba o un fallo curioso. Sube el vídeo a assets/img/ y escribe su ruta en video.",
      video: "",     // ej.: "assets/img/prototipo-oleadas.mp4"
      imagen: "",
      ejemplo: true
    }
  ],

  /* Devlog: entradas cortas, la más nueva arriba */
  devlog: [
    {
      fecha: "2026-11-07",
      titulo: "Terminal OBEMSTAR en línea",
      texto: "Arranca la web de la compañía. A partir de aquí, cada avance de la Interactive Division quedará registrado en esta bitácora."
    }
  ],

  /* ---------- 03 · 3D MODELING ---------- */
  // tipo: "personajes", "props", "entornos" o "hard-surface"
  modelos: [
    {
      titulo: "Modelo de ejemplo",
      tipo: "props",
      fecha: "2026-11-07",
      imagen: "",          // render: "assets/img/mi-modelo.jpg"
      modelo: "",          // archivo .glb para el visor 3D: "assets/img/mi-modelo.glb"
      poligonos: "—",
      texturas: "—",
      software: "—",
      riggeado: "No",
      enlace: "",          // enlace a Sketchfab para comprarlo
      ejemplo: true
    }
  ],

  /* ---------- 04 · INDUSTRIES: impresión 3D ---------- */
  // categoria: "friki" o "funcional"
  impresiones: [
    {
      titulo: "Impresión de ejemplo",
      categoria: "friki",
      fecha: "2026-11-07",
      material: "—",
      render: "",          // imagen del modelo 3D (para el comparador)
      foto: "",            // foto de la pieza real
      enlace: "",          // enlace a Etsy si está a la venta
      ejemplo: true
    }
  ],

  // Qué puedes imprimir (déjalo vacío "" si aún no lo tienes claro)
  capacidades: {
    materiales: "",        // ej.: "PLA, PETG, TPU y resina"
    tamanoMaximo: "",      // ej.: "25 × 21 × 21 cm"
    acabados: "",          // ej.: "En bruto, lijado, imprimado o pintado a mano"
    plazo: ""              // ej.: "De 3 a 10 días según la pieza"
  }
};
