import TopicBanner from '../components/TopicBanner';
import TopicSection from '../components/TopicSection';
import { AZUL_AUCANI } from '../utils/appConstants';
import './privacy.scss'

const termos = () => (
    <>
        Esse site utiliza um cookie para armazenar as opções de personalização selecionadas (linguagem e tamanho da fonte) e também
        se já foi aceita a utilização desses cookies que melhoram o funcionamentos do website.

        Ao utilizar o nosso website, você concorda com o uso desse cookie.

        Nenhuma outra informação é guardada além das citadas acima.
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