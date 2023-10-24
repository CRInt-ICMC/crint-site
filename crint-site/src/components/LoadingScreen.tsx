import { DotSpinner } from "@uiball/loaders";
import { useEffect, useState } from "react";
import './LoadingScreen.scss'

const LoadingScreen = (props: { loaded: boolean }) => {
    const [display, setDisplay] = useState(true);

    const time = 1000;

    useEffect(() => {
        setTimeout(() => setDisplay(!props.loaded), time);
    }, [props.loaded]);

    return (
        <div
            className='loader-container'
            style={{
                opacity: props.loaded ? '0' : '1',
                display: display ? 'flex' : 'none',
                transitionDuration: String(time) + 'ms'
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