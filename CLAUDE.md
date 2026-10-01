@AGENTS.md

# MG Bebidas & Tabacaria

Site em Next.js + Tailwind. Leia `PROJETO.md` para o contexto do negócio e `DESIGN.md` para as regras de conformidade e o tom de texto.

## Identidade visual (manda sobre o DESIGN.md)

A loja já tem duas logos definidas (MG Bebidas e MG Tabacaria): fundo preto, letras cromadas prateadas e arabescos dourados. O site segue essa identidade:

- Fundo escuro, dourado como destaque, prata nos realces. Tokens em `src/app/globals.css`.
- Fontes: Cinzel (títulos) e Jost (texto).
- Logos em `public/logo-mg-bebidas.webp` e `public/logo-mg-tabacaria.webp`, com fundo transparente.
- NÃO usar a seção 4 do `DESIGN.md` (neo-brutalismo neon com magenta, limão e ciano). Foi testada e recusada.
- Evitar efeitos de líquido, bolhas e copo desenhado em SVG. Foram testados e recusados.

## O que vale do DESIGN.md

- Seções 1, 2, 3 e 5: conceito, regras de conformidade, páginas e exemplos de texto.
- Não usar imperativos de consumo nos textos ("compre", "fume", "peça já"). Preferir "Conheça", "Fica a dica", "Falar no WhatsApp".
- Nada que associe produto a sucesso, sexualidade, esporte ou saúde.
- Só pessoas claramente adultas nas fotos.
- Portão 18+ na entrada e rodapé com "Conteúdo destinado exclusivamente a maiores de 18 anos".
- Só exibir na vitrine o que o advogado aprovou.

## Como trabalhar

1. Mudança pequena por vez: uma seção ou um recurso, depois mostrar e esperar aprovação.
2. Antes de construir algo novo de movimento ou layout, descrever em poucas linhas ou mostrar uma prévia e esperar o "sim".
3. Celular primeiro: a maioria do público usa o site no celular. Alvos de toque de pelo menos 44 px e nada de efeito que dependa de mouse (hover, inclinação, holofote).
4. Animar só `transform` e `opacity`. Respeitar `prefers-reduced-motion`. Nada de animação pesada presa à rolagem.
5. Depois de cada mudança visual, conferir no navegador em 390 px (celular) e 1440 px (desktop), sem rolagem lateral.
6. Commit e push só quando o usuário pedir. O push atualiza o site publicado.

## Checklist de aprovação de cada seção

- [ ] Combina com as logos (preto, prata, dourado), não com template genérico
- [ ] Legível e sem quebra em 390 px
- [ ] Animação suave, sem travar
- [ ] Nenhuma regra de conformidade violada
- [ ] Sem imperativos de consumo nos textos

## Dados e catálogo

- Produtos de bebida: `src/lib/whiskies.ts` (nome, preço, foto, notas). Sem `price`, o card mostra "Consultar preço".
- Carrinho: `src/lib/cart.tsx`. O botão "Enviar pedido pelo WhatsApp" monta o pedido pronto (itens, quantidades e total) e abre a conversa com a loja; não há pagamento no site.
- Contato e horário: `src/lib/business.ts`.
- Fotos de produto vêm recortadas (fundo transparente) em `public/whisky/`. Fotos de loja são preferíveis às de sites de terceiros por causa dos direitos de imagem.
- Essências: `src/lib/essencias.ts` (118+ sabores, perfis, gelado, mistura) e fotos em `public/essencias/`. O preço (R$ 10 a R$ 18) vem da coluna `preco_interno` da planilha, confirmado pelo dono como valor de venda, e é exibido no site e no carrinho.

## Padrão dos cards de promoção (obrigatório)

Toda promoção nova segue o mesmo padrão. Só preencha os dados em `src/lib/promocoes.ts`; não crie layout diferente.
- Caixa de imagem com a mesma proporção (4/5) quando há vários cards; o título reserva 2 linhas; a validade e o bloco de preço têm altura reservada.
- O botão fica sempre na mesma linha, embaixo, com o mesmo estilo (dourado cheio, sombra dura). `acao: "whatsapp"` troca só o destino, nunca o visual.
- Depois de publicar, medir no navegador (celular) que imagem, título, preço e botão estão na mesma posição entre os cards.
- Carvões: `src/lib/carvoes.ts` (marca, tamanhos e preços) e fotos em `public/carvoes/`, recortadas rente ao conteúdo.
