import './homepage.scss'
import TopicSection from '../components/TopicSection';
import { AZUL_AUCANI, MARMORE } from '../utils/appConstants';

const NovidadesAvisos = () => (
    <>
        <h3>O novo site da CRInt do ICMC!</h3>
        <p>
            O novo site da CRInt acabou de ser lançado!! Ainda estamos desenvolvendo algumas funcionalidades, mas você já pode encontrar tudo o que nossa página
            do ICMC tinha e um pouco mais.
        </p>
        <p>
            Caso tenha bugs para reportar, informações ou funcionalidades que gostaria de encontrar no site, ou comentários gerais, sinta-se à vontade
            para entrar em contato através de um dos seguintes emails:
            </p>
        <ul>
            <li>crint@icmc.usp.br</li>
            <li>estagiocrint@icmc.usp.br</li>
            <li>pedro.hvn@usp.br</li>
        </ul>
    </>
)

const CRInt = () => {
    return (
        <>
            <p>
                A Comissão de Relações Internacionais (CRInt) do ICMC foi criada em 2010 a partir da descentralização promovida pela Reitoria da USP em relação às atividades de internacionalização.
            </p>
            <p>
                A CRInt é uma comissão que atua de forma integrada com as demais comissões estatutárias do ICMC, a saber, Comissão de Pesquisa (CPq), Comissão de Pós-Graduação (CPG), Comissão de Graduação (CG) e Comissão de Cultura e Extensão (CCEx).
            </p>
            <p>
                A CRInt tem papel fundamental para a internacionalização da comunidade de alunos(as), docentes e funcionários(as) do ICMC, apoiando e promovendo diversas iniciativas e ações nos mais diferentes segmentos. 
            </p>
            <p>
                Missão: Zelar pelo estimulo e difusão das ações de internacionalização.
            </p>
        </>
    );
}

const Homepage = () => {
    return (
        <div className='homepage-body'>
            <section className='main-section'>
                <span className='searchbar-container' style={{width: '70%'}}>
                </span>
            </section>
            <TopicSection 
                title='Novidades e Avisos' 
                body={NovidadesAvisos()} 
                style={{backgroundColor: AZUL_AUCANI}} /* lightgreen */
                />
            <TopicSection 
                title='Comissão de Relações Internacionais (CRInt)' 
                body={CRInt()} 
                style={{backgroundColor: MARMORE}}
                />
        </div>
    )
}

export default Homepage;