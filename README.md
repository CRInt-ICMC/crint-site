# Site da CRInt

Esse projeto foi desenvolvido com a finalidade de facilitar o fluxo de informações da CRInt do ICMC para os alunos da graduação, funcionários, servidores e estrangeiros.

Ele surgiu dos relatos de dificuldade para encontrar instruções quanto à realização dos processos relacionados ao intercâmbio dos membros da USP.

O código disponibilizado aqui é de uso livre em partes ou em sua totalidade desde que não seja utilizado para impersonar a CRInt ou qualquer órgão relacionado à USP.

## Funcionamento

### Organização

Todo o código relevante do projeto está na pasta `/crint-site/src`, todas as pastas comentadas a seguir estão localizadas nela.

- `/components`: é a pasta onde estão os arquivos que compõe as frações individuais das páginas (Header, Homepage, Footer, Seções, etc...).
- `/img`: é onde as imagens que não serão alteradas devem ser armazenadas. Todas as imagens que podem demandar atualização devem ser armazenadas no strapi e requisitadas pela API.
- `/utils`: esta é a pasta onde funções globais, constantes, interfaces e tipos devem ser armazenados. Cada arquivo deve ser especializado para os tipos de utilidade que proporcionam, i.e., todas as constantes devem estar num arquivo próprio, assim como todas as funções globais, interfaces e tipos.

### Acessibilidade

As funções de acessibilidade do projeto são providas por `/components/AppHeader.tsx` e guardadas num cookie através das funções em `/utils/utils.ts`. Um contexto é em `/Context.tsx` e provido por `/App.tsx` para que as mudanças sejam propagadas pelo site inteiro.

Além disso, a biblioteca `@djpfs/react-vlibras` garante o funcionamento do VLibras no site.

#### Mudança do Tamanho de Fonte

Todas as partes cujos textos são relevantes são e devem ser adaptáveis. No modelo atual, a variável de contexto `fontSizeMod` utiliza a métrica `em` (relativa ao tamanho do elemento pai) para realizar as mudanças. A variável é inicializada com valor '1' e a cada clique aumenta ou diminui esse valor em '0.1' até os limites estimados.

A variável deve ser utilizada através de CSS *inline* nos elementos que serão modificados devido às limitações do React e do próprio CSS.

#### Sistema de Línguas

O sistema atual faz requisições ao servidor para receber o conteúdo na opção de língua selecionada. Toda tradução e alteração do conteúdo, assim como adição de novas línguas deve ser efetuado no lado do servidor. Porém, existe a constante AVAILABLE_LANGUAGES deve ser atualizada no código para que o novo idioma seja adicionado

#### VLibras

A implementação do VLibras é realizada segundo as instruções na [página do github do pacote](https://github.com/djpfs/react-vlibras).

Atenção: O VLibras não carregará normalmente na versão de produção devido a sua natureza síncrona, mas executará corretamente na build. Se precisar que ele apareça durante o desenvolvimento, adicione `forceOnload={true}` à seu elemento em `/App.tsx`

### Componentes e Utilidades

Para manter o README principal organizado e simples, essas explicações estão localizadas [aqui](Funcionamento.md).

## Pré-requisitos

Não é necessário nada mais do que o NodeJS 20 para executar o projeto, pois as outras dependências serão instaladas automaticamente. Ainda assim, conhecimento básico nas seguintes áreas é recomendado para compreender o código:

- React;
- Typescript;
- SCSS;
- Básico de Web Development (HTML, CSS E Javascript).

Vite foi usado para criar o projeto e é usado para executá-lo e construí-lo, porém não é necessário qualquer conhecimento dessa ferramenta para compreender o projeto.

## Utilização

Primeiramente, baixe do ZIP do repositório ou clone ele com:

```
git clone https://github.com/CRInt-ICMC/crint-site
```

Então, entre na pasta do repositório e baixe as dependências do projeto.

```
cd crint-site/crint-site
npm install
```

Por fim, entre na pasta do site e inicialize ele com:

```
# Executa a versão de desenvolvimento
npm run dev

# Constrói o html do site
npm run build

# Exibe a versão de produção
npm run preview

# Faz o host da versão de produção na rede local na porta 8080
npm run host
```
Porém, sem um token válido em `/crint-site/.env` as requisições vão ser recusadas pelo servidor e o site não carregará.

## Desenvolvimento e Manutenção

Para os interessados em continuar o desenvolvimento e a manutenção desse site, foi escrito um manual com as práticas de desenvolvimento e documentação aqui aplicadas. Este [manual](Recomendacoes.md) descreve as regras e ideias que formaram esse site, assim como o porquê de certas decisões de projeto.

## Créditos

- Pedro Henrique Vilela do Nascimento - Desenvolvedor do projeto

## Licença

Esse programa é lançado sob a licença GPLv3 ou qualquer versão posterior.
