import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import background from "../../assets/background.png"

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col">
                <div className={`flex-1 ${window.location.pathname === '/' ? 'bg-cover bg-center' : ''}`} 
                     style={window.location.pathname === '/' ? { backgroundImage: `url(${background})` } : {}}>
                    <Outlet />
                </div>
            </main>
            <Footer className="mt-auto" />
        </div>
    );
}

export default Layout;
