import React, { useContext } from "react";
import { loadSettings } from "./utils/utils";

// Utilizada apenas para a criação do estado inicial
interface UserSettingsState {
    userSettings?: UserSettings,
    setUserSettings?: (userOptions: UserSettings) => void,
}

// Carrega as configurações ao inicializar o site
export const STD_SETTINGS_STATE: UserSettings = loadSettings();

// Cria um contexto vazio
export const SettingsContext = React.createContext<UserSettingsState>({});
export const useSettingsState = () => useContext(SettingsContext);