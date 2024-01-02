import React, { useContext } from "react";

// Utilizada apenas para a criação do estado inicial
interface AppLoadingState {
    loadingCoins?: number,
    addLoadingCoins?: () => void,
    subLoadingCoins?: () => void,
}

// Carrega as configurações ao inicializar o site
export const STD_COINS_STATE: number = 1;

// Cria um contexto vazio
export const LoadingContext = React.createContext<AppLoadingState>({});
export const useLoadingState = () => useContext(LoadingContext)