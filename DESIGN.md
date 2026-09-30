# DESIGN.md: MG Tabacaria (site institucional + vitrine de acessórios)

> **Aviso:** a seção 4 (Direção visual: neo-brutalismo neon) foi testada e NÃO vale. O visual do site segue as logos da loja (preto, prata e dourado); veja o `CLAUDE.md`. As demais seções (conceito, conformidade, páginas, texto e checklist) continuam valendo.

Leia este arquivo antes de gerar qualquer tela, componente ou texto. Ele manda sobre qualquer padrão do framework.

## 1. Conceito

**"A loja da noite boa."** O site transmite energia de festa, amizade e momentos divertidos. A diversão é a identidade da LOJA e do espaço, nunca um apelo para consumir tabaco.

Tom de voz: descontraído, irreverente, curto. Frases afirmativas, sem ordens ao cliente.

## 2. Regras de conformidade (inegociáveis)

Base: Lei 9.294/96 (art. 3 e 3-A). Validar com profissional jurídico antes de publicar.

- Portão de idade 18+ na entrada do site (tela cheia, botão "Tenho 18 anos ou mais" e "Sair"). Guardar a escolha na sessão.
- Aprovado pelo advogado da loja: vitrine de essências e acessórios de narguilé, e também de cigarro, fumo, charuto e demais produtos de tabaco. Guardar a aprovação por escrito (e-mail ou documento) junto ao projeto, com a lista exata do que foi aprovado.
- Só exibir o que consta na aprovação. Em caso de dúvida sobre um item novo, deixar de fora até confirmar com o advogado.
- Pode mostrar pessoas adultas fumando e fumaça como elemento visual. Nunca crianças ou adolescentes, nem ninguém que pareça menor de idade (usar apenas adultos claramente maiores de 18 anos, com autorização de imagem). A cena não pode associar o uso a sucesso, conquista, sexualidade, virilidade, esporte ou saúde.
- NÃO usar imperativos diretos ("compre", "fume", "peça já"). Preferir "Conheça", "Fica a dica", "Passa aqui".
- NÃO associar produto a sucesso, sexualidade, virilidade, esporte ou propriedades de saúde/calmante/estimulante.
- Vitrine online aprovada: produtos de tabaco (cigarro, fumo, charuto), essências e acessórios de narguilé (mangueiras, piteiras, carvão, bases, etc.), isqueiros, cinzeiros, sedas e acessórios, presentes, decoração, camisetas e adesivos da marca.
- Cards de produtos de tabaco e essências: mostrar embalagem, nome e descrição neutra. Sem alegações de saúde, relaxamento ou estímulo, sem associação a sucesso, sexualidade ou esporte, e sem imperativos.
- Usar os avisos e advertências exigidos nas embalagens e, se o advogado indicar, nas páginas de produto. Perguntar a ele sobre venda online com pagamento e entrega: manter o botão "Falar no WhatsApp" até a resposta.
- Rodapé: "Conteúdo destinado exclusivamente a maiores de 18 anos."

## 3. Páginas

1. **Home**: hero de impacto (tipografia gigante + colagem de stickers), faixa marquee, destaques de acessórios e presentes, bloco "Como é a loja", bloco de eventos, mapa e WhatsApp.
2. **A Loja**: história, fotos reais do espaço e da equipe, horário, endereço.
3. **Vitrine** com abas: Tabaco, Essências, Acessórios de Narguilé, Isqueiros e Sedas, Presentes e Marca. Grade de cards com filtro por categoria e sabor. Botão "Falar no WhatsApp" (sem carrinho até confirmação jurídica).
4. **Eventos e Clima**: agenda de ações da loja, galeria de momentos (sem consumo de tabaco nas fotos).
5. **Contato**: mapa, horários, WhatsApp, Instagram.

## 4. Direção visual: neo-brutalismo de cartaz de festa

Referências a buscar (Godly, Awwwards, Dribbble): "neo brutalism", "gig poster", "nightlife", "event". Escolher 3 links e colar aqui:

- Ref 1: (colar link)
- Ref 2: (colar link)
- Ref 3: (colar link)

### Paleta (usar só estas cores)

| Papel | Nome | Hex |
|---|---|---|
| Fundo escuro | Noite | #0F0B1E |
| Fundo claro | Papel | #FFF4E0 |
| Destaque 1 | Magenta festa | #FF2E93 |
| Destaque 2 | Amarelo limão | #DFFF3D |
| Destaque 3 | Ciano neon | #22E5FF |
| Texto em claro | Tinta | #140F26 |
| Borda e sombra dura | Preto | #000000 |

Regra: no máximo 1 cor de destaque dominante por seção, as outras em detalhes. Contraste mínimo AA (texto sobre magenta usa #140F26 ou branco, conferir).

### Tipografia (Google Fonts)

- Títulos: **Anton** (caixa alta, condensada, enorme, tracking apertado)
- Subtítulos e botões: **Bricolage Grotesque** 700
- Texto corrido: **Space Grotesk** 400/500
- Detalhes e etiquetas: **DM Mono**

Escala: hero clamp(3.5rem, 12vw, 11rem); H2 clamp(2.25rem, 6vw, 5rem); corpo 1rem a 1.125rem.

### Componentes

- Cards: fundo claro, borda preta de 3px, sombra dura 6px 6px 0 #000, cantos 12px. No hover, o card sobe 4px e a sombra cresce.
- Botões: pílula com borda preta 3px e sombra dura; hover desloca 2px e reduz a sombra.
- Etiquetas (badges): rotacionadas -3 a 3 graus, fonte DM Mono, fundo amarelo limão.
- Stickers: formas simples (estrela, raio, smile, seta) em SVG, posicionados sobrepondo bordas de seções.
- Marquee: faixa rolando com frases da loja ("MG TABACARIA • ACESSÓRIOS • PRESENTES • BOM PAPO"), sem ordens ao cliente.
- Textura: grão sutil (opacidade 6 a 10%) sobre fundos escuros.
- Movimento: microinterações curtas (150 a 250ms), respeitar prefers-reduced-motion.

### Imagens

- Fotos reais da loja, da equipe e dos produtos permitidos. Nada de banco de imagens genérico.
- Tratamento: alto contraste, leve saturação, recortes em formas irregulares e bordas pretas.

## 5. Texto (exemplos no tom certo)

- Hero: "A loja da noite boa."
- Subtítulo: "Isqueiros, acessórios e presentes com atitude."
- Bloco de eventos: "Toda semana tem movimento por aqui."
- Evitar: "Compre já", "Venha fumar", "O melhor para sua festa" (induz consumo).

## 6. Técnico

- Mobile-first, layout responsivo, sem rolagem horizontal.
- Acessibilidade: foco visível, alt em imagens, contraste AA.
- Performance: imagens em WebP, fontes com display=swap.
- SEO: título e descrição institucionais (loja, cidade, categoria), sem termos de venda de tabaco.

## 7. Checklist antes de publicar

- [ ] Portão 18+ funcionando
- [ ] Só itens da lista aprovada pelo advogado na vitrine
- [ ] Aprovação do advogado arquivada
- [ ] Nenhum imperativo de consumo
- [ ] Todas as pessoas nas fotos são adultos claramente maiores de 18 anos, com autorização de imagem
- [ ] Nenhuma cena associa fumar a sucesso, sexualidade, esporte ou saúde
- [ ] Revisão jurídica feita
- [ ] Contraste e mobile testados
