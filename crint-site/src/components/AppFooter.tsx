import { useContext } from 'react';
import { ConfigContext } from '../Context';
import { DEFAULT_LANGUAGE } from '../utils/appConstants';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './AppFooter.scss'
import { Link } from 'react-router-dom';
import { loadLanguage } from '../utils/utils';
import { ApiFooterFooter } from '../utils/generated/contentTypes';

const AppFooter = () => {
    // const {userConfig} = useContext(ConfigContext);
    // const [langDict, setLangDict] = useState<ApiFooterFooter>();

    // useEffect(()=>{
    //     // Sobe para o topo caso troque de página
    //     axios.get('http://localhost:1337/api/headers').then((response) => {
    //         setLangDict(response['data']['data'][0] as ApiFooterFooter);
    //     })

    // }, [location])

    // return (
    //     <footer style={{fontSize: (userConfig?.fontSizeMod || 1) + 'em'}}>
    //         <nav className='footer'>
    //             <div className='footer-row'>
    //                 {/* ENDEREÇO */}
    //                 <div className='footer-left'>
    //                     <h3> {langDict.footer.endereco} </h3>
    //                     <p> Avenida Trabalhador São-carlense, 400 - Centro CEP: 13566-590 - São Carlos - SP </p>
    //                 </div>

    //                 {/* REDES SOCIAIS */}
    //                 <div className='footer-center' role='navigation'>
    //                     <h3> {langDict.footer.redes} </h3>
    //                     <a href='https://www.instagram.com/crinticmc/'><FontAwesomeIcon icon={faInstagram} /> Instagram </a> <br/>
    //                     <a href='https://t.me/crinticmc'><FontAwesomeIcon icon={faTelegram} /> Telegram </a> <br/>
    //                     <a href='https://github.com/CRInt-ICMC/crint-site'><FontAwesomeIcon icon={faGithub} /> Github </a>
    //                 </div>

    //                 {/* CONTATO */}
    //                 <div className='footer-right'>
    //                     <h3> {langDict.footer.contato} </h3>
    //                     <a href='mailto:crint@icmc.usp.br'><FontAwesomeIcon icon={faEnvelope} /> crint@icmc.usp.br </a> <br/>
    //                     <a href='tel:+55 16 3373-8109'><FontAwesomeIcon icon={faPhone} /> +55 (16) 3373-8109 </a>
    //                 </div>
    //             </div>
    //             <div className='footer-row'><Link to={'/creditos'}>Créditos do desenvolvimento do site</Link ></div>
    //         </nav>
    //     </footer>
    // );
}

export default AppFooter;