# Site da CRInt

Esse projeto foi desenvolvido com a finalidade de facilitar o fluxo de informações da CRInt do ICMC para os alunos da graduação, docentes, servidores e estrangeiros, e ampliar a autonomia da CRInt-ICMC de gerenciar o fluxo de informações relacionadas a sua área de competência.

## Funcionamento

### Organização

Todo o código relevante do projeto está na pasta `/crint-site/src`, todas as pastas comentadas a seguir estão localizadas nela. Através do README e outros documentos, essa pasta será tratada como a raiz do projeto.

- `/components`: é a pasta onde estão os arquivos que compõe as frações individuais das páginas (Header, Homepage, Footer, Seções, etc...).
- `/img`: é onde as imagens que não serão alteradas devem ser armazenadas. Todas as imagens que podem demandar atualização devem ser armazenadas no strapi e requisitadas pela API.
- `/utils`: esta é a pasta onde funções globais, constantes, interfaces e tipos devem ser armazenados. Cada arquivo deve ser especializado para os tipos de utilidade que proporcionam, i.e., todas as constantes devem estar num arquivo próprio, assim como todas as funções globais, interfaces e tipos.

### Acessibilidade

As funções de acessibilidade do projeto são providas por `/components/AppHeader.tsx` e guardadas num cookie através das funções em `/utils/utils.ts`. Um contexto é em `/Context.tsx` e provido por `/App.tsx` para que as mudanças sejam propagadas pelo site inteiro.

Além disso, a biblioteca `@djpfs/react-vlibras` garante o funcionamento do VLibras no site.

#### Mudança do Tamanho de Fonte

Todas as partes cujos textos são relevantes são e devem ser adaptáveis. No modelo atual, a variável de contexto `fontsize` armazena o tamanho de fonte da raiz. Os botões aumentam ou diminuem a fonte em 2px até o limite superior ou inferior, respectivamente. As mudanças são propagadas através do uso da métrica `rem` (relativa ao tamanho de fonte da raiz).

#### Sistema de Línguas

O sistema atual faz requisições ao servidor para receber o conteúdo na opção de língua selecionada, assim como as opções disponíveis de idioma. Toda tradução e alteração do conteúdo, assim como adição de novas línguas deve ser efetuado no lado do servidor.

#### VLibras

A implementação do VLibras é realizada segundo as instruções na [página do github do pacote](https://github.com/djpfs/react-vlibras).

Atenção: O VLibras não carregará normalmente na versão de produção devido a sua natureza síncrona, mas executará corretamente na build. Se precisar que ele apareça durante o desenvolvimento, adicione `forceOnload={true}` a seu elemento em `/App.tsx`

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
yarn
```

Por fim, entre na pasta do site e inicialize ele com:

```
# Executa a versão de desenvolvimento
yarn dev

# Constrói o html do site
yarn build

# Exibe a versão de produção
yarn preview

# Faz o host da versão de produção na rede local na porta 8080
yarn host
```
Porém, sem um token válido em `/crint-site/.env` as requisições vão ser recusadas pelo servidor e o site não carregará.

## Desenvolvimento e Manutenção

Para os interessados em continuar o desenvolvimento e a manutenção desse site, foi escrito um manual com as práticas de desenvolvimento e documentação aqui aplicadas. Este [manual](Recomendacoes.md) descreve as regras e ideias que formaram esse site, assim como o porquê de certas decisões de projeto.

## Créditos

- Pedro Henrique Vilela do Nascimento - Desenvolvedor do projeto

## Licença

Esse programa é lançado sob a licença GPLv3 ou qualquer versão posterior.
