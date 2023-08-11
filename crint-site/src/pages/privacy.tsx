import TopicSection from '../components/TopicSection';
import { AZUL_AUCANI } from '../utils/appConstants';
import './privacy.scss'

const corpo = () => (
    <>
    </>
)

const Privacidade = () => {
    return (
        <div id='privacy-root'>
            <TopicSection
                title='Política de Privacidade'
                body={corpo()}
                style={{backgroundColor: AZUL_AUCANI}} 
                />
        </div>
    );
}

export default Privacidade;