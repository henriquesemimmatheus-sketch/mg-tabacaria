# MG Tabacaria — Site institucional

## Sobre o negócio
- Nome: MG Tabacaria
- Ramo: narguilé, essências/carvões, destilados selecionados, kits de presente
- Localização: Av. Gralha Azul, 680 – Guarujá, Cascavel - PR
- Horário: todos os dias, 14h às 01h
- WhatsApp: (45) 9133-7191
- Instagram: @mgtabacaria1
- Restrição: venda proibida para menores de 18 anos

## Stack técnica
- Next.js 16 (App Router, Turbopack)
- TypeScript + Tailwind CSS
- Sem banco de dados — site institucional estático, sem carrinho/checkout
- Contato/pedido feito via link direto pro WhatsApp (wa.me)

## Estrutura do site (src/components)
- `AgeGate.tsx` — modal de confirmação de maioridade (18+) antes de mostrar o site
- `Header.tsx` — menu com Produtos / Sobre / Localização + botão WhatsApp
- `Hero.tsx` — título principal ("Tudo pronto pra iniciar o fim de semana"), CTA de WhatsApp e "Ver produtos", foto de narguilé em moldura circular, e um polaroid decorativo (cliente com Jack Daniel's) sobreposto ao círculo
- `Differentials.tsx` — seção "Por que a MG" com diferenciais da loja
- `Products.tsx` — catálogo em cards: Narguilés e acessórios / Essências e carvões / Destilados selecionados / Kits para presentear / E mais — cada card manda pro WhatsApp com mensagem pré-preenchida
- `About.tsx` — seção "Sobre a loja" ("O point de quem sabe curtir o fim de semana"), com foto de garrafas Antarctica em moldura circular
- `Location.tsx` — seção "Onde a gente tá" com cards de Endereço e Horário; tem um polaroid (Woody segurando narguilé) sobreposto ao card de Endereço, estilo "foto colada com fita"
- `Footer.tsx` — rodapé com aviso legal e redes sociais
- `WhatsAppFab.tsx` — botão flutuante de WhatsApp

## Estilo visual
- Tema escuro, dourado (`gold` / `gold-bright`) como cor de destaque
- Fonte serifada (display) pros títulos, sans nos textos
- Fotos reais tratadas em molduras circulares com vinheta escura nas bordas, e algumas em estilo "polaroid" (fundo bege, fita adesiva dourada, leve rotação) pra dar um toque descontraído

## Imagens usadas (em /public)
- `narguile-hero.jpg` — narguilé montado (Hero)
- `bebida-icon.jpg` — garrafas Antarctica (About)
- `woody-jack.jpg` — Woody com Jack Daniel's, P&B (Hero, polaroid)
- `woody-narguile.jpg` — Woody com narguilé (Location, polaroid)

## Deploy
- Repositório: https://github.com/henriquesemimmatheus-sketch/mg-tabacaria
- Hospedagem: Vercel (conectada ao GitHub — todo push pra `main` atualiza o site automaticamente)
- Domínio: em processo de compra/configuração

## Como pedir alterações
Qualquer ajuste de texto, imagem, cor ou posicionamento pode ser pedido em linguagem natural (ex: "muda o título do Hero", "troca essa foto", "aumenta esse elemento e move mais pra esquerda"). As edições são feitas direto no código e o site atualiza sozinho após o próximo `git push`.
