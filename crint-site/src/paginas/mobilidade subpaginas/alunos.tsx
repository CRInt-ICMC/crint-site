import { MOBILIDADE_GRADIENTE } from '../../utils/appConstants';
import { MOBILIDADE_BANNER } from '../../utils/appImages';
import PageLoader from '../../componentes/PageLoader';

const Aluno = () => {
    return (
        <div id='aluno-root'>
            <PageLoader uid='alunos' topicoImagem={MOBILIDADE_BANNER} topicoGradiente={MOBILIDADE_GRADIENTE} />
        </div>
    );
}

export default Aluno;