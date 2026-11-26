/* ==========================================================
   CONFIGURACIÓN — lo único que necesitás editar.
   Todo lo que dice [PENDIENTE] se completa acá.
   Las imágenes van en  site/assets/img/  (ideal: .webp).
   Si una imagen queda vacía o no se encuentra, la página
   muestra un placeholder visible con la etiqueta [PENDIENTE].
   ========================================================== */
window.SITE_CONFIG = {
  // Checkout de Winnerfy (todos los botones de compra van acá)
  checkoutUrl: "https://pay.ezesoruco.com/checkout/webs-pro-con-inteligencia-artificial",

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

  // Sección 10 · Reseñas: SOLO testimonios reales (captura del mensaje + foto de perfil).
  resenas: [
    { src: "assets/img/resena-1.webp", foto: "assets/img/cliente-1.webp", nombre: "Max Rosset", rubro: "Marketing", texto: "La página quedó perfecta! Se ve espectacular ya sea desde el celu o compu. Todos mis clientes ahora reservan sus consultas desde ahí!" },
    { src: "assets/img/resena-2.webp", foto: "assets/img/cliente-2.webp", nombre: "Fabi Rojas", rubro: "Estética", texto: "Esto fue un antes y un después para mi estética! Genera mucha confianza y autoridad en mis clientes permitiéndome agendar más consultas. Estoy fascinada" },
    { src: "assets/img/resena-3.webp", foto: "assets/img/cliente-3.webp", nombre: "Juan Felicioli", rubro: "Productos Digitales", texto: "Los anuncios que lanzó en Meta los lleva directo a mi landing. Es increíble cómo, sin yo estar presente, mi página se encarga de vender por sí sola las 24hs!" }
  ]
};
