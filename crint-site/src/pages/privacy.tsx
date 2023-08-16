import TopicSection from '../components/TopicSection';
import { AZUL_AUCANI } from '../utils/appConstants';
import './privacy.scss'

const corpo = () => (
    <>
        Esse site utiliza um cookie para armazenar as opções de personalização selecionadas (linguagem e tamanho da fonte) e também
        se já foi aceita a utilização desses cookies que melhoram o funcionamentos do website.

        Ao utilizar o nosso website, você concorda com o uso desse cookie.
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