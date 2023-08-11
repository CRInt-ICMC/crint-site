import React, { useContext } from "react";
import { loadSettings } from "./utils/utils";

export const STD_CONFIG_STATE : userConfig = loadSettings();

export interface UserOptionsState {
    userConfig? : userConfig;
    setUserConfig? : (userOptions : userConfig) => void;
}

export const STD_USER_CONFIG_STATE: UserOptionsState = {};

export const ConfigContext = React.createContext(STD_USER_CONFIG_STATE);
export const useConfigState = () => useContext(ConfigContext)