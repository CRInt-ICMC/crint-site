import { ReactNode, useState } from "react";
import './DropDownMenu.scss'

const DropDownMenu = (props : {head : ReactNode, body : ReactNode, fontSize : number}) => {
    const [display, toggleDisplay] = useState(false);

    const hideMenu = () => toggleDisplay(false);
    const showMenu = () => toggleDisplay(true);

    return (
        <menu className="dropMenu" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            <div className="dropMenuHead">
                { props.head }
                <div className="dropMenuItens" style={{transform: display ? 'scaleY(1)' : 'scaleY(0)', fontSize: props.fontSize + 'em'}}>
                    { props.body }
                </div>
            </div>
        </menu>
    );
}

export default DropDownMenu;