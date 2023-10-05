import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_FONT, MIN_FONT } from "../utils/appConstants";
import { SettingsContext } from "../Contexto";
import { useContext } from "react";
import { saveSettings, updateUserSettings } from "../utils/utils";
import './FontSizeSystem.scss';

const FontSizeSystem = () => {
    const { userSettings, setUserSettings } = useContext(SettingsContext);
    
    const setFontSizeMod = (offset : number) => {
        if (userSettings && setUserSettings) {
            setUserSettings(updateUserSettings(userSettings, {fontSizeMod: userSettings?.fontSizeMod + offset}));
            saveSettings(userSettings);
        }
    }

    return (
        <div className='options-root'>
            <div className='options-buttons'>
                {(userSettings?.fontSizeMod || 1) < MAX_FONT && <button className='increase-button' onClick={() => setFontSizeMod(0.1)}><FontAwesomeIcon icon={faPlus} /></button>}
                {(userSettings?.fontSizeMod || 1) > MIN_FONT && <button className='decrease-button' onClick={() => setFontSizeMod(-0.1)}><FontAwesomeIcon icon={faMinus} /></button>}
            </div>
        </div>
    );
}

export default FontSizeSystem;