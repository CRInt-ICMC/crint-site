import { DotSpinner } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useLoading } from "../utils/utils";
import './LoadingScreen.scss'

const LoadingScreen = () => {
    const { loadingCoins } = useLoading();

    const [display, setDisplay] = useState(true);
    const [animate, setAnimate] = useState(false);

    // Tempo de transição e timeout da tela de carregamento
    const time = 700;

    useEffect(() => {
        if (loadingCoins <= 0) {
            setAnimate(true);
            setTimeout(() => setDisplay(false), time);
        }

        else {
            setAnimate(false);
            setDisplay(true);
        }
    }, [loadingCoins]);

    return (
        <div
            className={'loader-root ' + (animate ? 'hidden' : 'showing')}
            style={{
                display: display ? 'flex' : 'none',
                transitionDuration: String(time) + 'ms',
            }}
        >

            <DotSpinner
                size={40}
                speed={0.9}
                color="black"
            />
            <span className='loader-text'>Requisitando conteúdo</span>
        </div>
    );
}

export default LoadingScreen;