import React, { useContext } from "react";
import { DEFAULT_LANGUAGE } from "./utils/appConstants";

export const STD_CONFIG_STATE : userConfig = {
    lang: DEFAULT_LANGUAGE,
    fontSizeMod: 0,
    contrast: false,
}

export interface UserOptionsState {
    userConfig? : userConfig;
    setUserConfig? : (userOptions : userConfig) => void;
}

export const STD_USER_CONFIG_STATE: UserOptionsState = {};

export const ConfigContext = React.createContext(STD_USER_CONFIG_STATE);
export const useConfigState = () => useContext(ConfigContext)