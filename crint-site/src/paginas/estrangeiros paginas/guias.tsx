import PageLoader from '../../componentes/PageLoader';
import { ESTRANGEIROS_GRADIENTE } from '../../utils/appConstants';

const Guias = () => {
    return (
        <div id='guias-root'>
             <PageLoader 
                uid='estrangeiros' 
                topicoGradiente={ESTRANGEIROS_GRADIENTE}
                />
        </div>
    );
}

export default Guias;