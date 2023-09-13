import { ESTRANGEIROS_GRADIENTE } from '../utils/appConstants';
import { ESTRANGEIROS_BANNER } from '../utils/appImages';
import PageLoader from '../componentes/PageLoader';

const Estrangeiros = () => {

    return (
        <div id='estrangeiros-root'>
            <PageLoader 
                uid='politica-privacidade' 
                topicoImagem={ESTRANGEIROS_BANNER}
                topicoGradiente={ESTRANGEIROS_GRADIENTE}
                />
        </div>
    );
}

export default Estrangeiros;