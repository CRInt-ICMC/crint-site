import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import PageLoader from '../../componentes/PageLoader';

const Aluno = () => {
    return (
        <div id='aluno-root'>
            <PageLoader
                uid='alunos' 
                topicoGradiente={MOBILIDADE_GRADIENTE} 
                />
        </div>
    );
}

export default Aluno;