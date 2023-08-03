import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import { CIANO_USP, MARMORE } from '../utils/appConstants';
import './estrangeiros.css'

const informacaoGeraisEstrangeiros = () => {
    return (
        <section>
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
        </section>
    )
}

const CursosPortugues = () => (
    <>
        <p>
            Para consultar os cursos de Português oferecidos pela USP, acesse o <a href='https://uspdigital.usp.br/mundus'> Sistema Mundus da USP</a>. 
            No Mundus, selecione no menu a opção Editais {'>'} Alunos de Graduação {'>'} Editais. Ao selecionar Curso Online ou Curso no Tipo e o ICMC 
            na unidade de origem do interessado, todos os editais serão listados.
        </p>
        <p>
            Cursos de Português para estrangeiros(as) são também oferecidos pelo Instituto de Línguas da Universidade Federal de São Carlos (UFSCar). Mais informações 
            podem ser encontradas <a href="https://www.institutodelinguas.ufscar.br/pt-br/cursos/portugues-para-estrangeiros">aqui</a>.
        </p>
    </>
);

const Estrangeiros = () => {
    return (
        <div id='estrangeiros-root'>
            <TopicBanner topicoNome='ESTRANGEIROS' />
            <TopicSection 
                title='Informação para Estrangeiros' 
                body={informacaoGeraisEstrangeiros()} 
                style={{backgroundColor: MARMORE}}
                />
            <TopicSection 
                title='Cursos de Português' 
                body={CursosPortugues()} 
                style={{backgroundColor: CIANO_USP}}
                />
        </div>
    );
}

export default Estrangeiros;