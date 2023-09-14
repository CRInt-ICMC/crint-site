import PageLoader from '../../componentes/PageLoader';
import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';

const Professor = () => {
    return (
        <div id='professor-root'>
            <PageLoader 
                uid='professores' 
                topicoGradiente={MOBILIDADE_GRADIENTE} 
                />
        </div>
    );
}

export default Professor;