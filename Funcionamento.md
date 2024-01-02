# Funcionamento

## Componentes

Serão descritos a seguir apenas os componentes mais complexos, todos os outros são simples e os comentários locais são suficientes para explicar seu funcionamento.

### AppHeader

O *Header* é composto por uma barra de navegação que é dividida em três partes:

- Esquerda: Contém o logo ICMC.
- Central: Contém os tópicos e subtópicos.
- Direita: Contém as opções de acessibilidade.

Os tópicos e subtópicos são organizados em elementos ***DropDownMenu***. Os tópicos servem apenas como cabeçalhos para conjuntos de subtópicos, cada subtópico é um link para uma página do site. A relação entre tópicos e subtópicos e gerenciada através do Strapi, o ***AppHeader*** faz uma requisição para o servidor pedindo a estrutura dos tópicos e subtópicos e, após isso, monta o *Header* da página.

**Nota**: O *header* não é necessariamente o mesmo para cada opção de idioma e deve ser ajustado individualmente para cada idioma registrado no Strapi.

O funcionamento das opções de acessibilidade é tercerizado para ***FontsizeSystem*** e ***LangSystem***.

#### DropDownMenu

Cria um elemento com uma cabeça e um corpo. Quando o mouse passa por cima da cabeça o corpo aparece como um menu *dropdown*. Nesta aplicação, é utilizado apenas no *header* para criar múltiplos menus para cada tópico na versão desktop ou um menu unificado na versão mobile.

#### FontsizeSystem

É responsável pelo tamanho das fontes do projeto. Quando o botão de acrescentar ou de decrescer é pressionado, o sistema passa a mudança para o contexto e salva as alterações em disco. Alterações além dos limites definidos em `/utils/constants.ts` serão corrigidos para a borda do limite.

Quando o limite superior ou inferior de tamanho é atingido, o botão que levaria a exceder o limite é desativado, isto é, sua aparência é alterada e sua funcionalidade cancelada para indicar que a fonte não pode ser aumentada ou diminuída além daquele ponto.

As alterações são aplicadas no tamanho base da fonte, e são propagadas através do CSS com tamanhos definidos em *rem* (root em).

#### LangSystem

É responsável pelas linguagens disponíveis do projeto. Quando algum botão que representa uma língua é clicado, o sistema verifica se a língua está disponível no projeto e atualiza o contexto, forçando novas requisições no idioma selecionado. Caso a opção por alguma razão nao esteja disponível, a língua padrão será selecionada.

A aplicação requisita ao servidor quais os idiomas disponíveis no projeto e suas respectivas bandeiras. A aplicação não sabe se os idiomas fornecidos realmente estão disponíveis no servidor e não há como descobrir de forma simples. Fica a cargo dos responsáveis pelo gerenciamento do site garantir que quaisquer idiomas registrados no Strapi tenham os devidos conteúdos disponíveis.

A interface do sistema é uma seleção onde o idioma atual aparece no *header* enquanto as outras aparecem quando o usuário interage com esta interface.

### PageLoader

O ***PageLoader*** lê a URL atual e requisita a página ao servidor na versão do idioma atualmente selecionado. Após receber os dados do servidor, ele carrega o banner da página e cada seção que recebeu do servidor através do ***PageBanner*** e ***PageSection***, respectivamente. O sistema é completamente dinâmico e carregará quaisquer seções que receber do servidor.

O ***PageLoader*** também gera os *ids* que serão utilizados pelo sumário do ***PageBanner***. Os *ids* são gerados a partir dos títulos das seções a partir da eliminação dos caractéres especiais e espaços em branco. Também é adicionado o índice da seção ao início do nome para prevenir a remota possibilidade de dois *ids* serem iguais.

Caso a página não exista, ele mostra uma mensagem de alerta indicando que não há nenhuma página com a URL procurada, para o idioma selecionado, disponível no servidor.

Caso a página exista, mas não tenha nenhuma seção, ela mostra uma mensagem indicando que a página provavelmente ainda está sendo desenvolvida e por isso, apesar de existir, não tem nenhum conteúdo disponível.

#### PageBanner

Recebe o nome do tópico, os *ids* das seções da página, uma imagem e um gradiente. Com isso, monta um banner contendo um sumário com hiperlinks para a seção correspondente dentro da página. Os *ids* devem ser gerados pelo componente pai e fica a cargo dele associar esses *ids* às suas respectivas seções.

#### PageSection

Recebe o título da seção, o corpo (conjunto de elementos HTML), a cor de fundo e a cor do texto para formar uma seção da página. O ***PageSection*** é a base da aplicação e compartimentaliza o conteúdo das páginas. Todas as páginas são divididas em seções e cada seção é montada com esse componente. É fundamental que todas as páginas sejam geradas com seções ***PageSection*** para que a generelização da organização possa ser mantida e o conteúdo possa ser facilmente alterado através do Strapi.

### DIA

O ***DIA*** é um sistema para a visualização dos dados de internacionalização através de gráficos dinâmicos. Os dados são requisitados do servidor e o documento é processado de forma ingênua, isto é, espera-se que as colunas estejam numa ordem específica.

Após a leitura e pré-processamento dos dados, eles são criadas cópias para cada gráfico. Cada cópia passa então por um processamento onde algumas entradas são descartadas em virtude perda de relevância devido à data em que foram coletadas. Essas datas de corte podem ser alteradas pelo usuário, levando ao reprocessamento desses dados, porém por padrão são marcadas para o primeiro dia do ano de cinco anos atrás a partir da data atual - e.g. em 2023 a data de corte era 01/01/2018.

Após o corte, os dados são condensados de acordo com os gráficos aos quais pertencem seguindo funções arbitrárias específicas para cada gráfico.

Esses dados condensados são encaminhados para a função de plotagem onde também ocorre outro corte dos dados de acordo com o *input* do usuário nos formulários de opções de visualização de cada gráfico. Após esse processo, os dados são plotados em gráficos produzidos com a biblioteca [recharts](https://github.com/recharts/recharts).

Nenhuma parte desses processos é genérica ou pode ser generalizada facilmente sem que outras funcionalidades sejam sacrificadas. No [manual de recomendações](Recomendacoes.md) existe uma seção descrevendo as razões para que o DIA tenha sido mantido dessa forma.

### LoadingScreen

O ***LoadingScreen*** é um sistema que esconde o carregamento do conteúdo por fins estéticos. Ele aparece quando um conteúdo que não está disponível na cache e precisa ser requisitado para o servidor. Quando a comunicação é iniciada, os componentes que fizeram a solicitação depositam "moedas" para indicar que estão aguardando a resposta do servidor. Para cada requisição uma moeda é armazenada e para cada resposta uam moeda é retirada independemente do conteúdo da resposta.

Após 10 segundos aguardando por uma resposta, o ***LoadingScreen*** revela uma mensagem de falha de comunicação com o servidor. Esse processo é realizado através de funções de *timeout* do Typescript. Apenas um relógio de *timeout* é utilizado durante esse processo. Caso todas as moedas sejam retiradas antes do *timeout*, o relógio é desativado.

Quando a caixa de moedas é esvaziada, o ***LoadingScreen*** espera um tempo definido antes de desaparecer para esconder a transformação da página.

## Utilidades

### constants

Esses são valores constantes que serão reutilizados multiplas vezes pelo código. Funcionam como constantes globais que são importadas caso necessário. Importações de imagens e quaisquer outros arquivos devem ser armazenadas aqui.

Também devem ser armazenadas aqui quaisquer constantes utilizadas pelas funções globais em prol de manter o código mais limpo e organizado.

### interfaces

Todas as interfaces que não são locais, isto é, são utilizadas por apenas um componente, devem ser armazenadas aqui.

Existe apenas uma exceção a essa regra. Caso a interface seja utilizada por uma função global, ela deve ser armazenada aqui para evitar que arquivo de funções globais seja poluído com interfaces locais.

### types

Todos os tipos são armazenados aqui, sendo seu principal propósito renomear os tipos produzidos pelo Strapi para melhorar a legibilidade do código.

### utils

Aqui devem ser armazenadas as funções globais e somente elas, quaisquer constantes e interfaces que elas necessitem devem ser guardadas nos outros arquivos de utilidade. É mandatório que todas as funções nesse arquivo sejam globais.

Funções que são locais porém causariam muita poluição nos componentes onde seriam utilizadas também podem ser armazenadas aqui para melhorar a legibilidade do código. A função *loadSettings* é um bom exemplo desse caso, pois causaria a adição de múltiplas importações únicas no código onde é utilizada.

### generated/

Os arquivos dessa pasta são gerados pelo servidor para facilitar a interação com a api do Strapi. Quando os tipos do Strapi for alterado, novos arquivos devem ser gerados. Utilize o alias *generate-types* no servidor para gerar esses arquivos caso haja alteração no formato do conteúdo da aplicação e após isso transfira os arquivos do servidor para o computador de desenvolvimento.

## Páginas

As páginas devem seguir formatos específicos definidos a seguir:

- Todas as páginas do projeto, com exceção da Homepage, devem ter um banner;
- Todos os assuntos das páginas devem ser divididos em seções;
- As diferenças de coloração entre o texto e a cor de fundo deve sempre seguir as regras de contraste da web (4.5:1);
- Todo conteúdo possível deve estar no servidor e ser recebido através da API do Strapi.

## Caching

O caching é aplicado para evitar que múltiplas hajam requisições desnecessárias durante uma mesma seção. Quando a página é recarregada, o caching é perdido e deve ser mantido dessa forma para permitir que alterações e correções de conteúdo possam ser aplicadas rapidamente.

O caching utiliza um dicionário para armazenar e retornar os valores de cada requisição. Cada valor armazenado é associado a uma *tag*, isto é, uma string sem caracteres especiais ou espaços. As requisições que dependem do idioma selecionado são salvas com o sufixo '-{idioma}' para diferenciar entre as versões de cada língua. É responsabilidade dos desenvolvedores garantir que não haja colisões de *tag*.

## CSS

Exceto por `/index.css`, todos os arquivos de estilo da página devem estar no formato SCSS e todos as variáveis que se repetem através dos arquivos devem ser dispostas em `/Base.scss`.

`/Base.scss` contém apenas as variáveis e frações de código globais do estilo do projeto e deve ser mantida dessa forma.

Certas partes do site não utilizam CSS próprios, é optativo manter ou não arquivos SCSS vazios para essas frações.

A responsividade é atingida através de *media queries* que avaliam se o dispositivo esta na forma paisagem ou retrato ao invés de utilizar as dimensões do dispositivo. É mandatório que todas as páginas sejam responsivas.

## Strapi

O Strapi é uma ferramenta do lado do servidor que contém o conteúdo de texto e imagem do projeto. Todo o conteúdo textual do site está no servidor e é requisitado pela página. Toda página deve ser criada através do Strapi e requisitada pelo aplicativo.

A conexão com o Strapi é realizada com um token armazenado em um arquivo *.env*. Caso seja necessária a criação de um novo token, isso pode ser feito através do Strapi.

**Importante: lembre-se de destruir tokens de desenvolvimento quando estes já não forem mais utilizados!**

## Outras dúvidas

Caso ainda haja dúvidas quanto ao funcionamento do site, sinta-se à vontade para abrir um *issue* quanto à documentação do projeto. Alternativamente, sinta-se à vontade para me enviar uma mensagem pelo Github ou [email](mailto:pedro.hvn.2018@gmail.com).
