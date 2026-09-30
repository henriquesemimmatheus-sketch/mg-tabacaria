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
- Carrinho: `src/lib/cart.tsx`. Por enquanto só monta a lista; a finalização do pedido ainda não existe.
- Contato e horário: `src/lib/business.ts`.
- Fotos de produto vêm recortadas (fundo transparente) em `public/whisky/`. Fotos de loja são preferíveis às de sites de terceiros por causa dos direitos de imagem.
