import PageLoader from '../../componentes/PageLoader';
import { OUTROS_GRADIENTE } from '../../utils/appConstants';
import { CRINT_COLORIDO } from '../../utils/appImages';

const Privacidade = () => {
    return (
        <div id='privacy-root'>
            <PageLoader 
                uid='politica-privacidade' 
                topicoImagem={CRINT_COLORIDO}
                topicoGradiente={OUTROS_GRADIENTE}
                />
        </div>
    );
}

export default Privacidade;