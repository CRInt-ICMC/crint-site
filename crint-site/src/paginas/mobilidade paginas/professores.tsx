import PageLoader from '../../componentes/PageLoader';
import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import { MOBILIDADE_BANNER } from '../../utils/appImages';

const Professor = () => {
    return (
        <div id='professor-root'>
            <PageLoader uid='professores' topicoImagem={MOBILIDADE_BANNER} topicoGradiente={MOBILIDADE_GRADIENTE} />
        </div>
    );
}

export default Professor;