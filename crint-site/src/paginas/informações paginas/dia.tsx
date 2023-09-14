import TopicBanner from '../../componentes/TopicBanner';
import WIP from '../../componentes/WIP';

const Dia = () => {
    return (
        <div id='dia-root'>

            <TopicBanner 
                topicoNome='Dados de Internacionalização dos Alunos' 
                />
            <WIP />
        </div>
    );
}

export default Dia;