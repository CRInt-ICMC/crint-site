import { DotSpinner } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useLoading } from "../utils/utils";
import './LoadingScreen.scss'

const LoadingScreen = () => {
    const { loadingCoins } = useLoading();

    const [display, setDisplay] = useState(true);
    const [animate, setAnimate] = useState(false);

    const time = display ? 300 : 0;

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
            className={'loader-container ' + (animate ? 'hidden' : 'showing')}
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
        </div>
    );
}

export default LoadingScreen;