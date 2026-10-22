// Dados reais da loja. O site e o SEO (JSON-LD) leem daqui.
export const business = {
  name: "MG Bebidas & Tabacaria",
  url: "https://www.mgtabacaria.com",
  city: "Cascavel - PR",
  whatsappNumber: "5545991337191",
  whatsappDisplay: "(45) 99133-7191",
  whatsappMessage: "Olá! Vi o site da MG Bebidas & Tabacaria e queria saber mais.",
  instagramUrl: "https://www.instagram.com/mgtabacaria1/",
  instagramHandle: "@mgtabacaria1",
  address: "Av. Gralha Azul, 680, Guarujá",
  neighborhood: "Guarujá",
  // Ficha da loja no Google (place id lido da busca em 22/10/2026).
  googlePlaceId: "ChIJG56wqqLX85QR9jHPQlWROXg",
  googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJG56wqqLX85QR9jHPQlWROXg",
  googleReviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJG56wqqLX85QR9jHPQlWROXg",
  googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJG56wqqLX85QR9jHPQlWROXg",
  // Horário igual ao da ficha do Google (conferido em 20/10/2026). Segunda fechado.
  hours: [
    { day: "Segunda", time: "Fechado" },
    { day: "Terça", time: "14h às 02h" },
    { day: "Quarta", time: "14h às 23h" },
    { day: "Quinta", time: "14h às 03h" },
    { day: "Sexta", time: "14h às 04h" },
    { day: "Sábado", time: "14h às 04h" },
    { day: "Domingo", time: "10h às 00h30" },
  ],
  // Mesmo horário em formato schema.org (dados estruturados para o Google).
  schedule: [
    { dayOfWeek: "Tuesday", opens: "14:00", closes: "02:00" },
    { dayOfWeek: "Wednesday", opens: "14:00", closes: "23:00" },
    { dayOfWeek: "Thursday", opens: "14:00", closes: "03:00" },
    { dayOfWeek: "Friday", opens: "14:00", closes: "04:00" },
    { dayOfWeek: "Saturday", opens: "14:00", closes: "04:00" },
    { dayOfWeek: "Sunday", opens: "10:00", closes: "00:30" },
  ],
};

export function whatsappLink(message: string = business.whatsappMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
}
