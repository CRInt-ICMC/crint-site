import icmc_logo from '../img/icmc-logo-completo-p.png';
import '../shared_styles/sections.css';
import './informacoes.css'

const Informacoes = () => {
    return (
        <div>
            <section className="section-header">
                <div className='section-banner'>
                    <img src={icmc_logo} alt="" />
                    <h1>INFORMAÇÕES</h1>
                </div>
            </section>
        </div>
    );
}

export default Informacoes;