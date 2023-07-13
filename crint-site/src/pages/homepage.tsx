import SearchBar from '../components/SearchBar';
import './homepage.css'
import { ICMC_BACKGROUND } from '../utils/appImages';

const Homepage = () => {
    return (
        <div className='homepage-body'>
            <section className='main-section' style={{backgroundImage: `url(${ICMC_BACKGROUND})`}}>
                <span className='searchbar-container' style={{width: '70%'}}><SearchBar /></span>
            </section>
            <section className='section'>
                <h1>CRInt</h1>
                <p>
                    A Comissão de Relações Internacionais (CRInt) do ICMC foi criada em 2010 a partir da descentralização promovida pela Reitoria da USP em relação às atividades de internacionalização.
                </p>
                <p>
                    A CRInt é uma comissão que atua de forma integrada com as demais comissões estatutárias do ICMC, a saber, Comissão de Pesquisa (CPq), Comissão de Pós-Graduação (CPG), Comissão de Graduação (CG) e Comissão de Cultura e Extensão (CCEx).
                </p>
                <p>
                    A CRInt tem papel fundamental para a internacionalização da comunidade de alunos, docentes e funcionários do ICMC, apoiando e promovendo diversas iniciativas e ações nos mais diferentes segmentos. 
                </p>
                <p>
                    Missão: Zelar pelo estimulo e difusão das ações de internacionalização.
                </p>
            </section>
        </div>
    )
}

export default Homepage;