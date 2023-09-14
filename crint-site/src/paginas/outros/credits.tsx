import PageLoader from '../../componentes/PageLoader';
import { OUTROS_GRADIENTE } from '../../utils/appConstants';

const Creditos = () => {
    return (
        <div id='credits-root'>
            <PageLoader 
                uid='creditos' 
                topicoGradiente={OUTROS_GRADIENTE}
                />
        </div>
    );
}

export default Creditos;