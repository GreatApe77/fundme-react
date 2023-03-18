
import ConnectWallet from "./ConnectWallet"

function Header(props){

    return(
        <header className="Header">
            <img className="logo" src={props.src} alt="icone"  />
            <span>{props.title}</span>
            <ConnectWallet/>
        </header>
    )
}


export default Header