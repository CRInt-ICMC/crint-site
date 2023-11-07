interface userSettings {
    cookieConsent: boolean,
    lang: string,
    fontSize: number,
}

interface UserSettingsState {
    userSettings?: userSettings,
    setUserSettings?: (userOptions: userSettings) => void,
}

// Interface que será utilizada pela aplicação
interface initializedSettings {
    userSettings: userSettings,
    setUserSettings: (userOptions: userSettings) => void,
}

interface AppLoadingState {
    loadingCoins?: number,
    addLoadingCoins?: () => void,
    subLoadingCoins?: () => void,
}

interface initializedLoadingState {
    loadingCoins: number,
    addLoadingCoins: () => void,
    subLoadingCoins: () => void,
}

// Informações da imagem
interface strapiImageFormat {
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

// Pacote recebido do strapi
interface strapiImageData extends strapiImageFormat {
    formats: {
        large: strapiImageFormat,
        medium: strapiImageFormat,
        small: strapiImageFormat,
        thumbnail: strapiImageFormat,
    }
}

interface sectionLink {
    name: string,
    id: string,
}
