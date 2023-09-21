import React, { useContext } from "react";
import { loadSettings } from "./utils/utils";

// Carrega as configurações ao inicializar o site
export const STD_SETTINGS_STATE : userSettings = loadSettings();

// Interface que será utilizada pela aplicação
export interface UserSettingsState {
    userSettings? : userSettings;
    setUserSettings? : (userOptions : userSettings) => void;
}

// Cria um contexto vazio
export const SettingsContext = React.createContext<UserSettingsState>({});
export const useSettingsState = () => useContext(SettingsContext)