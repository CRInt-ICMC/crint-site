import { ReactNode } from "react";
import './Popup.scss'

const Popup = (props : {head : string, body : ReactNode}) => {

    return (
        <div className='popup-root'>
            <div className='popup-content'>
                <h3 className='popup-head'>{props.head}</h3>
                <div className='popup-body'>{props.body}</div>
            </div>
        </div>
    );
}

export default Popup;