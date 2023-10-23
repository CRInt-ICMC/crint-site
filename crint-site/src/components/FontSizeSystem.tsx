import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MAX_FONT, MIN_FONT } from "../utils/constants";
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
            String(userSettings.fontSize) + 'px'
        );
    }, [userSettings.fontSize])

    const setFontSize = (offset: number) => {
        let newFontSize = userSettings.fontSize + offset

        // Garante a integridade das fontes do site
        if (newFontSize > MAX_FONT)
            newFontSize = MAX_FONT;
        else if (newFontSize < MIN_FONT)
            newFontSize = MIN_FONT;

        updateUserSettings(context, { fontSize: newFontSize });
    }

    return (
        <div className='options-root'>
            <div className='options-body'>
                {userSettings.fontSize > MIN_FONT && <button className='decrease button' onClick={() => setFontSize(-2)}><FontAwesomeIcon icon={faMinus} /></button>}
                {userSettings.fontSize < MAX_FONT && <button className='increase button' onClick={() => setFontSize(2)}><FontAwesomeIcon icon={faPlus} /></button>}
            </div>
        </div>
    );
}

export default FontSizeSystem;