import PageLoader from '../../componentes/PageLoader';
import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';

const Servidor = () => {
    return (
        <div id='servidor-root'>
            <PageLoader uid='servidores' 
                topicoGradiente={MOBILIDADE_GRADIENTE} 
                />
        </div>
    );
}

export default Servidor;