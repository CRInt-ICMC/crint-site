import { CSSProperties, ReactNode } from "react";
import './TopicSection.scss'

const TopicSection = (props : {title : string, body : ReactNode, style? : CSSProperties}) => {
    return (
        <section className='topic-section' style={props.style}>
            <h1 className='topic-title'>{`${props.title}`}</h1>
            {props.body}
        </section>
    )
}

export default TopicSection;