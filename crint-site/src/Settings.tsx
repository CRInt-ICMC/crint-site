import React, { useContext } from "react";
import { loadSettings } from "./utils/utils";

// Carrega as configurações ao inicializar o site
export const STD_SETTINGS_STATE: UserSettings = loadSettings();

// Cria um contexto vazio
export const SettingsContext = React.createContext<UserSettingsState>({});
export const useSettingsState = () => useContext(SettingsContext);