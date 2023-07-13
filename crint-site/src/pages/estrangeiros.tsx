import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import './estrangeiros.css'

const informacaoParaEstrangeiros = () => {
    return (
        <section>
            <h1>Informação para Estrangeiros</h1>

            <h3>Informações Gerais</h3>
            <p><a href="https://web.icmc.usp.br/CRINT/Guia%20do%20aluno%20estrangeiro%202020.pdf">Informação geral sobre São Carlos e o ICMC/USP</a></p>                
            <p>
                <a href="https://www.gov.br/pf/pt-br/assuntos/imigracao/registrar-se-como-estrangeiro-no-brasil/registro-de-imigrante-detentor-de-visto">
                Diretrizes gerais para obtenção de visto temporário</a>
            </p>
            <p><a href="https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/cadastros/cpf/servicos/2-inscricao-no-cpf">Obtenção do CPF</a></p>
            <p>
                Ao aplicar para o seu visto no Consulado Brasileiro, <a href="cpf.residente.exterior@rfb.gov.br">solicite seu CPF</a>. É muito mais 
                rápido e fácil do que quando chegar ao Brasil.
            </p>
            <p><a href="https://www.gov.br/pt-br/servicos/obter-autorizacao-de-residencia-e-carteira-de-registro-migratorio">Obtenção do RNM (antigo RNE)</a></p>
            <p><a href="https://gestao.icmc.usp.br/CRINT/Manual-Regularizacao-de-Imigrantes-no-Brasil%20(1).pdf">Manual para regularização de imigrantes no Brasil</a></p>
            <p><a href="https://www.gov.br/pf/pt-br/acesso-a-informacao/perguntas-frequentes">Dúvidas frequentes (Polícia Federal)</a></p>
            <p><a href="https://www.youtube.com/watch?v=YhXSzRz9Fd4)">Vídeo sobre o ICMC/USP</a></p>
            <p><a href="https://www.youtube.com/watch?v=jYDUYSCU1PQ&ab_channel=CeTI-SC/STI-USPS%C3%A3oCarlos">Vídeo sobre o campus de São Carlos</a></p>
            <p><a href="https://eduroam.usp.br/">EDUROAM na USP</a></p>

            <h3>Cursos de Português</h3>
            <p>
                Para consultar os cursos de Português oferecidos pela USP, acesse o <a href='https://uspdigital.usp.br/mundus'> Sistema Mundus da USP</a>. 
                No Mundus, selecione no menu a opção Editais {'>'} Alunos de Graduação {'>'} Editais. Ao selecionar Curso Online ou Curso no Tipo e o ICMC 
                na unidade de origem do interessado, todos os editais serão listados.
            </p>
            <p>
                Cursos de Português para estrangeiros são também oferecidos pelo Instituto de Línguas da Universidade Federal de São Carlos (UFSCar). Mais informações 
                podem ser encontradas <a href="https://www.institutodelinguas.ufscar.br/pt-br/cursos/portugues-para-estrangeiros">aqui</a>.
            </p>

            <h3>Procedimentos para nomeações de Estrangeiros em Disciplinas do ICMC (free-mover)</h3>
            <p>
                Para a candidatura de alunos estrangeiros em disciplinas ministradas no ICMC/USP, os seguintes documentos deverão ser enviados pela universidade do aluno, 
                em formato .pdf (de boa qualidade), por meio do formulário de inscrição disponível em breve:
            </p>                
            <ul>
                <li>Carta de nomeação do aluno provida pelo Escritório Internacional da universidade do aluno;</li>
                <li>Histórico escolar da graduação emitido pela universidade do aluno;</li>
                <li>
                    <a href="https://gestao.icmc.usp.br/CRINT/Registration%20form.pdf">Formulário de inscrição</a> com as disciplinas de interesse do aluno. Para ter
                    acesso às disciplinas oferecidas pelo ICMC clique <a href="https://www.icmc.usp.br/graduacao/informacoes-gerais-e-servicos/horarios-de-aulas">aqui</a>;
                </li>
                <li>
                    Carta emitida pelo Escritório Internacional da universidade de origem do aluno, informando que o aluno tem proficiência suficiente na língua
                    portuguesa para acompanhar aulas ministradas em português;
                </li>
                <li>Cópia da folha do passaporte do aluno onde consta dados do aluno e a validade do documento;</li>
                <li>Fotografia do aluno em formato .jpg.</li>
            </ul>
            <p>Prazos:</p>
            <ul>
                <li>Primeiro semestre (Fevereiro-Julho): até 06.01</li>
                <li>Segundo semestre (Agosto-Dezembro): até 15.06</li>
            </ul>
            <p>
                Recomenda-se fortemente que o candidato consiga comunicar-se em português pois a maior parte das disciplinas é ministrada neste idioma. 
                Para saber quais disciplinas serão ministradas clique <a href="https://www.icmc.usp.br/graduacao/informacoes-gerais-e-servicos/horarios-de-aulas">
                aqui</a>.
            </p>

            <h3>Pesquisas Conduzidas no ICMC/USP</h3>
            <p>Para consultar a brochura das pesquisas sendo conduzidas no ICMC/USP, clique <a href="https://web.icmc.usp.br/SCAPINST/research_catalog.pdf">aqui</a>.</p>                
        </section>
    )
}

const Estrangeiros = () => {
    return (
        <div id='estrangeiros-root'>
            <TopicBanner topicoNome='ESTRANGEIROS' />
            <TopicSection 
                title='Informação para Estrangeiros' 
                body={informacaoParaEstrangeiros()} 
                style={{backgroundColor: 'lightgray'}}
                />
        </div>
    );
}

export default Estrangeiros;