import TopicBanner from '../../components/TopicBanner';
import WIP_page from '../../components/wip';
import './dia.css'

const Dia = () => {
    return (
        <div id='dia-root'>

            <TopicBanner topicoNome='Dados de Internacionalização dos Alunos' fontSize='4.1em' />
            <WIP_page />
        </div>
    );
}

export default Dia;