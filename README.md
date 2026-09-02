# Portfolio Personal

Portfolio personal construido con [Astro](https://astro.build) + [TailwindCSS](https://tailwindcss.com), contenido separado en JSON y soporte multi-idioma (ES/EN).

El sitio es estático y se despliega automáticamente en **GitHub Pages** mediante GitHub Actions.

## Stack

* **Astro** — sitio estático, cero JS por defecto
* **TailwindCSS** — utility classes
* **TypeScript** — tipado en el helper de i18n
* **pnpm** — gestor de paquetes
* **GitHub Pages** — hosting del sitio
* **GitHub Actions** — CI/CD para el despliegue

## Estructura del proyecto

```text
src/
├── data/
│   ├── content.es.json       # Todo el contenido en español
│   └── content.en.json       # Todo el contenido en inglés
├── i18n/
│   └── content.ts            # getContent(lang), langPaths, tipos
├── layouts/
│   └── Layout.astro          # <head>, meta tags, Open Graph, hreflang
├── components/
│   ├── Nav.astro
│   ├── Hero.astro            # Hero + about
│   ├── Projects.astro
│   ├── Skills.astro
│   ├── Experience.astro
│   ├── Education.astro
│   └── Contact.astro
├── pages/
│   ├── index.astro           # Sitio en español → /
│   └── en/
│       └── index.astro       # Sitio en inglés → /en/
└── styles/
    └── global.css            # Variables CSS y estilos globales

.github/
└── workflows/
    └── deploy.yml            # Workflow de despliegue a GitHub Pages

astro.config.mjs
package.json
pnpm-lock.yaml
```

## Requisitos

Antes de ejecutar el proyecto localmente, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/)
* [pnpm](https://pnpm.io/)

Puedes verificar las versiones con:

```bash
node --version
pnpm --version
```

## Comandos

Ejecutar desde la raíz del proyecto:

| Comando        | Acción                                                |
| :------------- | :---------------------------------------------------- |
| `pnpm install` | Instala las dependencias                              |
| `pnpm dev`     | Levanta el servidor de desarrollo en `localhost:4321` |
| `pnpm build`   | Compila el sitio de producción en `./dist/`           |
| `pnpm preview` | Sirve localmente el build de `./dist/`                |

Para iniciar el proyecto en desarrollo:

```bash
pnpm install
pnpm dev
```

Para generar el build de producción:

```bash
pnpm build
```

## Editar el contenido

Todo el texto del sitio (nombre, bio, proyectos, skills, experiencia, educación y contacto) vive en:

* `src/data/content.es.json`
* `src/data/content.en.json`

**No es necesario modificar los archivos `.astro`** para actualizar el contenido. Solo edita estos archivos JSON manteniendo la misma estructura de keys en ambos idiomas.

Los componentes leen el contenido dinámicamente mediante `getContent(lang)`.

### Agregar un proyecto

Agrega el proyecto en ambos archivos JSON:

```json
{
  "title": "Nombre del proyecto",
  "description": "Qué hace y qué problema resuelve.",
  "tags": ["Tech1", "Tech2"],
  "link": "https://github.com/usuario/repo"
}
```

## Idiomas (i18n)

El sitio genera dos rutas estáticas:

* `/` → español (idioma por defecto)
* `/en/` → inglés

Cada página (`src/pages/index.astro` y `src/pages/en/index.astro`) utiliza los mismos componentes pasando la prop `lang`.

El helper `src/i18n/content.ts` determina qué archivo JSON utilizar según el idioma.

### Agregar un tercer idioma

1. Crea `src/data/content.xx.json` con la misma estructura que los archivos existentes.
2. En `src/i18n/content.ts`, agrega el idioma a `languages`, `dictionary` y `langPaths`.
3. Crea `src/pages/xx/index.astro` siguiendo el patrón de `src/pages/en/index.astro`.

## Colores

La paleta de colores está centralizada en:

```text
src/styles/global.css
```

Los colores se definen mediante **variables CSS**, permitiendo modificar la identidad visual del sitio desde un único lugar.

Ningún componente debería definir colores principales directamente. Los componentes deben utilizar las variables definidas en `global.css`.

Ejemplo:

```css
:root {
  --color-bg: ...;
  --color-ink: ...;
  --color-ink-muted: ...;
  --color-accent: ...;
  --color-accent-strong: ...;
  --color-accent-warm: ...;
  --color-border: ...;
}
```

| Variable                | Uso                                 |
| :---------------------- | :---------------------------------- |
| `--color-bg`            | Fondo general                       |
| `--color-ink`           | Texto principal                     |
| `--color-ink-muted`     | Texto secundario                    |
| `--color-accent`        | Links, botones y títulos de sección |
| `--color-accent-strong` | Hover de botones sólidos            |
| `--color-accent-warm`   | Fechas, categorías y detalles       |
| `--color-border`        | Líneas divisorias                   |

Para cambiar la paleta del portfolio, modifica únicamente las variables en `src/styles/global.css`.

## Deploy

El portfolio se despliega automáticamente en **GitHub Pages** mediante **GitHub Actions**.

El workflow de despliegue se encuentra en:

```text
.github/workflows/deploy.yml
```

El despliegue se ejecuta automáticamente cuando se realiza un `push` a la rama `main`. También puede ejecutarse manualmente desde GitHub Actions mediante `workflow_dispatch`.

### Proceso de despliegue

El workflow realiza los siguientes pasos:

1. Obtiene el código fuente del repositorio.
2. Configura el entorno de Astro utilizando Node.js 22.
3. Utiliza `pnpm` como gestor de paquetes.
4. Construye el sitio estático de Astro.
5. Sube el resultado del build como artifact de GitHub Pages.
6. Despliega el artifact en GitHub Pages.

El workflow utilizado es:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build and upload Astro site
        uses: withastro/action@v2
        with:
          node-version: 22
          package-manager: pnpm@latest

  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Configuración de GitHub Pages

Para habilitar el despliegue:

1. Ve al repositorio en GitHub.
2. Abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **GitHub Actions** como fuente.
4. Realiza un `push` a `main` o ejecuta manualmente el workflow desde **Actions**.
5. GitHub Actions construirá y desplegará automáticamente el sitio.

### URL del sitio

Si el repositorio utiliza un dominio de GitHub Pages con el formato:

```text
https://usuario.github.io/nombre-del-repositorio/
```

asegúrate de configurar correctamente `site` y `base` en `astro.config.mjs`.

Por ejemplo:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://usuario.github.io',
  base: '/nombre-del-repositorio',
});
```

Si el repositorio se llama `usuario.github.io`, no es necesario utilizar `base`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://usuario.github.io',
});
```
