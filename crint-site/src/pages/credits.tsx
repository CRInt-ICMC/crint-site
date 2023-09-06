import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import { BEJE_CLARO, OUTROS_GRADIENTE } from '../utils/appConstants';
import { CRINT_COLORIDO } from '../utils/appImages';
import './credits.scss'

const assets = () => (
    <>
        <p>Os seguintes assets foram utilizados para a produção do site:</p>
        <ul>
            <li><a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Dave Gandy - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/404-error" title="404-error icons">404-error icons created by Smashicons - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/under-construction" title="under-construction icons">Under-construction icons created by Freepik - Flaticon</a></li>
            <li>Brickwall image by <a href="https://www.freepik.com/free-photo/background-made-from-bricks_10980125.htm#query=brick%20wall&position=1&from_view=keyword&track=ais">Freepik</a></li>
            <li>Banner de Mobilidade: <a href="https://pixabay.com/users/mohamed_hassan-5229782/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3953229">Mohamed Hassan</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3953229">Pixabay</a></li>
            <li>Banner de Estrangeiros: <a href="https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=695193">Gerd Altmann</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=695193">Pixabay</a></li>
            <li>Banner de Informações: <a href="https://pixabay.com/users/ar130405-423602/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2082642">ar130405</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2082642">Pixabay</a></li>
        </ul>
    </>
)

const participantes = () => (
    <>
        <p>O site foi desenvolvido com a participação de:</p>
        <ul>
            <li>Elisa Yumi Nakagawa (presidente da CRInt)</li>
            <li>Roberto Federico Ausas (vice-presidente da CRInt)</li>
            <li>Ana Oneide Sáles (assistente acadêmico)</li>
            <li>Fernanda Maria Ortega Magro (analista acadêmico)</li>
            <li>Pedro Henrique Vilela do Nascimento (estagiário desenvolvedor do site)</li>
        </ul>
    </>
)

const Creditos = () => {
    return (
        <div id='credits-root'>
            <TopicBanner
                topicoNome='Créditos'
                topicoImage={CRINT_COLORIDO}
                style={{background: OUTROS_GRADIENTE}}
                />
            <TopicSection
                title='Assets utilizados' 
                body={assets()}
                style={{backgroundColor: BEJE_CLARO}}
                />
            <TopicSection 
                title='Participantes no desenvolvimento'
                body={participantes()}
                />
        </div>
    );
}

export default Creditos;