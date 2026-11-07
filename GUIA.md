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

Esta carpeta **ya es un repositorio Git**, con su historial inicial hecho. Solo falta subirlo a GitHub.

---

## 3. Puesta en marcha (solo una vez)

### 3.1 Crea tu cuenta de GitHub
1. Entra en **github.com** → *Sign up*.
2. Usa el correo de OBEMSTAR si ya lo tienes (si no, el actual; se puede cambiar después en *Settings → Emails*).
3. Elige un nombre de usuario: por ejemplo `obemstar`. Aparecerá en la dirección de la web.

### 3.2 Instala GitHub Desktop (recomendado para empezar)
Es un programa con botones que hace lo mismo que Git por comandos, sin tener que escribirlos.
1. Descárgalo de **desktop.github.com** e instálalo.
2. Inicia sesión con tu cuenta de GitHub.

### 3.3 Sube la web a GitHub
1. Descomprime `obemstar-web.zip` donde quieras guardarla (por ejemplo, `Documentos/OBEMSTAR/obemstar-web`).
2. En GitHub Desktop: **File → Add local repository…** → elige la carpeta `obemstar-web` → *Add repository*.
3. Pulsa **Publish repository**.
   - Nombre: `obemstar-web`
   - **Desmarca** "Keep this code private". El alojamiento gratuito de GitHub Pages necesita que el repositorio sea público (no hay nada secreto en él).
4. Listo: tu código ya está en `github.com/TU-USUARIO/obemstar-web`.

<details>
<summary>Alternativa: hacerlo con la terminal</summary>

Instala Git desde **git-scm.com**, crea en GitHub un repositorio vacío llamado `obemstar-web` (sin README) y ejecuta dentro de la carpeta:

```bash
git remote add origin https://github.com/TU-USUARIO/obemstar-web.git
git push -u origin main
```
</details>

### 3.4 Publica la web gratis con GitHub Pages
1. En GitHub, abre tu repositorio → **Settings → Pages**.
2. En *Build and deployment*: **Source: Deploy from a branch**.
3. *Branch*: **main**, carpeta **/ (root)** → **Save**.
4. En uno o dos minutos la web estará en: `https://TU-USUARIO.github.io/obemstar-web/`

Desde ese momento, **cada vez que hagas push, la web publicada se actualiza sola**.

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

Ahora mismo, al pulsar *Transmitir*, se abre el programa de correo del visitante con el mensaje ya escrito.
Para que llegue directamente a tu bandeja sin depender de eso:
1. Crea una cuenta gratis en **formspree.io** con el correo de OBEMSTAR.
2. Crea un formulario nuevo y copia su ID (lo que va después de `/f/`, por ejemplo `xyzabcde`).
3. En `js/contenido.js`: `formspreeId: "xyzabcde",` → commit → push.

Nota: el adjunto (STL o imagen) solo se envía con Formspree, y la subida de archivos puede requerir uno de sus planes de pago. Con el plan gratuito, pide que te lo manden después por correo.

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
   - Un registro **CNAME** para `www` apuntando a `TU-USUARIO.github.io`
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
