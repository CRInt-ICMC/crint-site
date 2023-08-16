import TopicBanner from '../../components/TopicBanner';
import TopicSection from '../../components/TopicSection';
import { CIANO_USP } from '../../utils/appConstants';
import './guias.scss'

const ProcedimentosEstrangeiros = () => (
    <>
        <p>
            Para a candidatura de alunos(as) estrangeiros(as) em disciplinas ministradas no ICMC/USP, os seguintes documentos deverão ser enviados pela universidade do(a) aluno(a), 
            em formato .pdf (de boa qualidade), por meio do formulário de inscrição disponível em breve:
        </p>                
        <ul>
            <li>Carta de nomeação do(a) aluno(a) provida pelo Escritório Internacional da universidade do(a) aluno(a);</li>
            <li>Histórico escolar da graduação emitido pela universidade do(a) aluno(a);</li>
            <li>
                <a href="https://gestao.icmc.usp.br/CRINT/Registration%20form.pdf">Formulário de inscrição</a> com as disciplinas de interesse do(a) aluno(a). Para ter
                acesso às disciplinas oferecidas pelo ICMC clique <a href="https://www.icmc.usp.br/graduacao/informacoes-gerais-e-servicos/horarios-de-aulas">aqui</a>;
            </li>
            <li>
                Carta emitida pelo Escritório Internacional da universidade de origem do(a) aluno(a), informando que o(a) aluno(a) tem proficiência suficiente na língua
                portuguesa para acompanhar aulas ministradas em português;
            </li>
            <li>Cópia da folha do passaporte do aluno onde consta dados do(a) aluno(a) e a validade do documento;</li>
            <li>Fotografia do aluno em formato .jpg.</li>
        </ul>
        <p>Prazos:</p>
        <ul>
            <li>Primeiro semestre (Fevereiro-Julho): até 06.01</li>
            <li>Segundo semestre (Agosto-Dezembro): até 15.06</li>
        </ul>
        <p>
            Recomenda-se fortemente que o(a) candidato(a) consiga comunicar-se em português pois a maior parte das disciplinas é ministrada neste idioma. 
            Para saber quais disciplinas serão ministradas clique <a href="https://www.icmc.usp.br/graduacao/informacoes-gerais-e-servicos/horarios-de-aulas">
            aqui</a>.
        </p>
    </>
)

const Guias = () => {
    return (
        <div id='guias-root'>
            <TopicBanner topicoNome='GUIAS' />
            <TopicSection 
                title='Procedimentos para nomeações de Estrangeiros em Disciplinas do ICMC' 
                body={ProcedimentosEstrangeiros()} 
                style={{backgroundColor: CIANO_USP}}
                />
        </div>
    );
}

export default Guias;