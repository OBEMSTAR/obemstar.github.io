# Guía de la web de OBEMSTAR

Esta guía explica cómo está hecha la web, cómo usar Git para guardarla y publicarla, y cómo añadir contenido sin tocar código.

> **Lo más importante:** el 95 % de las veces solo vas a editar **un archivo**: `js/contenido.js`.

---

## 1. Qué hay en la carpeta

```
obemstar-web/
├── index.html          → 00 · Portada (BOOT)
├── sobre-mi.html       → 01 · Lo que soy
├── interactive.html    → 02 · Interactive Division (videojuegos)
├── modelado.html       → 03 · 3D Modeling (núcleo compartido)
├── industries.html     → 04 · Industries (impresión 3D)
├── uplink.html         → 05 · Uplink (tiendas)
├── transmit.html       → 06 · Transmit (contacto)
├── 404.html            → página de "señal perdida"
├── css/estilo.css      → colores, tipografías y efectos CRT
├── js/contenido.js     → ★ TU CONTENIDO: enlaces, juegos, modelos, impresiones...
├── js/sistema.js       → el "motor" (no hace falta tocarlo)
├── assets/img/         → imágenes, vídeos y modelos .glb
├── GUIA.md             → esta guía
└── README.md
```

La web no necesita instalar nada ni compilar: son archivos HTML, CSS y JavaScript normales.
**Para verla en tu ordenador, haz doble clic en `index.html`.**

---

## 2. Git en un minuto

| Palabra | Qué significa |
| --- | --- |
| **Repositorio (repo)** | La carpeta de la web, con todo su historial de cambios guardado. |
| **Commit** | Una "foto" de la web en un momento dado, con un mensaje que explica qué cambiaste. Es como un punto de guardado de un juego. |
| **Push** | Subir tus commits a GitHub. |
| **Pull** | Bajar de GitHub los cambios que haya (por ejemplo, si editas desde otro ordenador). |
| **GitHub** | La web donde vive tu repositorio en internet. Además, publica la web gratis (GitHub Pages). |
| **Rama (branch)** | Una copia paralela para probar cambios grandes sin romper la web publicada. La principal se llama `main`. |

El ciclo de trabajo es siempre el mismo:

```
editar archivos  →  commit (guardar con mensaje)  →  push (subir)  →  la web se actualiza sola
```

La web ya está en GitHub y publicada. Solo tienes que clonarla en tu ordenador (apartado 3.4).

---

## 3. Puesta en marcha (solo una vez)

### 3.1 Crea tu cuenta de GitHub
1. Entra en **github.com** → *Sign up*.
2. Cuenta creada: **OBEMSTAR** (obemstar.studio@gmail.com).

### 3.2 Instala GitHub Desktop (recomendado para empezar)
Es un programa con botones que hace lo mismo que Git por comandos, sin tener que escribirlos.
1. Descárgalo de **desktop.github.com** e instálalo.
2. Inicia sesión con tu cuenta de GitHub.

### 3.3 La web ya está publicada
- **Dirección pública:** https://obemstar.github.io
- **Repositorio:** https://github.com/OBEMSTAR/obemstar.github.io (público, cuenta OBEMSTAR)
- GitHub Pages publica automáticamente la rama `main`: **cada push actualiza la web en uno o dos minutos.**

### 3.4 Trae la web a tu ordenador (una vez)
1. En GitHub Desktop, inicia sesión con la cuenta **OBEMSTAR**.
2. **File → Clone repository…** → pestaña *GitHub.com* → elige `OBEMSTAR/obemstar.github.io` → elige dónde guardarla (por ejemplo `Documentos/OBEMSTAR/`) → **Clone**.
3. Trabaja siempre sobre esa carpeta clonada (no sobre el zip).

<details>
<summary>Alternativa: hacerlo con la terminal</summary>

```bash
git clone https://github.com/OBEMSTAR/obemstar.github.io.git
```
</details>

---

## 4. El día a día

1. **Edita** lo que quieras (normalmente `js/contenido.js`) con cualquier editor. Recomiendo **Visual Studio Code** (gratis), porque colorea el código y avisa de errores.
2. **Comprueba** el resultado abriendo `index.html` en el navegador (F5 para recargar).
3. En GitHub Desktop verás los archivos cambiados. Abajo a la izquierda:
   - Escribe un **resumen** corto del cambio: `Añade figura de Atherum a Industries`.
   - Pulsa **Commit to main**.
4. Pulsa **Push origin**.
5. En un minuto, la web publicada tiene el cambio.

> Consejo: haz commits pequeños y frecuentes, uno por cambio con sentido. Si algo se rompe, es fácil volver atrás.

**Equivalente por terminal:**
```bash
git status                     # qué ha cambiado
git add .                      # preparar todos los cambios
git commit -m "Añade figura"   # guardar con mensaje
git push                       # subir a GitHub
```

---

## 5. Añadir contenido (`js/contenido.js`)

Abre `js/contenido.js`. Cada sección es una lista de bloques `{ ... }`. Para añadir algo:
**copia un bloque entero, pon una coma después del anterior, pégalo y cambia los textos.**

Reglas que evitan el 99 % de los errores:
- Los textos van **entre comillas**: `"así"`.
- Entre dos bloques `{ ... }` va una **coma**.
- Si después de guardar la web sale vacía, casi seguro falta o sobra una coma o una comilla. VS Code la marca en rojo.

### 5.1 Un juego nuevo
```js
juegos: [
  {
    titulo: "Fallen Star Horizon",
    ...
  },
  {
    titulo: "Mi nuevo juego",
    estado: "PROTOTIPO",                 // PROTOTIPO · EN DESARROLLO · PUBLICADO
    genero: "Plataformas · Retro",
    fecha: "2026-12-01",                 // año-mes-día (ordena la "última transmisión")
    imagen: "assets/img/mi-juego.jpg",
    descripcion: "Una frase o dos sobre el juego.",
    enlaces: [
      { texto: "Ver en Steam", url: "https://store.steampowered.com/app/..." },
      { texto: "Jugar en itch.io", url: "" }   // vacío = sale como PENDIENTE
    ]
  }
],
```

### 5.2 Un prototipo (clip de vídeo)
Exporta un vídeo corto (5-15 s, .mp4 o .webm, sin sonido, menos de 5 MB), guárdalo en `assets/img/` y:
```js
{ titulo: "Sistema de oleadas", fecha: "2026-11-20", descripcion: "Primera prueba.", video: "assets/img/oleadas.mp4" }
```

### 5.3 Un modelo 3D (con visor interactivo)
Si añades un archivo **.glb** en `modelo`, la tarjeta muestra un visor 3D que se puede girar con el ratón.
```js
{
  titulo: "Rifle de asalto Atherum",
  tipo: "props",                         // personajes · props · entornos · hard-surface
  fecha: "2026-11-15",
  imagen: "assets/img/rifle.jpg",        // render (se ve mientras carga el 3D)
  modelo: "assets/img/rifle.glb",        // opcional
  poligonos: "4.200 tris", texturas: "2K PBR", software: "Blender", riggeado: "No",
  enlace: "https://sketchfab.com/..."
}
```
Para que cargue rápido, exporta el .glb comprimido (en Blender: *Export glTF → Compression*) y procura que pese menos de 10 MB.

### 5.4 Una impresión (con comparador modelo vs. pieza real)
Si rellenas **render** y **foto**, aparece un deslizador para comparar el modelo 3D con la pieza impresa.
```js
{
  titulo: "Figura de soldado",
  categoria: "friki",                    // friki · funcional
  fecha: "2026-11-18",
  material: "Resina",
  render: "assets/img/soldado-render.jpg",
  foto: "assets/img/soldado-foto.jpg",
  enlace: "https://www.etsy.com/listing/..."
}
```
Consejo: haz la foto y el render con el mismo encuadre para que el comparador luzca.

### 5.5 Tiendas, correo, redes y estado
Todo está arriba del archivo, en `config` y `tiendas`:
- `email`: tu correo de contacto (aparece en el pie y en Transmit).
- `tiendas`: pega la URL de cada tienda en `url`. Mientras esté vacía, sale como **ENLACE PENDIENTE**.
- `redes`: pega tus perfiles; las vacías no se muestran.
- `aceptandoEncargos`, `impresora`, `proyectoActivo`: el panel ESTADO DEL SISTEMA.
- `capacidades`: materiales, tamaño máximo, acabados y plazo de impresión.

### 5.6 El devlog
La entrada más nueva va **arriba**:
```js
devlog: [
  { fecha: "2026-11-20", titulo: "Nuevo enemigo", texto: "Añadido el dron de vigilancia de Atherum." },
  { fecha: "2026-11-07", titulo: "Terminal OBEMSTAR en línea", texto: "..." }
],
```

### 5.7 Quitar los "DATOS DE EJEMPLO"
Los bloques con `ejemplo: true` salen marcados en rojo como **DATOS DE EJEMPLO** y no cuentan para la "última transmisión". Sustitúyelos por contenido real o bórralos.

### 5.8 Imágenes: tamaño recomendado
- Ancho: 1600 px como máximo. Formato **.jpg** o **.webp**.
- Peso: menos de 300 KB por imagen (usa squoosh.app para comprimir).
- Nombres sin espacios ni tildes: `figura-soldado.jpg`, no `Figura Soldado.JPG`.

---

## 6. Textos fijos, colores y tipografías

- **Lo que soy:** edita `sobre-mi.html`. Busca los comentarios `<!-- EDITA -->`; marcan cada texto que es tuyo (foto, datos, biografía, directiva y herramientas).
- **Frase de la portada:** `index.html`, comentario `<!-- EDITA: tu frase de presentación -->`.
- **Colores:** `css/estilo.css`, bloque `:root` del principio. Cada módulo tiene el suyo:
  verde `#39FF88` (base), ácido `#B6FF3B` (Interactive), cian `#4FD1FF` (3D), ámbar `#FF9E2C` (Industries).
- **Tipografías:** Michroma (titulares), IBM Plex Mono (texto) y VT323 (sistema). Todas con licencia libre (OFL) y servidas por Google Fonts.

---

## 7. Formulario de contacto

El formulario de **Transmit** envía cada mensaje como un **correo normal** a `obemstar.studio@gmail.com`, a través de **FormSubmit** (gratis y sin registro). El asunto llega así: `[OBEMSTAR] Encargo de impresión 3D — Nombre`. Si pulsas *Responder*, contestas directamente a quien te escribió. Los adjuntos (STL o imágenes) llegan como archivos adjuntos, con un límite de 10 MB por mensaje.

**Activación (solo una vez):** la primera vez que alguien envía el formulario, FormSubmit manda a `obemstar.studio@gmail.com` un correo titulado algo como *"Action Required: Activate FormSubmit"*. Ábrelo y pulsa **Activate Form**. Los mensajes enviados antes de activarlo se entregan después. Si no lo ves, mira en *Spam* o *Promociones*.

**Ocultar tu correo (recomendado):** tras activarlo, FormSubmit te da un código aleatorio. Pégalo en `js/contenido.js` → `formularioDestino: "tu-código"` → commit → push. Así tu dirección deja de aparecer en el código de la web y llega menos spam.

**Cambiar el correo de destino:** cambia `email` en `js/contenido.js`. Ten en cuenta que FormSubmit pedirá activar de nuevo la dirección nueva.

---

## 8. Deshacer errores

- **Antes de hacer commit:** en GitHub Desktop, clic derecho en el archivo → *Discard changes*.
- **Después de hacer commit:** pestaña *History* → clic derecho en el commit → *Revert changes in commit*. Crea un commit nuevo que deshace aquel; el historial nunca se pierde.
- Por terminal: `git revert <código-del-commit>`.

## 9. Cambios grandes: usa una rama

Para un rediseño o una sección nueva, sin tocar la web publicada:
1. GitHub Desktop → *Current branch → New branch* → `nueva-seccion`.
2. Trabaja y haz commits normalmente.
3. Cuando esté listo: *Branch → Merge into current branch* desde `main`, y push.

---

## 10. Dominio propio (obemstar.com)

Cuando compres el dominio:
1. GitHub → repositorio → **Settings → Pages → Custom domain** → escribe `obemstar.com` → *Save*.
2. En el panel de tu proveedor de dominio, añade estos registros DNS:
   - Cuatro registros **A** para `@` apuntando a: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Un registro **CNAME** para `www` apuntando a `obemstar.github.io`
3. Espera a que se verifique (de minutos a unas horas) y marca **Enforce HTTPS**.

Comprueba los valores actuales en la documentación de GitHub Pages ("Managing a custom domain") antes de configurarlo.

---

## 11. Extras escondidos

- **Terminal:** pulsa la tecla **º** (o el botón `>_`). Comandos: `ayuda`, `juegos`, `impresion`, `tiendas`, `contacto`, `estado`, `whoami`, `obem`, `crt`… y alguno oculto (`self-destruct`, `sudo`).
- **CRT ON/OFF:** botón en la barra superior. La web recuerda la elección de cada visitante y respeta la opción "reducir movimiento" del sistema.
- **Secuencia de arranque:** solo la primera vez que alguien entra a la portada en cada sesión. Se salta con cualquier tecla o clic.

---

## Chuleta rápida

| Quiero… | Hago… |
| --- | --- |
| Añadir un juego, modelo o impresión | Copiar un bloque en `js/contenido.js` |
| Cambiar un enlace de tienda | `tiendas` → `url` en `js/contenido.js` |
| Cambiar mi biografía | `sobre-mi.html` (comentarios EDITA) |
| Ver los cambios en local | Doble clic en `index.html` |
| Publicar | Commit → Push |
| Deshacer | History → Revert |
