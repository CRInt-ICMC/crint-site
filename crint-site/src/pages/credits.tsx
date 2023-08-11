import TopicSection from '../components/TopicSection';
import { BEJE_CLARO } from '../utils/appConstants';
import './credits.scss'

const corpo = () => (
    <>
        
    </>
)

const Creditos = () => {
    return (
        <div id='credits-root'>
            <TopicSection
                title='Créditos' 
                body={corpo()}
                style={{backgroundColor: BEJE_CLARO}}
                />
        </div>
    );
}

export default Creditos;