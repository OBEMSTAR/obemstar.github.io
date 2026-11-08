/* ==========================================================================
   OBEMSTAR · SISTEMA
   --------------------------------------------------------------------------
   Monta la barra superior/inferior, la secuencia de arranque, el modo CRT,
   la terminal de comandos y pinta el contenido de js/contenido.js.
   Normalmente NO necesitas tocar este archivo.
   ========================================================================== */
(function () {
  "use strict";

  const D = window.OBEMSTAR || { config: {} };
  const C = D.config || {};
  const body = document.body;
  const pagina = body.dataset.pagina || "inicio";

  const MODULOS = [
    { id: "inicio",      num: "00", nombre: "BOOT",        url: "index.html" },
    { id: "sobre-mi",    num: "01", nombre: "LO QUE SOY",  url: "sobre-mi.html" },
    { id: "interactive", num: "02", nombre: "INTERACTIVE", url: "interactive.html" },
    { id: "modelado",    num: "03", nombre: "3D MODELING", url: "modelado.html" },
    { id: "industries",  num: "04", nombre: "INDUSTRIES",  url: "industries.html" },
    { id: "uplink",      num: "05", nombre: "UPLINK",      url: "uplink.html" },
    { id: "transmit",    num: "06", nombre: "TRANSMIT",    url: "transmit.html" }
  ];

  /* ---------- utilidades ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const leer = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const sesion = { get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
                   set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fechaCorta = (f) => (f ? f.split("-").reverse().join(".") : "");
  const enlace = (url, texto, clase = "boton") =>
    url ? `<a class="${clase}" href="${esc(url)}" target="_blank" rel="noopener">${esc(texto)} ›</a>`
        : `<span class="${clase}" aria-disabled="true">${esc(texto)} · PENDIENTE</span>`;
  const sinSenal = (detalle) => `<div class="sin-senal">SIN SEÑAL<small>${esc(detalle || "imagen pendiente")}</small></div>`;

  /* ---------- barra superior ---------- */
  const nav = MODULOS.map((m) =>
    `<a href="${m.url}"${m.id === pagina ? ' aria-current="page"' : ""}><span>${m.num}</span>${m.nombre}</a>`).join("");
  body.insertAdjacentHTML("afterbegin", `
    <header class="barra-sup">
      <a class="marca" href="index.html" aria-label="OBEMSTAR, inicio">
        <img src="assets/img/emblema.svg" alt="" width="34" height="34">
        <span><span class="marca-texto">OBEMSTAR</span><span class="marca-sub">TERMINAL · UNIT 01</span></span>
      </a>
      <nav class="nav" id="nav" aria-label="Módulos">${nav}</nav>
      <div class="controles">
        <button class="boton-icono" id="btn-crt" type="button" title="Activar o desactivar efectos CRT">CRT</button>
        <button class="boton-icono" id="btn-terminal" type="button" title="Abrir terminal (tecla º)">&gt;_</button>
        <button class="boton-icono boton-menu" id="btn-menu" type="button" aria-expanded="false" aria-controls="nav">MENÚ</button>
      </div>
    </header>`);

  /* ---------- barra inferior ---------- */
  body.insertAdjacentHTML("beforeend", `
    <div class="barra-inf" role="contentinfo">
      <span class="ok"><span class="punto"></span>SYS OK</span>
      <span class="reloj" id="reloj">--:--:--</span>
      <span class="uptime" id="uptime">UPTIME 00:00</span>
      <span class="accesos"><a href="uplink.html">UPLINK</a><a href="transmit.html">TRANSMIT</a></span>
    </div>`);

  // Pie con correo y redes (si la página tiene <footer data-pie>)
  const pie = $("[data-pie]");
  if (pie) {
    const redes = (C.redes || []).filter((r) => r.url)
      .map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a>`).join(" · ");
    pie.className = "pie";
    pie.innerHTML = `<div class="contenedor">
      <span>© ${new Date().getFullYear()} OBEMSTAR · INTERACTIVE DIVISION · INDUSTRIES</span>
      <span>${esc(C.email || "")}${redes ? " · " + redes : ""}</span></div>`;
  }

  /* ---------- menú móvil ---------- */
  $("#btn-menu").addEventListener("click", (e) => {
    const abierto = $("#nav").classList.toggle("abierta");
    e.currentTarget.setAttribute("aria-expanded", abierto);
  });

  /* ---------- modo CRT ---------- */
  const btnCrt = $("#btn-crt");
  const aplicarCrt = (on) => {
    body.classList.toggle("crt-off", !on);
    btnCrt.setAttribute("aria-pressed", on);
    btnCrt.textContent = on ? "CRT ON" : "CRT OFF";
    guardar("obemstar-crt", on ? "on" : "off");
  };
  aplicarCrt(leer("obemstar-crt") !== "off" && !sinMovimiento);
  btnCrt.addEventListener("click", () => aplicarCrt(body.classList.contains("crt-off")));

  /* ---------- reloj y uptime ---------- */
  const inicio = Date.now();
  const tic = () => {
    const ahora = new Date();
    $("#reloj").textContent = ahora.toLocaleTimeString("es-ES", { hour12: false });
    const s = Math.floor((Date.now() - inicio) / 1000);
    $("#uptime").textContent = `UPTIME ${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };
  tic(); setInterval(tic, 1000);

  /* ---------- secuencia de arranque (solo portada, 1 vez por sesión) ---------- */
  function arranque() {
    if (pagina !== "inicio" || sesion.get("obemstar-boot") || sinMovimiento) return;
    sesion.set("obemstar-boot", "1");
    const lineas = [
      "OBEMSTAR BIOS v1.984 — (C) OBEMSTAR",
      "COMPROBANDO MEMORIA ............ 640K OK",
      "ENLACE CON OBEM ................ ESTABLECIDO",
      "CARGANDO MÓDULO 02 INTERACTIVE DIVISION ... OK",
      "CARGANDO MÓDULO 03 NÚCLEO 3D ............. OK",
      "CARGANDO MÓDULO 04 INDUSTRIES ............ OK",
      "UPLINK A TIENDAS ............... EN LÍNEA",
      "IDENTIFICANDO VISITANTE ........ INVITADO"
    ];
    const capa = document.createElement("div");
    capa.className = "arranque";
    capa.setAttribute("role", "status");
    capa.innerHTML = `<div class="texto"></div><div class="saltar">[ PULSA CUALQUIER TECLA PARA SALTAR ]</div>`;
    body.appendChild(capa);
    const texto = $(".texto", capa);
    let i = 0, terminado = false;
    const cerrar = (e) => {
      if (e && e.type === "keydown") e.preventDefault();
      if (terminado) return; terminado = true;
      capa.classList.add("fuera");
      setTimeout(() => capa.remove(), 450);
      document.removeEventListener("keydown", cerrar);
    };
    capa.addEventListener("click", cerrar);
    document.addEventListener("keydown", cerrar);
    const paso = () => {
      if (terminado) return;
      if (i < lineas.length) {
        texto.insertAdjacentHTML("beforeend", `<div class="linea-arranque">&gt; ${esc(lineas[i++])}</div>`);
        setTimeout(paso, 170 + Math.random() * 120);
      } else {
        texto.insertAdjacentHTML("beforeend", `<div class="acceso titular-rgb">ACCESS GRANTED</div>`);
        setTimeout(cerrar, 750);
      }
    };
    setTimeout(paso, 200);
  }
  arranque();

  /* ---------- pintado de contenido ---------- */
  const R = {};

  R.juegos = (el) => {
    el.innerHTML = (D.juegos || []).map((j) => `
      <article class="panel tarjeta aparece">
        <div class="medio">${j.imagen ? `<img src="${esc(j.imagen)}" alt="Captura de ${esc(j.titulo)}" loading="lazy">` : sinSenal()}
          <span class="etiqueta">${esc(j.estado || "")}</span></div>
        <div class="cuerpo">
          <div class="meta">${esc(j.genero || "")}${j.fecha ? " · ACT. " + fechaCorta(j.fecha) : ""}</div>
          <h3>${esc(j.titulo)}</h3>
          <p>${esc(j.descripcion || "")}</p>
          ${j.ejemplo ? '<span class="aviso-ejemplo">[ DATOS DE EJEMPLO ]</span>' : ""}
          <div class="botones">${(j.enlaces || []).map((e) => enlace(e.url, e.texto)).join("")}</div>
        </div>
      </article>`).join("");
  };

  R.prototipos = (el) => {
    el.innerHTML = (D.prototipos || []).map((p) => `
      <article class="panel tarjeta aparece">
        <div class="medio">${p.video ? `<video src="${esc(p.video)}" autoplay muted loop playsinline preload="metadata"></video>`
          : p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.titulo)}" loading="lazy">` : sinSenal("clip pendiente")}</div>
        <div class="cuerpo">
          <div class="meta">LAB · ${fechaCorta(p.fecha)}</div>
          <h3>${esc(p.titulo)}</h3>
          <p>${esc(p.descripcion || "")}</p>
          ${p.ejemplo ? '<span class="aviso-ejemplo">[ DATOS DE EJEMPLO ]</span>' : ""}
        </div>
      </article>`).join("");
  };

  R.devlog = (el) => {
    el.innerHTML = (D.devlog || []).map((d) => `
      <li><time datetime="${esc(d.fecha)}">${fechaCorta(d.fecha)}</time>
      <div><h3>${esc(d.titulo)}</h3><p>${esc(d.texto)}</p></div></li>`).join("");
  };

  R.modelos = (el) => {
    const lista = D.modelos || [];
    const tipos = ["todos", ...new Set(lista.map((m) => m.tipo).filter(Boolean))];
    const filtros = document.querySelector("[data-filtros='modelos']");
    const pintar = (tipo) => {
      el.innerHTML = lista.filter((m) => tipo === "todos" || m.tipo === tipo).map((m) => `
        <article class="panel tarjeta aparece visto">
          <div class="medio">${m.modelo
            ? `<model-viewer src="${esc(m.modelo)}" poster="${esc(m.imagen || "")}" camera-controls auto-rotate shadow-intensity="0" exposure="0.9" style="width:100%;height:100%;background:#020403" alt="${esc(m.titulo)}"></model-viewer>`
            : m.imagen ? `<img src="${esc(m.imagen)}" alt="Render de ${esc(m.titulo)}" loading="lazy">` : sinSenal("render pendiente")}
            <span class="etiqueta">${esc((m.tipo || "").toUpperCase())}</span></div>
          <div class="cuerpo">
            <h3>${esc(m.titulo)}</h3>
            <ul class="ficha">
              <li><span>POLÍGONOS</span><span>${esc(m.poligonos || "—")}</span></li>
              <li><span>TEXTURAS</span><span>${esc(m.texturas || "—")}</span></li>
              <li><span>SOFTWARE</span><span>${esc(m.software || "—")}</span></li>
              <li><span>RIG</span><span>${esc(m.riggeado || "—")}</span></li>
            </ul>
            ${m.ejemplo ? '<span class="aviso-ejemplo">[ DATOS DE EJEMPLO ]</span>' : ""}
            <div class="botones">${enlace(m.enlace, "Ver en Sketchfab")}
              <a class="boton fantasma" href="transmit.html?motivo=modelo">Pedir uno a medida</a></div>
          </div>
        </article>`).join("") || '<p class="suave">No hay modelos de este tipo todavía.</p>';
    };
    if (filtros) {
      filtros.innerHTML = tipos.map((t, i) => `<button type="button" data-tipo="${esc(t)}" aria-pressed="${i === 0}">${esc(t.toUpperCase())}</button>`).join("");
      filtros.addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        $$("button", filtros).forEach((x) => x.setAttribute("aria-pressed", x === b));
        pintar(b.dataset.tipo);
      });
    }
    pintar("todos");
    if (lista.some((m) => m.modelo) && !document.querySelector("script[data-model-viewer]")) {
      const s = document.createElement("script");
      s.type = "module"; s.dataset.modelViewer = "1";
      s.src = "https://unpkg.com/@google/model-viewer@3/dist/model-viewer.min.js";
      document.head.appendChild(s);
    }
  };

  R.impresiones = (el) => {
    const lista = D.impresiones || [];
    const filtros = document.querySelector("[data-filtros='impresiones']");
    const pintar = (cat) => {
      el.innerHTML = lista.filter((p) => cat === "todas" || p.categoria === cat).map((p) => {
        let medio;
        if (p.render && p.foto) {
          medio = `<div class="comparador" style="--pos:50%">
            <img src="${esc(p.foto)}" alt="Pieza real: ${esc(p.titulo)}" loading="lazy">
            <img class="capa" src="${esc(p.render)}" alt="Modelo 3D: ${esc(p.titulo)}" loading="lazy">
            <span class="lado" style="left:10px">MODELO</span><span class="lado" style="right:10px">PIEZA REAL</span>
            <span class="linea"></span>
            <input type="range" min="0" max="100" value="50" aria-label="Comparar modelo y pieza real"></div>`;
        } else {
          const img = p.foto || p.render;
          medio = `<div class="medio">${img ? `<img src="${esc(img)}" alt="${esc(p.titulo)}" loading="lazy">` : sinSenal("foto pendiente")}</div>`;
        }
        return `<article class="panel tarjeta aparece visto">
          ${medio}
          <div class="cuerpo">
            <div class="meta">${p.categoria === "funcional" ? "PIEZA FUNCIONAL" : "COLECCIÓN FRIKI"} · ${esc(p.material || "—")}</div>
            <h3>${esc(p.titulo)}</h3>
            ${p.ejemplo ? '<span class="aviso-ejemplo">[ DATOS DE EJEMPLO ]</span>' : ""}
            <div class="botones">${enlace(p.enlace, "Comprar en Etsy")}</div>
          </div></article>`;
      }).join("") || '<p class="suave">Nada en esta categoría todavía.</p>';
      $$(".comparador input", el).forEach((r) => r.addEventListener("input", () => r.parentElement.style.setProperty("--pos", r.value + "%")));
    };
    if (filtros) {
      const cats = [["todas", "TODAS"], ["friki", "COLECCIÓN FRIKI"], ["funcional", "PIEZAS Y ENCARGOS"]];
      filtros.innerHTML = cats.map(([v, t], i) => `<button type="button" data-cat="${v}" aria-pressed="${i === 0}">${t}</button>`).join("");
      filtros.addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        $$("button", filtros).forEach((x) => x.setAttribute("aria-pressed", x === b));
        pintar(b.dataset.cat);
      });
    }
    pintar("todas");
  };

  R.capacidades = (el) => {
    const c = D.capacidades || {};
    const fila = (n, v) => `<li><span>${n}</span><span>${esc(v || "POR DEFINIR")}</span></li>`;
    el.innerHTML = fila("MATERIALES", c.materiales) + fila("TAMAÑO MÁXIMO", c.tamanoMaximo) + fila("ACABADOS", c.acabados) + fila("PLAZO", c.plazo);
  };

  R.tiendas = (el) => {
    el.innerHTML = (D.tiendas || []).map((t, i) => `
      <article class="panel tienda aparece">
        <div class="panel-cabecera"><span>UPLINK-0${i + 1}</span><span class="cod">${esc(t.division || "")}</span></div>
        <div class="estado ${t.url ? "online" : "pendiente"}">${t.url ? "● EN LÍNEA" : "○ ENLACE PENDIENTE"}</div>
        <h3>${esc(t.nombre)}</h3>
        <p>${esc(t.descripcion || "")}</p>
        <div class="botones">${enlace(t.url, "Conectar")}</div>
      </article>`).join("");
  };

  R.estado = (el) => {
    const si = C.aceptandoEncargos !== false;
    el.innerHTML = `
      <li><span>PROYECTO ACTIVO</span><span>${esc(C.proyectoActivo || "—")}</span></li>
      <li><span>IMPRESORA</span><span>${esc(C.impresora || "—")}</span></li>
      <li><span>ACEPTANDO ENCARGOS</span><span class="${si ? "" : "no"}">${si ? "SÍ" : "NO"}</span></li>
      <li><span>RESPUESTA ESTIMADA</span><span>${esc(C.respuestaEstimada || "—")}</span></li>`;
  };

  // Última transmisión: lo más reciente de juegos, prototipos, modelos e impresiones
  R.ultima = (el) => {
    const todo = [
      ...(D.juegos || []).map((x) => ({ ...x, mod: "INTERACTIVE DIVISION", url: "interactive.html", img: x.imagen })),
      ...(D.prototipos || []).map((x) => ({ ...x, mod: "LAB · PROTOTIPOS", url: "interactive.html#laboratorio", img: x.imagen })),
      ...(D.modelos || []).map((x) => ({ ...x, mod: "NÚCLEO 3D", url: "modelado.html", img: x.imagen })),
      ...(D.impresiones || []).map((x) => ({ ...x, mod: "INDUSTRIES", url: "industries.html", img: x.foto || x.render }))
    ].filter((x) => !x.ejemplo).sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
    const u = todo[0];
    if (!u) { el.innerHTML = '<p class="suave">Sin transmisiones todavía.</p>'; return; }
    el.innerHTML = `
      <div class="transmision">
        <div class="tarjeta"><div class="medio miniatura">${u.img ? `<img src="${esc(u.img)}" alt="" loading="lazy">` : sinSenal()}</div></div>
        <div>
          <div class="sistema">${esc(u.mod)} · ${fechaCorta(u.fecha)}</div>
          <h3 style="font-size:1.3rem;margin-top:8px">${esc(u.titulo)}</h3>
          <p>${esc(u.descripcion || "")}</p>
          <a class="boton fantasma" href="${u.url}">Abrir módulo ›</a>
        </div>
      </div>`;
  };

  $$("[data-render]").forEach((el) => { const f = R[el.dataset.render]; if (f) f(el); });

  // Textos sueltos desde config: <span data-config="email"></span>
  $$("[data-config]").forEach((el) => { el.textContent = C[el.dataset.config] ?? ""; });

  /* ---------- formulario de contacto ---------- */
  const form = $("#form-transmit");
  if (form) {
    const motivo = $("#motivo", form);
    const extra = $(".campos-impresion", form);
    const actualizar = () => extra.classList.toggle("visible", motivo.value === "impresion");
    const pedido = new URLSearchParams(location.search).get("motivo");
    if (pedido && $(`option[value="${pedido}"]`, motivo)) motivo.value = pedido;
    motivo.addEventListener("change", actualizar); actualizar();

    // Envío del formulario:
    //  · Con config.web3formsKey: Web3Forms envía el mensaje a tu bandeja como un correo normal.
    //  · Sin clave: se abre el programa de correo del visitante con el mensaje preparado.
    const ok = $(".confirmacion");
    const mostrar = (titulo, texto) => {
      ok.innerHTML = `<div class="sistema">${titulo}</div><p>${texto}</p>`;
      ok.classList.add("visible");
      ok.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const oculto = (name, value) => {
      let i = form.querySelector(`input[name="${name}"]`);
      if (!i) { i = document.createElement("input"); i.type = "hidden"; i.name = name; form.appendChild(i); }
      i.value = value;
    };
    const asunto = () => `[OBEMSTAR] ${motivo.options[motivo.selectedIndex].text} — ${($("#nombre", form).value || "").trim()}`;
    const boton = form.querySelector('button[type="submit"]');

    // Los adjuntos no viajan por este formulario: se pide mencionarlos en el mensaje
    const adj = $("#adjunto", form);
    if (adj) {
      const campo = adj.closest(".campo");
      campo.querySelector("label").textContent = "ARCHIVOS (STL O IMÁGENES)";
      adj.remove();
      campo.insertAdjacentHTML("beforeend", '<small class="suave">Si tienes un STL o una imagen, menciónalo en el mensaje y te pediré que me lo envíes por correo.</small>');
    }

    if (C.web3formsKey) {
      form.insertAdjacentHTML("beforeend", '<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">');
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const datos = new FormData(form);
        datos.append("access_key", C.web3formsKey);
        datos.append("subject", asunto());
        datos.append("from_name", "Web OBEMSTAR");
        if (motivo.value !== "impresion") ["medidas", "material", "cantidad"].forEach((k) => datos.delete(k));
        boton.textContent = "TRANSMITIENDO..."; boton.setAttribute("aria-disabled", "true");
        try {
          const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: datos, headers: { Accept: "application/json" } });
          const j = await r.json().catch(() => ({}));
          if (!r.ok || j.success === false) throw new Error(j.message || r.status);
          form.reset(); actualizar();
          mostrar(`TRANSMISIÓN ENVIADA. RESPUESTA ESTIMADA: ${esc(C.respuestaEstimada || "48 H")}`, "Mensaje recibido. Te contestaré lo antes posible.");
        } catch (err) {
          mostrar("ERROR DE ENLACE", `No se pudo enviar. Escríbeme directamente a <b>${esc(C.email)}</b>.`);
        }
        boton.textContent = "Transmitir ›"; boton.removeAttribute("aria-disabled");
      });
    } else {
      // Sin clave de Web3Forms: prepara el correo en el programa de email del visitante
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const datos = new FormData(form);
        const lineas = [];
        for (const [k, v] of datos.entries()) if (v && typeof v === "string") lineas.push(`${k.toUpperCase()}: ${v}`);
        location.href = `mailto:${C.email}?subject=${encodeURIComponent(asunto())}&body=${encodeURIComponent(lineas.join("\n"))}`;
        mostrar("TRANSMISIÓN PREPARADA", `Se ha abierto tu programa de correo con el mensaje listo. Si no se abre, escríbeme a <b>${esc(C.email)}</b>.`);
      });
    }
  }

  /* ---------- terminal de comandos ---------- */
  body.insertAdjacentHTML("beforeend", `
    <div class="terminal" id="terminal" role="dialog" aria-label="Terminal de comandos">
      <div class="panel">
        <div class="panel-cabecera"><span>OBEMSTAR // TERMINAL</span><span class="cod">ESC PARA CERRAR</span></div>
        <div class="terminal-salida" id="t-salida" aria-live="polite">Escribe <b>ayuda</b> para ver los comandos.</div>
        <form class="terminal-linea" id="t-form"><label for="t-entrada">visitante@obemstar:~$</label>
          <input id="t-entrada" autocomplete="off" spellcheck="false"></form>
      </div>
    </div>`);
  const term = $("#terminal"), salida = $("#t-salida"), entrada = $("#t-entrada");
  const escribir = (t, clase = "") => { salida.insertAdjacentHTML("beforeend", `\n<span class="${clase}">${t}</span>`); salida.scrollTop = salida.scrollHeight; };
  const abrir = (on) => { term.classList.toggle("abierta", on); if (on) entrada.focus(); };
  const ir = (url) => { escribir("Redirigiendo..."); setTimeout(() => (location.href = url), 350); };
  const COMANDOS = {
    ayuda: () => escribir(
      "COMANDOS DISPONIBLES\n" +
      "  inicio · soy · juegos · modelado · impresion · tiendas · contacto\n" +
      "  estado     estado del sistema\n" +
      "  whoami     identificación\n" +
      "  obem       datos del planeta\n" +
      "  crt        activar/desactivar efectos\n" +
      "  limpiar    borrar pantalla\n" +
      "  salir      cerrar terminal"),
    inicio: () => ir("index.html"), soy: () => ir("sobre-mi.html"), juegos: () => ir("interactive.html"),
    modelado: () => ir("modelado.html"), impresion: () => ir("industries.html"),
    tiendas: () => ir("uplink.html"), contacto: () => ir("transmit.html"),
    estado: () => escribir(`PROYECTO ACTIVO ..... ${esc(C.proyectoActivo || "—")}\nIMPRESORA ........... ${esc(C.impresora || "—")}\nENCARGOS ............ ${C.aceptandoEncargos !== false ? "ABIERTOS" : "CERRADOS"}`),
    whoami: () => escribir("visitante — nivel de acceso: INVITADO.\nPara subir de nivel, envía una transmisión desde el módulo 06."),
    obem: () => escribir("OBEM — planeta natal de la compañía.\nCoordenadas: [CLASIFICADO]. Población: [CLASIFICADO].\nMás información disponible en Fallen Star Horizon."),
    crt: () => { btnCrt.click(); escribir(`Efectos CRT: ${body.classList.contains("crt-off") ? "OFF" : "ON"}`); },
    limpiar: () => (salida.innerHTML = ""),
    salir: () => abrir(false),
    "self-destruct": () => {
      escribir("SECUENCIA DE AUTODESTRUCCIÓN INICIADA... 3", "err");
      body.classList.add("autodestruccion");
      setTimeout(() => escribir("2", "err"), 700);
      setTimeout(() => escribir("1", "err"), 1400);
      setTimeout(() => { body.classList.remove("autodestruccion"); escribir("...Cancelada. Buen intento. La madre no lo permitiría."); }, 2100);
    },
    sudo: () => escribir("Permiso denegado. Esto no es la Nostromo.", "err")
  };
  COMANDOS.help = COMANDOS.ayuda; COMANDOS.clear = COMANDOS.limpiar; COMANDOS.exit = COMANDOS.salir;
  COMANDOS.autodestruccion = COMANDOS["self-destruct"]; COMANDOS.contact = COMANDOS.contacto; COMANDOS.games = COMANDOS.juegos;

  $("#t-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = entrada.value.trim().toLowerCase(); entrada.value = "";
    if (!v) return;
    escribir("$ " + esc(v), "eco");
    const cmd = COMANDOS[v.split(/\s+/)[0]];
    cmd ? cmd() : escribir(`Comando no reconocido: ${esc(v)}. Escribe "ayuda".`, "err");
  });
  $("#btn-terminal").addEventListener("click", () => abrir(!term.classList.contains("abierta")));
  document.addEventListener("keydown", (e) => {
    const escribiendo = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && document.activeElement !== entrada;
    if ((e.key === "º" || e.key === "`" || e.key === "ª") && !escribiendo) { e.preventDefault(); abrir(!term.classList.contains("abierta")); }
    if (e.key === "Escape") abrir(false);
  });

  /* ---------- animación de entrada al hacer scroll ---------- */
  const marcar = $$(".aparece");
  if ("IntersectionObserver" in window && !sinMovimiento) {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visto"); io.unobserve(en.target); } }), { threshold: 0.08 });
    marcar.forEach((el) => io.observe(el));
  } else marcar.forEach((el) => el.classList.add("visto"));
})();
