# QR Color Studio

Web app que genera **códigos QR personalizables en distintos colores**. Es **100% frontend**: todo
el procesamiento ocurre en el navegador y ningún dato se envía a servidores.

## Stack

- React + Vite + TypeScript (modo estricto)
- Tailwind CSS
- `qr-code-styling` (render y exportación del QR)
- `react-colorful` (selector de color)

## Requisitos

- Node.js 20.19+ (o 22.12+)
- npm

## Instalación y uso

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

### Scripts

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Compilación de producción (incluye chequeo de tipos)
npm run preview   # Previsualizar el build de producción
npm run lint      # ESLint
npm run typecheck # Chequeo de tipos (tsc --noEmit)
```

## Funcionalidades

- Contenido del QR (texto o URL) con vista previa en vivo y debounce.
- Colores de puntos, fondo y esquinas; degradado de 2 colores (lineal/radial) y fondo transparente.
- Formas de puntos (cuadrado, redondeado, puntos, elegante…) y de esquinas (cuadrada, redondeada, punto).
- Logo central opcional con control de tamaño/margen (al añadirlo se fuerza la corrección **H**).
- Nivel de corrección de errores (L, M, Q, H) y tamaño de exportación (256–1024 px).
- 11 paletas predefinidas.
- Validación de contraste WCAG (avisa por debajo de 3:1 y si el QR está invertido).
- Descarga en PNG y en SVG.
- Persistencia de los ajustes en `localStorage` (protegida con `try/catch`).
- Modo claro/oscuro según la preferencia del sistema, interfaz en español y layout responsive.

## Estructura

```
src/
├── app/       # Entrada, layout, providers y estilos globales
├── modules/   # Funcionalidad por feature (qr-preview, colors, style, logo, palettes, contrast, export)
├── shared/    # Componentes, hooks, utils, types y constants reutilizables
└── store/     # Estado centralizado (useQRConfig)
```

Cada módulo expone su API pública a través de su `index.ts`; los imports entre módulos solo se
hacen por ese archivo. `shared/` nunca importa de `modules/`.

## Documentación

- [`docs/requirements.md`](docs/requirements.md) — requisitos funcionales y no funcionales con criterios de aceptación.
- [`docs/design.md`](docs/design.md) — diseño técnico y de UX, modelo de datos y plan por etapas.
- [`AGENTS.md`](AGENTS.md) — instrucciones para agentes de código (arquitectura y convenciones).

## Despliegue

Al ser una app estática (sin backend), se puede desplegar en cualquier hosting de sitios estáticos.

### Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. En Vercel, importa el proyecto.
3. Configura:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Despliega.

O con la CLI:

```bash
npm run build
npx vercel --prod
```

### Netlify

1. Sube el repositorio.
2. En Netlify, crea un sitio desde el repositorio.
3. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Despliega.

O con la CLI:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

> No se requiere ninguna variable de entorno ni servicio externo.
