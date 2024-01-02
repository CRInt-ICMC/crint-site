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