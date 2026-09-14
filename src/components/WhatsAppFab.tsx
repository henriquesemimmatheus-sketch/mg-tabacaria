import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/business";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ground shadow-lg shadow-black/40 transition-transform hover:scale-105 hover:bg-gold-bright"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
