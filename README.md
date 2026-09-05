# MI CENTRO

Centro de control personal: inventario, trabajos, dinero, control, wishlist y estadísticas.
Aplicación de un solo usuario, sin registro. **Los datos se guardan en el navegador** (`localStorage`, clave `mi-centro-v1`) y se pueden exportar/importar en JSON.

## Contenido del repositorio

```
index.html                ← la aplicación
support.js                ← runtime necesario (no borrar)
icon.svg                  ← logo
icon-32.png  icon-512.png ← favicon para navegador y Google
apple-touch-icon.png      ← icono al añadir a la pantalla de inicio
og.png                    ← imagen al compartir el enlace (WhatsApp, X, Google)
manifest.webmanifest      ← nombre e iconos de la app instalada
robots.txt                ← permite que Google la indexe
.nojekyll                 ← evita que GitHub Pages ignore archivos
README.md
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `mi-centro`).
2. Sube estos 4 archivos a la raíz del repositorio.
3. En el repositorio: **Settings → Pages**.
4. En *Source* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
5. Al minuto estará en `https://TU-USUARIO.github.io/mi-centro/`.

También funciona abriendo `index.html` directamente desde el disco (doble clic), o en Vercel / Netlify arrastrando la carpeta.

## Cómo se guardan los datos

- Todo vive en el navegador del dispositivo donde la abres. No hay servidor ni cuenta.
- Cada navegador y cada dominio tienen su propio almacén: los datos del móvil no se ven en el ordenador.
- **Exporta JSON de vez en cuando** (Configuración → Exportar JSON). La app avisa cada 30 días.
- Para pasar los datos a otro dispositivo: exporta JSON en uno e impórtalo en el otro.
- Borrar los datos del navegador o usar modo incógnito **borra la información**.

## Qué incluye

- **Dashboard** — 5 KPIs grandes y 5 pequeños, cuentas con registro de gasto/ingreso, alertas y tareas de webs.
- **Inventario** — pestañas por dominio (filtros del mismo inventario), creación mínima + `MÁS OPCIONES`, foto, historial automático de cambios de estado y ubicación. Las webs son un tipo de objeto con sus tareas.
- **Trabajos** — las 11 fases, equipo utilizado, clientes, tarifas por cliente, presupuestos y cobros múltiples.
- **Dinero** — cuentas, inversiones con movimientos, gastos, suscripciones y patrimonio (financiero separado de bienes).
- **Control** — mantenimiento, garantías, préstamos, consumibles y kits con checklist reiniciable.
- **Futuro** — wishlist con ahorro global y barras de progreso ordenadas por cercanía, paso a inventario al marcar comprado, y comparador.
- **Estadísticas** — valor por categoría, equipo más utilizado, ingresos por cliente, gasto por categoría, wishlist por prioridad.
- **Configuración** — PIN de interfaz, categorías, ubicaciones, archivados recuperables y copias de seguridad.
- **Apuntar rápido + Bandeja** — registrar en 5 segundos y convertir después en objeto, gasto, mantenimiento, wishlist, préstamo, trabajo, cliente, suscripción o web.
- **Búsqueda global** con `⌘K` / `Ctrl+K`.

## Notas

- El PIN es un candado de interfaz, **no cifra los datos**.
- Las fotos se reescalan a 420 px antes de guardarse para no llenar el almacenamiento del navegador.
- Los 35 objetos del inventario están sembrados como aproximación (valor estimado ≈ 7.013 €, la cifra del documento): la especificación no los detallaba uno a uno. Edítalos o bórralos desde Inventario.
