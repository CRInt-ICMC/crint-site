# Funcionamento

## Componentes

Serão descritos a seguir os componentes mais complexos, todos os outros são simples e os comentários locais são suficientes para explicar seu funcionamento.

### AppHeader

O *Header* utiliza uma série de Hooks para garantir que os botões e seus efeitos sejam sempre aplicados. Primeiramente ele recebe o contexto e suas variáveis, após isso carrega esses valores nos *hooks* de `lang` e `fontSizeMod`, e o dicionário de linguagem que será utilizado para o texto no próprio *Header*.

Em seguida ele declara o *hook* `useEffect` que atualiza de acordo com as mudanças de estado da linguagem e a função `changeLang` que garante a validez da opção de linguagem e atualiza o `useState` e o dicionário de linguagem. Além disso, essa função atualiza as variáveis de contexto.

Os *hooks* que controlam o tamanho da fonte operam de forma semelhante, `changeFontSizeMod` garante que o tamanho da fonte sempre estará num intervalo aceitável e atualiza as variáveis de estado e contexto.

Em seguida, após os *hooks*, o contexto é salvo em um cookie para ser carregado na próxima função.

Abaixo, está a barra de navegação. Ela é dividida em três partes:

- Esquerda: Aqui fica o logo do ICMC e o logo da CRInt.
- Central: Aqui ficam os tópicos e subtópicos.
- Direira: Aqui ficam as opções de acessibilidade.

Os tópicos de subtópicos são organizados em elementos `DropDownMenu`. Isso será explorado na próxima seção.

As opções de acessibilidade são divididas em Linguagem e Outras Opções. A linguagem usa um sistema dinâmico de mapeamento para facilitar a adição de quaisquer novas linguagens. As outras opções são completamente *hard-coded* e devem ser adapatadas manualmente. Ambas as categorias recebem os estados e funções necessárias para interagirem com o contexto.

#### DropDownMenu

Recebe o tópico como a cabeça do menu e os subtópicos como o corpo/menu. Este último será afetado pelo efeito de *drop-down*. O CSS é alterado dinamicamente conforme o mouse entra ou sai da área da cabeça do menu, adicionando escala '0' para esconder o menu e '1' para mostrar.

#### TopicBanner

Recebe o nome do tópico e uma imagem que o representa para montar a *banner* da página. É modulare pode receber propriedades de CSS para aplicar ainda mais mudanças ao *banner*.

#### TopicSection

Recebe o títula da seção e o corpo (conjunto de elementos HTML) para forma uma seção da página. Também é modular e capaz de receber propriedades de CSS diretamente. Esses são e devem ser utilizados para produzir quaisquer páginas do site.

## Utilidades

### appConstants

Esses são valores constantes que serão reutilizados multiplas vezes pelo código. Funcionam como constantes globais que são importadas caso necessário. Imagens e quaisquer outros arquivos não devem ser armazenados aqui.

Aqui também podem ser armazenados valores que, apesar de não serem reutilizados, são constantes e seriam mais fáceis de modificar caso estivessem isolados.

### appImages

Aqui são armazenadas as importações de imagens. Isso é feito para melhorar a legibilidade do código, especialmente das importações, e facilitar a reutilização e substituição das imagens caso seja necessário.

### types

Todas as interfaces que não são locais (não são reutilizadas) devem ser armazenadas aqui, assim as mudanças se propagam mais facilmente através do projeto e as interfaces podem realmente atual como tipos.

### utils

Aqui devem ser armazenadas as funções globais e somente elas, quaisquer constantes e interfaces que elas necessitem devem ser guardadas nos outros arquivos de utilidade. É mandatório que todas as funções nesse arquivo sejam globais.

## Páginas

As páginas devem seguir formatos específicos definido a seguir:

- Todas as páginas do projeto, com exceção da Homepage, devem ter um banner;
- Todos os assuntos das páginas devem ser divididos em tópicos;
- A diferenças de coloração entre o texto e a cor de fundo deve sempre seguir as regras de contraste da web (4.5:1);
- Todo conteúdo informativo e as áreas de link devem aumentar ou diminuir dinamicamente para auxiliar o usuário.

## CSS

Exceto por `/index.css`, todos os arquivos de estilo da página devem estar no formato SCSS e todos as variáveis que se repetem através dos arquivos devem ser dispostas em `/Base.scss`.

`/Base.scss` contém apenas as variáveis e frações de código globais do estilo do projeto e deve ser mantida dessa forma.

Certos partes do site não utilizam CSS próprios, é optativo manter ou não arquivos SCSS vazios para essas frações.

## Outras dúvidas

Caso ainda haja dúvidas quanto ao funcionamento do site, sinta-se à vontade para abrir um issue quanto à documentação do projeto. Alternativamente, pode me enviar uma mensagem pelo Github ou [email](mailto:pedro.hvn.2018@gmail.com).
