import './AppHeader.css'

const AppHeader = () => {
    return (
        <nav className="AppHeader">
            <div className="logos">
                <span className="logo-usp">USP</span>
                <span className="logo-icmc">ICMC</span>
                <span className="logo-crint">CRInt</span>
            </div>
        </nav>
    );
}

export default AppHeader;