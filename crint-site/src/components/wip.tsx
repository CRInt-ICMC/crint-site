import { WIP } from "../utils/appImages";
import './wip.scss'

// Apesar de ter "page" no nome, não é para ser usado como página
const WIP_page = () => (
    <div className="wip">
        <img src={WIP} />
    </div>
);

export default WIP_page;