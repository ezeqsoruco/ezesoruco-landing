/* ==========================================================
   CONFIGURACIÓN — lo único que necesitás editar.
   Todo lo que dice [PENDIENTE] se completa acá.
   Las imágenes van en  site/assets/img/  (ideal: .webp).
   Si una imagen queda vacía o no se encuentra, la página
   muestra un placeholder visible con la etiqueta [PENDIENTE].
   ========================================================== */
window.SITE_CONFIG = {
  // Checkout de Winnerfy (todos los botones de compra van acá)
  checkoutUrl: "https://ezesoruco.winnerfy.app/checkout/webs-pro-con-inteligencia-artificial",

  // [PENDIENTE] ID del píxel de Meta (solo números). Vacío = no se carga.
  metaPixelId: "",

  // Fin de la preventa: 8/12/2026 23:59 hora de Argentina (UTC-3).
  // Es una fecha fija: no se reinicia al recargar.
  deadline: "2026-12-08T23:59:00-03:00",

  // Precio de preventa: USD 29 (65% OFF sobre el valor total de USD 82,95).
  // Precio desde el 9 de diciembre (50% OFF sobre el valor total).
  precioPostPreventa: "USD 41,50",

  images: {
    // [PENDIENTE] Sección 1 · Hero: mockup de laptop + celular. Ej: "assets/img/hero-mockup.webp"
    heroMockup: "",
    // Sección 7 · Autoridad
    fotoEzequiel: "assets/img/ezequiel.webp",
    // Secciones 8 y 12 · Oferta
    ofertaMockup: "assets/img/mockup-oferta.webp"
  },

  // Sección 2 · Galería: capturas de páginas creadas con el método.
  // Se muestran en este orden. Agregá, quitá o reordená libremente. Originales en /originales.
  galeria: [
    { src: "assets/img/galeria/nina_1.webp", rubro: "Nina · Uñas" },
    { src: "assets/img/galeria/nina_2.webp", rubro: "Nina · Uñas" },
    { src: "assets/img/galeria/nina_3.webp", rubro: "Nina · Uñas" },
    { src: "assets/img/galeria/giolitti_1.webp", rubro: "Giolitti · Heladería" },
    { src: "assets/img/galeria/giolitti_2.webp", rubro: "Giolitti · Heladería" },
    { src: "assets/img/galeria/giolitti_3.webp", rubro: "Giolitti · Heladería" },
    { src: "assets/img/galeria/giolitti_4.webp", rubro: "Giolitti · Heladería" },
    { src: "assets/img/galeria/bor_1.webp", rubro: "Bör · Cafetería" },
    { src: "assets/img/galeria/bor_2.webp", rubro: "Bör · Cafetería" },
    { src: "assets/img/galeria/bor_3.webp", rubro: "Bör · Cafetería" },
    { src: "assets/img/galeria/amelie_1.webp", rubro: "Amélie · Estética" },
    { src: "assets/img/galeria/amelie_2.webp", rubro: "Amélie · Estética" }
  ],

  // [PENDIENTE] Sección 10 · Reseñas: SOLO testimonios reales.
  // Ejemplo: { src: "assets/img/resena-1.webp", nombre: "Nombre", rubro: "Rubro" }
  resenas: []
};
