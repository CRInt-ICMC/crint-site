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

interface UserSettings {
    cookieConsent: boolean,
    lang: string,
    fontsize: number,
}

// Interface que será utilizada pela aplicação
interface InitializedSettings {
    userSettings: UserSettings,
    setUserSettings: (userOptions: UserSettings) => void,
}

// Interface que será utilizada pela aplicação
interface InitializedLoadingState {
    loadingCoins: number,
    addLoadingCoins: () => void,
    subLoadingCoins: () => void,
}

// Informações da imagem
interface StrapiImageData {
    name: string,
    caption: string,
    alternativeText: string,

    height: number,
    width: number,
    size: number,

    url: string,
    hash: string,

    mime: string,
    ext: string,
}

// Informações para a formação do sumário
interface SectionLink {
    name: string,
    id: string,
}