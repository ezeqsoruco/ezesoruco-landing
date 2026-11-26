# Tu Web Profesional que Vende 24/7 en Solo 15 Minutos — Landing de preventa

Landing estática (HTML + CSS + JS, sin frameworks ni librerías) pensada para tráfico de Meta Ads en celular.

```
site/
  index.html              # todo el copy y la estructura
  assets/css/styles.css   # tokens de color/tipografía en :root
  assets/js/config.js     # ← lo único que tenés que editar (checkout, píxel, fecha, imágenes, reseñas)
  assets/js/main.js       # animaciones, cuenta regresiva, barra fija, píxel
  assets/img/             # poné acá tus imágenes (ideal .webp)
```

## Antes de publicar: completar los [PENDIENTE]
Todo se completa en `assets/js/config.js`. Mientras un campo esté vacío, la página muestra un recuadro violeta con la etiqueta **[PENDIENTE]**.

| Qué | Dónde en config.js | Sección |
|---|---|---|
| ID del píxel de Meta | `metaPixelId` | Medición |
| Mockup laptop + celular | `images.heroMockup` | 1 · Hero |
| 4 a 6 capturas + rubro | `galeria[]` | 2 · Galería |
| Foto de Ezequiel | `images.fotoEzequiel` | 7 · Autoridad |
| Mockup del curso (clases + tapas de bonos) | `images.ofertaMockup` | 8 y 12 · Oferta |
| Testimonios reales | `resenas[]` | 10 · Reseñas |
| Imagen para compartir 1200×630 | archivo `assets/img/og.jpg` | `<head>` |

Ejemplo: copiá tu foto a `assets/img/ezequiel.webp` y poné `fotoEzequiel: "assets/img/ezequiel.webp"`.

## Cómo funciona
- **Hero:** la "página que se arma sola" está hecha 100% con código (boceto → estructura → diseño → online) y avanza con el scroll. En desktop la escena queda fija mientras se arma; en celular avanza a medida que pasa por la pantalla. Cuando cargues `heroMockup`, tu imagen aparece al final de la secuencia.
- **Precio:** no aparece antes de la sección 8. En celular, la barra fija de compra aparece después de Bonos y se esconde cuando ya hay un botón de compra en pantalla.
- **Cuenta regresiva:** fecha fija `2026-12-08T23:59:00-03:00`. No se reinicia al recargar. Al vencer, se ocultan el descuento, el contador y las fechas de preventa, se muestra USD 29 y los botones pasan a decir "Quiero mi lugar".
- **Checkout:** todos los botones de compra van a Winnerfy. Si el anuncio trae `utm_*` o `fbclid`, se pasan al checkout.
- **Píxel de Meta:** se carga después de que la página terminó de cargar. Eventos: `PageView` (al cargar), `ViewContent` (cuando la oferta entra en pantalla) e `InitiateCheckout` (clic en cualquier botón de compra). `Purchase` lo registra la pasarela de pago.

## Probar en tu compu
```bash
cd site && python3 -m http.server 8791
```
Abrí http://localhost:8791

## Publicar
Cuando esté aprobada, usá **rosset-pw-upload** (GitHub + Vercel o Netlify).
