// This file is part of CRInt-site.

// CRInt-site is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// CRInt-site is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with CRInt-site. If not, see <https://www.gnu.org/licenses/>.

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