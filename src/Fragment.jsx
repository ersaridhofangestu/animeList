import NavbarComponent from './components/Navbar';
import FooterComponent from './components/Footer';

const Fragment = ({children}) => {
    return (
        <div>
            <NavbarComponent />
            <div>{children}</div>
            <FooterComponent />
        </div>
    )
}

export default Fragment