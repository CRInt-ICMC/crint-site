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

import { DotSpinner } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useLoading } from "../utils/utils";
import './LoadingScreen.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";

const LoadingScreen = () => {
    const { loadingCoins } = useLoading();

    const [display, setDisplay] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [failed, setFailed] = useState(false);
    const [timeoutClock, setTimeoutClock] = useState<ReturnType<typeof setTimeout>>();

    // Tempo de transição da tela de carregamento
    const animationTime = 700;
    
    const timeoutTime = 30000;

    // Trava local para evitar que o timeout seja setado mais de uma vez
    let t: ReturnType<typeof setTimeout>;

    useEffect(() => {
        if (loadingCoins <= 0) {
            setAnimate(true);
            setTimeout(() => setDisplay(false), animationTime); // Não sai da tela de carregamento até que a animação termine

            if (timeoutClock !== undefined) {
                clearTimeout(timeoutClock);
                setTimeoutClock(undefined);
            }
        }

        else {
            setAnimate(false);
            setDisplay(true);

            if (timeoutClock === undefined && t === undefined) {
                t = setTimeout(() => setFailed(true), timeoutTime)
                setTimeoutClock(t);
            }
        }
    }, [loadingCoins]);

    return <>
        {!failed
            ? < div
                className={'loader-root ' + (animate ? 'hidden' : 'showing')}
                style={{
                    display: display ? 'flex' : 'none',
                    transitionDuration: String(animationTime) + 'ms',
                }}
            >

                <DotSpinner
                    size={40}
                    speed={0.9}
                    color="black"
                />
                <span className='loader-text'>Requisitando conteúdo</span>
            </div >

            : <div className='loader-root failure'> 
                <FontAwesomeIcon icon={faTriangleExclamation} size='4x' color='red' />
                <span className='loader-text'>Ops... Parece que estamos sem conexão com o servidor</span>
            </div>
        }
    </>
}

export default LoadingScreen;