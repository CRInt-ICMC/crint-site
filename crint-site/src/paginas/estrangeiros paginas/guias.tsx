import PageLoader from '../../componentes/PageLoader';
import { ESTRANGEIROS_GRADIENTE } from '../../utils/appConstants';
import { ESTRANGEIROS_BANNER } from '../../utils/appImages';

const Guias = () => {
    return (
        <div id='guias-root'>
             <PageLoader 
                uid='estrangeiros' 
                topicoImagem={ESTRANGEIROS_BANNER}
                topicoGradiente={ESTRANGEIROS_GRADIENTE}
                />
        </div>
    );
}

export default Guias;