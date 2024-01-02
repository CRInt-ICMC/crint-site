# Recomendações

As seguintes recomendações tem o objetivo de manter o espírito original do projeto e a consistência da identação através do código, além de poupar o tempo e esforços de interessados em manter e avançar seu desenvolvimento.

## Conceitos

A ideia central do site é ter uma página específica para a CRInt do ICMC a qual pode ser facilmente administrada por funcionários com pouco a nenhum conhecimento de programação. Todas as partes do site devem ser de fácil adaptação e alta flexibilidade sempre que possível. O site deve ser simples e visualmente agradável, os alunos devem ser capazes de encontrar qualquer informação relevante referente ao processo de intercâmbio do ICMC sem dificuldades.

Essa ideia leva aos seguintes pilares do projeto:

### Boa navegabilidade

A estrutura do site deve guiar os usuários de forma que quaisquer informações relevantes possam ser encontras rapidamente e sem dificuldades. É essencial que usuários de qualquer grupo possam navegar através do site e encontrar as informações desejadas facilmente.

Toda a estrutura do site deve ser modelada de forma a contribuir para esse objetivo e quaisquer novas funcionalidades não deverão prejudicar essa diretriz e, quando possível, devem contribuir para ela.

### Fácil manutenabilidade

A manutenabilidade da aplicação não se trata apenas de seu código, mas também de seu conteúdo. Este deve poder ser gerenciado por pessoas de quaisquer níveis de conhecimento na área de computação, isto é, deve se levar em conta que a simplicação das interfaces e minimização dos esforços de gerenciamento são prioridades durante o desenvolvimento.

Quaisquer funcionalidades que sejam incompátiveis com essa diretriz devem ser abandonadas ou remodeladas para que o projeto possa ser facilmente mantido por quaisquer membros da administração do ICMC.

### Animações suaves

Durante a conceitualização da aplicação, foi dada grande ênfase na modernização das interações usuário-computador e melhorias visuais. Para isso, também foi definido que sempre que possível, as transições e alterações devem ser suaves e agradáveis.

Todas as funcionalidades devem ser implementadas de forma a tentar embarcar novas animações e evitar ao máximo prejudicar aquelas já existentes.

## Práticas

### Indentação em inglês

Todos os nomes de variáveis, funções, interfaces, etc, devem estar em inglês sempre que possível. Isso é feito para manter uma harmonia linguística através do código, pois de outra forma haveria uma mistura de português e inglês que prejudicaria sua legibilidade.

Além disso, é esperado que código seja escrito em inglês devido à internacionalização dessa língua e sua prevalência no campo da programação e desenvolvimento de software.

### Generalização de componentes

Componentes devem ter funções claras e genéricas. É comum que durante o desenvolvimento, alguns componentes incorporem novas funções ou expandam de forma que o mesmo código seja reutilizado múltiplas vezes. Nesses casos, é necessário que novos componentes sejam criados para generalizar funções que se repetem ou lidar com tarefas que fogem ao escopo daquele componente. O componente ***AppHeader*** é um bom exemplo, pois está relacionado com um componente genérico (***DropdownMenu***) e dois especifícos (***LangSystem*** e ***FontsizeSystem***).

Podem haver situações em que não é possível generalizar um componente pois isso resultaria na quebra de alguma das diretrizes do projeto. Um caso como esse é o do ***DIA***, onde as tentativas de generalização resultavam na quebra das animações dos gráficos. Nesses casos específicos, deve ser registrada essa decisão de optar por manter o componente não generalizado e explicar as razões por trás dela.

### Externalização do conteúdo

Com exceção de pequenos trechos textuais pontuais, como as páginas de carregamento e de erro, todo o conteúdo deve ser estar disponível somente no Strapi e deve ser requisitado pela aplicação. Isso permite que o gerenciamento desses dados seja realizado pelo Strapi sem que haja qualquer interação com o código fonte. Quaisquer desvios graves devem ser relatados na seção de decisões juntamente com suas razões.

## Decisões

As seguintes decisões ocorreram durante o desenvolvimento e podem acarretar em pequenas inconsistências com os objetivos e práticas do projeto. Caso venham a ser resolvidas, elas serão removidas da documentação.

### Sistema de línguas ingênuo

Durante o desenvolvimento, foi decidido por criar um sistema de línguas flexível para facilitar o gerenciamento do conteúdo da aplicação através do Strapi. Como resultado, o sistema atual não tem como saber se as opções de idioma que recebeu do servidor estão disponíveis ou não no Strapi, ou mesmo se são idiomas que existem. Quando uma requisição falha em virtude de não haver uma página disponível no idioma requisitado, a aplicação volta para a página principal.

No caso catastrófico de haverem línguas registradas no servidor sem nenhum conteúdo disponível e uma delas ser selecionada, a aplicação não será capaz de carregar nenhuma página. Para previnir isso, a aplicação voltará para o idioma padrão caso não encontre nenhum conteúdo para a página principal.

Não foi encontrada nenhuma maneira simples de contornar o problema sem sacrificar a flexibilidade do sistema, então deixo a cargo dos mantenedores da página garantir que esse caso não ocorrerá.

### Sistema DIA complexo e não generalizável

Durante o desenvolvimento foi observado que quaisquer tentativas de generalizar o funcionamento dos gráficos do DIA resultava em animações quebradas. Suspeita-se que a separação dos gráficos em componentes filhos resulta em *resets* durante as atualizações de estado, o que resulta na quebra do processo de animação dos gráficos.

Devido a esse problema, foi decidido que o código seria refinado tanto quanto possível para facilitar sua legibilidade e compreensão tendo em vista que sua generalização não será possível.

## Dúvidas

Caso ainda haja dúvidas ou questionamentos quanto a certos detalhes de implementação ou decisões de projeto, ou mesmo haja algum assunto não abordado, sinta-se à vontade para abrir um *issue* de documentação. Alternativamente, sinta-se à vontade para me enviar uma mensagem pelo Github ou [email](mailto:pedro.hvn.2018@gmail.com).
