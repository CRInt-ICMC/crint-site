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

import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_FONTSIZE_MULTIPLIER, MIN_FONTSIZE_MULTIPLIER } from "../utils/constants";
import { clampFontsize, getBaseFontsize, updateUserSettings, useSettings } from "../utils/utils";
import { useEffect, useState } from "react";
import './FontsizeSystem.scss';

const FontsizeSystem = () => {
    const context = useSettings();
    const { userSettings } = context;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [baseFontsize, setBaseFontsize] = useState(getBaseFontsize());

    const minFontsize = MIN_FONTSIZE_MULTIPLIER * baseFontsize;
    const maxFontsize = MAX_FONTSIZE_MULTIPLIER * baseFontsize;

    // Atualiza a fonte global do site
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            '--base-font-size',
            String(clampFontsize(userSettings.fontsize)) + 'px'
        );
    }, [userSettings.fontsize]);

    // Atualiza a fonte caso haja uma mudança repentina
    useEffect(() => {
        const updateScreenWidth = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', updateScreenWidth);

        // Caso haja uma mudança no tamanho da tela, atualiza a fonte se necessário
        if (baseFontsize !== getBaseFontsize()) {
            setBaseFontsize(getBaseFontsize());
            setFontsize(0); // Atualiza a fonte
        }

        return (() => {
            window.removeEventListener('resize', updateScreenWidth);
        })
    }, [screenWidth]);

    // Atualiza a fonte do usuário
    const setFontsize = (offset: number) => {
        const newFontsize = clampFontsize(userSettings.fontsize + offset);
        updateUserSettings(context, { fontSize: newFontsize });
    }

    return (
        <div className='fontsize-root'>
            <div className='fontsize-body'>
                {
                    userSettings.fontsize > minFontsize
                        ? <button className='enabled button' onClick={() => setFontsize(-2)}><FontAwesomeIcon icon={faMinus} /></button>
                        : <button className='disabled button'><FontAwesomeIcon icon={faMinus} /></button>
                }
                {
                    userSettings.fontsize < maxFontsize
                        ? <button className='enabled button' onClick={() => setFontsize(2)}><FontAwesomeIcon icon={faPlus} /></button>
                        : <button className='disabled button'><FontAwesomeIcon icon={faPlus} /></button>
                }
            </div>
        </div>
    );
}

export default FontsizeSystem;