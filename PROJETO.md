# MG Bebidas & Tabacaria: site

Atualizado em 20/10/2026. Fonte viva do projeto; regras de trabalho e de conformidade estão em `CLAUDE.md` e `DESIGN.md`.

## Negócio
- Nome: MG Bebidas & Tabacaria
- Ramo: essências e carvões de narguilé, acessórios, bebidas (whisky, licores, cerveja), kits de presente
- Endereço: Av. Gralha Azul, 680, Guarujá, Cascavel - PR
- Horário: todos os dias, 14h às 01h
- WhatsApp: (45) 99133-7191
- Instagram: @mgtabacaria1
- Venda proibida para menores de 18 anos
- Dados de contato e horário: `src/lib/business.ts` (única fonte; o site e o SEO leem dali)

## Endereços e publicação
- Site: https://www.mgtabacaria.com (a versão sem `www` redireciona para ela)
- Repositório: https://github.com/henriquesemimmatheus-sketch/mg-tabacaria, branch `main`
- Hospedagem: Vercel, ligada ao GitHub. Todo push na `main` publica sozinho
- Identidade git local: "MG Tabacaria" / Mgtabacaria1@gmail.com (não é a conta pessoal do Matheus)
- A branch `reorganizacao-home` já foi mesclada na `main`; pode ser apagada
- Registro do domínio: conta do dono (não verificado aqui)

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind 4
- Sem banco de dados e sem pagamento no site. O pedido é montado no carrinho e enviado pelo WhatsApp; nada é guardado

## Páginas (`src/app`)
- `/` home: Hero, faixa de promoções, portais das categorias, informações (sobre e localização), vitrine
- `/essencias` (118+ sabores, filtros por perfil, marca e gelado), `/carvoes`, `/bebidas`, `/acessorios` (Tabacaria), `/presentes`
- Estrutura comum em `SiteShell`: portão 18+, faixa de promoções, menu, carrinho e botão de WhatsApp

## Dados
- `essencias.ts`, `carvoes.ts`, `potes.ts`, `acessorios.ts`, `presentes.ts`, `whiskies.ts`, `licores.ts`, `promocoes.ts`
- Fotos de produto em `public/` (essencias, carvoes, acessorios, licores, whisky), recortadas com fundo transparente
- Padrão obrigatório dos cards de promoção: ver `CLAUDE.md`

## Visual
- Preto, prata e dourado, como nas logos (`public/logo-mg-bebidas.webp`, `public/logo-mg-tabacaria.webp`)
- Fontes: Cinzel (títulos), Jost (texto), Anton (destaques)

## Pendências
- Fotos de essências a refazer: `FOTOS-ESSENCIAS-PARA-REFAZER.md`
- Fotos dos whiskies vêm do Wikimedia (CC BY-SA): trocar por fotos da loja
- Confirmar com o advogado o que pode aparecer na vitrine
- Google Analytics (GA4): falta o ID de medição
- Google Meu Negócio: conferir ficha e link do site
- Artes de divulgação ficam em `artes/`
