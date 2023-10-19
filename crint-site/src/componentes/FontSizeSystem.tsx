import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_FONTSIZE, MAX_FONT, MIN_FONT } from "../utils/appConstants";
import { updateUserSettings, useSettings } from "../utils/utils";
import { useEffect } from "react";
import './FontSizeSystem.scss';

const FontSizeSystem = () => {
    const context = useSettings();
    const { userSettings } = context;

    // Atualiza a fonte global do site
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            '--base-font-size',
            String(userSettings.fontSizeMod) + 'px'
        );
    }, [userSettings.fontSizeMod])

    const setFontSizeMod = (offset: number) => {
        updateUserSettings(context, { fontSizeMod: (userSettings.fontSizeMod || BASE_FONTSIZE) + offset });
    }

    return (
        <div className='options-root'>
            <div className='options-buttons'>
                {(userSettings.fontSizeMod || 1) > MIN_FONT && <button className='decrease-button' onClick={() => setFontSizeMod(-2)}><FontAwesomeIcon icon={faMinus} /></button>}
                {(userSettings.fontSizeMod || 1) < MAX_FONT && <button className='increase-button' onClick={() => setFontSizeMod( 2)}><FontAwesomeIcon icon={faPlus} /></button>}
            </div>
        </div>
    );
}

export default FontSizeSystem;