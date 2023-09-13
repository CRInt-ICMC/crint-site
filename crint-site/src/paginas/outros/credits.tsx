import PageLoader from '../../componentes/PageLoader';
import { OUTROS_GRADIENTE } from '../../utils/appConstants';
import { CRINT_COLORIDO } from '../../utils/appImages';

const Creditos = () => {
    return (
        <div id='credits-root'>
            <PageLoader 
                uid='creditos' 
                topicoImagem={CRINT_COLORIDO} 
                topicoGradiente={OUTROS_GRADIENTE}
                />
        </div>
    );
}

export default Creditos;