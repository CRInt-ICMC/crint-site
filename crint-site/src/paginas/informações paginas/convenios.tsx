import PageLoader from '../../componentes/PageLoader';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';

const Convenios = () => {
    return (
        <PageLoader 
            uid='convenios' 
            topicoGradiente={INFORMACOES_GRADIENTE} 
            />
    );
}

export default Convenios;