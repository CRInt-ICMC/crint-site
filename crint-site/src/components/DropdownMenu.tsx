// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

import { ReactNode, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import './DropdownMenu.scss'

const DropdownMenu = (props: { head: ReactNode, body: ReactNode, backgroundColor: string }) => {
    const [display, toggleDisplay] = useState(false);

    const hideMenu = () => toggleDisplay(false);
    const showMenu = () => toggleDisplay(true);

    return (
        <menu className='dropmenu' onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            <div className='dropmenu-head'>
                {props.head}
                <AnimateHeight height={display ? 'auto' : 0} className='dropmenu-itens' style={{backgroundColor: props.backgroundColor}}>
                    {props.body}
                </AnimateHeight>
            </div>
        </menu>
    );
}

export default DropdownMenu;