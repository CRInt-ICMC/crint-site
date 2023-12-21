interface UserSettings {
    cookieConsent: boolean,
    lang: string,
    fontSize: number,
}

// Utilizada apenas para a criação do estado inicial
interface UserSettingsState {
    userSettings?: UserSettings,
    setUserSettings?: (userOptions: UserSettings) => void,
}

// Interface que será utilizada pela aplicação
interface InitializedSettings {
    userSettings: UserSettings,
    setUserSettings: (userOptions: UserSettings) => void,
}

// Utilizada apenas para a criação do estado inicial
interface AppLoadingState {
    loadingCoins?: number,
    addLoadingCoins?: () => void,
    subLoadingCoins?: () => void,
}

// Interface que será utilizada pela aplicação
interface InitializedLoadingState {
    loadingCoins: number,
    addLoadingCoins: () => void,
    subLoadingCoins: () => void,
}

// Informações da imagem
interface StrapiImageFormat {
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
interface StrapiImageData extends StrapiImageFormat {
    formats: {
        large: StrapiImageFormat,
        medium: StrapiImageFormat,
        small: StrapiImageFormat,
        thumbnail: StrapiImageFormat,
    }
}

// Informações para a formação do sumário
interface SectionLink {
    name: string,
    id: string,
}

// Informações para a formação dos gráficos
interface DIAData {
    university: string,
    country: string,
    date: string,
    comparative: number,
    housing: number,
    food: number,
    transport: number,
    totalExpenses: number,
}

interface OptionsForm {
    ascending: boolean,
    limit: number,
    name: string,
    date: string,
}

interface LangIcon {
    value: string,
    label: any,
    icon: string,
}