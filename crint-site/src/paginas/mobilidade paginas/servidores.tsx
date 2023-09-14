import PageLoader from '../../componentes/PageLoader';
import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import { MOBILIDADE_BANNER } from '../../utils/appImages';

const Servidor = () => {
    return (
        <div id='servidor-root'>
            <PageLoader uid='servidores' 
                topicoImagem={MOBILIDADE_BANNER} 
                topicoGradiente={MOBILIDADE_GRADIENTE} 
                />
        </div>
    );
}

export default Servidor;