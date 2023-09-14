import PageLoader from '../../componentes/PageLoader';
import { INFORMACOES_GRADIENTE } from '../../utils/appConstants';
import { INFORMACOES_BANNER } from '../../utils/appImages';

const Convenios = () => {
    return (
        <PageLoader uid='convenios' topicoImagem={INFORMACOES_BANNER} topicoGradiente={INFORMACOES_GRADIENTE} />
    );
}

export default Convenios;