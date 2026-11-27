# jp.vidzz · Landing y tarjeta digital

Páginas estáticas, sin build. Solo usan las fuentes Inter e Inter Tight de Google Fonts.

- `index.html`: landing (hero, servicios, marcas, proyectos, línea de tiempo, planes y cotizador, asistente).
- `tarjeta.html`: tarjeta digital (WhatsApp, guardar contacto, compartir, QR).
- `assets/`: logos, fotos de servicios (`srv-*`, `servicio-*`), fotogramas de proyectos (`proy-*`) y logos de marcas (`marcas/`).

## Cosas que se cambian en un solo lugar (bloque `CONFIGURACIÓN` del script de `index.html`)

- `WA_NUMBER`: WhatsApp (también en `tarjeta.html`).
- `PLANS`: nombres, frases, precios (sin pauta / con pauta) y lo que incluye cada plan.
- `CARD_FEE`: comisión por pago con tarjeta (4%).
- `TIMELINE_IMG`: ruta de la captura real de la línea de tiempo de edición (si se deja vacío se muestra la animada).
- `REEL_VIDEO`: ruta del video compilatorio. Mientras esté vacío, ese bloque no se muestra.
- `PHOTO_URL` (en `tarjeta.html`): retrato para el aro de la tarjeta.

## Notas de contenido

- Las condiciones internas (duración de sesión, rondas de revisión, tiempos de entrega, pauta pagada directo a la plataforma,
  piezas que no se acumulan y mínimo de 3 meses) no se muestran en la página; se acuerdan por escrito con el cliente.
