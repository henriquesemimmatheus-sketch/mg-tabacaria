import { Container } from "./Container";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { business, whatsappLink } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg text-ink">
            <span className="text-gold-bright">MG</span> Tabacaria
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Venda proibida para menores de 18 anos. Se beber, não dirija.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da MG Tabacaria"
            className="text-ink-muted transition-colors hover:text-gold-bright"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp da MG Tabacaria"
            className="text-ink-muted transition-colors hover:text-gold-bright"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </Container>
      <Container className="mt-6 border-t border-line pt-6 text-center text-xs text-ink-muted sm:text-left">
        © {new Date().getFullYear()} {business.name}. Todos os direitos reservados.
      </Container>
    </footer>
  );
}
