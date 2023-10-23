# Funcionamento

## Componentes

Serão descritos a seguir os componentes mais complexos, todos os outros são simples e os comentários locais são suficientes para explicar seu funcionamento.

### AppHeader

O *Header* é composto por uma barra de navegação que é dividida em três partes:

- Esquerda: Contém o logo ICMC.
- Central: Contém os tópicos e subtópicos.
- Direira: Contém as opções de acessibilidade.

Os tópicos de subtópicos são organizados em elementos `DropDownMenu`. Isso será explorado na próxima seção.

O funcionamento das opções de acessibilidade é tercerizado para *FontSizeSystem* e *LangSystem*.

### FontSizeSystem

É responsável pelo tamanho das fontes do projeto. Quando o botão de acrescentar ou de decrescer é pressionado, o sistema passa a mudança para o contexto e salva as alterações em disco. Alterações além dos limites definidos em `/utils/constants.ts` serão corrigidos para a borda do limite.

As alterações são aplicadas no tamanho base da fonte, e são propagadas através do CSS, pois os tamanhos locais de fonte são definidos em medidas relativas ao tamanho base.

### LangSystem

É responsável pelas linguagens disponíveis do projeto. Quando algum botão que representa uma língua é clicado, o sistema verifica se a língua está disponível no projeto e atualiza o contexto, forçando novas requisições no idioma selecionado. Caso a opção por alguma razão nao esteja disponível, a língua padrão será selecionada.

#### DropDownMenu

Recebe o tópico como a cabeça do menu e os subtópicos como o corpo/menu. Este último será afetado pelo efeito de *drop-down* do pacote AnimateHeight.

#### Pageloader

O *Pageloader* lê a URL atual e requisita a página ao servidor. Após receber os dados do servidor, ele carrega o banner da página e cada seção que recebeu do servidor. Caso a página não exista, ele mostra uma mensagem indicando isso. Caso a página exista, mas não tenha nenhuma seção, ela mostra outra mensagem indicando essa situação.

#### PageBanner

Recebe o nome do tópico, os ids das seções da página, uma imagem e um gradiente. Com isso, é montado um banner contendo um sumário que leva a cada seção da página.

#### PageSection

Recebe o título da seção, o corpo (conjunto de elementos HTML), a cor de fundo e a cor do texto para formar uma seção da página. Esses são e devem ser utilizados para produzir quaisquer páginas do site.

## Utilidades

### constants

Esses são valores constantes que serão reutilizados multiplas vezes pelo código. Funcionam como constantes globais que são importadas caso necessário. Imagens e quaisquer outros arquivos não devem ser armazenados aqui.

Aqui também podem ser armazenados valores que, apesar de não serem reutilizados, são constantes e seriam mais fáceis de modificar caso estivessem isolados.

### interfaces

Todas as interfaces que não são locais (não são reutilizadas) devem ser armazenadas aqui, assim as mudanças se propagam mais facilmente através do projeto e as interfaces podem realmente atual como tipos.

### types

Todos os tipos são armazenados aqui, sendo seu principal propósito renomear os tipos produzidos pelo Strapi para melhorar a legibilidade do código.

### utils

Aqui devem ser armazenadas as funções globais e somente elas, quaisquer constantes e interfaces que elas necessitem devem ser guardadas nos outros arquivos de utilidade. É mandatório que todas as funções nesse arquivo sejam globais.

### generated/

Os arquivos dessa pasta são gerados pelo servidor para facilitar a interação com a api do Strapi. Quando os tipos do Strapi for alterado, novos arquivos devem ser gerados.

## Páginas

As páginas devem seguir formatos específicos definido a seguir:

- Todas as páginas do projeto, com exceção da Homepage, devem ter um banner;
- Todos os assuntos das páginas devem ser divididos em tópicos;
- A diferenças de coloração entre o texto e a cor de fundo deve sempre seguir as regras de contraste da web (4.5:1);
- Todo conteúdo informativo e as áreas de link devem aumentar ou diminuir dinamicamente para auxiliar o usuário.

## Caching

O caching é aplicado para evitar que múltiplas hajam requisições desnecessárias durante uma mesma seção. Quando a página é recarregada, o caching é perdido e deve ser mantido dessa forma para facilitar os testes com o Strapi.

O caching utiliza um dicionário para armazenar e retornar os valores de cada requisição. As requisições que dependem do idioma selecionado são salva com o sufixo '-{idioma}' para facilmente diferenciar entre as versões de cada língua.

## CSS

Exceto por `/index.css`, todos os arquivos de estilo da página devem estar no formato SCSS e todos as variáveis que se repetem através dos arquivos devem ser dispostas em `/Base.scss`.

`/Base.scss` contém apenas as variáveis e frações de código globais do estilo do projeto e deve ser mantida dessa forma.

Certos partes do site não utilizam CSS próprios, é optativo manter ou não arquivos SCSS vazios para essas frações.

## Strapi

O Strapi é uma ferramenta do lado do servidor que contém o conteúdo de texto e imagem do projeto. Todo o conteúdo textual do site está no servidor e é requisitado pela página. Toda página deve ser criada através do Strapi e requisitada pelo aplicativo.

A conexão com o Strapi é feita com um token armazenado em um arquivo *.env*.

## Outras dúvidas

Caso ainda haja dúvidas quanto ao funcionamento do site, sinta-se à vontade para abrir um issue quanto à documentação do projeto. Alternativamente, pode me enviar uma mensagem pelo Github ou [email](mailto:pedro.hvn.2018@gmail.com).
