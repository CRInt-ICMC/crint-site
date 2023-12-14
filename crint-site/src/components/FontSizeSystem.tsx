import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_FONT_MULTIPLIER, MIN_FONT_MULTIPLIER } from "../utils/constants";
import { clampFontSize, getBaseFontSize, updateUserSettings, useSettings } from "../utils/utils";
import { useEffect } from "react";
import './FontSizeSystem.scss';

const FontSizeSystem = () => {
    const context = useSettings();
    const { userSettings } = context;

    const BASE_FONTSIZE = getBaseFontSize();

    // Atualiza a fonte global do site
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            '--base-font-size',
            String(clampFontSize(userSettings.fontSize)) + 'px'
        );
    }, [userSettings.fontSize]);

    // Atualiza a fonte caso haja uma mudança repentina

    /*
    * Causa um erro que ao carregar o site pela primeira vez, ele sobrescreve o valor do usuário 
    * 
    * Talvez seja necessário remover a atualização dinâmica. Porém, é possível que uma atualização
    * no modelo atual seja o bastante para resolver o problema.
    * 
    * Essa atualização partiria da função que atualiza o tamanho base da fonte.
    * 
    */
    useEffect(() => {
        updateUserSettings(context, { fontSize: BASE_FONTSIZE });
    }, [BASE_FONTSIZE]);

    const setFontSize = (offset: number) => {
        const newFontSize = clampFontSize(userSettings.fontSize + offset);
        updateUserSettings(context, { fontSize: newFontSize });
    }

    console.log('Font size: ', userSettings.fontSize);

    return (
        <div className='options-root'>
            <div className='options-body'>
                {
                    userSettings.fontSize > (MIN_FONT_MULTIPLIER * BASE_FONTSIZE) &&
                    <button className='decrease button' onClick={() => setFontSize(-2)}><FontAwesomeIcon icon={faMinus} /></button>
                }
                {
                    userSettings.fontSize < (MAX_FONT_MULTIPLIER * BASE_FONTSIZE) &&
                    <button className='increase button' onClick={() => setFontSize(2)}><FontAwesomeIcon icon={faPlus} /></button>
                }
            </div>
        </div>
    );
}

export default FontSizeSystem;