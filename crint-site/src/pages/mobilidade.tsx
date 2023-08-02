import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import './mobilidade.css';
import WIP_page from './wip';

const InterServidores = () => {
    return (
        <>            
            <h3>Oportunidades no Exterior e Editais em Andamento</h3>
            <p>
                Ao longo do ano, diversas oportunidades de cursos de línguas, mobilidade internacional para servidores técnicos e administrativos e 
                outras oportunidades no exterior são disponibilizadas. 
            </p>
            <p>
                Os funcionários podem acompanhar as oportunidades no exterior e editais em andamento pelas redes sociais da CRInt (<a href='https://www.instagram.com/icmc.usp/'>
                Instagram</a> e <a href='https://t.me/crinticmc'>Telegram</a>) ou por meio do <a href='https://uspdigital.usp.br/mundus'>Sistema 
                Mundus da USP</a>. No Mundus, selecione no menu a opção Editais {'>'} Servidores Técnicos e Administrativos. Ao selecionar o ICMC 
                na unidade de origem do interessado, todos os editais válidos para servidores técnicos e administrativos do ICMC/USP serão listados.
            </p>
        </>
    ); 
}

const Mobilidade = () => {
    return (
        <div id="mobilidade-root">
            <TopicBanner topicoNome='MOBILIDADE' />
            <WIP_page />
        </div>
    );
}

export default Mobilidade;