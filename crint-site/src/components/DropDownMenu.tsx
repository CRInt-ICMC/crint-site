import { ReactNode, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import './DropDownMenu.scss'

const DropDownMenu = (props: { head: ReactNode, body: ReactNode }) => {
    const [display, toggleDisplay] = useState(false);

    const hideMenu = () => toggleDisplay(false);
    const showMenu = () => toggleDisplay(true);

    return (
        <menu className='dropmenu' onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            <div className='dropmenu-head'>
                {props.head}
                <AnimateHeight height={display ? 'auto' : 0} className='dropmenu-itens'>
                    {props.body}
                </AnimateHeight>
            </div>
        </menu>
    );
}

export default DropDownMenu;