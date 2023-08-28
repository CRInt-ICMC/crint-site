import React, { useContext } from "react";
import { loadSettings } from "./utils/utils";

// Carrega as configurações ao inicializar o site
export const STD_CONFIG_STATE : userConfig = loadSettings();

// Interface que será utilizada pela aplicação
export interface UserOptionsState {
    userConfig? : userConfig;
    setUserConfig? : (userOptions : userConfig) => void;
}

// Cria um contexto vazio
export const ConfigContext = React.createContext<UserOptionsState>({});
export const useConfigState = () => useContext(ConfigContext)