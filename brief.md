# Creá tu Página Web con IA — Brief

## Proyecto
- **Rubro:** educación digital · curso online low ticket en preventa.
- **Nombre:** Creá tu Página Web con IA.
- **Objetivo:** validar intención de compra con tráfico de Meta Ads (mayoría celular).
- **CTA principal:** Compra → checkout de Winnerfy
  `https://pay.ezesoruco.com/checkout/webs-pro-con-inteligencia-artificial`
- **Público:** (1) dueños de negocio que quieren una página profesional; (2) personas que buscan un ingreso extra creando páginas para otros.
- **Idioma:** español rioplatense (voseo). Siempre "Claude", nunca "Cloud".
- **Referencia:** no hay. La landing en sí es la demostración del curso.

## Estilo
**Premium sin video.** Todas las imágenes las provee Ezequiel. No se generan prompts de imágenes ni de clips: el movimiento (incluido el scroll del hero) se resuelve con código (HTML/CSS/JS) sobre sus imágenes.

- Tech premium, fondo oscuro, un acento vivo, titulares grandes.
- Tarjetas de vidrio (glassmorphism), línea de tiempo vertical, bonos como cajas, contadores animados.
- Detalles de estudio: grano sutil, glow del acento, revelados al scroll, botones magnéticos (solo desktop), marquesina infinita en la galería.
- Mobile first y carga rápida: sin frameworks pesados, CSS y JS propios, imágenes en `loading="lazy"` salvo el hero, `prefers-reduced-motion` respetado.

## Concepto: "la página que se arma sola"
El hero está fijado (sticky) y con el scroll una ventana de navegador construye una landing en pantalla, toda hecha con código:
1. **Boceto:** grilla, líneas punteadas y bloques grises de wireframe (como dibujado a mano).
2. **Estructura:** los bloques toman forma (nav, titular, botón, tarjetas).
3. **Estilo:** entra el color, la tipografía, el glow violeta, el vidrio.
4. **Final:** aparece el mockup real de laptop + celular de Ezequiel [PENDIENTE] y el sello flotante "Esta página fue creada con el método del curso".

Los textos del hero (pre-titular, H1, subtítulo, botón) acompañan la secuencia. En celular la secuencia se acorta para no frenar la lectura.

## Paleta
| Rol | Hex |
|---|---|
| Fondo | `#07060B` |
| Superficie / vidrio | `rgba(255,255,255,0.04)` sobre `#0E0C16` |
| Texto | `#F4F2FA` |
| Texto secundario | `#A29FB3` |
| Acento violeta eléctrico | `#8B5CFF` (glow `#A78BFA`) |

## Tipografías
- **Titulares:** Bricolage Grotesque (700–800), muy grandes, tracking negativo.
- **Texto:** Inter (400–600).
- **Detalles / etiquetas:** JetBrains Mono (mayúsculas chicas, tono "código").

## Secciones (en orden)
1. Hero (sin precio, descuento ni fechas)
2. Galería — carrusel infinito de capturas [PENDIENTE]
3. Dolores — 5 tarjetas de vidrio
4. Transformación — 5 tarjetas + botón al temario
5. Temario — línea de tiempo vertical (7 pasos)
6. Bonos — 5 cajas con valor tachado
7. Autoridad — foto [PENDIENTE] + contadores animados
8. Oferta de preventa — **primer lugar con precio** + cuenta regresiva
9. Garantía — sello circular
10. Reseñas — carrusel [PENDIENTE: testimonios reales]
11. Preguntas frecuentes — acordeón
12. Oferta final compacta
+ Pie de página.

El copy de cada sección es exactamente el entregado en el pedido original (no se inventan datos, precios, números ni testimonios).

## Reglas de negocio
- El precio no aparece antes de la sección 8.
- En celular, el botón fijo de compra aparece recién después de la sección 6 (Bonos).
- Cuenta regresiva a fecha fija: **8/12/2026 23:59 (UTC-3)** = `2026-12-09T02:59:00Z`. No se reinicia al recargar. Al terminar: se oculta el descuento y se muestra USD 29.
- Todos los botones de compra → checkout de Winnerfy.

## Medición (Meta)
- Píxel [PENDIENTE: ID], cargado de forma asíncrona y diferida (no bloquea el render).
- Eventos: `PageView`, `ViewContent`, `Scroll50` y `Scroll75` (custom), `ClicComprar` (custom) en cada botón de compra.
- **No** se disparan `InitiateCheckout` ni `Purchase` (los registra Winnerfy).

## Archivos que provee Ezequiel (carpeta `site/assets/img/`, rutas en `site/assets/js/config.js`)
| Archivo | Sección |
|---|---|
| `hero_mockup.webp` | 1 · Hero (laptop + celular) |
| `galeria_1.webp` … `galeria_6.webp` | 2 · Galería (capturas desktop + celular) |
| `foto_ezequiel.webp` | 7 · Autoridad |
| `oferta_mockup.webp` | 8 y 12 · Oferta (clases + tapas de los 5 bonos) |
| `resena_1.webp` … | 10 · Reseñas (capturas reales) |
| `og.jpg` (1200×630) | Vista previa al compartir |

Hasta que estén, cada lugar muestra un placeholder visible con la etiqueta `[PENDIENTE]`.

## Cambios (24/11/2026)
- Bonos: B1 USD 5,99 · B2 USD 14,99 · B3 USD 8,99 · B4 USD 13,99 · B5 USD 9,99 = USD 53,95 (cada uno marcado "Gratis").
- Valor total USD 82,95 (curso 29 + bonos 53,95) → preventa USD 29 (65% OFF) hasta el 8/12. Desde el 9/12: USD 41,50 (50% OFF). "Pago único en tu moneda local". Mockup de oferta: site/assets/img/mockup-oferta.webp. Galería en el orden en que se agregaron los archivos.
- Galería con 12 capturas reales (Amélie, Bör, Giolitti, Nina) en `site/assets/img/galeria/` (WebP); originales en `originales/`.
- Sin aviso legal de Meta en el pie. Sin etiqueta [PENDIENTE] sobre el mockup del hero.
