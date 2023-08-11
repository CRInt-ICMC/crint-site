import React, { useContext } from "react";
import { DEFAULT_LANGUAGE } from "./utils/appConstants";
import { loadSettings } from "./utils/utils";

// export const STD_CONFIG_STATE : userConfig = {
//     lang: DEFAULT_LANGUAGE,
//     fontSizeMod: 1, // É a proporção em relação ao tamanho padrão do texto
// }
export const STD_CONFIG_STATE : userConfig = loadSettings();

export interface UserOptionsState {
    userConfig? : userConfig;
    setUserConfig? : (userOptions : userConfig) => void;
}

export const STD_USER_CONFIG_STATE: UserOptionsState = {};

export const ConfigContext = React.createContext(STD_USER_CONFIG_STATE);
export const useConfigState = () => useContext(ConfigContext)