import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import background from "../../assets/background.png"

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
