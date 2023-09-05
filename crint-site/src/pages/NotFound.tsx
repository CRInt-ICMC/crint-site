import { NOTFOUND_ICON } from '../utils/appImages';
import './NotFound.scss'

const NotFound = () => {
    return (
        <div id='notfound-root'>
            <div id='notfound-content'>
                <h1>Página não encontrada</h1>
                <img src={NOTFOUND_ICON} alt="Erro 404: Not Found" />
            </div>
        </div>
    );
};

export default NotFound;