import React, { useContext } from "react";

// Carrega as configurações ao inicializar o site
export const STD_COINS_STATE: number = 1;

// Cria um contexto vazio
export const LoadingContext = React.createContext<AppLoadingState>({});
export const useLoadingState = () => useContext(LoadingContext)