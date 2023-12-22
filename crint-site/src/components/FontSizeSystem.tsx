import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_FONT_MULTIPLIER, MIN_FONT_MULTIPLIER } from "../utils/constants";
import { clampFontSize, getBaseFontSize, updateUserSettings, useSettings } from "../utils/utils";
import { useEffect, useState } from "react";
import './FontSizeSystem.scss';

const FontSizeSystem = () => {
    const context = useSettings();
    const { userSettings } = context;
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [baseFontsize, setBaseFontsize] = useState(getBaseFontSize());

    const minFontsize = MIN_FONT_MULTIPLIER * baseFontsize;
    const maxFontsize = MAX_FONT_MULTIPLIER * baseFontsize;

    // Atualiza a fonte global do site
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            '--base-font-size',
            String(clampFontSize(userSettings.fontSize)) + 'px'
        );
    }, [userSettings.fontSize]);

    // Atualiza a fonte caso haja uma mudança repentina
    useEffect(() => {
        const updateScreenWidth = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', updateScreenWidth);

        // Caso haja uma mudança no tamanho da tela, atualiza a fonte se necessário
        if (baseFontsize !== getBaseFontSize()) {
            setBaseFontsize(getBaseFontSize());
            setFontSize(0); // Atualiza a fonte
        }

        return (() => {
            window.removeEventListener('resize', updateScreenWidth);
        })
    }, [screenWidth]);

    // Atualiza a fonte do usuário
    const setFontSize = (offset: number) => {
        const newFontSize = clampFontSize(userSettings.fontSize + offset);
        updateUserSettings(context, { fontSize: newFontSize });
    }

    return (
        <div className='fontsize-root'>
            <div className='fontsize-body'>
                {
                    userSettings.fontSize > minFontsize
                        ? <button className='enabled button' onClick={() => setFontSize(-2)}><FontAwesomeIcon icon={faMinus} /></button>
                        : <button className='disabled button'><FontAwesomeIcon icon={faMinus} /></button>
                }
                {
                    userSettings.fontSize < maxFontsize
                        ? <button className='enabled button' onClick={() => setFontSize(2)}><FontAwesomeIcon icon={faPlus} /></button>
                        : <button className='disabled button'><FontAwesomeIcon icon={faPlus} /></button>
                }
            </div>
        </div>
    );
}

export default FontSizeSystem;