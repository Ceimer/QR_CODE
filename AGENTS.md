# AGENTS.md

Instrucciones para agentes de código que trabajen en **QR Color Studio**.

> Antes de empezar cualquier tarea, lee obligatoriamente `docs/requirements.md` y `docs/design.md`.
> Este archivo describe cómo trabajar en el repo; los otros dos describen qué construir y cómo está diseñado.

---

## 1. Descripción del proyecto

**QR Color Studio** es una web app que genera códigos QR personalizables en distintos colores.
Es una aplicación **100% frontend, sin backend**: todo el procesamiento ocurre en el navegador y
ningún dato se envía a servidores.

**Stack:**

- React + Vite + TypeScript (modo estricto)
- Tailwind CSS
- `qr-code-styling` (render y exportación del QR)
- `react-colorful` (selector de color)

---

## 2. Estructura de carpetas y responsabilidad de cada módulo

```
Casti_QR/
├── AGENTS.md
├── README.md
├── docs/
│   ├── requirements.md
│   └── design.md
├── public/
└── src/
    ├── app/            # Entrada, layout principal, providers, estilos globales
    ├── modules/
    │   ├── qr-preview/ # Render del QR en vivo
    │   ├── colors/     # Controles de color, degradados, selector
    │   ├── style/      # Formas de puntos y esquinas, tamaño, corrección de errores
    │   ├── logo/       # Carga y ajuste del logo central
    │   ├── palettes/   # Paletas predefinidas
    │   ├── contrast/   # Validación de contraste y advertencias
    │   └── export/     # Descarga PNG/SVG
    ├── shared/
    │   ├── components/ # Componentes UI reutilizables
    │   ├── hooks/
    │   ├── utils/
    │   ├── types/
    │   └── constants/
    └── store/          # Estado centralizado (useQRConfig)
```

**Responsabilidades:**

| Ruta              | Responsabilidad                                                                 |
| ----------------- | ------------------------------------------------------------------------------- |
| `app/`            | Punto de entrada, layout principal, providers y estilos globales.               |
| `modules/qr-preview` | Render de la vista previa del QR a partir de la configuración actual.        |
| `modules/colors`  | Colores de puntos, fondo y esquinas, degradados y selector de color.            |
| `modules/style`   | Formas de puntos y esquinas, tamaño y nivel de corrección de errores.           |
| `modules/logo`    | Carga, ajuste y limpieza del logo central.                                      |
| `modules/palettes`| Catálogo de paletas predefinidas (mínimo 8).                                    |
| `modules/contrast`| Cálculo y aviso de contraste (WCAG), detección de QR invertido.                 |
| `modules/export`  | Descarga del QR en PNG y SVG.                                                   |
| `shared/`         | Componentes, hooks, utilidades, tipos y constantes reutilizables y agnósticos.  |
| `store/`          | Estado centralizado del QR (`useQRConfig`), única fuente de verdad.             |

---

## 3. Reglas de arquitectura

Arquitectura **monolito modular** (feature-based). Un solo repositorio, una sola aplicación.

1. **Cada módulo** contiene su propio `components/`, `hooks/`, `types.ts` e `index.ts`.
2. El `index.ts` es la **API pública** del módulo. Solo se puede importar desde ahí.
3. **Prohibido** importar rutas internas de otro módulo
   (por ejemplo `../modules/colors/components/ColorPicker`). Siempre
   `../colors` (que resuelve a su `index.ts`).
4. Si un módulo necesita algo de otro, primero evalúa si ese "algo" debería vivir en
   `shared/`. Los módulos **no deben** compartir detalles de implementación entre sí.
5. **`shared/` no puede importar de `modules/`.** La dependencia va solo en una dirección:
   `app/` → `modules/` → `shared/`. Y `app/` → `store/` → `shared/`.
6. Cada módulo puede leer y actualizar el estado únicamente a través del `store/` (`useQRConfig`)
   y de su API pública; no accede al estado interno de otro módulo.
7. Cada carpeta debe quedar versionada (`.gitkeep` o un `index.ts` con comentario).

**Imports permitidos:**

- `app/` → `modules/*`, `store`, `shared/*`
- `modules/x` → `modules/y` (solo vía `y/index.ts`), `store`, `shared/*`
- `store` → `shared/*`
- `shared/*` → `shared/*`

**Imports prohibidos:**

- `shared/*` → `modules/*`
- `modules/x` → rutas internas de `modules/y` (deep imports)
- Cualquier import desde `../modules/.../components/...` saltándose el `index.ts`

---

## 4. Convenciones de código

- **TypeScript estricto** (`strict: true`). No usar `any` sin justificación explícita.
- **Componentes funcionales** con hooks. Nada de clases.
- **Nombres en inglés** para archivos, carpetas, variables, funciones, tipos y ramas.
- **Textos de interfaz en español** (labels, botones, mensajes, advertencias).
- **Un componente por archivo**, con el nombre del archivo igual al del componente.
- Utilidades puras y testeables en `shared/utils/`.
- Preferir composición sobre props booleanas y sobre lógica condicional compleja.
- No añadir comentarios salvo que aporten contexto no evidente.

---

## 5. Comandos útiles

El proyecto expondrá estos scripts (a definir cuando se inicialice Vite):

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de producción (incluye chequeo de tipos)
npm run preview  # Previsualizar el build de producción
npm run lint     # Lint (ESLint)
npm run typecheck # Chequeo de tipos (tsc --noEmit)
```

> No ejecutar `npm install` ni inicializar herramientas sin que se solicite explícitamente.

---

## 6. Definition of Done

Una tarea se considera terminada cuando:

- [ ] Compila sin errores de TypeScript (`npm run typecheck`).
- [ ] No hay warnings de lint (`npm run lint`).
- [ ] Es accesible: labels asociados, foco visible, navegación por teclado.
- [ ] Funciona en móvil y en escritorio (responsive).
- [ ] Respeta los límites entre módulos (imports solo por `index.ts`).
- [ ] Los textos visibles están en español.
- [ ] No se envían datos a ningún servidor.

---

## 7. Qué NO hacer

- **No** agregar backend, base de datos ni autenticación. La app es 100% frontend.
- **No** instalar dependencias sin justificarlo y sin aprobación.
- **No** romper los límites entre módulos (deep imports, `shared/` importando `modules/`).
- **No** introducir envío de datos a servidores (analytics, telemetría, fuentes remotas, etc.).
- **No** crear archivos de documentación adicionales sin solicitarlo.
