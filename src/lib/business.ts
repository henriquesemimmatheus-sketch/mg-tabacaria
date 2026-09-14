// Placeholders below (city, phone, address, hours) need the real data from MG Tabacaria before this goes live.
export const business = {
  name: "MG Tabacaria",
  city: "Cascavel - PR",
  whatsappNumber: "554591337191",
  whatsappDisplay: "(45) 9133-7191",
  whatsappMessage: "Olá! Vi o site da MG Tabacaria e queria saber mais.",
  instagramUrl: "https://www.instagram.com/mgtabacaria1/",
  instagramHandle: "@mgtabacaria1",
  address: "Av. Gralha Azul, 680 – Guarujá",
  hours: [{ day: "Todos os dias", time: "14h às 01h" }],
};

export function whatsappLink(message: string = business.whatsappMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
}
