import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import { BEJE_CLARO } from '../utils/appConstants';
import './credits.scss'

const assets = () => (
    <>
        <p>Os seguintes assets foram utilizados para a produção do site:</p>
        <ul>
            <li><a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Dave Gandy - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/under-construction" title="under-construction icons">Under-construction icons created by Freepik - Flaticon</a></li>
            <li>Brickwall image by <a href="https://www.freepik.com/free-photo/background-made-from-bricks_10980125.htm#query=brick%20wall&position=1&from_view=keyword&track=ais">Freepik</a></li>
        </ul>
    </>
)

const participantes = () => (
    <>
        <p>O site foi desenvolvido com a participação de:</p>
        <ul>
            <li>Elisa Yumi Nakagawa (diretora do projeto)</li>
            <li>Fernanda Maria Ortega Magro (coordenadora do projeto)</li>
            <li>Pedro Henrique Vilela do Nascimento (estagiário desenvolvedor do projeto)</li>
        </ul>
    </>
)

const Creditos = () => {
    return (
        <div id='credits-root'>
            <TopicBanner
                topicoNome='Créditos'
                />
            <TopicSection
                title='Créditos' 
                body={assets()}
                style={{backgroundColor: BEJE_CLARO}}
                />
            <TopicSection 
                title='Participantes'
                body={participantes()}
                />
        </div>
    );
}

export default Creditos;