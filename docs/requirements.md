# Requisitos — QR Color Studio

Documento de requisitos funcionales y no funcionales. Cada requisito se identifica con un
código (`RF-xx` para funcionales, `RNF-xx` para no funcionales) y lleva criterios de aceptación
verificables.

> Relacionado: `docs/design.md` (diseño técnico y de UX) y `AGENTS.md` (cómo trabajar en el repo).

---

## 1. Visión general

QR Color Studio es una web app que genera códigos QR personalizables en distintos colores y
estilos. Es **100% frontend**: todo el procesamiento ocurre en el navegador y ningún dato se
envía a servidores.

---

## 2. Requisitos funcionales

### RF-01 — Contenido del QR con vista previa en vivo

El usuario puede introducir el contenido a codificar (texto o URL) y ver la vista previa
actualizarse en tiempo real.

**Criterios de aceptación**

- Existe un campo de entrada para el contenido con una etiqueta asociada.
- Al cambiar el contenido, la vista previa se actualiza sin recargar la página.
- Si el contenido está vacío, se muestra un estado vacío o un mensaje claro en lugar de un QR inválido.
- Contenidos largos se codifican sin romper la interfaz (mensajes de error si exceden la capacidad).

### RF-02 — Colores de puntos, fondo y esquinas

El usuario puede elegir el color de los puntos (módulos), del fondo y de las esquinas
(patrones de posición).

**Criterios de aceptación**

- Hay controles de color separados para puntos, fondo y esquinas.
- Cada control permite seleccionar un color arbitrario mediante selector visual.
- El cambio se refleja en la vista previa de inmediato.
- Es posible restablecer los colores a los valores por defecto.

### RF-03 — Degradados

El usuario puede aplicar un degradado (lineal o radial) al color de los puntos.

**Criterios de aceptación**

- Se puede activar/desactivar el degradado.
- Se puede elegir tipo (lineal/radial), ángulo y colores de inicio/fin.
- La vista previa muestra el degradado aplicado a los puntos.
- Al desactivar el degradado se conserva el color plano seleccionado en RF-02.

### RF-04 — Fondo transparente

El usuario puede activar un fondo transparente en lugar de un color sólido.

**Criterios de aceptación**

- Existe un interruptor "Fondo transparente".
- Al activarlo, el fondo del QR no se rellena con color.
- La exportación PNG respeta la transparencia; la exportación SVG usa `fill="none"`.
- Al desactivarlo se recupera el último color de fondo elegido.

### RF-05 — Formas de puntos y esquinas

El usuario puede elegir entre varias formas para los puntos y para los patrones de esquina.

**Criterios de aceptación**

- Hay al menos 4 opciones de forma de puntos (p. ej. cuadrado, redondeado, puntos, clase).
- Hay al menos 3 opciones de forma de esquina (p. ej. cuadrado, redondeado, círculo).
- La selección se refleja en la vista previa.
- Cada control muestra la opción activa de forma accesible.

### RF-06 — Logo central

El usuario puede cargar una imagen para colocarla en el centro del QR y ajustar su tamaño y margen.

**Criterios de aceptación**

- Se puede cargar un logo desde el equipo (PNG/JPG/SVG).
- Se puede ajustar el tamaño del logo (porcentaje del QR).
- Se puede eliminar el logo y volver al QR sin logo.
- Al cargar un logo se sugiere subir el nivel de corrección de errores si es bajo (ver RNF-04 / RF-07).

### RF-07 — Nivel de corrección de errores

El usuario puede seleccionar el nivel de corrección de errores (L, M, Q, H).

**Criterios de aceptación**

- Existen las cuatro opciones L/M/Q/H con descripción legible.
- La opción activa es visible y persistente.
- El cambio se refleja en la regeneración del QR.

### RF-08 — Tamaño de exportación (256–1024 px)

El usuario puede elegir el tamaño del QR en un rango de 256 a 1024 px.

**Criterios de aceptación**

- El control admite valores enteros entre 256 y 1024 px.
- El valor por defecto está dentro del rango.
- El tamaño se aplica a la exportación (RF-11).
- La vista previa se adapta sin deformar el QR.

### RF-09 — Paletas predefinidas

El usuario puede aplicar paletas de color predefinidas (mínimo 8).

**Criterios de aceptación**

- Se ofrecen al menos 8 paletas.
- Aplicar una paleta actualiza puntos, fondo y esquinas de forma coherente.
- Cada paleta tiene un nombre legible y una muestra visual de sus colores.
- Se puede volver a los colores por defecto.

### RF-10 — Validación de contraste

La app calcula el contraste entre puntos y fondo y advierte cuando puede afectar la legibilidad.

**Criterios de aceptación**

- Se calcula la relación de contraste conforme a WCAG 2.1.
- Si la relación es inferior a 3:1, se muestra una advertencia visible y en español.
- Se detecta y advierte el **QR invertido** (puntos claros sobre fondo oscuro).
- La advertencia no bloquea la edición ni la exportación, solo informa.

### RF-11 — Descarga PNG y SVG

El usuario puede descargar el QR resultante en PNG y en SVG.

**Criterios de aceptación**

- Hay botones "Descargar PNG" y "Descargar SVG".
- El PNG se genera con el tamaño definido en RF-08 y respeta la transparencia (RF-04).
- El SVG es vectorial y editable.
- La descarga ocurre íntegramente en el navegador (sin subir datos).

### RF-12 — Persistencia en localStorage

Los ajustes del usuario se guardan en el navegador y se restauran al volver.

**Criterios de aceptación**

- La configuración (contenido, colores, estilos, tamaño, corrección) se guarda en `localStorage`.
- Al recargar, se restablece la última configuración guardada.
- Existe una acción explícita para restablecer la configuración por defecto.
- El logo se maneja sin romper la persistencia si su tamaño excede el límite de almacenamiento.

---

## 3. Requisitos no funcionales

### RNF-01 — Rendimiento (vista previa con debounce)

La vista previa se actualiza con fluidez sin bloquear la interfaz.

**Criterios de aceptación**

- Los cambios de entrada rápidos (p. ej. escribir o arrastrar un color) aplican debounce antes de re-renderizar.
- El render del QR no provoca caídas de fotogramas perceptibles en equipos de gama media.
- No se regeneran recursos innecesarios al repetir la misma configuración.

### RNF-02 — Accesibilidad

La interfaz cumple buenas prácticas de accesibilidad.

**Criterios de aceptación**

- Todos los controles tienen etiqueta (`label`) asociada.
- El foco es visible en todos los elementos interactivos.
- La navegación completa es posible con teclado.
- Los mensajes de contraste y error son accesibles (rol/aria adecuados).

### RNF-03 — Responsive y modo claro/oscuro

La app funciona en móvil y escritorio, con tema claro y oscuro.

**Criterios de aceptación**

- En escritorio: dos columnas (controles a la izquierda, vista previa fija a la derecha).
- En móvil: vista previa arriba y controles debajo.
- Existe un conmutador de tema claro/oscuro; el tema se respeta al recargar.
- La interfaz es usable desde 320 px de ancho.

### RNF-04 — Interfaz en español

Todos los textos visibles están en español.

**Criterios de aceptación**

- Etiquetas, botones, ayudas y advertencias están en español.
- No quedan textos de interfaz en otros idiomas.

### RNF-05 — Privacidad (sin envío de datos a servidores)

La aplicación no transmite datos.

**Criterios de aceptación**

- No hay llamadas de red con datos del usuario.
- No se incluyen analytics, telemetría ni fuentes remotas.
- El QR, el logo y la configuración permanecen en el navegador.

---

## 4. Fuera de alcance

- Backend, API o base de datos.
- Cuentas de usuario y autenticación.
- QR dinámicos (con redirección editable en servidor).
- Estadísticas de escaneo.
- Colaboración multiusuario o sincronización en la nube.
