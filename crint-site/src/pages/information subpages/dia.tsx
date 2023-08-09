import TopicBanner from '../../components/TopicBanner';
import WIP_page from '../../components/wip';
import './dia.scss'

const Dia = () => {
    return (
        <div id='dia-root'>

            <TopicBanner topicoNome='Dados de Internacionalização dos Alunos' />
            <WIP_page />
        </div>
    );
}

export default Dia;