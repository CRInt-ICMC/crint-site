import { ReactNode, useState } from "react";
import './DropDownMenu.css'

const DropDownMenu = (props : {head : ReactNode, body : ReactNode}) => {
    const [menuScale, toggleMenu] = useState<any>("scaleY(0)");

    const hideMenu = () => toggleMenu("scaleY(0)");
    const showMenu = () => toggleMenu("scaleY(1)");

    return (
        <menu className="dropMenu" onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            <div className="dropMenuHead">
                {props.head}
                <div className="dropMenuItens" style={{transform: menuScale}}>
                    {props.body}
                </div>
            </div>
        </menu>
    );
}

export default DropDownMenu;