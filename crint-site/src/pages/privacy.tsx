import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import { AZUL_AUCANI } from '../utils/appConstants';
import './privacy.scss'

const termos = () => (
    <>
        <p>
            Esse site utiliza um cookie para armazenar localmente as opções de personalização selecionadas e também
            se já foi aceita a utilização desses cookies que melhoram o funcionamento do website.
        </p>

        <p> 
            Nenhuma outra informação é guardada além das citadas acima e nada armazena é utilizado para quaisquer 
            fins além de melhorar a experiência do usuário.
        </p>

        <p> O cookie "<b>settings</b>" tem a seguinte estrutura: </p>
        <ul>
            <li> <b>consentCookie</b> - Variável booleana que armazena se o usuário já aceitou o uso de cookies. </li>
            <li> <b>lang</b> - Variável de texto que armazena a última opção de linguagem selecionada pelo usuário. </li>
            <li> <b>fontSizeMod</b> - Variável numérica que armazena as modificações no tamanho da fonte realizadas pelo usuário. </li>
        </ul>

        <p> Ao utilizar o nosso website, você concorda com o uso desse cookie e o armazenamento local dessas informações. </p>
    </>
)

const Privacidade = () => {
    return (
        <div id='privacy-root'>
            <TopicBanner
                topicoNome='Política de Privacidade'
                />
            <TopicSection
                title='Termos'
                body={termos()}
                style={{backgroundColor: AZUL_AUCANI}} 
                />
        </div>
    );
}

export default Privacidade;