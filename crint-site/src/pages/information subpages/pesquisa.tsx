import TopicBanner from '../../components/TopicBanner';
import TopicSection from '../../components/TopicSection';
import './pesquisa.css'

const PesquisasICMC = () => (
    <>
        <h3>Pesquisas Conduzidas no ICMC/USP</h3>
        <p>Para consultar a brochura das pesquisas sendo conduzidas no ICMC/USP, clique <a href="https://web.icmc.usp.br/SCAPINST/research_catalog.pdf">aqui</a>.</p> 
    </>
)

const Pesquisa = () => {
    return (
        <div id='pesquisa-root'>
            <TopicBanner topicoNome='PESQUISA' />
            <TopicSection 
                title='Pesquisas Conduzidas no ICMC/USP'
                body={PesquisasICMC()}
                />
        </div>
    );
}

export default Pesquisa;