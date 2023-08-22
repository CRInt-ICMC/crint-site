## Funcionamento

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
