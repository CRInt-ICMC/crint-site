import { WIP_ICON } from "../utils/appImages";
import './wip.scss'

// Apesar de ter "page" no nome, não é para ser usado como página
const WIP = () => (
    <div className="wip">
        <img src={WIP_ICON} />
    </div>
);

export default WIP;