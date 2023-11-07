import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_FONT_MULTIPLIER, MIN_FONT_MULTIPLIER } from "../utils/constants";
import { getBaseFontSize, updateUserSettings, useSettings } from "../utils/utils";
import { useEffect } from "react";
import './FontSizeSystem.scss';

const FontSizeSystem = () => {
    const context = useSettings();
    const { userSettings } = context;

    const BASE_FONTSIZE = getBaseFontSize()
    console.log(BASE_FONTSIZE);

    // Atualiza a fonte global do site
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            '--base-font-size',
            String(userSettings.fontSize) + 'px'
        );
    }, [userSettings.fontSize])

    const setFontSize = (offset: number) => {
        let newFontSize = userSettings.fontSize + offset

        // Garante a integridade das fontes do site
        if (newFontSize > MAX_FONT_MULTIPLIER * BASE_FONTSIZE)
            newFontSize = MAX_FONT_MULTIPLIER * BASE_FONTSIZE;
        else if (newFontSize < MIN_FONT_MULTIPLIER * BASE_FONTSIZE)
            newFontSize = MIN_FONT_MULTIPLIER * BASE_FONTSIZE;

        updateUserSettings(context, { fontSize: newFontSize });
    }

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