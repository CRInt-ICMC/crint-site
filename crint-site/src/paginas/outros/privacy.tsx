import PageLoader from '../../componentes/PageLoader';
import { OUTROS_GRADIENTE } from '../../utils/appConstants';

const Privacidade = () => {
    return (
        <div id='privacy-root'>
            <PageLoader 
                uid='politica-privacidade' 
                topicoGradiente={OUTROS_GRADIENTE}
                />
        </div>
    );
}

export default Privacidade;