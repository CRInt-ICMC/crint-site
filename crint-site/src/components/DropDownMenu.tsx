import { ReactNode, useState } from "react";
import './DropDownMenu.scss'

const DropDownMenu = (props : {head : ReactNode, body : ReactNode, fontSize : number}) => {
    const [menuScale, toggleMenu] = useState<any>("scaleY(0)");

    const hideMenu = () => toggleMenu("scaleY(0)");
    const showMenu = () => toggleMenu("scaleY(1)");

    return (
        <menu className="dropMenu" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            <div className="dropMenuHead">
                {props.head}
                <div className="dropMenuItens" style={{transform: menuScale, fontSize: props.fontSize + 'em'}}>
                    {props.body}
                </div>
            </div>
        </menu>
    );
}

export default DropDownMenu;